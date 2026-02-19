
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day === 23 && monthName === 'Anthesterion') {
            return {
                deity: 'Diasia',
                description: 'A "Diasia" é o principal festival para Zeus Meilikhios...',
                suggestions: 'Ofereça bolos, tortas ou biscoitos em formato de animais (como ovelhas e porcos), além de grãos, frutos e mel. Recite hinos a Zeus Meilikhios.'
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Diasia ---');
const res = service.getDedication(23, 29, 'Anthesterion');
console.log(`Deity: ${res ? res.deity : 'None'}`);
console.log(`Suggestions: ${res ? res.suggestions : 'None'}`);
