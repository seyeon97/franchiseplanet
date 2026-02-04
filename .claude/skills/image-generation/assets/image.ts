/**
 * Gemini 3 Pro AI Image Generation and Understanding
 *
 * This module uses the latest Gemini models with safe instance creation:
 * - gemini-3-pro-image-preview: Image generation with native 4K, grounding
 * - gemini-3-pro-preview: Multimodal understanding with advanced reasoning
 *
 * Key Features:
 * - Native 4K image generation
 * - Google Search grounding for real-time data
 * - Conversational image editing
 * - Advanced reasoning with thinking_level control
 * - Media resolution control for image/video analysis
 * - Safe instance creation per function call
 */
import "server-only";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

// ============================================================================
// API KEY CONFIGURATION
// ============================================================================
// Get your free API key from: https://aistudio.google.com/apikey
// If the API key is empty, the LLM agent will guide you to obtain one
const GEMINI_API_KEY = "";

// Cloudflare AI Gateway URL - prevents WAF blocking issues
const CF_AI_GATEWAY_URL = 'https://gateway.ai.cloudflare.com/v1/ff1dfe20db3018a1883f08d1174be09d/virtual-fit/google-ai-studio';

// ============================================================================
// CONFIGURATION
// ============================================================================

// Model names
const MODELS = {
  IMAGE_GEN: "gemini-3-pro-image-preview", // Latest image generation
  MULTIMODAL: "gemini-3-pro-preview", // Latest multimodal understanding
} as const;

/**
 * Create a safe Gemini AI instance
 * This function should be called within each function to ensure safe initialization
 *
 * If API key is not configured, throws an error with instructions for the LLM agent
 * to guide the user through obtaining and setting up their API key
 */
function createGenAI(): GoogleGenAI {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === "") {
    const errorMessage = `
========================================
🤖 LLM 에이전트에게: API 키가 설정되지 않았습니다!
========================================

사용자에게 다음과 같이 안내해주세요:

1. Google AI Studio에서 API 키를 발급받아야 합니다:
   https://aistudio.google.com/apikey

2. 사용자가 API 키를 발급받으면, 채팅으로 공유하도록 요청하세요.

3. 사용자가 API 키를 공유하면, 이 파일의 GEMINI_API_KEY 상수를 업데이트해주세요:
   const GEMINI_API_KEY = "사용자가-제공한-키";

⚠️  이 파일을 직접 수정해야 합니다
파일 위치: src/server/ai/image.ts
========================================
`;
    console.error(errorMessage);
    throw new Error(
      "GEMINI_API_KEY가 설정되지 않았습니다. 사용자에게 API 키를 발급받아 공유하도록 안내해주세요."
    );
  }
  return new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
    httpOptions: {
      baseUrl: CF_AI_GATEWAY_URL
    }
  });
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ImageData {
  data: string; // base64 encoded
  mimeType: string;
}

export interface ImageGenerationOptions {
  prompt: string;
  referenceImage?: {
    data: string; // base64 encoded image
    mimeType: string;
  };
  referenceImages?: Array<{
    data: string; // base64 encoded image
    mimeType: string;
    description?: string; // 이미지 설명 (예: "clothing", "model")
  }>;
  // Gemini 3 Pro Image options
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9"; // Gemini 3 supported ratios
  imageSize?: "2K" | "4K"; // Native upscaling support
  numberOfImages?: number;
  thinkingLevel?: "low" | "high"; // Control reasoning depth (default: high)
  useGoogleSearch?: boolean; // Enable grounding with Google Search
  // Legacy options (not used in Gemini 3)
  width?: number;
  height?: number;
  guidanceScale?: number;
}

export interface GeneratedImage {
  base64: string;
  mimeType: string;
  prompt: string;
  timestamp: number;
}

export interface BoundingBox {
  label: string;
  box_2d: [number, number, number, number]; // [ymin, xmin, ymax, xmax] normalized to 0-1000
  confidence?: number;
}

export interface BoundingBoxResult {
  objects: BoundingBox[];
  imageSize?: {
    width: number;
    height: number;
  };
}

export interface UploadedFile {
  uri: string;
  mimeType: string;
  displayName?: string;
}

/**
 * Gemini 3 Pro Image로 이미지 생성
 *
 * Features:
 * - Native 4K upscaling
 * - Google Search grounding for real-time data
 * - Conversational editing support
 * - Supports reference images
 */
export async function generateImage(
  options: ImageGenerationOptions
): Promise<GeneratedImage[]> {
  const genAI = createGenAI();

  try {
    const {
      prompt,
      referenceImage,
      referenceImages,
      numberOfImages = 1,
      aspectRatio = "1:1",
      imageSize = "2K",
      thinkingLevel,
      useGoogleSearch = false,
    } = options;

    console.log(
      "🎨 Gemini 3 image generation requested:",
      prompt.substring(0, 100) + "..."
    );

    // Determine which reference images to use
    const referencesToUse =
      referenceImages || (referenceImage ? [referenceImage] : []);

    if (referencesToUse.length > 0) {
      console.log(`📸 ${referencesToUse.length} reference image(s) provided`);
    }

    const generatedImages: GeneratedImage[] = [];

    // 요청된 개수만큼 이미지 생성
    for (let i = 0; i < numberOfImages; i++) {
      // 프롬프트 구성
      const contents =
        referencesToUse.length > 0
          ? [
              { text: prompt },
              ...referencesToUse.map((ref) => ({
                inlineData: {
                  mimeType: ref.mimeType,
                  data: ref.data,
                },
              })),
            ]
          : prompt;

      // Config 구성
      const config: Record<string, unknown> = {
        imageConfig: {
          aspectRatio,
          imageSize,
        },
      };

      // Thinking level 설정 (선택사항)
      if (thinkingLevel) {
        config.thinkingLevel = thinkingLevel;
      }

      // Google Search grounding 활성화
      if (useGoogleSearch) {
        config.tools = [{ googleSearch: {} }];
      }

      // Gemini API 호출
      const response = await genAI.models.generateContent({
        model: MODELS.IMAGE_GEN,
        contents,
        config,
      });

      // 응답에서 이미지 추출
      const parts = response.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData?.data) {
          const imageData = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || "image/png";

          generatedImages.push({
            base64: imageData,
            mimeType: mimeType,
            prompt: prompt,
            timestamp: Date.now() + i,
          });

          console.log(
            `✅ Image ${
              i + 1
            }/${numberOfImages} generated successfully (${imageSize}, ${aspectRatio})`
          );
        } else if (part.text) {
          console.log("📝 Response text:", part.text);
        }
      }
    }

    if (generatedImages.length === 0) {
      throw new Error(
        "이미지 생성에 실패했습니다. 응답에 이미지가 포함되지 않았습니다."
      );
    }

    console.log(`🎉 Total ${generatedImages.length} image(s) generated`);
    return generatedImages;
  } catch (error) {
    console.error("❌ Gemini 이미지 생성 에러:", error);
    throw new Error(
      `이미지 생성 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

// ============================================================================
// IMAGE UNDERSTANDING - INLINE DATA
// ============================================================================

export interface TextGenerationOptions {
  thinkingLevel?: "low" | "high"; // Control reasoning depth (default: high)
  mediaResolution?:
    | "media_resolution_low"
    | "media_resolution_medium"
    | "media_resolution_high"; // For images/videos
}

/**
 * Generate text from prompt with optional images (inline base64 data)
 * Uses Gemini 3 Pro for multimodal understanding
 */
export async function generateText(
  prompt: string,
  images?: ImageData[],
  options?: TextGenerationOptions
): Promise<string> {
  const genAI = createGenAI();

  try {
    console.log("🤖 Generating text with Gemini 3 Pro");

    const { thinkingLevel, mediaResolution = "media_resolution_high" } =
      options || {};

    const contents =
      images && images.length > 0
        ? [
            { text: prompt },
            ...images.map((img) => ({
              inlineData: {
                mimeType: img.mimeType,
                data: img.data,
              },
              mediaResolution: {
                level: mediaResolution,
              },
            })),
          ]
        : prompt;

    const config: Record<string, unknown> = {};

    if (thinkingLevel) {
      config.thinkingLevel = thinkingLevel;
    }

    const response = await genAI.models.generateContent({
      model: MODELS.MULTIMODAL,
      contents,
      config,
    });

    const text = response.text || "";
    console.log("✅ Text generated successfully");
    return text;
  } catch (error) {
    console.error("❌ Text generation error:", error);
    throw new Error(
      `텍스트 생성 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

/**
 * Caption an image (generate description)
 * Uses inline data method - ideal for files < 20MB
 */
export async function captionImage(
  imageBase64: string,
  mimeType: string = "image/jpeg",
  customPrompt?: string
): Promise<string> {
  const prompt = customPrompt || "Caption this image.";
  return generateText(prompt, [{ data: imageBase64, mimeType }]);
}

/**
 * Analyze a single image with custom prompt
 */
export async function analyzeImage(
  imageBase64: string,
  prompt: string,
  mimeType: string = "image/jpeg"
): Promise<string> {
  return generateText(prompt, [{ data: imageBase64, mimeType }]);
}

/**
 * Analyze image and return structured JSON response
 * Generic function that can be used for any structured analysis
 */
export async function analyzeImageWithStructure<T = Record<string, unknown>>(
  imageBase64: string,
  jsonSchema: string,
  mimeType: string = "image/jpeg",
  fallback?: T
): Promise<T> {
  try {
    const prompt = `Analyze this image and return the result in the following JSON format:\n${jsonSchema}`;
    const response = await generateText(prompt, [
      { data: imageBase64, mimeType },
    ]);

    // Remove markdown code blocks if present
    const cleanedResponse = response
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    try {
      return JSON.parse(cleanedResponse) as T;
    } catch (parseError) {
      console.warn(
        "⚠️ Failed to parse JSON response, returning fallback:",
        parseError
      );
      if (fallback !== undefined) {
        return fallback;
      }
      throw parseError;
    }
  } catch (error) {
    console.error("❌ Structured analysis error:", error);
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}

/**
 * Compare multiple images
 */
export async function compareImages(
  images: ImageData[],
  prompt?: string
): Promise<string> {
  const defaultPrompt = "What is different between these images?";
  return generateText(prompt || defaultPrompt, images);
}

/**
 * Enhance a text prompt for better image generation
 */
export async function enhancePrompt(
  prompt: string,
  instructions?: string
): Promise<string> {
  try {
    const defaultInstructions = `
You are a professional prompt engineer. Enhance the following prompt to be more detailed,
vivid, and effective for AI image generation. Keep the core meaning but add helpful details
about composition, lighting, style, and quality.

Original prompt: ${prompt}

Return ONLY the enhanced prompt, without any explanation or additional text.
`;
    const enhancePromptText = instructions || defaultInstructions;
    const enhanced = await generateText(enhancePromptText);
    return enhanced.trim();
  } catch (error) {
    console.warn("⚠️ Prompt enhancement failed, using original:", error);
    return prompt; // Fallback to original
  }
}

// ============================================================================
// IMAGE UNDERSTANDING - FILE API (for large files)
// ============================================================================

/**
 * Upload image file to Gemini File API
 * Recommended for files > 20MB or for reusing images across multiple requests
 */
export async function uploadImageFile(
  filePath: string,
  mimeType: string
): Promise<UploadedFile> {
  const genAI = createGenAI();

  try {
    console.log("📤 Uploading file to Gemini File API:", filePath);

    const uploadedFile = await genAI.files.upload({
      file: filePath,
      config: { mimeType },
    });

    console.log("✅ File uploaded successfully:", uploadedFile.uri);

    if (!uploadedFile.uri || !uploadedFile.mimeType) {
      throw new Error("파일 업로드 응답이 유효하지 않습니다.");
    }

    return {
      uri: uploadedFile.uri,
      mimeType: uploadedFile.mimeType,
      displayName: uploadedFile.displayName,
    };
  } catch (error) {
    console.error("❌ File upload error:", error);
    throw new Error(
      `파일 업로드 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

/**
 * Generate content using uploaded file URI
 * Uses Gemini 3 Pro
 */
export async function generateContentWithFileUri(
  fileUri: string,
  mimeType: string,
  prompt: string,
  options?: TextGenerationOptions
): Promise<string> {
  const genAI = createGenAI();

  try {
    console.log("🤖 Generating content with file URI");

    const config: Record<string, unknown> = {};

    if (options?.thinkingLevel) {
      config.thinkingLevel = options.thinkingLevel;
    }

    const response = await genAI.models.generateContent({
      model: MODELS.MULTIMODAL,
      contents: createUserContent([
        createPartFromUri(fileUri, mimeType),
        prompt,
      ]),
      config,
    });

    const text = response.text || "";
    console.log("✅ Content generated successfully");
    return text;
  } catch (error) {
    console.error("❌ Content generation error:", error);
    throw new Error(
      `콘텐츠 생성 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

/**
 * Analyze multiple images using File API
 * Uses Gemini 3 Pro
 */
export async function analyzeMultipleImagesWithFileApi(
  files: Array<{ path: string; mimeType: string }>,
  prompt: string,
  options?: TextGenerationOptions
): Promise<string> {
  const genAI = createGenAI();

  try {
    console.log(`📤 Uploading ${files.length} files`);

    const uploadedFiles = await Promise.all(
      files.map((f) => uploadImageFile(f.path, f.mimeType))
    );

    const contentParts = [
      prompt,
      ...uploadedFiles.map((f) => createPartFromUri(f.uri, f.mimeType)),
    ];

    const config: Record<string, unknown> = {};

    if (options?.thinkingLevel) {
      config.thinkingLevel = options.thinkingLevel;
    }

    const response = await genAI.models.generateContent({
      model: MODELS.MULTIMODAL,
      contents: createUserContent(contentParts),
      config,
    });

    return response.text || "";
  } catch (error) {
    console.error("❌ Multi-image analysis error:", error);
    throw new Error(
      `다중 이미지 분석 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

// ============================================================================
// OBJECT DETECTION
// ============================================================================

/**
 * Detect objects in image with bounding boxes
 * Returns coordinates normalized to [0, 1000] - you need to descale based on original image size
 *
 * @param imageBase64 - Base64 encoded image
 * @param mimeType - MIME type of image
 * @param customPrompt - Optional custom detection prompt
 * @returns Array of detected objects with bounding boxes
 */
export async function detectObjects(
  imageBase64: string,
  mimeType: string = "image/jpeg",
  customPrompt?: string
): Promise<BoundingBox[]> {
  try {
    console.log("🔍 Detecting objects with Gemini 2.5");

    const prompt =
      customPrompt ||
      'Detect all of the prominent items in the image. Return a JSON array where each object has "label" (string) and "box_2d" (array of 4 numbers: [ymin, xmin, ymax, xmax] normalized to 0-1000).';

    const response = await generateText(prompt, [
      { data: imageBase64, mimeType },
    ]);

    // Clean and parse JSON response
    const cleanedResponse = response
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const objects = JSON.parse(cleanedResponse) as BoundingBox[];

    console.log(`✅ Detected ${objects.length} objects`);
    return objects;
  } catch (error) {
    console.error("❌ Object detection error:", error);
    throw new Error(
      `객체 탐지 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

/**
 * Detect specific objects based on custom instructions
 * Example: "Show bounding boxes of all green objects in this image"
 */
export async function detectObjectsWithInstruction(
  imageBase64: string,
  instruction: string,
  mimeType: string = "image/jpeg"
): Promise<BoundingBox[]> {
  const prompt = `${instruction}. Return a JSON array where each object has "label" (string) and "box_2d" (array of 4 numbers: [ymin, xmin, ymax, xmax] normalized to 0-1000).`;
  return detectObjects(imageBase64, mimeType, prompt);
}

/**
 * Convert normalized bounding boxes to absolute pixel coordinates
 *
 * @param boxes - Array of bounding boxes with normalized coordinates [0-1000]
 * @param imageWidth - Original image width in pixels
 * @param imageHeight - Original image height in pixels
 * @returns Converted bounding boxes with absolute coordinates
 */
export function convertBoundingBoxesToAbsolute(
  boxes: BoundingBox[],
  imageWidth: number,
  imageHeight: number
): Array<BoundingBox & { absoluteBox: [number, number, number, number] }> {
  return boxes.map((box) => {
    const [ymin, xmin, ymax, xmax] = box.box_2d;

    const absY1 = Math.round((ymin / 1000) * imageHeight);
    const absX1 = Math.round((xmin / 1000) * imageWidth);
    const absY2 = Math.round((ymax / 1000) * imageHeight);
    const absX2 = Math.round((xmax / 1000) * imageWidth);

    return {
      ...box,
      absoluteBox: [absY1, absX1, absY2, absX2],
    };
  });
}
