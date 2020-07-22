App.info({
  id: 'com.meteor.gerilife',
  name: 'Gerilife',
  version: '0.0.1',
});
App.setPreference('WebAppStartupTimeout', 30000);
App.appendToConfig(`
<edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
<application android:usesCleartextTraffic="true"></application>
</edit-config>
`);

App.accessRule('*', { type: 'navigation' });
