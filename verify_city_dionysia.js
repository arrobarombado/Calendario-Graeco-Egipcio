
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day === 13 && monthName === 'Elaphebolion') {
            return {
                deity: 'Dionísia Urbana',
                description: 'Festival de vários dias...',
                suggestions: 'Ler ou assistir peças clássicas...'
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking City Dionysia ---');
const res = service.getDedication(13, 30, 'Elaphebolion');
console.log(`Deity: ${res ? res.deity : 'None'}`);
console.log(`Suggestions Exist: ${res && res.suggestions.length > 0}`);
