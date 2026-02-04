"use server";
import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const R2_PUBLIC_URL = "{{PUBLIC_URL}}"

/**
 * R2에 이미지 업로드
 * @param file - 업로드할 파일
 * @param path - R2 내 저장 경로 (예: "products/thumbnails")
 * @returns 업로드된 파일의 공개 URL
 */
export async function uploadImageToR2(
  file: File,
  path: string = "uploads"
): Promise<string> {
  const { env } = await getCloudflareContext();
  const r2 = env.R2;

  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  const fileName = `${timestamp}-${randomStr}.${fileExtension}`;
  const key = `${path}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();

  await r2.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type,
    },
    customMetadata: {
      uploadedAt: new Date().toISOString(),
      originalName: file.name,
      size: file.size.toString(),
    },
  });

  return `${R2_PUBLIC_URL}/${key}`;
}

/**
 * 여러 이미지를 R2에 업로드
 */
export async function uploadImagesToR2(
  files: File[],
  path: string = "uploads"
): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImageToR2(file, path)));
}

/**
 * R2에서 파일 삭제
 * @param key - 삭제할 파일의 키 (URL에서 public URL 부분 제외한 경로)
 */
export async function deleteImageFromR2(key: string): Promise<void> {
  const { env } = await getCloudflareContext();
  await env.R2.delete(key);
}

/**
 * R2에서 여러 파일 삭제
 */
export async function deleteImagesFromR2(keys: string[]): Promise<void> {
  const { env } = await getCloudflareContext();
  await Promise.all(keys.map((key) => env.R2.delete(key)));
}