let capabilities;

const android = {
  platformName: 'Android',
  'appium:platformVersion': '6.0',
  'appium:deviceName': 'Nexus_5_API_23',
  'appium:automationName': 'UiAutomator2',
  'appium:app': './android/app/build/outputs/apk/release/app-release.apk',
};

const ios = {
  platformName: 'iOS',
  'appium:platformVersion': '17.2',
  'appium:deviceName': 'iPhone 15',
  'appium:automationName': 'XCUITest',
  'appium:bundleId': 'org.reactjs.native.example.toDoListMobile',
};

if (!process.env.E2E_DEVICE) {
  throw new Error('E2E_DEVICE environment variable is not defined');
}

if (!process.env.E2E_DEVICE.includes('android') && !process.env.E2E_DEVICE.includes('ios')) {
  throw new Error('No e2e device configuration found');
}

if (process.env.E2E_DEVICE === 'android') {
  capabilities = android;
} else if (process.env.E2E_DEVICE === 'ios') {
  capabilities = ios;
}

export default capabilities;

