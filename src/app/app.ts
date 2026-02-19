import { Component, signal, OnInit, inject, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MoonPhaseService, Dedication } from './services/moon-phase.service';
import { CalendarComponent } from './components/calendar/calendar';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarComponent, SafeHtmlPipe], // Adicionar CalendarComponent e SafeHtmlPipe aos imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly today = new Date();
  private moonService = inject(MoonPhaseService);

  protected readonly title = signal('Calendario Ateniense');
  protected readonly currentPhase = signal('');
  protected readonly currentPhaseImage = signal('');
  protected readonly illumination = signal('');
  protected readonly daysToDeipnon = signal(0);
  protected readonly daysToNoumenia = signal(0);
  protected readonly nextMonth = signal({ lat: '', gr: '' });
  protected readonly selectedDedication = signal<Dedication | null>(null);

  protected readonly isSouthern = signal(false);
  protected readonly athenianDate = signal('');
  protected readonly gregorianDate = signal('');

  protected readonly viewDate = signal(new Date());
  protected readonly selectedDate = signal(new Date()); // New: Strictly for selection
  protected readonly currentDayNum = signal(-1); // Selected Day in GRID context
  protected readonly realCurrentDayNum = signal(-1);
  protected readonly todayAthenianDate = signal('');
  protected readonly monthStartDate = signal(new Date());
  protected readonly currentHellenicMonth = signal('');

  ngOnInit() {
    this.moonService.requestUserLocation(); // Request location immediately
    // Initial State: Today
    const today = new Date();
    this.selectedDate.set(today);
    this.viewDate.set(today);

    // Header "Today" Info
    const todayAth = this.moonService.getAthenianDate(today);
    this.todayAthenianDate.set(`${todayAth.day} ${todayAth.monthName} (${todayAth.monthGreek})`);

    this.updateView();
  }

  updateView() {
    const viewD = this.viewDate();
    const selD = this.selectedDate();

    // 1. Month/Calendar View Context (Based on viewDate)
    const viewAth = this.moonService.getAthenianDate(viewD);
    this.currentHellenicMonth.set(viewAth.monthName.toUpperCase());

    // Calculate month start for the calendar grid
    const startOfMonth = new Date(viewD);
    startOfMonth.setDate(viewD.getDate() - (viewAth.day - 1));
    this.monthStartDate.set(startOfMonth);

    // Next Events (Relative to View)
    const nextInfo = this.moonService.getNextEventInfo(viewD);
    this.nextMonth.set({ lat: nextInfo.nextMonthLat, gr: nextInfo.nextMonthGr });

    const events = this.moonService.getMonthEventDates(viewD);
    const today = new Date();

    // Days to event (from REAL today)
    const diffDeipnon = Math.ceil((events.deipnon.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const diffNoumenia = Math.ceil((events.noumenia.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    this.daysToDeipnon.set(diffDeipnon);
    this.daysToNoumenia.set(diffNoumenia);

    // 2. Selected Data Context (Based on selectedDate)
    const selAth = this.moonService.getAthenianDate(selD);
    this.athenianDate.set(`${selAth.day} ${selAth.monthName} (${selAth.monthGreek})`);

    // Show range: e.g. "14-15 de Janeiro"
    const startD = selD;
    const endD = new Date(selD);
    endD.setDate(selD.getDate() + 1);

    let dateStr = '';
    // Check if months are same
    if (startD.getMonth() === endD.getMonth() && startD.getFullYear() === endD.getFullYear()) {
      const month = startD.toLocaleDateString('pt-BR', { month: 'long' });
      dateStr = `${startD.getDate()}-${endD.getDate()} de ${month} de ${startD.getFullYear()}`;
    } else {
      // Different months or years
      const startStr = startD.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
      const endStr = endD.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
      dateStr = `${startStr} - ${endStr}`;
    }
    this.gregorianDate.set(dateStr);

    this.currentPhase.set(this.moonService.getPhaseDescription()); // Note: Phase usually relates to "now" or "selected"? Let's assume Selected.
    this.currentPhaseImage.set(this.moonService.getPhaseImage(selD)); // Update Image signal
    // If phase displayed is BIG on screen, usually it follows selection or today? 
    // The previous code used 'viewDate'. Let's keep phase for 'viewDate' or 'selectedDate'?
    // User asked "when I change month, selected date also changed".
    // Implies the "Selected Data" panel.
    // Let's rely on selectedDate for phase info shown in the big card.
    this.illumination.set(this.moonService.getIllumination(selD)); // Illumination for selected

    // 3. Highlight Logic

    // Calculate Dedication for Selected Date
    // Need month length of the SELECTED date's month to check for Deipnon (Last Day).
    // Start of month for selected date? 
    // We have selAth.monthName and selAth.day.
    // To be precise, we need the length of THAT month.
    // Helper: calculate start of that month.
    // If selD is the selected date, let's look for its own month start.
    // Or simpler: MoonService.getAtticMonthLength needs the start date of the month.
    // We can infer start date: selD minus (day-1) days.
    const selMonthStart = new Date(selD);
    selMonthStart.setDate(selD.getDate() - (selAth.day - 1));
    const selMonthLen = this.moonService.getAtticMonthLength(selMonthStart);

    // Pass selD (Gregorian Date) to support solar holidays like Anthesphoria
    this.selectedDedication.set(this.moonService.getDedication(selAth.day, selMonthLen, selAth.monthName, selD));


    // Is the "selectedDate" inside the "viewDate" month?
    // Compare month indices (approx) or check range.
    // Simplest: Check if selAth.monthName == viewAth.monthName && same year essentially.
    // Better: Helper in service or simple check.
    // Re-calculating selAth is cheap.
    // STRICT CHECK:
    if (selAth.monthName === viewAth.monthName && selAth.year === viewAth.year) { // Year logic in service is stubbed to 1, be careful.
      // Actually service returns mocked year 1 often. 
      // Let's compare the underlying dates roughly?
      // Let's trust the monthName for now as unique enough in short term or check bounds.
      // Robust: Start of Month <= Selected < End of Month.
      // We have startOfMonth.
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setDate(startOfMonth.getDate() + 35); // Plenty
      if (selD >= startOfMonth && selD < endOfMonth && selAth.monthName === viewAth.monthName) {
        this.currentDayNum.set(selAth.day);
      } else {
        this.currentDayNum.set(-1);
      }
    } else {
      this.currentDayNum.set(-1);
    }

    // Real Today Highlight
    const todayAthCalc = this.moonService.getAthenianDate(today);

    // Check if "Today" is actually in the month currently being viewed.
    // Comparing only monthName is insufficient (e.g. same month name in different years).

    // We can check if `today` falls within the range of the current view month.
    // Calculate start/end of the view month.
    const viewMonthStart = this.monthStartDate();
    const viewMonthLen = this.moonService.getAtticMonthLength(viewMonthStart);
    const viewMonthEnd = new Date(viewMonthStart);
    viewMonthEnd.setDate(viewMonthStart.getDate() + viewMonthLen);

    if (today >= viewMonthStart && today < viewMonthEnd) {
      this.realCurrentDayNum.set(todayAthCalc.day);
    } else {
      this.realCurrentDayNum.set(-1);
    }
  }



  protected readonly currentYearGregorian = computed(() => {
    const start = this.monthStartDate();
    const len = this.moonService.getAtticMonthLength(start);

    // Calculate End Date of the month
    const end = new Date(start);
    end.setDate(start.getDate() + (len - 1));

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    // If month spans across valid Gregorian years
    if (startYear !== endYear) {
      return `${startYear}-${endYear}`;
    }

    return `${startYear}`;
  });

  protected readonly currentYearAttic = computed(() => {
    const viewD = this.viewDate();
    const viewAth = this.moonService.getAthenianDate(viewD);
    return String(viewAth.year); // e.g. "701.1"
  });

  protected readonly showKykeonRecipe = signal(false);

  handleDescriptionClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Check if clicked element has the specific data attribute
    if (target.getAttribute('data-action') === 'toggle-kykeon') {
      this.showKykeonRecipe.update(v => !v);
    }
  }

  onMonthChange(delta: number) {
    // Navigate by Lunar Month (29.53 days) to respect Attic Calendar structure
    // If we used Gregorian Month, we would skip intercalary logic eventually or Desync.
    const current = this.viewDate();
    const msPerMonth = 29.53 * 24 * 60 * 60 * 1000;
    const newDate = new Date(current.getTime() + (delta * msPerMonth));
    this.viewDate.set(newDate);
    this.updateView();
  }

  selectDay(day: number) {
    // User clicked a day in the CURRENT VIEWED MONTH.
    // We need to construct the Date object for that day.
    // viewDate might be anywhere in the month.
    // We calculated startOfMonth in updateView but didn't save it as a signal for reuse logic? 
    // We have this.monthStartDate signal!
    const start = this.monthStartDate();
    // Start is Day 1.
    const targetDate = new Date(start);
    targetDate.setDate(start.getDate() + (day - 1));

    // Update Selection
    this.selectedDate.set(targetDate);

    // Reset recipe state on day change
    this.showKykeonRecipe.set(false);

    // View date usually stays same if we just clicked a day.
    this.updateView();
  }
}
