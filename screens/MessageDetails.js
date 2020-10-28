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

const address = "10.0.2.2:3000"

class MessageDetailsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.route.params.user,
            contact: this.props.route.params.contact,
            messages: [],
            messageContent: ""
        }

        this.loadFromContact()
        this.settingTimer();

    }

    settingTimer() {
        setInterval(() => {
            this.loadFromContact()
        }, 5000)
    }

    async checkForReply() {
        await fetch("http://" + address + "/loadFromContact?user=" + this.state.user + "&contact=" + this.state.contact).then(response => response.json()).then(res => {
            if(this.state.messages != res) {
                this.loadFromContact()
            }
        })
    }

    async loadFromContact() {
        await fetch("http://" + address + "/loadFromContact?user=" + this.state.user + "&contact=" + this.state.contact).then(response => response.json()).then(res => {
            this.setState({messages: res})
        })
    }

    async sendMessage(message, to) {
        await fetch("http://"+ address + "/send?sender=" + this.state.user + "&receiver=" + to + "&message=" + message)
        this.setState({messageContent: ""})
        this.loadFromContact()
    }

    renderMessages() {
        return this.state.messages.map((message) => {
            if(message.Sender == this.state.contact) {
                return (
                    <View key={message.MessageID} style={styles.singleMessageSend}>
                        <View style={styles.indivMessageSend}>
                            <Text style={styles.indivMessageText}>{message.Message}</Text>
                        </View>
                        <View style={styles.userProfileImageSend}>
                            <Image style={styles.userProfileImageSend} source={{uri: this.props.route.params.profileImage}} />
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View key={message.MessageID} style={styles.singleMessage}>
                        <View style={styles.userProfileImage}>
                            <Image style={styles.userProfileImage} source={{uri: this.props.route.params.userImage}} />
                        </View>
                        <View style={styles.indivMessage}>
                            <Text style={styles.indivMessageText}>{message.Message}</Text>
                        </View>
                    </View>
                )
            }
        })
    }

    render(props) {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.titleText}>{this.state.contact}</Text>
                <View style={styles.listWrapper}>
                    <ScrollView style={styles.renderedContentList}>
                        {this.renderMessages()}
                    </ScrollView>
                </View>
                
                <View style={styles.bottomMessageArea}>
                    <TextInput style={styles.bottomMessageText} value={this.state.messageContent} onChangeText={(text) => this.setState({messageContent: text})}/>
                    <Pressable style={styles.bottomMessageButton} onPress={() => this.sendMessage(this.state.messageContent, this.state.contact)}>
                        <Text style={styles.bottomMessageButtonText}>Send</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#343434"
    },
    titleText: {
        height: 0.08 * windowHeight,
        lineHeight: 50,
        top: 50,
        left: 20,
        fontSize: 25,
        color: "white"
    },
    listWrapper: {
        backgroundColor: "#555",
        top: 50,
        flex: 1
    },
    renderedContentList: {
        backgroundColor: "#555",
        position: "relative",
        marginBottom: 0.19 * windowHeight
    },
    userProfileImage: {
        height: 50, 
        width: 50,
        borderRadius: 100,
        top: 5
    },
    indivMessage: {
        minHeight: 0.1 * windowHeight,
        width: 0.6 * windowWidth - 70,
        backgroundColor: "lightblue",
        marginTop: 5,
        borderRadius: 15,
        left: 10
    },
    indivMessageText: {
        minHeight: 0.1 * windowHeight,
        width: 0.6 * windowWidth,
        padding: 10,
        textAlign: "left"
    },
    singleMessageSend: {
        minHeight: 0.1 * windowHeight,
        width: 0.6 * windowWidth,
        marginTop: 5,
        left: 0.4 * windowWidth - 10,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row"
    },
    userProfileImageSend: {
        height: 50, 
        width: 50,
        borderRadius: 100,
        top: 5,
        left: 5
    },
    indivMessageSend: {
        minHeight: 0.1 * windowHeight,
        width: 0.6 * windowWidth - 60,
        backgroundColor: "#CCC",
        marginTop: 5,
        borderRadius: 15
    },
    indivMessageTextSend: {
        minHeight: 0.1 * windowHeight,
        width: 0.6 * windowWidth,
        padding: 10,
        textAlign: "left"
    },
    bottomMessageArea: {
        height: 0.1 * windowHeight,
        width: windowWidth,
        backgroundColor: "lightblue",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#555",
        borderTopWidth: 1,
        borderTopColor: "#CCC",
        position: "absolute",
        bottom: 0
    }, 
    bottomMessageText: {
        height: 0.1 * windowHeight,
        width: 0.8 * windowWidth,
        backgroundColor: "#777",
        color: "white"
    },
    bottomMessageButton: {
        height: 0.1 * windowHeight,
        width: windowWidth * 0.2
    },
    bottomMessageButtonText: {
        flex: 1,
        lineHeight: 0.1 * windowHeight,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center" 
    },
    singleMessage: {
        minHeight: 0.1 * windowHeight,
        width: 0.6 * windowWidth,
        marginTop: 5,
        left: 10,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row"
    }
})

export default MessageDetailsScreen