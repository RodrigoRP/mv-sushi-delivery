const fs = require('fs');
const path = require('path');

// Atualiza o arquivo de versão com timestamp atual
const versionFile = path.join(__dirname, '../public/version.json');
const packageJson = require('../package.json');

const versionData = {
  version: packageJson.version,
  timestamp: Date.now(),
  buildDate: new Date().toISOString()
};

fs.writeFileSync(versionFile, JSON.stringify(versionData, null, 2));
console.log('✅ Versão atualizada:', versionData.version);