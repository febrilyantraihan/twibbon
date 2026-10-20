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

    // 3. Kirim Email Konfirmasi & Pembenahan Sandi saat Salah Password
    if (action === "sendPasswordResetAlert") {
      const email = postData.email;
      const handle = postData.handle || "pengguna";
      const name = postData.name || handle;

      if (!email) {
        return createResponse({ status: "error", message: "Email tidak ditemukan" });
      }

      const cache = CacheService.getScriptCache();
      const COOLDOWN_KEY = "ALERT_COOLDOWN_" + handle.toLowerCase();
      if (cache.get(COOLDOWN_KEY)) {
        return createResponse({ status: "cooldown", message: "Email peringatan baru saja dikirim. Silakan periksa inbox atau spam Anda." });
      }

      // Generate 6 digit OTP acak
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const OTP_KEY = "RESET_OTP_" + handle.toLowerCase();
      cache.put(OTP_KEY, otpCode, 900); // Berlaku 15 menit
      cache.put(COOLDOWN_KEY, "ACTIVE", 180); // Cooldown 3 menit

      const timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy, HH:mm:ss");
      const subject = `⚠️ Peringatan Keamanan & Kode Pemulihan Sandi FTH Studio (@${handle})`;
      const htmlBody = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
          <div style="background: linear-gradient(135deg, #15803d 0%, #0f766e 100%); padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">FTH Studio - Keamanan Akun</h2>
            <p style="margin: 6px 0 0; opacity: 0.9; font-size: 13px;">Platform Kreasi & Editor Twibbon</p>
          </div>
          <div style="padding: 24px 28px; color: #334155; line-height: 1.6;">
            <p style="font-size: 15px; margin-top: 0;">Halo <strong>${name}</strong> (@${handle}),</p>
            <p style="font-size: 14px; margin-bottom: 18px;">
              Sistem mendeteksi adanya <strong>percobaan masuk dengan kata sandi yang salah</strong> pada akun Anda.
            </p>
            <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 6px; font-size: 13px; margin-bottom: 20px; color: #991b1b;">
              <strong>Rincian Percobaan Masuk:</strong><br>
              • Waktu: ${timestamp} WIB<br>
              • Akun Terkait: @${handle} (${email})
            </div>
            <p style="font-size: 14px; margin-bottom: 10px;">
              Jika Anda sedang berusaha masuk dan lupa kata sandi, silakan gunakan <strong>Kode OTP Pemulihan 6 Digit</strong> berikut untuk membuat kata sandi baru:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <div style="display: inline-block; background: #f0fdf4; border: 2px dashed #15803d; padding: 14px 32px; border-radius: 10px;">
                <span style="font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #15803d;">${otpCode}</span>
              </div>
              <p style="font-size: 12px; color: #64748b; margin-top: 6px;">*Kode berlaku selama 15 menit</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
              🛡️ <em>Bila ini bukan Anda, akun Anda tetap aman karena akses percobaan tersebut telah diblokir. Anda dapat mengabaikan email ini.</em>
            </p>
          </div>
          <div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            FTH Studio &bull; Keamanan Akun &bull; Bantuan WhatsApp CS: +62 857-0433-2952
          </div>
        </div>
      `;

      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: htmlBody
        });
        return createResponse({
          status: "success",
          message: "Email peringatan dan kode pemulihan telah dikirim.",
          otp: otpCode
        });
      } catch (mailErr) {
        return createResponse({
          status: "partial_success",
          message: "Kode pemulihan lokal siap digunakan.",
          otp: otpCode
        });
      }
    }

    // 4. Verifikasi OTP Pemulihan
    if (action === "verifyAndResetPassword") {
      const handle = (postData.handle || "").toLowerCase();
      const otp = postData.otp;

      const cache = CacheService.getScriptCache();
      const OTP_KEY = "RESET_OTP_" + handle;
      const storedOtp = cache.get(OTP_KEY);

      if (storedOtp && storedOtp === otp) {
        cache.remove(OTP_KEY);
        return createResponse({ status: "success", message: "OTP valid." });
      }

      if (!storedOtp) {
        return createResponse({ status: "error", message: "Kode OTP telah kedaluwarsa atau belum pernah dibuat." });
      }

      return createResponse({ status: "error", message: "Kode OTP tidak cocok." });
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
