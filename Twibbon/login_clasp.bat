@echo off
title Login Google Apps Script (CLASP)
echo ========================================================
echo  LOGIN GOOGLE APPS SCRIPT (Cukup 1 Kali Saja)
echo ========================================================
echo.
echo Browser akan terbuka otomatis untuk memilih akun Google Anda.
echo Silakan klik "Allow" / "Izinkan" pada halaman browser.
echo.
set "PATH=C:\Users\LENOVO\AppData\Local\Programs\nodejs;%PATH%"
node "C:\Users\LENOVO\AppData\Local\Programs\nodejs\node_modules\@google\clasp\build\src\index.js" login
echo.
echo ========================================================
echo Selesai! Anda bisa menutup jendela ini sekarang.
echo ========================================================
pause
