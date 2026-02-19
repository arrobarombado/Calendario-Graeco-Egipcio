import { Component, computed, inject, input, Output, EventEmitter } from '@angular/core';
import { MoonPhaseService } from '../../services/moon-phase.service';

export interface Holiday {
    day?: number; // Hellenic Day
    month?: string; // Hellenic Month
    gregorianDay?: number; // Gregorian Day
    gregorianMonth?: number; // Gregorian Month (0-11)
    type: 'HELLENIC' | 'KEMETIC' | 'SATANIC' | 'CUSTOM';
    customIcon?: string;
    cssClass?: string; // Additional CSS Class
    name?: string; // Display Name for the holiday
}

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [],
    templateUrl: './calendar.html',
    styleUrl: './calendar.css'
})
export class CalendarComponent {
    // Recebe o dia atual ateniense do pai
    currentDay = input(1);
    monthStartDate = input.required<Date>();
    today = input<Date | null>(null);
    monthName = input<string>(''); // Hellenic Month Name

    private moonService = inject(MoonPhaseService);

    @Output() daySelect = new EventEmitter<number>();
    @Output() monthChange = new EventEmitter<number>();

    readonly currentMonthName = computed(() => {
        return this.monthName();
    });

    // Holidays Configuration
    readonly holidays: Holiday[] = [
        // Custom Hellenic
        { day: 12, month: 'Poseideon', type: 'CUSTOM', customIcon: 'assets/kitten.png', name: 'Kitten Day' },

        // Haloa
        { day: 26, month: 'Poseideon', type: 'HELLENIC', name: 'Haloa' },

        // Lenaia (Gamelion 12-15)
        { day: 12, month: 'Gamelion', type: 'HELLENIC', name: 'Lenaia' },
        { day: 13, month: 'Gamelion', type: 'HELLENIC', name: 'Lenaia' },
        { day: 14, month: 'Gamelion', type: 'HELLENIC', name: 'Lenaia' },
        { day: 15, month: 'Gamelion', type: 'HELLENIC', name: 'Lenaia' },

        // Theogamia
        { day: 27, month: 'Gamelion', type: 'HELLENIC', name: 'Theogamia' },

        // Anthesteria (Anthesterion 11-13)
        { day: 11, month: 'Anthesterion', type: 'HELLENIC', name: 'Anthesteria' },
        { day: 12, month: 'Anthesterion', type: 'HELLENIC', name: 'Anthesteria' },
        { day: 13, month: 'Anthesterion', type: 'HELLENIC', name: 'Anthesteria' },

        // Diasia
        { day: 23, month: 'Anthesterion', type: 'HELLENIC', name: 'Diasia' },

        // Asklepieia (Elaphebolion 8)
        { day: 8, month: 'Elaphebolion', type: 'HELLENIC', name: 'Asklepieia' },

        // City Dionysia (Elaphebolion 13)
        { day: 13, month: 'Elaphebolion', type: 'HELLENIC', name: 'Dionísia Urbana' },

        // Anthesphoria (Boedromion 10)
        { day: 10, month: 'Boedromion', type: 'HELLENIC', name: 'Anthesphoria' },
    ];

    readonly calendarDays = computed(() => {
        const start = this.monthStartDate();
        // const startDayOfWeek = start.getDay(); // Ignored per user request to start immediately
        const daysInMonth = this.moonService.getAtticMonthLength(start);

        const days: Array<{
            day: number | null,
            isWeekend: boolean,
            type: 'EMPTY' | 'DAY',
            holiday: Holiday | null,
            isToday: boolean,
            isDeipnon: boolean
        }> = [];

        // No initial empty slots - Day 1 starts at slot 0

        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === this.currentDay();
            // We can't strictly determine "weekend" based on column if we ignore weekday offset.
            // But we can still validly check the Gregorian date for that specific day.

            // Calculate Gregorian Date for this cell
            const cellDate = new Date(start);
            cellDate.setDate(start.getDate() + (i - 1));
            const gDayOfWeek = cellDate.getDay();
            const isWeekend = gDayOfWeek === 0 || gDayOfWeek === 6;

            const gMonth = cellDate.getMonth();
            const gDay = cellDate.getDate();

            // Find holiday (priority to specific dates)
            const holiday = this.holidays.find(h => {
                // Check Hellenic
                if (h.day && h.day === i) {
                    if (h.month && h.month !== this.currentMonthName()) return false;
                    return true;
                }
                // Check Gregorian
                if (h.gregorianDay && h.gregorianDay === gDay && h.gregorianMonth === gMonth) {
                    return true;
                }
                return false;
            });

            days.push({
                day: i,
                isWeekend,
                type: 'DAY',
                holiday: holiday || null,
                isToday,
                isDeipnon: i === daysInMonth
            });
        }

        // No trailing padding - grid ends with the last day
        // User requested "pink empty slots" back.
        // We will fill the remainder of the last row so the grid doesn't look broken.
        const currentCount = days.length;
        const remainder = currentCount % 7;
        if (remainder !== 0) {
            const missing = 7 - remainder;
            for (let i = 0; i < missing; i++) {
                days.push({ day: null, isWeekend: false, type: 'EMPTY', holiday: null, isToday: false, isDeipnon: false });
            }
        }

        return days;
    });

    onDayClick(day: number) {
        this.daySelect.emit(day);
    }

    getHolidayIcon(holiday: Holiday): string | null {
        if (!holiday) return null;
        if (holiday.type === 'CUSTOM' && holiday.customIcon) return holiday.customIcon;

        switch (holiday.type) {
            case 'HELLENIC': return 'assets/greek_eye.png';
            case 'KEMETIC': return 'assets/ankh.png';
            case 'SATANIC': return 'assets/goat_head.png';
            default: return null;
        }
    }

    getHolidayClass(holiday: Holiday): string {
        return holiday.cssClass || '';
    }


    prevMonth() {
        this.monthChange.emit(-1);
    }

    nextMonth() {
        this.monthChange.emit(1);
    }
}
