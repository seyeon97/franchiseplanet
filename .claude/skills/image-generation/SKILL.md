---
name: image-generation
description: Sets up Google Gemini AI image generation API. Triggers when user requests AI image generation, image analysis, or object detection features.
---

## Workflow

- [ ] `bash -c '.claude/skills/image-generation/scripts/setup.sh'`
- [ ] Ask user for Gemini API Key (get from https://aistudio.google.com/apikey)
- [ ] Update `src/server/ai/image.ts`: set `GEMINI_API_KEY = "user-provided-key"`
- [ ] Add to `## Project Structure & Architecture` section in CLAUDE.md:
  ```
  server/ai/image.ts - Gemini AI image generation & understanding
    - generateImage(options): generate image from prompt
    - generateText(prompt, images?): text generation with optional images
    - captionImage(base64, mimeType): generate image caption
    - analyzeImage(base64, prompt): analyze image with custom prompt
    - detectObjects(base64): detect objects with bounding boxes
  ```
- [ ] `rm -rf .claude/skills/image-generation`
