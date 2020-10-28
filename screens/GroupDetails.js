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
import Animated from 'react-native-reanimated'


import {Appbar, List, Modal, Portal, Provider, Button, IconButton} from "react-native-paper";

const address = "10.0.2.2:3000"

class GroupDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            group: this.props.route.params.group,
            groupAppoints: [],
            showModal: false,
            user: this.props.route.params.user,
            role: this.props.route.params.role,
            currentAppoint: 0
        }

        this.loadGroupAppoints()
    }

    async loadGroupAppoints() {
        await fetch("http://" + address + "/groupAppoints?id=" + this.state.group.GroupID).then(response => response.json()).then(res => {
            this.setState({groupAppoints: res})
        })
    }

    setModal(b, appID) {
        this.setState({showModal: b, currentAppoint: appID})
    }

    confirmAppointment() {
        fetch("http://" + address + "/confirmAppointment?id=" + this.state.currentAppoint) 
        this.setModal(false, 0)  
        // this.loadGroupAppoints() 
    }

    renderModalContent() {
        if(this.state.role == "Admin") {
            return (
                <View style={{flex: 1, display: "flex", flexDirection: "column"}}>
                    <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center", marginTop: 10}}>Manage Appointment</Text>
                    <Button mode="contained" icon="check-circle" style={styles.modalButton} onPress={() => this.confirmAppointment()}>Confirm</Button>
                    <Button mode="contained" icon="file-document-edit" style={styles.modalButton} onPress={() => console.log("Edit Pressed")}>Edit</Button>
                    <Button mode="contained" icon="delete" style={styles.modalButton} onPress={() => console.log("Delete Pressed")}>Delete</Button>
                </View>
            )
        }
        else {
            return (
                <Text>Do you want to confirm the appointment?</Text>
            )
        }
    }

    renderGroupAppoints() {
        return this.state.groupAppoints.map((appoint, key) => {
            if(appoint.Confirmed == true) {
                return (
                    <List.Item key={key} style={styles.indivGroup} 
                        left={props => <List.Icon {...props} 
                                icon="check-bold" 
                                color={"lightgreen"}   
                            /> }
                        right={props => <IconButton {...props} icon="dots-vertical" color={"white"} style={{right: 30}} onPress={() => {}} />}
                        title={appoint.AppointmentTitle} 
                        titleStyle={{color: "white"}}
                        descriptionStyle={{color: "#CCC"}}
                        description={appoint.Date}
                    />
                )
            }
            else {
                return (
                    <List.Item key={key} style={styles.indivGroup} 
                        left={props => <List.Icon {...props} 
                                icon="calendar" 
                                color={"dodgerblue"}
                            /> } 
                        right={props => <IconButton {...props} icon="dots-vertical" color={"white"} style={{right: 30}} onPress={() => {}}/>}
                        title={appoint.AppointmentTitle} 
                        titleStyle={{color: "white"}}
                        descriptionStyle={{color: "#CCC"}}
                        description={appoint.Date} 
                        onPress={() => this.setModal(true, appoint.AppointmentID)}
                    />
                )
            }
        })
    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                {/* Header */}
                <Appbar.Header style={{backgroundColor: "#333", height: 0.15 * Dimensions.get("window").height, elevation: 0}}>
                    <Appbar.BackAction onPress={() => this.handleBackButtonClick}/>
                    <Appbar.Content title={this.state.group.GroupName}/>
                    {/* <Appbar.Action icon="plus-circle" onPress={() => console.log("add new")}/> */}
                </Appbar.Header>

                {/* Scroll List of Appointments */}
                <ScrollView style={styles.renderedContentList}>
                    {this.renderGroupAppoints()}
                </ScrollView>

                {/* Modal Box */}
                <Modal visible={this.state.showModal} onDismiss={() => this.setModal(false, 0)}>
                    <View style={{backgroundColor: "white", height: 0.5 * Dimensions.get("window").height, width: 0.8 * Dimensions.get("window").width, marginLeft: 0.1 * Dimensions.get("window").width}}>
                        {this.renderModalContent()}
                    </View>
                </Modal>

                {/* Bottom nav bar */}
                <Appbar style={styles.bottomBar}>
                    <Appbar.Action icon="home" onPress={() => this.props.navigation.navigate("Main Screens", {
                        user: this.state.user,
                        role: this.state.role
                    })} style={{flex: 1}}/>
                    {/* <Appbar.Action icon="plus-circle" onPress={() => this.props.navigation.navigate("Main Screens", {
                        user: this.state.user,
                        role: this.state.role,
                        navigation: this.props.navigation
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
    indivGroup: {
        textAlignVertical: "center",
        flex: 1,
        left: 20,
        color: "white"
    },
    bottomBar: {
        backgroundColor: "#333"
    },
    modalButton: {
        backgroundColor: "#333", 
        width: 0.6 * Dimensions.get("window").width, 
        marginLeft: 0.1 * Dimensions.get("window").width, 
        margin: 10, 
        flex: 1,
        display: "flex",
        alignItems: "center"
    }
})

export default GroupDetails