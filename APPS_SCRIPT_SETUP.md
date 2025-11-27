# HerHealth Symptom Tracker - Setup Instructions

To enable the "Create My Symptom Tracker" feature, you need to host a simple Google Apps Script.

## Step 1: Create the Template Sheet (OPTIONAL)
*Note: A template has already been created for you with ID: `1PQ8Vru4f9BQ_sjmFGIGfVo0lwUkhDKxM4znKZcICsTY`. You can skip this step if you want to use the provided template. If you want to use your own, create a sheet and get its ID.*

## Step 2: Add the Script
1. Go to [script.google.com](https://script.google.com/) and create a **New Project**.
2. Delete any code there and paste the following **EXACT** code:

```javascript
// APPS_SCRIPT: paste entire file and redeploy as NEW VERSION
const TEMPLATE_ID = '1PQ8Vru4f9BQ_sjmFGIGfVo0lwUkhDKxM4znKZcICsTY';

/**
 * Handle GET requests (Browser Test)
 * Visit the URL in your browser to verify deployment.
 */
function doGet(e) {
  return jsonResponse({ 
    status: "success", 
    message: "✅ App is running! Deployment is correct." 
  }, 200);
}

/**
 * Handle POST requests (create a copy of template and share with user)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait for up to 10 seconds for other processes to finish
  if (!lock.tryLock(10000)) {
    return jsonResponse({ status: "error", error: "Server is busy, please try again." }, 503);
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", error: "No postData received" }, 400);
    }

    var payloadText = e.postData.contents;
    var data;
    try {
      data = JSON.parse(payloadText);
    } catch (err) {
      return jsonResponse({ status: "error", error: "Invalid JSON payload: " + err.toString() }, 400);
    }

    var userEmail = data.email;
    if (!userEmail) {
      return jsonResponse({ status: "error", error: "Email is required" }, 400);
    }

    var templateFile = DriveApp.getFileById(TEMPLATE_ID);
    var newFile = templateFile.makeCopy("HerHealth Tracker - " + userEmail, DriveApp.getRootFolder());

    var ss = SpreadsheetApp.openById(newFile.getId());
    ss.addEditor(userEmail);

    return jsonResponse({ status: "success", url: ss.getUrl() }, 200);

  } catch (err) {
    return jsonResponse({ status: "error", error: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * OPTIONS preflight response
 */
function doOptions(e) {
  return jsonResponse({ status: "success" }, 200);
}

/**
 * Helper: returns a ContentService output with JSON and CORS headers
 */
function jsonResponse(obj, statusCode) {
  var out = (typeof obj === 'string') ? obj : JSON.stringify(obj);
  return ContentService.createTextOutput(out)
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```

## Step 3: Deploy (CRITICAL STEP)
1. Click **Deploy** -> **Manage Deployments**.
2. Click the **Edit** (pencil) icon.
3. **Version**: Select **New version** (Do not leave it on the old version).
4. **Execute as**: **Me** (your email).
5. **Who has access**: **Anyone**. (This is REQUIRED).
   *   *If you do not set this to "Anyone", you will get a 401 Unauthorized error.*
6. Click **Deploy**.
7. Copy the **Web App URL** (ending in `/exec`).

## Step 4: Verify Deployment (NEW)
**Before** updating your React app, verify the URL works:
1. Paste the Web App URL into your browser address bar.
2. You should see a JSON response: `{"status":"success","message":"✅ App is running!..."}`
3. If you see a Google Login screen, **your permissions are wrong**. Go back to Step 3 and set "Who has access" to "Anyone".

## Step 5: Connect to React
1. Open the `.env` file in your project root.
2. Update the URL:
   `VITE_SHEET_API_URL="https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec"`
3. **Restart your dev server**:
   Run `npm run dev` in your terminal. (Vite does not pick up .env changes automatically without a restart).
