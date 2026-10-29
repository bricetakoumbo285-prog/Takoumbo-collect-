// Ajoute les permissions et le service GPS dans AndroidManifest.xml
const fs = require("fs");
const f = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(f, "utf8");

const perms = [
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.FOREGROUND_SERVICE_LOCATION",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.CAMERA"
];
let add = "";
perms.forEach(p => { if (!m.includes(p)) add += `    <uses-permission android:name="${p}" />\n`; });
if (!m.includes("android.hardware.camera")) add += `    <uses-feature android:name="android.hardware.camera" android:required="false" />\n`;
if (add) m = m.replace("<application", add + "    <application");

if (!m.includes("BackgroundGeolocationService")) {
  m = m.replace("</application>",
`        <service
            android:name="com.equimaps.capacitor_background_geolocation.BackgroundGeolocationService"
            android:enabled="true"
            android:exported="true"
            android:foregroundServiceType="location" />
    </application>`);
}
fs.writeFileSync(f, m);
console.log("AndroidManifest.xml mis à jour");
