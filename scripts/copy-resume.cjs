const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, ".."
);
const src = path.join(projectRoot, "KARAN_KATHUR_RESUME.pdf");
const destDir = path.join(projectRoot, "public");
const dest = path.join(destDir, "KARAN_KATHUR_RESUME.pdf");

if (!fs.existsSync(src)) {
  console.error(`Resume PDF not found: ${src}`);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log(`Copied resume PDF to: ${dest}`);
