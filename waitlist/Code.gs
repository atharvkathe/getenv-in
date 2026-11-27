/**
 * getenv.in kit waitlist → Google Sheet (Apps Script web app).
 *
 * Paste this file into the Apps Script editor of the waitlist spreadsheet
 * (Extensions → Apps Script), then deploy it as a web app. Full steps: waitlist/README.md
 *
 * The site POSTs a JSON body as text/plain (a "simple" request, because Apps Script
 * cannot answer CORS preflight requests):  { "email": "...", "kit": "<kit slug>", "website": "" }
 * `website` is a honeypot field that real visitors never fill in.
 *
 * Response: { ok: true } | { ok: true, duplicate: true } | { ok: false, error: "<code>" }
 * Stores only: timestamp (UTC), email, kit slug.
 */

var SHEET_NAME = 'Waitlist';
var HEADERS = ['Timestamp (UTC)', 'Email', 'Kit'];
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var KIT_RE = /^[a-z0-9-]{1,60}$/;

function doPost(e) {
  try {
    var body = (e && e.postData && e.postData.contents) || '{}';
    if (body.length > 2000) return json_({ ok: false, error: 'too_large' });
    var data = JSON.parse(body);

    // Honeypot: bots fill every field. Pretend success so they don't retry.
    if (data.website) return json_({ ok: true });

    var email = String(data.email || '').trim().toLowerCase();
    var kit = String(data.kit || '').trim();
    if (email.length > 254 || !EMAIL_RE.test(email)) return json_({ ok: false, error: 'invalid_email' });
    if (!KIT_RE.test(kit)) return json_({ ok: false, error: 'invalid_kit' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet_();
      var last = sheet.getLastRow();
      if (last > 1) {
        var rows = sheet.getRange(2, 2, last - 1, 2).getValues();
        for (var i = 0; i < rows.length; i++) {
          if (String(rows[i][0]).replace(/^'/, '').toLowerCase() === email && rows[i][1] === kit) {
            return json_({ ok: true, duplicate: true });
          }
        }
      }
      sheet.appendRow([new Date().toISOString(), safeCell_(email), kit]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  }
}

/** Health check: open the web app URL in a browser to confirm the deployment works. */
function doGet() {
  return json_({ ok: true, service: 'getenv-waitlist' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Stop values like "=HYPERLINK(...)@x.co" from being evaluated as spreadsheet formulas. */
function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
