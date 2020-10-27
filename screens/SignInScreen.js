import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image, 
  Dimensions,
  ImageBackground, Pressable
} from 'react-native';

const address = "10.0.0.2:3000"

import {TextInput} from "react-native-paper"

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enteredUser: "",
            enteredPass: ""
        }
    }

    async userCheck() {
        await fetch("http://" + address + "/login?user=" + this.state.enteredUser + "&pass=" + this.state.enteredPass).then(response => response.json()).then(res => { 
            if(res != []) {
                this.props.navigation.navigate("Main Screens", {
                    user: res[0]["User"],
                    role: res[0]["Role"]
                })
            }
            else {
                console.log("login failed")
            }
        }).catch(e => {
            console.log(e)
        })
    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                <ImageBackground blurRadius={3} style={styles.backImage} source={{uri: "https://cdn.pixabay.com/photo/2020/10/04/15/31/mountains-5626734_960_720.jpg"}}>
                    <View style={styles.mainArea}>
                        <Text style={styles.loginTitle}>Login</Text>
                        <TextInput style={styles.customTextInput} label="Username" underlineColor="white" dense={true} onChangeText={(text) => this.setState({enteredUser: text})}/>
                        <TextInput style={styles.customTextInput} label="Password" underlineColor="white" onChangeText={(text) => this.setState({enteredPass: text})}/>
                        <Pressable style={styles.loginButton} onPress={() => this.userCheck()}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    backImage: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "#333",
        opacity: 1
    },
    filterView: {
        position: "absolute",
        backgroundColor: "#333",
        top: 0,
        left: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        opacity: 0.4
    },
    mainArea: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "transparent"
    },
    customTextInput: {
        height: 0.1 * Dimensions.get("window").height,
        width: Dimensions.get("window").width - 40,
        top: 30,
        marginTop: 20,
        left: 20,
        fontSize: 15,
        backgroundColor: "transparent",
        // color: "white",
        // backgroundColor: "#CCC"
    },
    loginTitle: {
        top: 70,
        fontSize: 20,
        left: 30,
        flex: 0.2,
        fontWeight: "bold",
        color: "white"
    },
    loginButton: {
        height: 0.08 * Dimensions.get("window").height,
        width:  Dimensions.get("window").width * 0.3,
        left: 0.35 * Dimensions.get("window").width,
        backgroundColor: "#009999",
        borderRadius: 15,
        top: 60
    },
    loginButtonText: {
        lineHeight: 0.08 * Dimensions.get("window").height,
        color: "white",
        textAlign: "center"
    }
})

export default SignInScreen;