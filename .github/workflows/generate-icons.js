// This is a Node.js script to generate app icons
// You would run this locally with Node.js installed

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Icon sizes to generate
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate icons
sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#6366f1'; // Primary color
  ctx.fillRect(0, 0, size, size);

  // Shield icon
  ctx.fillStyle = '#ffffff';
  const shieldWidth = size * 0.6;
  const shieldHeight = size * 0.7;
  const shieldX = (size - shieldWidth) / 2;
  const shieldY = (size - shieldHeight) / 2;
  
  // Draw shield shape
  ctx.beginPath();
  ctx.moveTo(shieldX, shieldY);
  ctx.lineTo(shieldX + shieldWidth, shieldY);
  ctx.lineTo(shieldX + shieldWidth, shieldY + shieldHeight * 0.7);
  ctx.quadraticCurveTo(
    shieldX + shieldWidth / 2, 
    shieldY + shieldHeight * 1.1, 
    shieldX, 
    shieldY + shieldHeight * 0.7
  );
  ctx.closePath();
  ctx.fill();

  // Lock icon inside shield
  ctx.fillStyle = '#6366f1';
  const lockWidth = shieldWidth * 0.5;
  const lockHeight = lockWidth * 0.8;
  const lockX = (size - lockWidth) / 2;
  const lockY = shieldY + shieldHeight * 0.3;

  // Lock body
  ctx.fillRect(lockX, lockY, lockWidth, lockHeight);
  
  // Lock arc
  ctx.beginPath();
  ctx.arc(
    lockX + lockWidth / 2, 
    lockY, 
    lockWidth / 3, 
    Math.PI, 
    0, 
    true
  );
  ctx.stroke();

  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buffer);
  
  console.log(`Generated icon-${size}x${size}.png`);
});

// Generate badge for notifications
const badgeSize = 96;
const canvas = createCanvas(badgeSize, badgeSize);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#6366f1';
ctx.beginPath();
ctx.arc(badgeSize/2, badgeSize/2, badgeSize/2, 0, Math.PI * 2);
ctx.fill();

// Message icon
ctx.fillStyle = '#ffffff';
const messageWidth = badgeSize * 0.6;
const messageHeight = badgeSize * 0.5;
const messageX = (badgeSize - messageWidth) / 2;
const messageY = (badgeSize - messageHeight) / 2;

// Draw message bubble
ctx.beginPath();
ctx.moveTo(messageX, messageY);
ctx.lineTo(messageX + messageWidth, messageY);
ctx.lineTo(messageX + messageWidth, messageY + messageHeight);
ctx.lineTo(messageX + messageWidth * 0.2, messageY + messageHeight);
ctx.lineTo(messageX, messageY + messageHeight * 0.7);
ctx.closePath();
ctx.fill();

// Save the badge
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(iconsDir, `badge-${badgeSize}x${badgeSize}.png`), buffer);

console.log(`Generated badge-${badgeSize}x${badgeSize}.png`);
console.log('All icons generated successfully!');