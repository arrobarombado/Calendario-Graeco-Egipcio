
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day === 8 && monthName === 'Elaphebolion') {
            return {
                deity: 'Asklepieia',
                description: 'Festival em honra de Asclépio...',
                suggestions: 'Faça preces e rezas pela saúde. Recite hinos a Asclépio, Apolo e Higéia. Ofereça desenhos ou estátuas de cobras, especialmente as feitas à mão.'
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Asklepieia ---');
const res = service.getDedication(8, 30, 'Elaphebolion');
console.log(`Deity: ${res ? res.deity : 'None'}`);
console.log(`Suggestions: ${res ? res.suggestions : 'None'}`);
