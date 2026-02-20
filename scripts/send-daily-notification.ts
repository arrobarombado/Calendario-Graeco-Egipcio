import { MoonPhaseService } from '../src/app/services/moon-phase.service';
import fetch from 'node-fetch';

const APP_ID = process.env.ONESIGNAL_APP_ID;
const API_KEY = process.env.ONESIGNAL_API_KEY;

if (!APP_ID || !API_KEY) {
    console.error("Missing OneSignal credentials in environment variables.");
    process.exit(1);
}

const service = new MoonPhaseService();
// We won't call requestUserLocation() to avoid DOM errors in Node JS.
// The default coordinates in the service (-15.78, -47.92 / Brasilia) are fine for this automated script.

const today = new Date();
const athenianDate = service.getAthenianDate(today);

const { day, monthName, monthGreek } = athenianDate;
const dedicationInfo = service.getDedication(day, 30, monthName, today); // Using 30 as a generic month length for info

// Default messages
let title = `Hoje é dia ${day} de ${monthName} (${monthGreek})`;
let subtitle = "Não temos festivais previstos para hoje.";

if (day === 1) {
    // Noumenia overrides the dedication slightly differently in some phases, but let's check dedicationInfo
    if (dedicationInfo && dedicationInfo.deity) {
        subtitle = `Hoje celebramos: ${dedicationInfo.deity}`;
    } else {
        subtitle = "Hoje é a Noumenia, dia de honrar os Deuses do Lar.";
    }
} else if (dedicationInfo) {
    // Note that getDedication sometimes returns HTML (like "<div class..."). We can strip simple tags for the notification
    let cleanDeity = dedicationInfo.deity.replace(/<[^>]*>?/gm, '');
    subtitle = `Hoje comemoramos: ${cleanDeity}`;

    // For specific cases like days 2, 3, 4 where it returns "O Xº dia é dedicado a..."
    if (cleanDeity.includes("dia é dedicado a")) {
        subtitle = cleanDeity;
    }
} else {
    // Check if it's Deipnon (this requires a bit more logic, but we can see if tomorrow is Noumenia)
    const nextEvent = service.getNextEventInfo(today);
    if (nextEvent.daysToDeipnon === 0) {
        subtitle = "Hoje é o Deipnon de Hécate. Momento de encerramento e purificação.";
    }
}

console.log("Calculated Notification:");
console.log("Title:", title);
console.log("Subtitle:", subtitle);

async function sendNotification() {
    const payload = {
        app_id: APP_ID,
        included_segments: ["Subscribed Users"],
        contents: { "en": subtitle, "pt": subtitle },
        headings: { "en": title, "pt": title },
        url: "https://arrobarombado.github.io/Calendario-Graeco-Egipcio/"
    };

    try {
        const response = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json() as any;
        console.log("Notification Response:", data);

        if (data.errors) {
            console.error("Errors in sending:", data.errors);
            process.exit(1);
        }
    } catch (err) {
        console.error("Failed to send notification:", err);
        process.exit(1);
    }
}

sendNotification();
