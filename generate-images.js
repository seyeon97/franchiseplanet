const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// OG 이미지 생성 (1200x630)
const ogCanvas = createCanvas(1200, 630);
const ogCtx = ogCanvas.getContext('2d');

// 그라디언트 배경
const ogGradient = ogCtx.createLinearGradient(0, 0, 0, 630);
ogGradient.addColorStop(0, '#60A5FA');
ogGradient.addColorStop(1, '#A78BFA');
ogCtx.fillStyle = ogGradient;
ogCtx.fillRect(0, 0, 1200, 630);

// 텍스트 설정
ogCtx.fillStyle = '#FFFFFF';
ogCtx.textAlign = 'center';
ogCtx.textBaseline = 'middle';

// "프플" 큰 텍스트
ogCtx.font = 'bold 220px sans-serif';
ogCtx.fillText('프플', 600, 250);

// "프랜차이즈플래닛" 작은 텍스트
ogCtx.font = 'bold 48px sans-serif';
ogCtx.fillText('프랜차이즈플래닛', 600, 480);

// OG 이미지 저장
const ogBuffer = ogCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'public', 'og.png'), ogBuffer);
console.log('✅ OG 이미지 생성 완료: public/og.png');

// 파비콘 생성 (512x512)
const faviconCanvas = createCanvas(512, 512);
const faviconCtx = faviconCanvas.getContext('2d');

// 그라디언트 배경
const faviconGradient = faviconCtx.createLinearGradient(0, 0, 0, 512);
faviconGradient.addColorStop(0, '#60A5FA');
faviconGradient.addColorStop(1, '#A78BFA');
faviconCtx.fillStyle = faviconGradient;
faviconCtx.fillRect(0, 0, 512, 512);

// "프플" 텍스트
faviconCtx.fillStyle = '#FFFFFF';
faviconCtx.font = 'bold 200px sans-serif';
faviconCtx.textAlign = 'center';
faviconCtx.textBaseline = 'middle';
faviconCtx.fillText('프플', 256, 256);

// 파비콘 저장
const faviconBuffer = faviconCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'public', 'favicon-512.png'), faviconBuffer);
console.log('✅ 파비콘 PNG 생성 완료: public/favicon-512.png');

// 작은 파비콘들 생성 (48x48, 32x32, 16x16)
[48, 32, 16].forEach(size => {
  const smallCanvas = createCanvas(size, size);
  const smallCtx = smallCanvas.getContext('2d');

  // 그라디언트
  const smallGradient = smallCtx.createLinearGradient(0, 0, 0, size);
  smallGradient.addColorStop(0, '#60A5FA');
  smallGradient.addColorStop(1, '#A78BFA');
  smallCtx.fillStyle = smallGradient;
  smallCtx.fillRect(0, 0, size, size);

  // 텍스트 (간단하게 'F')
  smallCtx.fillStyle = '#FFFFFF';
  smallCtx.font = `bold ${size * 0.6}px sans-serif`;
  smallCtx.textAlign = 'center';
  smallCtx.textBaseline = 'middle';
  smallCtx.fillText('F', size / 2, size / 2);

  const buffer = smallCanvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'public', `favicon-${size}.png`), buffer);
  console.log(`✅ 파비콘 ${size}x${size} 생성 완료`);
});

console.log('\n🎉 모든 이미지 생성 완료!');
