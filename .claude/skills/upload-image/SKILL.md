---
name: upload-image
description: R2 object storage setup for image uploads. Triggers - "이미지 업로드", "사진 업로드", "파일 업로드", "업로드 기능", or when image/file upload needed.
---

## Workflow

- [ ] `bash -c '.claude/skills/upload-image/scripts/setup.sh'`
- [ ] Add to `## Project Structure & Architecture` section in CLAUDE.md:
  ```
  server/storage/ - R2 image storage
    - uploadImageToR2(file, path): upload image → returns URL
    - uploadImagesToR2(files, path): upload multiple images
    - deleteImageFromR2(key): delete image
    - deleteImagesFromR2(keys): delete multiple images
  ```
- [ ] `rm -rf .claude/skills/upload-image`
