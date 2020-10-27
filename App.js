import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  Dimensions, Group
} from 'react-native';

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"

import {Appbar} from "react-native-paper"

import HomeScreen from "./screens/HomeScreen"
import SignInScreen from "./screens/SignInScreen"
import SplashScreen from './screens/SplashScreen';
import GroupDetails from './screens/GroupDetails';
import ClubsScreen from './screens/ClubsScreen';
import MessagesScreen from './screens/MessagesScreen';
import MessageDetailsScreen from './screens/MessageDetails';
import { AppBar } from '@material-ui/core';
import AccountScreen from './screens/AccountScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DefaultTheme.colors.primary
  },
  topBar: {
    backgroundColor: DefaultTheme.colors.primary
  }
})

const MainTabs = ({navigation}) => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
    //   tabBarIcon: ({ focused, color, size }) => {
    //     let iconName;

    //     if (route.name === 'Home') {
    //       iconName = focused
    //         ? 'add-circle-outline'
    //         : 'add-circle-outline';

    //         console.log(iconName)
    //     }

    //     // You can return any component that you like here!
    //     return <Icon name={iconName} size={size} color={color} />;
    //   },
    })}

        initialRouteName="Home"

        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'gray',
          style: {
            height: 0.1 * Dimensions.get("window").height,
            backgroundColor: "#343434",
            borderTopColor: "#333",
            borderTopWidth: 0.7
          },
          labelStyle: {
            fontSize: 15,
            flex: 0.6
          }
        }}
      >
        <Tab.Screen name="Home">
          {props => <HomeScreen navigation={navigation} {...props} />}  
        </Tab.Screen>
        <Tab.Screen name="Clubs">
          {props => <ClubsScreen navigation={navigation} {...props} />}  
        </Tab.Screen>
        <Tab.Screen name="Messages">
          {props => <MessagesScreen navigation={navigation} {...props} />}  
        </Tab.Screen>
    </Tab.Navigator>
  )
}

const App = ({ navigation }) => {
  return (
    // <View style={{flex: 1}}>
    //   <Appbar.Header style={styles.topBar}>
    //     <Appbar.BackAction onPress={() => {console.log("Back Pressed")}}/>
    //     <Appbar.Content title="Title" />
    //   </Appbar.Header>
    //   <Appbar style={styles.bottomBar}>
    //     <Appbar.Action icon="home" onPress={() => console.log("Pressed Home")} style={{flex: 1}}/>
    //     <Appbar.Action icon="plus-circle" onPress={() => console.log("Pressed Add New")} style={{flex: 1}}/>
    //     <Appbar.Action icon="account-group" onPress={() => console.log("Pressed Clubs")} style={{flex: 1}} badge="3"/>
    //     <Appbar.Action icon="message" onPress={() => console.log("Pressed Messages")} style={{flex: 1}} />
    //   </Appbar>
    // </View>


    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
      <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" >
          {props => <SplashScreen navigation={navigation} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Login" >
          {props => <SignInScreen navigation={navigation} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Main Screens">
          {props => <HomeScreen navigation={navigation} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Clubs">
          {props => <ClubsScreen navigation={navigation} {...props} />}  
        </Stack.Screen>
        <Stack.Screen name="Messages">
          {props => <MessagesScreen navigation={navigation} {...props} />}  
        </Stack.Screen>
        <Stack.Screen name="Account">
          {props => <AccountScreen navigation={navigation} {...props} />}  
        </Stack.Screen>

        <Stack.Screen name="Group Details" component={GroupDetails}/>
        <Stack.Screen name="Message Details" component={MessageDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
