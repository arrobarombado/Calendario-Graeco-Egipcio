
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
    }

    isIntercalaryYear(atticYear) {
        // User requested Poseideon II for ALL years.
        return true;
    }

    getAdjustedMonths(year) {
        const months = [...this.months];
        if (this.isIntercalaryYear(year)) {
            months.splice(6, 0, { lat: 'Poseideon II', gr: 'Ποσειδεών Β' });
        }
        return months;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Attic Year 2026 (Normally Non-Intercalary) ---');
const months2026 = service.getAdjustedMonths(2026);
const hasPoseideonII = months2026.some(m => m.lat === 'Poseideon II');
console.log('Months:', months2026.map(m => m.lat));
console.log('Has Poseideon II?', hasPoseideonII);

console.log('--- Checking Attic Year 2030 ---');
const months2030 = service.getAdjustedMonths(2030);
console.log('Has Poseideon II?', months2030.some(m => m.lat === 'Poseideon II'));
