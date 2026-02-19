
const { Moon } = require('lunarphase-js');

const now = new Date('2026-01-14T12:00:00');
const solstice2025 = new Date('2025-06-21T12:00:00');

// Simplified logic from service
const diffTime = Math.abs(now.getTime() - solstice2025.getTime());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const monthIndex = Math.floor(diffDays / 29.53);

console.log(`Current Date: ${now.toDateString()}`);
console.log(`Days since Solstice 2025: ${diffDays}`);
console.log(`Calculated Month Index: ${monthIndex}`);

const months = [
    'Hekatombaion', 'Metageitnion', 'Boedromion', 'Pyanepsion', 'Maimakterion', 'Poseideon',
    'Gamelion', 'Anthesterion', 'Elaphebolion', 'Mounichion', 'Thargelion', 'Skirophorion'
];

console.log(`Current Logic maps to: ${months[monthIndex % 12]}`);

// If intercalary, Poseideon II is index 6?
// Normal: 0..5, 6 is Gamelion.
// Intercalary: 0..5, 6 is Pos II, 7 is Gamelion.
