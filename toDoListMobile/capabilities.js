let capabilities;

// const android = {
//   platformName: 'Android',
//   'appium:platformVersion': '6.0',
//   'appium:deviceName': 'Nexus_5_API_23',
//   'appium:automationName': 'UiAutomator2',
//   // 'appium:app': './android/app/build/outputs/apk/release/app-release.apk',
// };

// const ios = {
//   platformName: 'iOS',
//   'appium:platformVersion': '17.2',
//   'appium:deviceName': 'iPhone 15',
//   'appium:automationName': 'XCUITest',
//   // 'appium:bundleId': 'org.reactjs.native.example.toDoListMobile',
//   // browserName: 'Safari',
//   // includeSafariInWebviews: true,
// };

// const android = {
//   platformName: 'Android',
//   'appium:platformVersion': '6.0',
//   'appium:deviceName': 'Nexus_5_API_23',
//   'appium:automationName': 'UiAutomator2',
//   // pwa
//   browserName: 'Browser',
//   'appium:chromedriverExecutable': '/Users/yuniya/Documents/university/НИР/3/to-do-list_mobile/toDoListMobile/chromedriver_mac32/chromedriver',
//   // mobile
// //   'appium:app': '/Users/yuniya/Documents/university/НИР/3/to-do-list_mobile/toDoListMobile/android/app/build/outputs/apk/release/app-release.apk',
// };
const android = {
  platformName: 'Android',
  'appium:platformVersion': '14',
  'appium:deviceName': 'Pixel_7_Android_14_',
  'appium:automationName': 'UiAutomator2',
  // pwa
  browserName: 'chrome',
  'appium:chromedriverExecutable': '/Users/yuniya/Documents/university/НИР/3/to-do-list_mobile/toDoListMobile/chromedriver-mac-arm64/chromedriver',
  // mobile
  // 'appium:app': '/Users/yuniya/Documents/university/НИР/3/to-do-list_mobile/toDoListMobile/android/app/build/outputs/apk/release/app-release.apk',
};

const ios = {
  platformName: 'iOS',
  'appium:platformVersion': '15.5',
  'appium:deviceName': 'iPhone 7',
  'appium:automationName': 'XCUITest',
  // pwa
  browserName: 'Safari',
  // mobile
  // 'appium:bundleId': 'org.reactjs.native.example.toDoListMobile',
};

const macos = {
  platformName: 'Mac',
  'appium:platformVersion': '14.4.1',
  // // pwa
  // 'appium:automationName': 'Safari',
  // browserName: 'Safari',
  // desktop
  'appium:automationName': 'Mac2',
  'appium:bundleId': 'org.reactjs.native.to-do-list-macos',
  'appium:appPath': '/Users/yuniya/Library/Developer/Xcode/DerivedData/to_do_list_macos-gvqmipxqhmztchdnyuqqgtzfleqc/Build/Products/Release/to_do_list_macos.app',
};

if (!process.env.E2E_DEVICE) {
  throw new Error('E2E_DEVICE environment variable is not defined');
}

if (!process.env.E2E_DEVICE.includes('android') && !process.env.E2E_DEVICE.includes('ios') && !process.env.E2E_DEVICE.includes('macos')) {
  throw new Error('No e2e device configuration found');
}

if (process.env.E2E_DEVICE === 'android') {
  capabilities = android;
} else if (process.env.E2E_DEVICE === 'ios') {
  capabilities = ios;
} else if (process.env.E2E_DEVICE === 'macos') {
  capabilities = macos;
}

export default capabilities;

