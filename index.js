import { AppRegistry } from "react-native"
import { name as appName } from "./app.json"

import App from "./app/app.tsx"
import React from "react"
// import widgetTaskHandler
import { widgetTask } from "./app/screens/widgetTask.tsx"
import { registerWidgetTaskHandler } from "react-native-android-widget"
// import RNBootSplash from 'react-native-bootsplash';

function IgniteApp() {
  // return <App hideSplashScreen={RNBootSplash.hide} />;
  return <App />
}

AppRegistry.registerComponent(appName, () => IgniteApp)
registerWidgetTaskHandler(widgetTask)
