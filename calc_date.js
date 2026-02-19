
const { Moon } = require('lunarphase-js');

const now = new Date('2025-12-29T14:43:27-03:00'); // User's "Current Time"
const sunset = new Date('2025-12-29T18:30:00-03:00'); // Estimates Sunset
const pastSunset = new Date('2025-12-29T20:00:00-03:00'); // Estimates Post-Sunset

function getAge(d) {
    return Moon.lunarAge(d);
}

const ageNow = getAge(now);
const ageSunset = getAge(sunset);
const agePast = getAge(pastSunset);

console.log(`Age Now (14:43): ${ageNow}`);
console.log(`Age Sunset (18:30): ${ageSunset}`);
console.log(`Age Past (20:00): ${agePast}`);

// Goal: At Sunset (18:30), day should become 10.
// So Math.floor(ageSunset + offset) + 1 (if the formula is floor+1) should be 10?
// Wait, the current formula is: let day = Math.floor(age) + 1 + dayCorrection;
// If we want result to be 10 at 18:30:
// Math.floor(ageSunset) + 1 + dayCorrection = 10 (or jump to 10 at that moment)

// Ideally, the "fractional part crossing the integer boundary" happens at sunset.
// So we want (age + virtual_offset) to equate to an integer X.0 at sunset.
// The current formula is `floor(age) + K`.
// If we change it to:
// `day = Math.floor(age + phase_shift) + 1 + base_correction` ?
// Or simpler: Just find `dayCorrection`.
// But `dayCorrection` is an integer in the current code? No, current code adds it to `Math.floor(age)`.
// `let day = Math.floor(age) + 1 + dayCorrection;`
// If `dayCorrection` is only an integer, we can't shift the boundary time.
// WE NEED `dayCorrection` TO BE A FLOAT added inside the floor, or add a separate shift.

// Proposal: Change formula to `Math.floor(age + timeCorrection) + 1 + integerCorrection`.
// Where `timeCorrection` aligns the fractional part so .00 happens at Sunset.
// Target: `(ageSunset + timeCorrection)` should be slightly epsilon >= Integer.
// Let's say we want day 10 at sunset.
// `Math.floor(ageSunset + timeCorrection) + 1` = 10 (if integerCorrection is 0, just calibrating total)
// So `floor(...)` = 9.
// `ageSunset + timeCorrection` = 9.0
// `timeCorrection = 9.0 - ageSunset`.

const targetDayAtSunset = 10;
// We want `floor(calc) + 1` = 10 => `floor(calc)` = 9.
// So `calc` = 9.0 at sunset.
const shift = -0.80; // Updated to -0.80 based on verification

console.log(`Calculated Shift: ${shift}`);

// Check:
const checkDate = (d) => {
    const age = getAge(d);
    const val = Math.floor(age + shift) + 1;
    console.log(`Time ${d.toLocaleTimeString()} -> Age ${age.toFixed(3)} -> Shifted ${(age + shift).toFixed(3)} -> Day ${val}`);
}


checkDate(now);
checkDate(sunset);
checkDate(pastSunset);

// Check Nov 22
const nov22 = new Date('2025-11-22T12:00:00');
checkDate(nov22);

