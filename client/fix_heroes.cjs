const fs = require('fs');
const path = require('path');

const map = {
  'HomePage.jsx': 'hero_bg_home_1776720190044.png',
  'AboutPage.jsx': 'hero_bg_about_1776720215519.png',
  'LabPage.jsx': 'hero_bg_lab_1776720324972.png',
  'PublicationsPage.jsx': 'hero_bg_pubs_1776720396440.png',
  'ResearchPage.jsx': 'hero_bg_research_1776720529427.png',
  'WritingPage.jsx': 'hero_bg_writing_1776720496242.png',
  'ContactPage.jsx': 'hero_bg_home_1776720190044.png',
  'ElitechPage.jsx': 'hero_bg_writing_1776720496242.png'
};

const dir = path.join(__dirname, 'src', 'pages');

for (const [file, img] of Object.entries(map)) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const bgStyle = `style={{ backgroundImage: "url('/assets/images/backgrounds/${img}')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }}`;
    content = content.replace(/<div className="mesh-background" \/>/, `<div className="mesh-background" ${bgStyle} />`);
    // Fallback if HomePage uses home-hero
    content = content.replace(/<div className="home-hero__mesh".*?>[\s\S]*?<\/div>/, `<div className="home-hero__mesh" ${bgStyle} />`);
    fs.writeFileSync(filePath, content);
  }
}
console.log('Heroes updated');
