/**
 * HerHealth Symptom Tracker - Google Apps Script Template
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Set up the following columns in the first row:
 *    Date | Flow | Pain (1-10) | Mood | Energy | Notes | Sleep (hrs) | Exercise | Food Intake | Stress Level
 * 3. Go to Extensions > Apps Script.
 * 4. Paste this code into the editor.
 * 5. Save and Deploy as a Web App.
 * 6. Use the Web App URL to allow users to copy this sheet.
 */

function doGet(e) {
    return HtmlService.createHtmlOutput(`
    <html>
      <head>
        <style>
          body { font-family: 'Inter', sans-serif; text-align: center; padding: 50px; background-color: #fff5fa; color: #374151; }
          h1 { color: #e6007e; }
          .btn { 
            display: inline-block; 
            padding: 15px 30px; 
            background-color: #e6007e; 
            color: white; 
            text-decoration: none; 
            border-radius: 10px; 
            font-weight: bold; 
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(230, 0, 126, 0.2);
          }
          .btn:hover { background-color: #be006b; }
        </style>
      </head>
      <body>
        <h1>HerHealth Symptom Tracker</h1>
        <p>Click the button below to create your own private copy of the symptom tracker.</p>
        <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}/copy" target="_blank" class="btn">Create My Tracker</a>
      </body>
    </html>
  `);
}
