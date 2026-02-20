import fetch from 'node-fetch';

const APP_ID = process.env.ONESIGNAL_APP_ID;
const API_KEY = process.env.ONESIGNAL_API_KEY;

if (!APP_ID || !API_KEY) {
    console.error("Missing OneSignal credentials in environment variables.");
    process.exit(1);
}

// Emulate simple Hellenic date reading from standard source or approximate
// Since we can't easily run the Angular bundled moon service in Node without a larger refactor,
// we will just construct a simple notification inviting the user to check the app for the exact date.
// A more robust implementation would duplicate the Olympiad JSON parsing logic here.
const title = "Calendário Graeco-Egípcio";
const message = "O pôr do sol anuncia o início de um novo dia helênico! Verifique os mistérios e deidades de hoje no aplicativo.";

async function sendNotification() {
    const payload = {
        app_id: APP_ID,
        included_segments: ["Subscribed Users"],
        contents: { "en": message, "pt": message },
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

        const data = await response.json();
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
