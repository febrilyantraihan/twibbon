/**
 * ============================================================================
 * FTH STUDIO - ZERO-COST TWIBBON ENGINE BACKEND
 * Runtime: Google Apps Script (V8)
 * Database: Google Sheets ("FrameKu_Database")
 * File Storage: Google Drive Folder ("FTH_Twibbon_Frames")
 * Operational Cost: Rp 0,- / $0
 * ============================================================================
 * 
 * PANDUAN DEPLOYMENT (3 LANGKAH MUDAH):
 * 1. Buka Google Drive -> Buat Folder baru bernama "FTH_Twibbon_Frames".
 *    Salin FOLDER ID dari URL browser (contoh: 1A2b3C4d5E6f7G8h9I0jKLM).
 * 
 * 2. Buat Google Spreadsheet baru bernama "FrameKu_Database".
 *    Buat Sheet bernama "Campaigns" dengan header di baris 1:
 *    id | slug | title | description | drive_file_id | frame_url | status | downloads_count | created_at
 * 
 * 3. Di Spreadsheet, buka menu: Extensions > Apps Script.
 *    Tempel (Paste) seluruh kode di bawah ini, ganti DRIVE_FOLDER_ID dengan Folder ID Anda.
 *    Klik "Deploy" > "New deployment" > Pilih type "Web app".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    Salin URL Web App yang dihasilkan dan masukkan ke CONFIG.GAS_API_URL di app.js!
 * ============================================================================
 */

const CONFIG = {
  DRIVE_FOLDER_ID: "GANTI_DENGAN_FOLDER_ID_GOOGLE_DRIVE_ANDA",
  CAMPAIGNS_SHEET: "Campaigns"
};

/**
 * Handle GET Requests (Mengambil Data Kampanye)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Ambil 1 Kampanye Berdasarkan Slug (?action=getCampaign&slug=milad-santri)
    if (action === "getCampaign") {
      const slug = e.parameter.slug;
      if (!slug) return createResponse({ status: "error", message: "Slug is required" });

      const sheet = ss.getSheetByName(CONFIG.CAMPAIGNS_SHEET);
      if (!sheet) return createResponse({ status: "error", message: "Sheet not found" });

      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === slug && data[i][6] === "ACTIVE") {
          const campaign = {
            id: data[i][0],
            slug: data[i][1],
            title: data[i][2],
            description: data[i][3],
            driveFileId: data[i][4],
            frameUrl: data[i][5],
            status: data[i][6],
            downloads: Number(data[i][7]) || 0,
            createdAt: data[i][8]
          };
          return createResponse({ status: "success", data: campaign });
        }
      }
      return createResponse({ status: "error", message: "Campaign not found or inactive" });
    }

    // 2. Ambil Semua Kampanye Aktif (?action=listCampaigns)
    if (action === "listCampaigns") {
      const sheet = ss.getSheetByName(CONFIG.CAMPAIGNS_SHEET);
      if (!sheet) return createResponse({ status: "error", message: "Sheet not found" });

      const data = sheet.getDataRange().getValues();
      const list = [];
      for (let i = 1; i < data.length; i++) {
        if (data[i][6] === "ACTIVE") {
          list.push({
            id: data[i][0],
            slug: data[i][1],
            title: data[i][2],
            description: data[i][3],
            frameUrl: data[i][5],
            downloads: Number(data[i][7]) || 0
          });
        }
      }
      return createResponse({ status: "success", data: list });
    }

    // 3. Default Health Check jika dibuka langsung di browser tanpa parameter
    if (!action) {
      return createResponse({
        status: "success",
        message: "FTH Twibbon Studio API Backend is ONLINE!",
        endpoints: {
          listCampaigns: "?action=listCampaigns",
          getCampaign: "?action=getCampaign&slug=nama-slug"
        }
      });
    }

    return createResponse({ status: "error", message: "Invalid action: " + action });
  } catch (error) {
    return createResponse({ status: "error", message: error.toString() });
  }
}

/**
 * Handle POST Requests (Upload Frame ke Drive & Increment Download Counter)
 */
function doPost(e) {
  try {
    let postData;
    if (e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else {
      postData = e.parameter;
    }

    const action = postData.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Tambah Angka Unduhan (+1) secara Asynchronous
    if (action === "incrementDownload") {
      const slug = postData.slug;
      const sheet = ss.getSheetByName(CONFIG.CAMPAIGNS_SHEET);
      const data = sheet.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === slug) {
          const currentCount = Number(data[i][7]) || 0;
          sheet.getRange(i + 1, 8).setValue(currentCount + 1);
          return createResponse({ status: "success", slug: slug, newCount: currentCount + 1 });
        }
      }
      return createResponse({ status: "error", message: "Slug not found" });
    }

    // 2. Buat Kampanye Baru: Upload File PNG ke Google Drive & Simpan Metadata ke Sheet
    if (action === "createCampaign") {
      const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
      const base64Data = postData.imageBase64.replace(/^data:image\/png;base64,/, "");
      const decodedBytes = Utilities.base64Decode(base64Data);
      
      const fileName = "frame-" + postData.slug + "-" + new Date().getTime() + ".png";
      const blob = Utilities.newBlob(decodedBytes, "image/png", fileName);
      const file = folder.createFile(blob);

      // Set file permission to public view
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      const fileId = file.getId();
      // High-speed Google CDN direct link
      const directFrameUrl = "https://lh3.googleusercontent.com/d/" + fileId + "=s1080";

      // Append row to Google Sheet
      const sheet = ss.getSheetByName(CONFIG.CAMPAIGNS_SHEET);
      const newId = "cmp-" + new Date().getTime();
      const nowIso = new Date().toISOString();

      sheet.appendRow([
        newId,
        postData.slug,
        postData.title,
        postData.description || "",
        fileId,
        directFrameUrl,
        "ACTIVE",
        0,
        nowIso
      ]);

      return createResponse({
        status: "success",
        id: newId,
        slug: postData.slug,
        frameUrl: directFrameUrl
      });
    }

    return createResponse({ status: "error", message: "Action not recognized" });
  } catch (error) {
    return createResponse({ status: "error", message: error.toString() });
  }
}

/**
 * Format JSON Response with CORS Header
 */
function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
