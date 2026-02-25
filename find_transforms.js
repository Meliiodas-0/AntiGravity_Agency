const fs = require('fs');
const path = require('path');

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findFiles(fullPath, fileList);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const files = findFiles(path.join(__dirname, 'src'));

let found = false;
for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    // Simple regex to find useTransform(..., [array], ...)
    const matches = [...content.matchAll(/useTransform\([^,]+,\s*\[([^\]]+)\]/g)];
    for (const match of matches) {
        const arrayStr = match[1];
        // split by comma, parse explicitly
        const nums = arrayStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
        if (nums.some(n => n < 0 || n > 1)) {
            console.log(`Found out of bounds in ${file}: [${arrayStr}]`);
            found = true;
        }
    }
}

if (!found) {
    console.log("No out of bounds useTransform input arrays found!");
}
