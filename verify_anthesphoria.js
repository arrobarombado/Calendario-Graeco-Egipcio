
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName, gregorianDate) {
        if (gregorianDate) {
            const gMonth = gregorianDate.getMonth(); // 0-11
            const gDay = gregorianDate.getDate();

            // Anthesphoria - Spring Equinox (Southern Hemisphere) - Sept 22/23
            if (gMonth === 8 && (gDay === 22 || gDay === 23)) {
                return {
                    deity: 'Anthesphoria',
                    description: 'Festival das Flores...',
                    suggestions: 'Limpeza profunda da casa...'
                };
            }
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Anthesphoria ---');
const date1 = new Date(2026, 8, 22); // Sept 22
const res1 = service.getDedication(1, 30, 'Boedromion', date1);
console.log(`Sept 22: ${res1 ? res1.deity : 'None'}`);

const date2 = new Date(2026, 8, 23); // Sept 23
const res2 = service.getDedication(2, 30, 'Boedromion', date2);
console.log(`Sept 23: ${res2 ? res2.deity : 'None'}`);

const date3 = new Date(2026, 8, 24); // Sept 24
const res3 = service.getDedication(3, 30, 'Boedromion', date3);
console.log(`Sept 24: ${res3 ? res3.deity : 'None'}`);
