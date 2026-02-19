
const { Moon } = require('lunarphase-js');

// Mocking the Service Logic for verification script context
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
            { lat: 'Mounichion', gr: 'μουνιχιών' },
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
        let monthIndex = Math.floor(diffDays / 29.53);

        // CORRECTED LINE IN SERVICE, SO I SHOULD MOCK THAT
        const monthsList = this.getAdjustedMonths(atticYear);

        if (age < this.NOUMENIA_THRESHOLD) {
            monthIndex -= 1;
            day = 30;
        }
        if (monthIndex < 0) monthIndex = 0;

        let selectedIndex = monthIndex % monthsList.length;
        const selectedMonth = monthsList[selectedIndex];

        return {
            date: date.toDateString(),
            atticYear,
            monthIndex,
            monthName: selectedMonth ? selectedMonth.lat : 'Unknown'
        };
    }
}

const service = new MoonPhaseServiceMock();
const now = new Date('2026-01-14T12:00:00');
const result = service.getAthenianDate(now);

console.log('Result:', result);
console.log('Is 2025 Intercalary?', service.isIntercalaryYear(2025));
const months2025 = service.getAdjustedMonths(2025); // Now passing Correct Year
console.log('Months in 2025-26:', months2025.map(m => m.lat));
