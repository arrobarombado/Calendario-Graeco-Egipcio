
class CalendarMock {
    constructor() {
        this.holidays = [
            { day: 12, month: 'Poseideon', type: 'CUSTOM', customIcon: 'assets/kitten.png' },
            { day: 27, month: 'Gamelion', type: 'HELLENIC' }
        ];
    }

    findHoliday(day, month) {
        return this.holidays.find(h => {
            if (h.day === day && h.month === month) return true;
            return false;
        });
    }
}

const cal = new CalendarMock();
console.log('--- Checking Holidays ---');

const check = (d, m) => {
    const h = cal.findHoliday(d, m);
    console.log(`${m} ${d}: ${h ? h.type + (h.customIcon ? ' ' + h.customIcon : '') : 'None'}`);
};

check(12, 'Poseideon');
check(27, 'Gamelion');
check(27, 'Poseideon');
