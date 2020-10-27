/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider as PaperProvider} from "react-native-paper"
import { DefaultTheme } from '@react-navigation/native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "dodgerblue",
        accent: "#333"
    }
}

export default function Main() {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => App);
