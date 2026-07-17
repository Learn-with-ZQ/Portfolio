# Contact form → Google Sheet setup (≈5 minutes)

Submissions flow like this:

```
Visitor → /api/contact (Next.js, validation + spam honeypot) → Google Apps Script → your Google Sheet
```

No app-specific password, API key, or Google Cloud project is needed. The Apps
Script runs under your own Google account and is the only thing with access to
the sheet.

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) and name the spreadsheet e.g. **Portfolio Contact Responses**.
2. In row 1 add these headers:

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Timestamp | Name | Email | Phone | Subject | Message |

## 2. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Delete any code in the editor and paste:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.subject || "",
      data.message || "",
    ]);

    // Optional: email yourself a notification for every submission.
    // Remove the /* */ to enable — no app password needed, it sends as you.
    /*
    MailApp.sendEmail({
      to: "zaidqasim1234@gmail.com",
      subject: "Portfolio contact: " + (data.subject || data.name),
      body:
        "Name: " + data.name + "\n" +
        "Email: " + data.email + "\n" +
        "Phone: " + (data.phone || "—") + "\n\n" +
        data.message,
    });
    */

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click the **Save** icon.

## 3. Deploy as a Web App

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Set:
   - **Execute as:** `Me (your account)`
   - **Who has access:** `Anyone` — required so the website's server can POST
     to it. The URL is a long unguessable token and is kept server-side; only
     the appendRow above ever runs.
4. Click **Deploy**, authorize the permissions prompt, and copy the
   **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb…/exec`).

## 4. Configure the site

Locally, create `.env.local` in the project root:

```
CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb…/exec
```

On Vercel (or any host): add the same `CONTACT_WEBHOOK_URL` environment
variable in the project settings, then redeploy.

## 5. Test

Submit the form at `/contact` — a new row should appear in the sheet within a
second or two. Until the env var is set, the form shows a friendly error and
falls back to suggesting your email address.

## Updating the script later

If you edit the Apps Script code, use **Deploy → Manage deployments → ✏️ Edit →
Version: New version → Deploy** — otherwise the old code keeps running. The URL
stays the same.
