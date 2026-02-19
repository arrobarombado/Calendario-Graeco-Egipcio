const { Moon } = require('lunarphase-js');

// Target dates (Sao Paulo time ~ -03:00)
// New Moon: Dec 19, 2025 15:44
// Noumenia: Dec 20, 2025 (Evening) -> Day 1

const dates = [
    { name: 'New Moon (Dec 19 15:44)', date: new Date('2025-12-19T15:44:00-03:00') },
    { name: 'Noumenia Eve (Dec 20 18:30)', date: new Date('2025-12-20T18:30:00-03:00') }, // Approx sunset
    { name: 'User Current (Dec 29 16:04)', date: new Date('2025-12-29T16:04:53-03:00') }
];

console.log('--- Current Calculations ---');

dates.forEach(d => {
    const age = Moon.lunarAge(d.date);
    const phaseEmoji = Moon.lunarPhaseEmoji(d.date);
    const phaseName = Moon.lunarPhase(d.date);
    console.log(`[${d.name}]`);
    console.log(`  Age: ${age.toFixed(4)} days`);
    console.log(`  Phase: ${phaseName} ${phaseEmoji}`);

    // Current formula from service
    const currentShift = -0.80; // UPDATED to finalized value
    const day = Math.floor(age + currentShift) + 1;
    console.log(`  Current Calc Day: ${day}`);

    // Month Calc Check
    const currentYear = d.date.getFullYear();
    const solstice = new Date(currentYear, 5, 21);
    let searchDate = new Date(solstice);
    if (d.date < solstice) searchDate.setFullYear(currentYear - 1);
    const diffTime = Math.abs(d.date.getTime() - searchDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const monthIndex = Math.floor(diffDays / 29.53);
    const months = [
        'Hekatombaion', 'Metageitnion', 'Boedromion', 'Pyanepsion', 'Maimakterion',
        'Poseideon', 'Gamelion', 'Anthesterion', 'Elaphebolion', 'Mounichion',
        'Thargelion', 'Skirophorion'
    ];
    // Simple mock of logic without the intercalary
    const selectedMonth = months[monthIndex % 12];
    console.log(`  Month Index: ${monthIndex} -> ${selectedMonth} (DiffDays: ${diffDays})`);
});

console.log('\n--- Calibration ---');
// We want Noumenia Eve (Dec 20 18:30) to be Day 1.
// Means Math.floor(age + shift) + 1 = 1
// Math.floor(age + shift) = 0
// 0 <= age + shift < 1
// -age <= shift < 1 - age

const noumeniaAge = Moon.lunarAge(dates[1].date);
const targetShiftMin = -noumeniaAge;
const targetShiftMax = 1 - noumeniaAge;

console.log(`For Noumenia (Age ${noumeniaAge.toFixed(4)}) to be Day 1:`);
console.log(`Shift must be between [${targetShiftMin.toFixed(4)}, ${targetShiftMax.toFixed(4)})`);
console.log(`Suggested Shift (Midpoint): ${((targetShiftMin + targetShiftMax) / 2).toFixed(4)}`);
