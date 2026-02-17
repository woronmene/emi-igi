# Newsletter signups → Google Sheet

Newsletter form submissions are sent to a Google Sheet via a small Google Apps Script. No backend database needed.

## One-time setup

### 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet (e.g. “ÈMÍ-ÌGI Newsletter”).
2. In the first row, add headers, for example:
   - **A1:** `Email`
   - **B1:** `Date`

### 2. Add the script

1. In the sheet menu: **Extensions** → **Apps Script**.
2. Replace the default code with this:

```javascript
function doGet() {
  return createResponse(200, {
    message:
      'Newsletter script is running. Use POST with { email: "..." } to add signups.',
  });
}

function doPost(e) {
  try {
    var body =
      e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    var email = (body.email || "").toString().trim();
    if (!email) {
      return createResponse(400, { error: "Missing email" });
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([email, new Date()]);
    return createResponse(200, { success: true });
  } catch (err) {
    return createResponse(500, { error: String(err.message) });
  }
}

function createResponse(code, obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

3. Click **Save** (disk icon). Name the project if prompted.

### 3. Deploy as web app

1. Click **Deploy** → **New deployment**.
2. Click the gear icon next to “Select type”, choose **Web app**.
3. Set:
   - **Description:** e.g. “Newsletter signup”
   - **Execute as:** **Me** (your Google account)
   - **Who has access:** **Anyone** (so the site can send requests)
4. Click **Deploy**. Authorize the app when asked (choose your Google account and allow access).
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

### 4. Add the URL to the project

1. In the project root, open `.env.local` (create it from `.env.local.example` if needed).
2. Add:

```
NEWSLETTER_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Use the exact URL you copied (it must end with `/exec`).

3. Restart the dev server so the new env var is picked up.

### 5. Authorize the script (fixes 502 on first use)

1. **Open the Web app URL once in your browser** (the same URL you put in `.env.local`), while logged in with the Google account that owns the sheet.
2. If Google shows an “Authorization” or “Access denied” screen, click **Continue** / **Allow** so the script can run as you.
3. You should see a short JSON message like `{"message":"Newsletter script is running..."}` — that’s normal. After this, the newsletter form should work.

After this, when someone submits the newsletter form, their email and the current date are appended to your sheet. The script URL stays on the server and is not exposed to the browser.
