const fs = require('fs');
const path = '/home/kai/Repos/codex-sample/src/app/services/moon-phase.service.ts';

try {
    const content = fs.readFileSync(path, 'utf8');

    // Regex to find the Skirophoria block
    // Looking for: if (day === 12 && monthName === 'Skirophorion') { ... }
    const blockRegex = /if\s*\(\s*day\s*===\s*12\s*&&\s*monthName\s*===\s*'Skirophorion'\s*\)\s*\{([\s\S]*?)\}/;
    const match = content.match(blockRegex);

    if (!match) {
        console.error('❌ Skirophoria block not found!');
        process.exit(1);
    }

    const blockBody = match[1];

    // Check Deity
    if (!blockBody.includes("deity: 'Skirophoria'")) {
        console.error('❌ Deity "Skirophoria" not found in the block.');
        process.exit(1);
    }

    // Check Description (partial match to ensure it's the right text)
    if (!blockBody.includes("Este festival ocorre na época do corte e debulhamento do grão")) {
        console.error('❌ Description text does not start as expected.');
        process.exit(1);
    }

    // Check Suggestions
    if (!blockBody.includes("suggestions: 'Para as mulheres: Abstinência sexual e consumo de alho.")) {
        console.error('❌ Suggestions text does not match expected output.');
        process.exit(1);
    }

    console.log('✅ Verification Successful: Skirophoria festival is correctly added to the service.');

} catch (err) {
    console.error('❌ Error reading file:', err);
    process.exit(1);
}
