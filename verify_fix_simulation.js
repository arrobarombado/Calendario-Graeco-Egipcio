
const OLYMPIAD_701_DATA = {
    "701.1": [
        { "name": "Hekatombaion", "length": 29, "start": "2025-06-26" },
        { "name": "Metageitnion", "length": 30, "start": "2025-07-25" },
        { "name": "Boedromion", "length": 29, "start": "2025-08-24" },
        { "name": "Puanepsion", "length": 30, "start": "2025-09-22" },
        { "name": "Maimakterion", "length": 30, "start": "2025-10-22" },
        { "name": "Poseideon", "length": 30, "start": "2025-11-21" },
        { "name": "Poseideon-2", "length": 30, "start": "2025-12-21" }, // Current Service
        { "name": "Gamelion", "length": 30, "start": "2026-01-20" },     // Current Service
        { "name": "Anthesterion", "length": 29, "start": "2026-02-19" },  // Current Service
        { "name": "Elaphebolion", "length": 30, "start": "2026-03-20" },
        { "name": "Mounukhion", "length": 29, "start": "2026-04-19" },
        { "name": "Thargelion", "length": 29, "start": "2026-05-18" },
        { "name": "Skirophorion", "length": 30, "start": "2026-06-16" }
    ]
};

const userCoords = { lat: -15.7801, lng: -47.9292 };

// Mock SunCalc (Simplified for verification - we just need to know if it's after sunset)
// For Feb 7, 2026 in Brasilia, Sunset is roughly 18:45-19:00?
// User time 23:24 is DEFINITELY after sunset.
function isAfterSunset(date) {
    const hours = date.getHours();
    return hours >= 20; // Safe approximation for "Before Midnight, After Sunset"
}

function getAthenianDate(inputDate) {
    const date = new Date(inputDate);

    // Simulate Sunset Logic
    // In the real app, it calls SunCalc.
    // Here we assume if input is late night (23:00), it's after sunset -> Next Day.
    if (isAfterSunset(date)) {
        console.log("After Sim Sunset, adding 1 day");
        date.setDate(date.getDate() + 1);
    }
    date.setHours(0, 0, 0, 0);

    const yearData = OLYMPIAD_701_DATA["701.1"];
    for (const month of yearData) {
        const startDate = new Date(month.start + 'T00:00:00');
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + month.length);

        if (date >= startDate && date < endDate) {
            const diffTime = date.getTime() - startDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return {
                day: diffDays,
                monthName: month.name
            };
        }
    }
    return null;
}

// Test Case 1: Feb 7, 2026, 23:24
const now = new Date('2026-02-07T23:24:25-03:00');
console.log(`Input: ${now.toString()}`);
const result = getAthenianDate(now);
console.log("Result (Current Service Data):", result);


// Proposed Fix Data (from JSON)
const FIXED_DATA = {
    // ...
        { "name": "Poseideon-2", "length": 30, "start": "2025-12-20" },
{ "name": "Gamelion", "length": 30, "start": "2026-01-19" },
{ "name": "Anthesterion", "length": 29, "start": "2026-02-18" },
    // ...
};
// Function with fixed data
function getAthenianDateFixed(inputDate) {
    // ... same logic but with FIXED_DATA ... 
    // Just calculating manually for Gamelion check
    const date = new Date(inputDate);
    if (isAfterSunset(date)) date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    const start = new Date("2026-01-19T00:00:00");
    const diff = Math.floor((date.getTime() - start.getTime()) / (86400000)) + 1;
    return { day: diff, monthName: "Gamelion (Fixed)" };
}

const resultFixed = getAthenianDateFixed(now);
console.log("Result (Fixed Data):", resultFixed);
