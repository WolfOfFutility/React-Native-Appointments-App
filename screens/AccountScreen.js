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
  ImageBackground, Pressable
} from 'react-native';
import Animated from 'react-native-reanimated';

import {Appbar, List, Avatar, ProgressBar, Button} from "react-native-paper"
import { lightBlue } from '@material-ui/core/colors';

const address = "10.0.2.2:3000"

class AccountScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.route.params.user,
            role: this.props.route.params.role,
            totalAppointments: 0,
            totalGroups: 0,
            totalClubs: 0
        }

        this.loadUserAppointments()
        this.loadUserClubs()
    }

    async loadUserAppointments() {
        await fetch("http://" + address + "/appointmentsFor?user=" + this.state.user).then(response => response.json()).then(res => {
            var groupArray = []

            for(var x in res) {
                if(!groupArray.includes(res[x]["Group"])) {
                    groupArray.push(res[x]["Group"])
                }
            }

            this.setState({totalAppointments: res.length, totalGroups: groupArray.length})
        })
    }

    async loadUserClubs() {
        await fetch("http://" + address + "/getUserClubs?user=" + this.state.user).then(response => response.json()).then(res => {
            this.setState({totalClubs: res.length})
        })
    }

    renderUserInformation() {
        return (
            <List.Section style={{width: Dimensions.get("window").width * 0.6, marginLeft: Dimensions.get("window").width * 0.2, top: 20}}>
                <List.Subheader style={{color: "#DEDEDE", textAlign: "center"}}>Account Information</List.Subheader>
                <List.Item title="User Appointments: " titleStyle={{color: "white", fontWeight: "bold", textAlignVertical: "center"}} right={() => <Text style={{ color: "white", fontSize: 15, textAlignVertical: "center"}}>{this.state.totalAppointments}</Text>}/>
                <List.Item title="User Groups: " titleStyle={{color: "white", fontWeight: "bold", textAlignVertical: "center"}} right={() => <Text style={{ color: "white", fontSize: 15, textAlignVertical: "center"}}>{this.state.totalGroups}</Text>}/>
                <List.Item title="User Clubs: " titleStyle={{color: "white", fontWeight: "bold", textAlignVertical: "center"}} right={() => <Text style={{ color: "white", fontSize: 15, textAlignVertical: "center"}}>{this.state.totalClubs}</Text>}/>
            </List.Section>
        )
    }

    renderUserProgress() {

    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                <Appbar.Header style={{backgroundColor: "#333", height: 0.15 * Dimensions.get("window").height, elevation: 0}}>
                    <Appbar.BackAction onPress={() => {}} />
                    <Appbar.Content title="Your Account"/>
                </Appbar.Header>
                
                <ScrollView style={styles.renderedContentList}>
                    <Avatar.Text size={100} label={this.state.user[0]} style={styles.avatarImage}/>
                    <Text style={styles.displayName}>{this.state.user}</Text>
                    {this.renderUserInformation()}
                    <View style={styles.buttonGroup}>
                        <Button mode="outlined" style={{flex: 1, backgroundColor: "dodgerblue", height: 50, margin: 30}} labelStyle={{lineHeight: 30, color: "white"}} color={"white"} onPress={() => {}}>Upgrade</Button>
                        <Button mode="outlined" style={{flex: 1, backgroundColor: "dodgerblue", height: 50, margin: 30}} labelStyle={{lineHeight: 30, color: "white"}} color={"white"} onPress={() => {}} >Edit</Button>
                    </View>
                </ScrollView>

                <Appbar style={styles.bottomBar}>
                    <Appbar.Action icon="home" onPress={() => this.props.navigation.navigate("Main Screens", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}}/>
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
        backgroundColor: "#333"
    },
    renderedContentList: {
        flex: 1,
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "column"
    },
    bottomBar: {
        backgroundColor: "#333"
    },
    avatarImage: {
        marginTop: 20,
        left: (Dimensions.get("window").width - 100) / 2,
        backgroundColor: "dodgerblue"
    },
    displayName: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    buttonGroup: {
        flex: 1,
        top: 10,
        display: "flex",
        flexDirection: "row"
    }
})

export default AccountScreen