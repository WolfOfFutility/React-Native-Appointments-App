import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image, 
  Dimensions,
  ImageBackground, 
  Pressable
} from 'react-native';

import Animated from 'react-native-reanimated';
import {Button} from "react-native-paper"

const SplashScreen = (props) => {
    return (
        <View style={styles.wrapper}>
            <ImageBackground source={{uri: "https://cdn.pixabay.com/photo/2020/10/04/15/31/mountains-5626734_960_720.jpg"}} style={styles.imageBackground}>
                <Text style={{top: 100, textAlign: "center", fontSize: 50, color: "white"}}>AlphaGig</Text>
                <Text style={{top: 120, textAlign: "center", fontSize: 30, color: "white"}}>Be on top of your schedule</Text>
                <Button 
                    mode="outlined" 
                    color={"white"}
                    style={{backgroundColor: "#333", width: 200, height: 50, position: "absolute", bottom: 110, left: (Dimensions.get("window").width - 200) / 2}} 
                    labelStyle={{lineHeight: 25, color: "white"}}
                    onPress={() => props.navigation.navigate("Login")}
                >Login</Button>
                <Button 
                    mode="outlined" 
                    color={"white"}
                    style={{backgroundColor: "#333", width: 200, height: 50, position: "absolute", bottom: 50, left: (Dimensions.get("window").width - 200) / 2}} 
                    labelStyle={{lineHeight: 25, color: "white"}}
                    onPress={() => {}}
                >Sign Up</Button>
                {/* <Image source={{uri: "https://cdn.pixabay.com/photo/2019/09/22/16/21/clock-4496464_960_720.png"}} style={styles.logoSection}/> */}
                {/* <View style={styles.bottomSection}>
                    <Text style={styles.bottomSectionText}>AlphaGig</Text>
                    <Text style={styles.bottomSectionText1}>Be at the top of your schedule game</Text>
                    <View style={styles.bottomSectionButtonGroup}>
                        <Pressable style={styles.bottomSectionButton} onPress={() => props.navigation.navigate("Login")}>
                            <Text style={styles.bottomSectionButtonText}>Login</Text>
                        </Pressable>
                        <Pressable style={styles.bottomSectionButton}>
                            <Text style={styles.bottomSectionButtonText}>Sign Up</Text>
                        </Pressable>
                    </View>
                    
                </View> */}

            </ImageBackground>
        </View>
    )
}

const styles=StyleSheet.create({
    wrapper: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
        position: "relative"
    },
    logoSection: {
        height: 300,
        width: 300,
        borderRadius: 1000,
        top: 50,
        left: (Dimensions.get("window").width - 300) / 2,
        borderWidth: 10,
        borderColor: "#FFF"
    },
    bottomSection: {
        flex: 1,
        backgroundColor: "#FFF",
        top: 100,
        borderRadius: 15,
        position: "relative"
    },
    bottomSectionText: {
        top: 20,
        left: 20,
        fontWeight: "bold",
        fontSize: 25
    },
    bottomSectionText1: {
        top: 25,
        left: 20,
        fontSize: 20
    },
    bottomSectionButtonGroup: {
        flex: 0.3,
        justifyContent: "flex-end",
        display: "flex",
        flexDirection: "row",
        width: Dimensions.get("window").width,
        top: 75
    },
    bottomSectionButton: {
        height: 0.1 * Dimensions.get("window").height,
        backgroundColor: "dodgerblue",
        flex: 1,
        margin: 20,
        borderRadius: 15
    },
    bottomSectionButtonText: {
        lineHeight: 0.1 * Dimensions.get("window").height,
        textAlign: "center",
        color: "white"
    }
})

export default SplashScreen