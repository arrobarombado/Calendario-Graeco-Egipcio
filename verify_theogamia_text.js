
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day === monthLength) {
            return { deity: `O ${day}º dia é dedicado a Hécate`, description: '' };
        }

        // Specific Holidays treated as Dedications
        if (day === 27 && monthName === 'Gamelion') {
            return { deity: 'O 27º dia é dedicado a Theogamia', description: '' };
        }

        return null; // Simplified mock
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Theogamia Text ---');
const res = service.getDedication(27, 30, 'Gamelion');
console.log(`Gamelion 27: ${res ? res.deity : 'None'}`);

const res2 = service.getDedication(27, 30, 'Poseideon');
console.log(`Poseideon 27: ${res2 ? res2.deity : 'None'}`);
