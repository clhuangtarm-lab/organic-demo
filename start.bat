@echo off
chcp 65001 >nul
echo.
echo ====================================
echo  有機農業數位行銷軟體 DEMO 啟動中...
echo ====================================
echo.

:: Check if node is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo [！] 尚未偵測到 Node.js
    echo.
    echo 請選擇安裝方式：
    echo   1. 自動安裝 ^(透過 winget^)
    echo   2. 手動前往 https://nodejs.org/ 下載安裝後再執行此腳本
    echo.
    set /p choice=請輸入 1 或 2：
    if "!choice!"=="1" (
        echo.
        echo 正在安裝 Node.js LTS...
        winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
        echo.
        echo Node.js 安裝完成，請重新執行此腳本！
        pause
        exit /b 0
    ) else (
        echo.
        echo 請前往 https://nodejs.org/ 安裝 Node.js LTS 版本後再執行此腳本。
        pause
        exit /b 0
    )
)

echo [OK] Node.js 已就緒：
node -v
npm -v
echo.

:: Install dependencies if needed
if not exist "node_modules" (
    echo [1/2] 安裝相依套件（首次需要約 30~60 秒）...
    npm install
    if errorlevel 1 (
        echo.
        echo [錯誤] npm install 失敗
        pause
        exit /b 1
    )
    echo 套件安裝完成！
    echo.
)

echo [2/2] 啟動開發伺服器...
echo.
echo ────────────────────────────────────
echo  瀏覽器請開啟：http://localhost:3000
echo  手機（同 WiFi）：http://^<你的IP^>:3000
echo ────────────────────────────────────
echo.
npm run dev

pause
