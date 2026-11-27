/**
 * Runs waitlist/Code.gs in Node with an in-memory fake of the Apps Script services
 * (SpreadsheetApp, LockService, ContentService). Used by scripts/test-waitlist.js and
 * by the dev server's mock endpoint (MOCK_WAITLIST=1), so the real script logic is tested.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function createWaitlistScript({ quiet = false } = {}) {
  const sheets = {};
  const makeSheet = () => {
    const rows = [];
    return {
      rows,
      getLastRow: () => rows.length,
      appendRow: r => { rows.push(r.slice()); },
      setFrozenRows: () => {},
      getRange: (row, col, numRows, numCols) => ({
        getValues: () => rows.slice(row - 1, row - 1 + numRows).map(r => r.slice(col - 1, col - 1 + numCols))
      })
    };
  };
  const spreadsheet = {
    getSheetByName: name => sheets[name] || null,
    insertSheet: name => (sheets[name] = makeSheet())
  };
  const context = {
    console: quiet ? { log() {}, error() {}, warn() {} } : console,
    SpreadsheetApp: { getActiveSpreadsheet: () => spreadsheet },
    LockService: { getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} }) },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: content => ({ content, setMimeType() { return this; } })
    }
  };
  const code = fs.readFileSync(path.join(__dirname, '..', 'waitlist', 'Code.gs'), 'utf8');
  vm.runInNewContext(code, context, { filename: 'Code.gs' });

  return {
    post(body) {
      const out = context.doPost({ postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } });
      return JSON.parse(out.content);
    },
    get() { return JSON.parse(context.doGet().content); },
    // JSON round-trip: arrays created inside the vm sandbox belong to another realm.
    rows: () => JSON.parse(JSON.stringify(sheets.Waitlist ? sheets.Waitlist.rows : []))
  };
}

module.exports = { createWaitlistScript };
