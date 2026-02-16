const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateImages() {
  // SVG로 그라디언트 이미지 생성

  // OG 이미지용 SVG (1200x630)
  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad1)" />
      <text x="600" y="280" font-family="Arial, sans-serif" font-size="220" font-weight="bold" fill="white" text-anchor="middle">프플</text>
      <text x="600" y="500" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">프랜차이즈플래닛</text>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(__dirname, 'public', 'og.png'));
  console.log('✅ OG 이미지 생성 완료: public/og.png');

  // 파비콘용 SVG (512x512)
  const faviconSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#grad2)" />
      <text x="256" y="320" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">프플</text>
    </svg>
  `;

  await sharp(Buffer.from(faviconSvg))
    .png()
    .toFile(path.join(__dirname, 'public', 'favicon-512.png'));
  console.log('✅ 파비콘 512x512 생성 완료: public/favicon-512.png');

  // Apple touch icon (180x180)
  await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
  console.log('✅ Apple Touch Icon 생성 완료: public/apple-touch-icon.png');

  // 작은 파비콘들 생성
  const sizes = [48, 32, 16];
  for (const size of sizes) {
    const smallSvg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${size}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" fill="url(#grad${size})" />
        <text x="${size/2}" y="${size * 0.7}" font-family="Arial, sans-serif" font-size="${size * 0.6}" font-weight="bold" fill="white" text-anchor="middle">F</text>
      </svg>
    `;

    await sharp(Buffer.from(smallSvg))
      .png()
      .toFile(path.join(__dirname, 'public', `favicon-${size}.png`));
    console.log(`✅ 파비콘 ${size}x${size} 생성 완료`);
  }

  // ICO 파일 생성 (Next.js는 favicon.ico를 자동으로 인식)
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, 'src', 'app', 'favicon.ico'));
  console.log('✅ favicon.ico 생성 완료: src/app/favicon.ico');

  console.log('\n🎉 모든 이미지 생성 완료!');
}

generateImages().catch(console.error);
