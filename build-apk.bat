@echo off
echo ====================================
echo SmartProf APK Builder
echo ====================================
echo.

REM Step 1: Build the web assets
echo [1/4] Building web application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Web build failed!
    pause
    exit /b 1
)
echo Web build complete!
echo.

REM Step 2: Sync to Capacitor Android
echo [2/4] Syncing to Android project...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ERROR: Capacitor sync failed!
    pause
    exit /b 1
)
echo Sync complete!
echo.

REM Step 3: Check for Android Studio SDK
echo [3/4] Checking Android SDK...
if not exist "%LOCALAPPDATA%\Android\Sdk\platforms" (
    echo.
    echo ====================================
    echo ANDROID SDK NOT FOUND!
    echo ====================================
    echo.
    echo Please install Android Studio and SDK:
    echo 1. Open Android Studio
    echo 2. Go to: Tools ^> SDK Manager
    echo 3. Install: Android SDK Platform 34 and Android SDK Build-Tools
    echo 4. Restart this script
    echo.
    echo Alternative: Use online build service
    echo Run: npx eas-cli build --platform android --profile preview
    echo.
    pause
    exit /b 1
)
echo Android SDK found!
echo.

REM Step 4: Build APK
echo [4/4] Building APK (this may take 5-10 minutes)...
cd android
call gradlew.bat assembleDebug
cd ..

if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo.
    echo ====================================
    echo SUCCESS! APK BUILT!
    echo ====================================
    echo.
    echo APK Location: android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Transfer this file to your Android phone and install it.
    echo.
) else (
    echo.
    echo ====================================
    echo BUILD FAILED!
    echo ====================================
    echo.
    echo Try using EAS Build cloud service instead:
    echo   npx eas-cli build --platform android --profile preview
    echo.
)

pause
