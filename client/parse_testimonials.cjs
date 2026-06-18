const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\lenovo\\OneDrive\\Desktop\\Done projects\\elijah-adeyeye-portfolio\\index.html';
const siteDataPath = path.join(__dirname, 'src', 'data', 'siteData.js');

const html = fs.readFileSync(htmlPath, 'utf8');

const regex = /<p class="testimonial-text">([\s\S]*?)<\/p>\s*<div class="testimonial-author">\s*<div class="author-image">\s*<img src=".*?(testimonial-\d+\.jpg)".*?>\s*<\/div>\s*<div class="author-info">\s*<h4 class="author-name">([^<]+)<\/h4>\s*<p class="author-position">([^<]+)<\/p>/g;

let testimonials = [];
let match;
while ((match = regex.exec(html)) !== null) {
  testimonials.push({
    id: testimonials.length + 1,
    name: match[3].trim(),
    role: match[4].trim(),
    content: match[1].replace(/\s+/g, ' ').trim(),
    image: `/assets/images/testimonials/${match[2].trim()}`
  });
}

// Remove duplicates if any
const unique = [];
const ids = new Set();
for (const t of testimonials) {
  if (!ids.has(t.name)) {
    ids.add(t.name);
    unique.push(t);
  }
}

if (unique.length > 0) {
  let siteData = fs.readFileSync(siteDataPath, 'utf8');
  // Find the block "export const testimonials = [ ... ];"
  const newTestimonialsStr = `export const testimonials = ${JSON.stringify(unique, null, 2)};`;
  siteData = siteData.replace(/export const testimonials = \[[\s\S]*?\];/, newTestimonialsStr);
  fs.writeFileSync(siteDataPath, siteData);
  console.log(`Updated siteData.js with ${unique.length} testimonials.`);
} else {
  console.log("No testimonials found in regex sweep.");
}
