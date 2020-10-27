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

import {Appbar, List, Divider} from "react-native-paper"

const address = "10.0.0.2:3000"

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGroupType: "Joined",
            userGroups: [],
            ownedGroups: [],
            userAppointments: [],
            user: this.props.route.params.user,
            role: this.props.route.params.role
        }

        this.loadGroupsFor()
        this.loadOwnedGroups()
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    componentDidMount() {
        if(this.state.role == "Admin") {
            this.setState({selectedGroupType: "Created"})
        }
        else {
            this.setState({selectedGroupType: "Joined"})
        }
    }

    async loadGroupsFor() {
        await fetch("http://" + address + "/groupsFor?user=" + this.state.user).then(response => response.json()).then(res => {
            this.setState({userGroups: res})
        })
    }

    async loadOwnedGroups() {
        await fetch("http://" + address + "/ownedGroups?user=" + this.state.user).then(response => response.json()).then(res => {
            this.setState({ownedGroups: res})
        }).catch(e => {
            console.log(e)
        })
    }

    showOwned() {
        this.setState({selectedGroupType: "Created"})
    }

    showJoined() {
        this.setState({selectedGroupType: "Joined"})
    }

    ownedStyle() {
        if(this.state.selectedGroupType == "Created") {
            return {
                flex: 1,
                textAlign: "center",
                textAlignVertical: 'center',
                borderBottomColor: "dodgerblue",
                color: "dodgerblue",
                borderBottomWidth: 5,
                fontSize: 15
            }
        }
        else {
            return {
                flex: 1,
                textAlign: "center",
                textAlignVertical: 'center',
                color: "white",
                fontSize: 15
            }
        }
        
    }

    joinedStyle() {
        if(this.state.selectedGroupType == "Joined") {
            return {
                flex: 1,
                textAlign: "center",
                textAlignVertical: 'center',
                borderBottomColor: "dodgerblue",
                color: "dodgerblue",
                borderBottomWidth: 5,
                fontSize: 15
            }
        }
        else {
            return {
                flex: 1,
                textAlign: "center",
                textAlignVertical: 'center',
                color: "white",
                fontSize: 15
            }
        }
    }

    renderingItems() {
        if(this.state.selectedGroupType == "Created") {
            return this.state.ownedGroups.map((item, key) => {
                return (
                    <List.Item 
                        key={key}
                        title={item.GroupName}
                        onPress={() => this.props.navigation.navigate("Group Details", {
                            group: item,
                            user: this.state.user,
                            role: this.state.role
                        })}
                        style={styles.indivGroup}
                        titleStyle={{color: "white"}}
                    />
                )
            })
        }
        else {
            return this.state.userGroups.map((item, key) => {
                return (
                    <List.Item 
                        key={key}
                        title={item.GroupName}
                        onPress={() => this.props.navigation.navigate("Group Details", {
                            group: item,
                            user: this.state.user,
                            role: this.state.role
                        })}
                        style={styles.indivGroup}
                        titleStyle={{color: "white"}}
                    />
                )
            })
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null)
        return true;
    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                {/* <View style={styles.titleArea}>
                    <Text style={styles.titleText}>Appointment Groups</Text>
                    <View style={styles.titleButtonGroup}>
                        <Pressable>
                            <Image source={require("../img/add-icon.png")} style={styles.icon}/>
                        </Pressable>
                    </View>
                </View> */}
                <Appbar.Header style={{backgroundColor: "#333", height: 0.15 * Dimensions.get("window").height, elevation: 0}}>
                    <Appbar.BackAction onPress={() => this.handleBackButtonClick}/>
                    <Appbar.Content title="Your Appointment Groups"/>
                    <Appbar.Action icon="plus-circle" onPress={() => console.log("add new")}/>
                </Appbar.Header>

                
                <View style={styles.sectionSelection}>
                    <Pressable style={styles.indivSelection} onPress={() => this.showOwned()}>
                        <Text style={this.ownedStyle()}>Created Groups</Text>
                    </Pressable>
                    <Pressable style={styles.indivSelection} onPress={() => this.showJoined()}>
                        <Text style={this.joinedStyle()}>Joined Groups</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.renderedContentList}>
                    {this.renderingItems()}
                </ScrollView>
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
    titleArea: {
        flex: 0.1,
        top: 50,
        display: "flex",
        flexDirection: "row"
    },
    titleText: {
        flex: 1,
        lineHeight: 50,
        left: 20,
        fontSize: 25,
        color: "white"
    },
    titleButtonGroup: {
        flex: 0.3,
        display: "flex",
        justifyContent: "center"
    },
    titleButton: {
        flex: 1
    },
    icon: {
        height: 40,
        width: 40,
        top: 5
    },
    sectionSelection: {
        flex: 0.2,
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "#333",
        borderBottomWidth: 1
    },
    indivSelection: {
        flex: 1,
    },
    renderedContentList: {
        flex: 1,
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "column"
    },
    indivGroup: {
        top: 1,
        margin: 1,
        borderBottomColor: "#777",
        borderBottomWidth: 0.8
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

export default HomeScreen;