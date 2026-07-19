# Testimonial Apps Script Setup

Use a dedicated Apps Script deployment for testimonials. Do not reuse the contact Apps Script endpoint.

## Required sheet columns

Create a dedicated Google Sheet for testimonials with these columns:

1. Timestamp
2. Google User ID
3. Name
4. Email
5. Phone Number
6. Subject
7. Message
8. Rating
9. Uploaded File URL
10. Authentication Provider
11. Approval Status

Recommended default for the `Approval Status` column:

- `Pending`

## Apps Script webhook behavior

The Apps Script should:

1. Accept a POST payload from the Next.js route.
2. Require the fields needed for a trusted testimonial submission.
3. Validate the payload shape.
4. If a file is included, upload the document to Google Drive using a unique filename.
5. Save the Drive file URL into the sheet.
6. Add the row to the testimonial sheet with `Approval Status = Pending`.
7. Return JSON like:

```json
{ "ok": true }
```

## Deployment

Create a new standalone Apps Script project, paste the code below, and deploy it
as a Web App. Copy that distinct deployment URL into `TESTIMONIAL_WEBHOOK_URL`.
Do not use the contact form deployment.

## Example Apps Script code

```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");

    if (
      !payload.googleUserId ||
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.subject ||
      !payload.message ||
      !payload.rating
    ) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Missing required fields." }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Testimonials");
    const folderId = PropertiesService.getScriptProperties().getProperty(
      "TESTIMONIAL_DOCUMENT_FOLDER_ID",
    );

    let uploadedFileUrl = "";

    if (payload.fileBase64 && payload.fileName && payload.fileType) {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(payload.fileBase64),
        payload.fileType,
        payload.fileName,
      );
      const safeName = payload.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileName = `${Date.now()}_${Utilities.getUuid()}_${safeName}`;
      const folder = folderId
        ? DriveApp.getFolderById(folderId)
        : DriveApp.getRootFolder();
      const file = folder.createFile(blob.setName(fileName));
      uploadedFileUrl = file.getUrl();
    }

    const row = [
      new Date().toISOString(),
      payload.googleUserId,
      payload.name,
      payload.email,
      payload.phone,
      payload.subject,
      payload.message,
      payload.rating,
      uploadedFileUrl,
      payload.provider || "google",
      "Pending",
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Apps Script properties to define

Set the following script properties inside Apps Script:

- `TESTIMONIAL_DOCUMENT_FOLDER_ID`

This property should point to the Drive folder where uploaded reference documents are stored.

Keep this Drive configuration in Apps Script properties only; never add the
folder ID to Next.js environment variables.
