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
  ImageBackground, Pressable, Group
} from 'react-native';
import Animated from 'react-native-reanimated';

const address = "10.0.0.2:3000"

import {Appbar} from "react-native-paper"

class ClubsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.route.params.user,
            role: this.props.route.params.role,
            userClubs: []
        }

        this.loadUserClubs();

    }

    async loadUserClubs() {
        await fetch("http://" + address + "/getUserClubs?user=" + this.state.user).then(response => response.json()).then(res => {
            this.setState({userClubs: res})
        })
    }

    renderUserClubs() {
        return this.state.userClubs.map((club) => {
            return (
                <Pressable key={club.ClubID} style={styles.indivGroup}>
                    <Text style={styles.indivGroupText}>{club.ClubName}</Text>
                </Pressable>
            )
        })
    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                <Appbar.Header style={{backgroundColor: "#333", height: 0.15 * Dimensions.get("window").height, elevation: 0}}>
                    <Appbar.BackAction onPress={() => console.log("Back pressed")}/>
                    <Appbar.Content title="Your Clubs"/>
                    <Appbar.Action icon="plus-circle" onPress={() => console.log("add new")}/>
                </Appbar.Header>
                <ScrollView style={styles.renderedContentList}>
                    {this.renderUserClubs()}
                </ScrollView>
                <Appbar style={styles.bottomBar}>
                    <Appbar.Action icon="home" onPress={() => this.props.navigation.navigate("Main Screens", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}}/>
                    {/* <Appbar.Action icon="plus-circle" onPress={() => this.props.navigation.navigate("Main Screens", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}}/> */}
                    <Appbar.Action icon="account-group" onPress={() => this.props.navigation.navigate("Clubs", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}} />
                    <Appbar.Action icon="message" onPress={() => this.props.navigation.navigate("Messages", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}} />
                    <Appbar.Action icon="account" onPress={() => this.props.navigation.navigate("Account", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}} />
                </Appbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#333"
    },
    titleText: {
        flex: 0.1,
        lineHeight: 50,
        top: 50,
        left: 20,
        fontSize: 25,
        color: "white"
    },
    renderedContentList: {
        flex: 1,
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "column"
    },
    indivGroup: {
        height: 0.1 * Dimensions.get("window").height,
        margin: 1.5,
        backgroundColor: "#777",
        display: "flex",
        flexDirection: "row",
        top: 1
    },
    indivGroupText: {
        textAlignVertical: "center",
        flex: 1,
        left: 20,
        color: "white"
    },
    bottomBar: {
        backgroundColor: "#333"
    }
})

export default ClubsScreen