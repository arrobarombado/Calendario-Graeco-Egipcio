const { Moon } = require('lunarphase-js');

const NOUMENIA_THRESHOLD = 1.5;

function getAtticMonthLength(startDate) {
    // startDate is Day 1 (Noumenia), so Age >= 1.5.

    // Check Day 30 (Date + 29)
    const dateDay30 = new Date(startDate);
    dateDay30.setDate(startDate.getDate() + 29);
    const age30 = Moon.lunarAge(dateDay30);

    // If Day 30 has Age >= Threshold, it is already the Start of Next Month.
    // So current month is 29 days.
    // BUT we need to be careful about wrap around.
    // Day 1 Age ~1.5. Day 30 Age ~1.5 (29.5 days later).
    // So if age30 >= 1.5 (and not like 28), it's next month.

    if (age30 >= NOUMENIA_THRESHOLD && age30 < 15) {
        return 29;
    }
    return 30;
}

// Find a start date (Noumenia = Visible Crescent >= 1.5)
let d = new Date('2026-01-01T12:00:00');
// Find a date where Age >= 1.5 (and is Waxing) BUT previous day was < 1.5.
while (true) {
    const age = Moon.lunarAge(d);
    const prev = new Date(d);
    prev.setDate(d.getDate() - 1);
    const agePrev = Moon.lunarAge(prev);

    // Start of Month: Age is just above Threshold (1.5).
    // Must be Waxing (Age < 15).
    // Previous day must have been below Threshold (Old Moon/New Moon).
    // Note: agePrev could be 29.x (Old Moon) if cycle wrapped exactly there?
    // But usually it goes 29->0->1...
    // The "Threshold" is 1.5. So 0.5 is < 1.5.

    if (age >= NOUMENIA_THRESHOLD && age < 10) {
        if (agePrev < NOUMENIA_THRESHOLD || agePrev > 28) {
            // Found start
            break;
        }
    }
    d.setDate(d.getDate() + 1);
}

console.log(`Starting Cycle Search from ${d.toDateString()} (Age: ${Moon.lunarAge(d).toFixed(2)})`);

let currentStart = new Date(d);
for (let i = 0; i < 6; i++) {
    const len = getAtticMonthLength(currentStart);
    const end = new Date(currentStart);
    end.setDate(currentStart.getDate() + len - 1);

    const nextStart = new Date(end);
    nextStart.setDate(end.getDate() + 1);

    console.log(`Month ${i + 1}:`);
    console.log(`   Start: ${currentStart.toDateString()} (Age ${Moon.lunarAge(currentStart).toFixed(2)})`);
    console.log(`   End:   ${end.toDateString()} (Age ${Moon.lunarAge(end).toFixed(2)}) Phase: ${Moon.lunarPhase(end)}`);
    console.log(`   Length: ${len}`);
    console.log(`   Next Start: ${nextStart.toDateString()} (Age ${Moon.lunarAge(nextStart).toFixed(2)}) Phase: ${Moon.lunarPhase(nextStart)}`);

    currentStart = nextStart;
}
