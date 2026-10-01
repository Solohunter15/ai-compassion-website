const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buf).digest('hex');
}

const userDir = 'C:\\Users\\jibum\\.gemini\\antigravity-ide\\brain\\524fe9b0-ec69-478c-a1b0-961d2c05d4ac\\.user_uploaded';
const uploadedFiles = fs.readdirSync(userDir);

const speakersDir = 'Speakers';
const speakerFiles = fs.existsSync(speakersDir) ? fs.readdirSync(speakersDir) : [];

const publicSpeakersDir = 'public/speakers';
const publicSpeakerFiles = fs.existsSync(publicSpeakersDir) ? fs.readdirSync(publicSpeakersDir) : [];

const coordinatorsDir = 'public/coordinators';
const coordinatorFiles = fs.existsSync(coordinatorsDir) ? fs.readdirSync(coordinatorsDir) : [];

console.log('--- Matching uploaded files ---');
for (const u of uploadedFiles) {
  if (!u.startsWith('media_')) continue;
  const uPath = path.join(userDir, u);
  const uHash = getHash(uPath);
  const uSize = fs.statSync(uPath).size;

  let matched = [];
  for (const s of speakerFiles) {
    const sPath = path.join(speakersDir, s);
    if (fs.statSync(sPath).isFile() && getHash(sPath) === uHash) {
      matched.push('Speakers/' + s);
    }
  }
  for (const p of publicSpeakerFiles) {
    const pPath = path.join(publicSpeakersDir, p);
    if (fs.statSync(pPath).isFile() && getHash(pPath) === uHash) {
      matched.push('public/speakers/' + p);
    }
  }
  for (const c of coordinatorFiles) {
    const cPath = path.join(coordinatorsDir, c);
    if (fs.statSync(cPath).isFile() && getHash(cPath) === uHash) {
      matched.push('public/coordinators/' + c);
    }
  }
  console.log(u + ' (' + uSize + ' bytes): ' + (matched.length ? matched.join(', ') : 'NEW UNMATCHED IMAGE'));
}
