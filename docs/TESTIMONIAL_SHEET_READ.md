# Show testimonials live from the Google Sheet

The site reads **approved** testimonials from your "Portfolio Testimonials" sheet
through the Apps Script web app. You add a `doGet` function next to your existing
`doPost`, redeploy, and the site fetches it automatically (cached ~60s).

Only rows where **Approval Status = `Approved`** are shown, and only public-safe
fields are returned (name, subject, message, rating, date, file link) — never
email, phone, or Google User ID.

## 1. Add this to your Apps Script (keep your existing `doPost`)

Open **Extensions → Apps Script**, paste the following below your `doPost`, then
**Save**:

```javascript
function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Portfolio Testimonials") || ss.getSheets()[0];
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return json([]);

  var header = values[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });
  function col(name) {
    return header.indexOf(name);
  }

  var iName = col("name");
  var iSubject = col("subject");
  var iMessage = col("message");
  var iRating = col("rating");
  var iTime = col("timestamp");
  var iFile = col("uploaded file url");
  var iStatus = col("approval status");

  var out = [];
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var status = iStatus > -1 ? String(row[iStatus]).trim().toLowerCase() : "approved";
    if (status !== "approved") continue;

    var name = iName > -1 ? String(row[iName]).trim() : "";
    var message = iMessage > -1 ? String(row[iMessage]).trim() : "";
    if (!name || !message) continue;

    var ts = iTime > -1 ? row[iTime] : "";
    var createdAt =
      ts instanceof Date
        ? Utilities.formatDate(ts, Session.getScriptTimeZone(), "MMMM d, yyyy")
        : String(ts);

    out.push({
      id: makeId(name, ts, message),
      name: name,
      subject: iSubject > -1 ? String(row[iSubject]).trim() : "",
      message: message,
      rating: iRating > -1 ? Number(row[iRating]) || 5 : 5,
      createdAt: createdAt,
      referenceDocumentUrl: iFile > -1 ? String(row[iFile]).trim() : "",
    });
  }
  return json(out);
}

function makeId(name, ts, message) {
  var slug = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.MD5,
    String(ts) + "|" + String(message),
  );
  var hex = digest
    .map(function (b) {
      return ("0" + (b & 0xff).toString(16)).slice(-2);
    })
    .join("")
    .slice(0, 6);
  return (slug || "testimonial") + "-" + hex;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## 2. Redeploy (this is what publishes the change)

**Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.**
(Saving alone does not update the live web app.)

## 3. Verify

Open your web-app `/exec` URL directly in a browser — you should now see a JSON
array of the approved rows (or `[]` if none are approved yet).

## Notes

- To publish a testimonial: set its **Approval Status** cell to `Approved`.
  To hide one: change it to anything else (or delete the row).
- For an uploaded reference file to open for visitors, its Google Drive file must
  be shared **"Anyone with the link"**. If your `doPost` upload code doesn't set
  that, open the file in Drive and share it, or add
  `file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)`
  in the upload step.
- No environment variable changes are needed — the site reads from the same
  `TESTIMONIAL_WEBHOOK_URL` it already uses for submissions.
