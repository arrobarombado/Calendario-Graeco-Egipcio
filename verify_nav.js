
const { Moon } = require('lunarphase-js');

// Mock Service with FIXED Logic and Intercalary Support
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

    isIntercalaryYear(atticYear) {
        const cycleYear = atticYear % 19;
        const intercalaryYears = [0, 3, 6, 8, 11, 14, 17];
        return intercalaryYears.includes(cycleYear);
    }

    getAdjustedMonths(year) {
        const months = [...this.months];
        if (this.isIntercalaryYear(year)) {
            months.splice(6, 0, { lat: 'Poseideon II', gr: 'Ποσειδεών Β' });
        }
        return months;
    }

    getHekatombaion1(year) {
        const solstice = new Date(year, 5, 21);
        let d = new Date(solstice);
        for (let i = 0; i < 60; i++) {
            const age = this.getMoonAge(d);
            if (age >= this.NOUMENIA_THRESHOLD && age < 10) {
                const prev = new Date(d);
                prev.setDate(prev.getDate() - 1);
                const agePrev = this.getMoonAge(prev);
                if (agePrev < this.NOUMENIA_THRESHOLD || agePrev > 25) {
                    return d;
                }
            }
            d.setDate(d.getDate() + 1);
        }
        return solstice;
    }

    getAthenianDate(date) {
        let age = this.getMoonAge(date);
        let day;
        if (age < this.NOUMENIA_THRESHOLD) {
            day = Math.floor(age - this.NOUMENIA_THRESHOLD) + 1;
        } else {
            day = Math.floor(age - this.NOUMENIA_THRESHOLD) + 1;
        }
        if (day < 1) day += 30;

        const currentYear = date.getFullYear();
        let hek1 = this.getHekatombaion1(currentYear);
        let atticYear = currentYear;

        if (date < hek1) {
            atticYear = currentYear - 1;
            hek1 = this.getHekatombaion1(atticYear);
        }

        const diffTime = date.getTime() - hek1.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // FIXED LOGIC
        let rawIndex = diffDays / 29.53;

        let monthIndex;
        if (day < 15) {
            monthIndex = Math.round(rawIndex);
        } else {
            monthIndex = Math.floor(rawIndex);
        }

        const monthsList = this.getAdjustedMonths(atticYear);

        if (age < this.NOUMENIA_THRESHOLD) {
            day = 30;
        }
        if (monthIndex < 0) monthIndex = 0;

        let selectedIndex = monthIndex % monthsList.length;
        const selectedMonth = monthsList[selectedIndex];

        return {
            date: date.toDateString(),
            day,
            monthName: selectedMonth ? selectedMonth.lat : 'Unknown'
        };
    }
}

const service = new MoonPhaseServiceMock();

// Simulate Button Click Navigation
let viewDate = new Date('2026-01-14T12:00:00'); // Start at Poseideon II
console.log('--- Navigating Months ---');

const msPerMonth = 29.53 * 24 * 60 * 60 * 1000;

for (let i = 0; i < 5; i++) {
    const res = service.getAthenianDate(viewDate);
    console.log(`View: ${viewDate.toDateString()} -> ${res.monthName}`);

    // Simulating 'Next Month' button
    viewDate = new Date(viewDate.getTime() + msPerMonth);
}
