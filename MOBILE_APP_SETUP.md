# SmartProf Hansraj - Mobile App Setup & APK Generation

## Quick Start

### Option 1: Generate APK Using Expo Cloud Build (Recommended)

This is the easiest method - no local setup required!

#### Step 1: Create Expo Account
1. Go to [expo.dev](https://expo.dev)
2. Click "Sign Up" and create a free account
3. Verify your email

#### Step 2: Clone or Download the Project Files

Download the mobile app source code:
- File: `smartprof-mobile-app.tsx`
- This is your main app component

#### Step 3: Set Up Local Environment

```bash
# Install Node.js 16+ from nodejs.org

# Create a new Expo project
npx create-expo-app SmartProfHansraj

# Navigate to project
cd SmartProfHansraj

# Install dependencies
npm install @supabase/supabase-js @react-native-async-storage/async-storage expo-constants

# Install EAS CLI globally
npm install -g eas-cli

# Authenticate with Expo
eas login
# Enter your email and password
```

#### Step 4: Generate the APK

```bash
# Build for Android
eas build --platform android --non-interactive

# When prompted:
# - Choose "APK" (not AAB)
# - Select "Release" for production build
```

#### Step 5: Download Your APK

Once the build completes (5-15 minutes):
1. You'll receive a download link via email
2. Download the APK file (approximately 60-80MB)
3. Transfer to your Android device

---

### Option 2: Local Build (Advanced)

#### Requirements:
- Java Development Kit (JDK 11 or later)
- Android SDK
- 30GB+ storage space

#### Steps:

```bash
# 1. Install development tools
npm install -g eas-cli
eas login

# 2. Prebuild native project
npx expo prebuild --clean

# 3. Build APK
cd android
./gradlew assembleRelease
cd ..

# 4. Find APK at:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## Installation on Android Device

### Method 1: USB Transfer
1. Connect Android device via USB
2. Enable "File Transfer" mode on device
3. Copy APK to device storage
4. Open file manager on device
5. Tap APK file → Install

### Method 2: Google Drive / Cloud Storage
1. Upload APK to Google Drive
2. Open Drive on Android device
3. Download APK
4. Open Downloads folder
5. Tap APK → Install

### Method 3: Email
1. Email the APK to yourself
2. Open email on Android device
3. Download attachment
4. Tap to install

### First Launch

1. **Allow Installation:**
   - If prompted "Unknown Developer"
   - Tap "Install anyway"

2. **Grant Permissions:**
   - Internet access (required for backend)
   - Storage (optional)

3. **Enable Unknown Sources (if needed):**
   - Settings → Apps → Special app access → Install unknown apps
   - Enable for Chrome/File Manager

---

## Troubleshooting

### Build Fails: "Not authenticated"
```bash
eas logout
eas login
# Enter credentials again
```

### Build Fails: "Incompatible Node version"
```bash
# Upgrade Node.js
node --version  # Should be 16.13.0 or higher
# Download from nodejs.org if needed
```

### APK Installation Fails
- Check: Device has at least 100MB free storage
- Ensure: Android version is 5.0+ (API 21+)
- Try: Uninstall any older version first

### App Crashes on Launch
1. Ensure internet connection
2. Check device has location enabled (for backend connectivity)
3. Reinstall the app

---

## App Features

### Dashboard
- Welcome greeting with date
- Student achievement banner
- Navigation to Attendance & Profile

### Attendance View
- List of all enrolled courses
- Color-coded by class type:
  - Red (CLASS)
  - Orange (TUTORIAL)
  - Pink (PRACTICAL)
- Overall attendance percentage
- Scrollable course list

### Profile View
- Student name
- College roll number
- Email address

---

## Building Your Own APK

You can customize the app:

1. **Edit Student Data:**
   - Modify `mockStudent` in `smartprof-mobile-app.tsx`
   - Update courses list

2. **Change App Name:**
   - Edit `app.json` in project root

3. **Update Colors:**
   - Modify hex values in `styles.StyleSheet`

4. **Add Features:**
   - Implement Supabase auth
   - Add real-time attendance sync
   - Create notice notifications

Then rebuild APK using the same process.

---

## File Structure

```
SmartProfHansraj/
├── App.tsx (main app component)
├── app.json (app configuration)
├── package.json (dependencies)
├── eas.json (build config)
└── android/ (generated native files)
```

---

## Support & Documentation

- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **EAS Build:** https://docs.expo.dev/build/introduction
- **Supabase Docs:** https://supabase.com/docs

---

## APK Size Information

- **Typical Size:** 60-80MB
- **Compressed:** 15-25MB (in zip)
- **Minimum Storage:** 100MB on device
- **Download Time:** 5-15 minutes on average connection

---

## Version Information

- **SmartProf Hansraj Version:** 1.0.1
- **React Native Version:** Latest (via Expo)
- **Android Minimum:** API 21 (Android 5.0)
- **Android Target:** API 34 (Android 14)

---

## Next Steps

1. Follow the setup instructions above
2. Generate your first APK using Expo Cloud Build
3. Test on Android device
4. Share APK with others via Google Drive or email

Enjoy using SmartProf Hansraj!
