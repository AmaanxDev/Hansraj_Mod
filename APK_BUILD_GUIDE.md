# SmartProf Hansraj - APK Build Guide

## Generate APK Version

To generate an APK file for the SmartProf Hansraj app, follow these steps:

### Step 1: Set Up Expo Account (One-time)
```bash
npx expo-cli login
# Enter your email and password (or create a new account at expo.dev)
```

### Step 2: Create APK Using EAS Build (Recommended - Cloud Build)

#### Option A: Using EAS Build (Fastest & Easiest)

1. **Initialize EAS in the project:**
   ```bash
   npm install -g eas-cli
   eas init
   ```

2. **Build the APK for Android:**
   ```bash
   eas build --platform android --non-interactive
   ```

3. **Select build type:**
   - Choose `APK` when prompted (not `AAB`)

4. **Download your APK:**
   - Once built, you'll receive a download link
   - The APK will be ready to install on any Android device

### Step 2: Generate APK Locally (Alternative)

If you prefer to build locally, you need:

**Requirements:**
- Java Development Kit (JDK 11 or higher)
- Android SDK
- Android NDK (optional)

**Steps:**

1. **Install development dependencies:**
   ```bash
   npm install -D expo-dev-client
   npm install -D @react-native-async-storage/async-storage
   ```

2. **Generate the native project:**
   ```bash
   npx expo prebuild --clean
   ```

3. **Build APK using Gradle:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **Find your APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Step 3: Installation on Device

1. **Transfer APK to Android device** via USB or cloud storage

2. **Enable Installation from Unknown Sources:**
   - Settings → Security → Unknown Sources (toggle on)

3. **Install the APK:**
   - Open file manager
   - Locate SmartProf Hansraj APK
   - Tap to install

### App Features in APK Version

- Student profile management
- Course attendance tracking
- Multiple course types (CLASS, TUTORIAL, PRACTICAL)
- Overall attendance calculation
- Color-coded course cards
- Supabase backend integration
- Secure data access with Row Level Security

### Troubleshooting

**Build fails with authentication error:**
- Ensure you're logged in: `eas whoami`
- Run: `eas login`

**Large APK size:**
- This is normal for React Native apps (typically 50-80MB)

**App crashes on older Android versions:**
- Update `minSdkVersion` in `app.json` to 21+

### App Requirements

- **Android Version:** Android 5.0 (API 21) and above
- **Storage:** ~80MB
- **Permissions Required:** Internet access

### Updating the APK

Simply follow the build steps again. Each build generates a new APK with the latest code changes.

---

**Note:** The free Expo tier includes 30 free builds per month. For unlimited builds, consider upgrading your Expo account.
