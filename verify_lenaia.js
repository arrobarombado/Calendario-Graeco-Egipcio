
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        // Specific Holidays treated as Dedications
        if (day >= 12 && day <= 15 && monthName === 'Gamelion') {
            return {
                deity: 'Lenaia',
                description: 'Desc...',
                suggestions: ''
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Lenaia ---');
const days = [11, 12, 13, 14, 15, 16];
days.forEach(d => {
    const res = service.getDedication(d, 30, 'Gamelion');
    console.log(`Gamelion ${d}: ${res ? res.deity : 'None'}`);
});
