
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day === 26 && monthName === 'Poseideon') {
            return {
                deity: 'Haloa',
                description: 'Festival description...',
                suggestions: 'Suggestions...'
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Haloa ---');
const res = service.getDedication(26, 30, 'Poseideon');
console.log(`Poseideon 26: ${res ? res.deity : 'None'}`);

const res2 = service.getDedication(26, 30, 'Gamelion');
console.log(`Gamelion 26: ${res2 ? res2.deity : 'None'}`);
