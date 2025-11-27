// src/utils/createTrackerSheet.js
export async function createTrackerSheet(email) {
    // Use the Netlify function proxy to avoid CORS
    const apiUrl = "/.netlify/functions/createTracker";

    try {
        // We use "Content-Type": "text/plain" to avoid a CORS Preflight (OPTIONS) request.
        // This is a "Simple Request". The body is still valid JSON.
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({ email })
        });

        // Check for HTTP errors (like 401 Unauthorized or 403 Forbidden)
        // Check for HTTP errors
        if (!res.ok) {
            const errorText = await res.text();
            let errorMsg = `Server returned HTTP ${res.status}`;
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.error) errorMsg = errorJson.error;
            } catch (e) {
                // If not JSON, use a snippet of the text
                if (errorText) errorMsg += `: ${errorText.slice(0, 100)}`;
            }
            throw new Error(errorMsg);
        }

        const text = await res.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Response is not JSON:", text);
            // If we get HTML back, it's usually an error page from Google
            if (text.includes("<!DOCTYPE html>")) {
                throw new Error("Received HTML instead of JSON. The script URL might be wrong or the script crashed.");
            }
            throw new Error("Invalid response from server.");
        }

        if (data.status === "error" || data.error) {
            throw new Error(data.error || "Unknown error from Apps Script");
        }

        return data.url;
    } catch (error) {
        console.error("Error creating sheet:", error);
        // Re-throw so the UI can display it
        throw error;
    }
}
