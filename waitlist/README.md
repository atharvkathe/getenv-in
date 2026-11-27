# Waitlist → Google Sheets (Apps Script)

The kit waitlist form posts to a Google Apps Script web app, which appends rows to a Google Sheet.
It's free and uses your own Google account. No new service or account is needed.

Each row stores only: `Timestamp (UTC) | Email | Kit`.

## One-time setup (about 5 minutes)

1. **Create the sheet.** In Google Sheets, create a blank spreadsheet, e.g. `getenv waitlist`.
   The script creates a `Waitlist` tab with headers on the first signup.
2. **Add the script.** In the sheet, open **Extensions → Apps Script**. Delete what's in `Code.gs`,
   paste the contents of [`Code.gs`](Code.gs), and click **Save**.
3. **Deploy.** Click **Deploy → New deployment**, choose the type **Web app** (gear icon), then set:
   - Description: `getenv waitlist`
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and authorize. Google shows "Google hasn't verified this app" because it's your own
   script: choose **Advanced → Go to (project name)** → **Allow**.
4. **Copy the Web app URL.** It looks like `https://script.google.com/macros/s/AKfy.../exec`.
5. **Check it works.** Open that URL in a browser. You should see `{"ok":true,"service":"getenv-waitlist"}`.
6. **Connect the site.** In `kits-data.js`, set:
   ```js
   waitlistEndpoint: 'https://script.google.com/macros/s/AKfy.../exec'
   ```
   `vercel.json` already allows `script.google.com` and `script.googleusercontent.com` in `connect-src`.
7. **Test a live signup** on a kit page with the Waitlist status (e.g. `/kits/dpdp-ready-app`) and check the
   new row in the sheet. Delete the test row afterwards.

Optional quick test from PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri "https://script.google.com/macros/s/AKfy.../exec" -Body '{"email":"you@example.com","kit":"dpdp-ready-app"}'
```

## Updating the script later

Edit `Code.gs` in this repo, paste it into the Apps Script editor, then **Deploy → Manage deployments →
(pencil) Edit → Version: New version → Deploy**. This keeps the **same URL**. Creating a *new deployment*
instead gives a new URL that you'd have to paste into `kits-data.js` again.

## How it behaves

| Case | Response | Stored? |
|---|---|---|
| Valid email + kit | `{ ok: true }` | Yes |
| Same email + same kit again | `{ ok: true, duplicate: true }` | No |
| Invalid email | `{ ok: false, error: "invalid_email" }` | No |
| Honeypot field filled (bots) | `{ ok: true }` | No |
| Email starting with `=`, `+`, `-`, `@` | stored with a leading `'` so Sheets doesn't run it as a formula | Yes |

The site sends the body as `text/plain` on purpose: Apps Script web apps can't answer CORS preflight
requests, so a `Content-Type: application/json` request would fail in the browser.

## Testing locally (no Google account needed)

```powershell
node scripts/test-waitlist.js                       # unit tests: Code.gs run against a fake sheet
$env:MOCK_WAITLIST=1; node scripts/dev-server.js     # dev server with /__mock/waitlist running Code.gs
# in another terminal:
$env:FLOW_WAITLIST=1; node scripts/check-pages.js http://localhost:3000 .tmp/shots /
```

## Privacy

The endpoint URL is public (it's in the site's JavaScript), which is normal for Apps Script web apps.
Only you can read the sheet. The script runs as you, but it can only append rows to this sheet.
