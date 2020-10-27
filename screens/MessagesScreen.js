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

class MessagesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.route.params.user,
            messages: [],
            contacts: [],
            personalProfileImage: ""
        }

        this.loadMessages()
        this.settingTimer()
    }

    settingTimer() {
        setInterval(() => {
            this.loadMessages()
        }, 5000)
    }

    async loadMessages() {
        await fetch("http://" + address + "/recieveFor?user=" + this.state.user).then(response => response.json()).then(res => {
            var contactsArray = []
            
            for(var x in res) {
                if(!contactsArray.includes(res[x]["Sender"])) {
                    contactsArray.push(res[x]["Sender"])
                }
            }

            this.setState({messages: res})
            this.loadContacts(contactsArray)
        })

    }

    async loadContacts(contactNames) {
        var contactsArr = []
        for(var x in contactNames) {
            await fetch("http://" + address + "/getContactProfiles?name=" + contactNames[x]).then(response => response.text()).then(res => {
                contactsArr.push({
                    "Name": contactNames[x],
                    "ProfileImage": res
                })
            }).catch(e => {
                console.log(e)
            })
        }

        this.setState({contacts: contactsArr})

        await fetch("http://" + address + "/getContactProfiles?name=" + this.state.user).then(response => response.text()).then(res => {
            this.setState({personalProfileImage: res})
        }).catch(e => {
            console.log(e)
        })
    }

    renderContactsList() {
        return this.state.contacts.map((contact, key) => {
            return (
                <Pressable key={key} style={styles.indivGroup} onPress={() => this.props.navigation.navigate("Message Details", {
                    user: this.state.user,
                    contact: contact.Name,
                    profileImage: contact.ProfileImage,
                    userImage: this.state.personalProfileImage
                })}>
                    <Image style={styles.profileImage} source={{uri:contact.ProfileImage}}/>
                    <Text style={styles.indivGroupText}>{contact.Name}</Text>
                </Pressable>
            )
        })
    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                <Appbar.Header style={{backgroundColor: "#333", height: 0.15 * Dimensions.get("window").height, elevation: 0}}>
                    <Appbar.BackAction onPress={() => {}}/>
                    <Appbar.Content title="Your Messages"/>
                    <Appbar.Action icon="plus-circle" onPress={() => console.log("add new")}/>
                </Appbar.Header>
                <ScrollView style={styles.renderedContentList}>
                    {this.renderContactsList()}
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
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 100,
        top: (0.1 * Dimensions.get("window").height - 50) / 2,
        left: 10
    },
    bottomBar: {
        backgroundColor: "#333"
    }
})

export default MessagesScreen