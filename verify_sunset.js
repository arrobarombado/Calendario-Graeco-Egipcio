
const { Moon } = require('lunarphase-js');

class MoonPhaseServiceMock {
    constructor() {
        this.months = [
            { lat: 'Hekatombaion', gr: 'Ἑκατομβαιών' },
            { lat: 'Metageitnion', gr: 'Μεταγειτνιών' },
            { lat: 'Boedromion', gr: 'Βοηδρομιών' },
            { lat: 'Pyanepsion', gr: 'Πυανεψιών' },
            { lat: 'Maimakterion', gr: 'Μαιμακτηριών' },
            { lat: 'Poseideon', gr: 'Ποσειδεών' },
            { lat: 'Gamelion', gr: 'Γαμηλιών' },
            { lat: 'Anthesterion', gr: 'Ἀνθεστηριών' },
            { lat: 'Elaphebolion', gr: 'Ἐλαφηβολιών' },
            { lat: 'Mounykhion', gr: 'μουνιχιών' },
            { lat: 'Thargelion', gr: 'Θαργηλιών' },
            { lat: 'Skirophorion', gr: 'Σκιροφοριών' }
        ];
        this.NOUMENIA_THRESHOLD = 1.5;
    }

    getMoonAge(date) {
        return Moon.lunarAge(date);
    }

    isIntercalaryYear(atticYear) { return true; } // Forced

    getAdjustedMonths(year) {
        const months = [...this.months];
        if (this.isIntercalaryYear(year)) {
            months.splice(6, 0, { lat: 'Poseideon II', gr: 'Ποσειδεών Β' });
        }
        return months;
    }

    getHekatombaion1(year) {
        // Simplified mock, assuming date diff
        return new Date(year, 6, 15); // approx
    }

    // UPDATED LOGIC TO TEST
    getAthenianDate(inputDate = new Date()) {
        const date = new Date(inputDate);
        let shifted = false;
        if (date.getHours() >= 18) {
            date.setDate(date.getDate() + 1);
            shifted = true;
        }

        // Just return the date used for calc to verify shift
        return {
            original: inputDate.toISOString(),
            used: date.toISOString(),
            shifted
        };
    }
}

const service = new MoonPhaseServiceMock();

console.log('--- Checking Sunset Logic ---');
const noon = new Date('2026-01-14T12:00:00');
const sunset = new Date('2026-01-14T18:00:00');
const night = new Date('2026-01-14T20:00:00');
const morning = new Date('2026-01-14T08:00:00');

[noon, sunset, night, morning].forEach(d => {
    const res = service.getAthenianDate(d);
    console.log(`Input: ${d.toLocaleTimeString()} -> Shifted? ${res.shifted} -> Used Target: ${res.used}`);
});
