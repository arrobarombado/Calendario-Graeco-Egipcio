
const { execSync } = require('child_process');
const fs = require('fs');

const months = [
    'Hekatombaion', 'Metageitnion', 'Boedromion', 'Puanepsion', 'Maimakterion', 'Poseideon',
    'Gamelion', 'Anthesterion', 'Elaphebolion', 'Mounukhion', 'Thargelion', 'Skirophorion'
];

const results = {};

function scrape() {
    console.log('Starting scrape for 701st Olympiad (Years 1-4)...');

    for (let year = 1; year <= 4; year++) {
        const yearKey = `701.${year}`;
        results[yearKey] = [];

        // Month List for this year
        let yearMonths = [...months];
        if (year === 1 || year === 4) {
            // Insert Poseideon-2 after Poseideon (Index 5)
            yearMonths.splice(6, 0, 'Poseideon-2');
        }

        for (const month of yearMonths) {
            const url = `http://www.numachi.com/~ccount/hmepa/calendars/${yearKey}.${month}.html`;
            try {
                // console.log(`Fetching ${url}...`);
                const stdout = execSync(`curl -s "${url}"`).toString();

                // Check length
                // HTML uses <td><b><font size="5">30</font></b></td> for day 30.
                const has30 = stdout.includes('<b><font size="5">30</font></b>');
                const length = has30 ? 30 : 29;

                // Capture Start Date (Text in italics)
                // <td><font size="2"><i>2025-<br>07-26/27</i></font>
                let startDate = null;
                if (month === 'Hekatombaion' && year === 1) { // Only need anchor once? Or for all?
                    // Let's capture for every month just in case, but rely on Hek 1.
                }

                // Regex for first date: <!-- start 1 YYYY-MM-DD/DD
                const startMatch = stdout.match(/<!-- start 1 (\d{4}-\d{2}-\d{2})\//);
                if (startMatch) {
                    startDate = startMatch[1];
                }

                results[yearKey].push({
                    name: month,
                    length: length,
                    start: startDate
                });

                process.stdout.write(length === 30 ? 'F' : 'H'); // Full or Hollow
            } catch (e) {
                console.error(`\nError fetching ${url}: ${e.message}`);
            }
        }
    }
    console.log('\nDone.');
    fs.writeFileSync('olympiad_701_data.json', JSON.stringify(results, null, 2));
    console.log('Saved to olympiad_701_data.json');
}

scrape();
