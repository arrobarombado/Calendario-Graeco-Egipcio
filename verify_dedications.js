
const { Moon } = require('lunarphase-js');

// Mock Service for Dedications partial logic
class MoonPhaseServiceMock {
    getDedication(day, monthLength) {
        // Last Day (Deipnon)
        if (day === monthLength) {
            return { deity: 'Hécate', description: 'Consagrado a Hécate (Deipnon).' };
        }

        switch (day) {
            case 2:
                return { deity: 'Agathos Daimon', description: 'Consagrado ao "Bom Espírito".' };
            case 3:
                return { deity: 'Atena', description: 'Consagrado a Atena.' };
            case 4:
                return { deity: 'Afrodite, Hermes e Héracles', description: 'Consagrado a Afrodite e Hermes.' };
            case 6:
                return { deity: 'Ártemis', description: 'Consagrado a Ártemis.' };
            case 7:
                return { deity: 'Apolo', description: 'Consagrado a Apolo.' };
            case 8:
                return { deity: 'Poseidon e Teseu', description: 'Consagrado a Poseidon e Teseu.' };
            default:
                return null;
        }
    }
}

const service = new MoonPhaseServiceMock();

console.log('--- Checking Dedications ---');
const testCases = [
    { day: 2, monthLen: 30, expected: 'Agathos Daimon' },
    { day: 8, monthLen: 30, expected: 'Poseidon e Teseu' },
    { day: 30, monthLen: 30, expected: 'Hécate' }, // Deipnon 30
    { day: 29, monthLen: 29, expected: 'Hécate' }, // Deipnon 29
    { day: 15, monthLen: 30, expected: null }
];

testCases.forEach(t => {
    const res = service.getDedication(t.day, t.monthLen);
    console.log(`Day ${t.day} (Len ${t.monthLen}): ${res ? res.deity : 'None'} [Expect: ${t.expected || 'None'}]`);
});
