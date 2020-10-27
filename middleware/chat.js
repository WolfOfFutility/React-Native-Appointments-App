const { response } = require('express');
const express = require('express')
const app = express();
const port = 3000

var messages = []
var users = [
    {
        "UserID": 1,
        "User": "CeejayAdmin",
        "Username": "ceejadmin",
        "Password": "pass",
        "Role": "Admin",
        "Contacts": [
            "CeejayUser",
            "Maddy",
            "Other"
        ],
        "ProfileImage": "https://cdn.pixabay.com/photo/2017/10/07/15/27/wolf-2826741_960_720.jpg"
    },
    {
        "UserID": 2,
        "User": "CeejayUser",
        "Username": "ceejuser",
        "Password": "pass",
        "Role": "User",
        "Contacts": [
            "CeejayAdmin",
            "Maddy",
            "Other"
        ],
        "ProfileImage": "https://cdn.pixabay.com/photo/2019/10/30/16/19/fox-4589927_960_720.jpg"
    },
    {
        "UserID": 3,
        "User": "Maddy",
        "Username": "mads123",
        "Password": "pass",
        "Role": "User",
        "Contacts": [
            "CeejayUser",
            "CeejayAdmin",
            "Other"
        ],
        "ProfileImage": "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg"
    },
    {
        "UserID": 4,
        "User": "Other",
        "Username": "other",
        "Password": "pass",
        "Role": "User",
        "Contacts": [
            "CeejayUser"
        ],
        "ProfileImage": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg"
    },
]

var groups = [
    {
        "GroupID": 1,
        "GroupName": "Work Appointments",
        "Owner": "CeejayAdmin",
        "Appointments": [1, 2, 3],
        "Client": "CeejayUser"
    },
    {
        "GroupID": 2,
        "GroupName": "Doctor Appointments",
        "Owner": "CeejayAdmin",
        "Appointments": [4],
        "Client": "Maddy"
    },
    {
        "GroupID": 3,
        "GroupName": "New Group",
        "Owner": "CeejayAdmin",
        "Appointments": [5, 6],
        "Client": "CeejayUser"
    }
]

var clubs = [
    {
        "ClubID": 1,
        "ClubName": "Ceejay's Club",
        "Members": ["CeejayUser", "CeejayAdmin"]
    },
    {
        "ClubID": 2,
        "ClubName": "Second Club",
        "Members": ["Maddy", "Other"]
    },
    {
        "ClubID": 3,
        "ClubName": "Third Club",
        "Members": ["CeejayUser", "Maddy", "Other"]
    }
]

var appointments = [
    {
        "AppointmentID": 1,
        "Date": "18/08/2020",
        "Time": "11:35am",
        "BookedBy": "CeejayAdmin",
        "AssignedTo": "CeejayUser",
        "AppointmentTitle": "Task 1",
        "AppointmentDesc": "To complete task 1, ...",
        "Group": "Work Appointments",
        "GroupID": 1,
        "Confirmed": false
    },
    {
        "AppointmentID": 2,
        "Date": "21/08/2020",
        "Time": "11:35am",
        "BookedBy": "CeejayUser",
        "AssignedTo": "Maddy",
        "AppointmentTitle": "Task 2",
        "AppointmentDesc": "To complete task 2, ...",
        "Group": "Work Appointments",
        "GroupID": 1,
        "Confirmed": false
    },
    {
        "AppointmentID": 3,
        "Date": "15/08/2020",
        "Time": "11:35am",
        "BookedBy": "CeejayUser",
        "AssignedTo": "CeejayUser",
        "AppointmentTitle": "Task 3",
        "AppointmentDesc": "To complete task 3, ...",
        "Group": "Work Appointments",
        "GroupID": 1,
        "Confirmed": true
    },
    {
        "AppointmentID": 4,
        "Date": "20/08/2020",
        "Time": "11:15am",
        "BookedBy": "CeejayUser",
        "AssignedTo": "CeejayUser",
        "AppointmentTitle": "Task 4",
        "AppointmentDesc": "To complete task 4, ...",
        "Group": "Doctor Appointments",
        "GroupID": 2,
        "Confirmed": false
    },
    {
        "AppointmentID": 5,
        "Date": "20/08/2020",
        "Time": "11:15am",
        "BookedBy": "CeejayUser",
        "AssignedTo": "",
        "AppointmentTitle": "Task 5",
        "AppointmentDesc": "To complete task 5, ...",
        "Group": "New Group",
        "GroupID": 3,
        "Confirmed": false
    },
    {
        "AppointmentID": 6,
        "Date": "20/08/2020",
        "Time": "11:15am",
        "BookedBy": "CeejayUser",
        "AssignedTo": "",
        "AppointmentTitle": "Task 6",
        "AppointmentDesc": "To complete task 6, ...",
        "Group": "New Group",
        "GroupID": 3,
        "Confirmed": false
    },
]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.get("/send", (req, res) => {
    var sender = req.query.sender
    var receiver = req.query.receiver
    var message = req.query.message
    var task = req.query.task

    var newMessage = {
        "MessageID": messages.length + 1,
        "Sender": sender,
        "Receiver": receiver,
        "Message": message,
        "Task": task
    }

    messages.push(newMessage)

    res.send("Message Recieved.")
})

app.get("/recieve", (req, res) => {
    res.send(messages)
})

app.get("/recieveFor", (req, res) => {
    var queryUser = req.query.user
    var responseArray = []

    for(var x in messages) {
        if(messages[x]["Receiver"] == queryUser) {
            responseArray.push(messages[x])
        }
    }

    res.send(responseArray)
})

app.get("/getUserClubs", (req, res) => {
    var queryUser = req.query.user
    var responseArray = []

    for(var x in clubs) {
        for(var y in clubs[x]["Members"]) {
            if(clubs[x]["Members"][y] == queryUser) {
                responseArray.push(clubs[x])
            }
        }
    }

    res.send(responseArray)
})

app.get("/loadFromContact", (req, res) => {
    var queryUser = req.query.user
    var queryContact = req.query.contact

    var responseArray = []

    for(var x in messages) {
        if(messages[x]["Receiver"] == queryUser && messages[x]["Sender"] == queryContact) {
            responseArray.push(messages[x])
        }

        if(messages[x]["Sender"] == queryUser && messages[x]["Receiver"] == queryContact) {
            responseArray.push(messages[x])
        }
    }

    res.send(responseArray)
})

app.get("/getContactProfiles", (req, res) => {
    var queryName = req.query.name

    var response = users.filter(user => user["User"] == queryName)[0]["ProfileImage"]

    res.send(response)
})

app.get("/login", (req, res) => {
    var username = req.query.user
    var password = req.query.pass

    var result = users.filter(user => user["Username"] == username && user["Password"] == password)
    res.send(result)
})

app.get("/addNewAppoint", (req, res) => {
    var bookedBy = req.query.booker
    var assignedTo = req.query.assign
    var date = req.query.date
    var time = req.query.time
    var title = req.query.title
    var desc = req.query.desc
    var group = req.query.group

    var newAppoint = {
        "AppointmentID": Date.now(),
        "Date": date,
        "Time": time,
        "BookedBy": bookedBy,
        "AssignedTo": assignedTo,
        "AppointmentTitle": title,
        "AppointmentDesc": desc,
        "Group": group,
        "Confirmed": false
    }

    appointments.push(newAppoint)

    res.sendStatus(200);
})

app.get("/confirmAppointment", (req, res) => {
    var queryID = parseInt(req.query.id)

    for(var x in appointments) {
        if(appointments[x]["AppointmentID"] == queryID) {
            appointments[x]["Confirmed"] = !appointments[x]["Confirmed"]
        }
    }

    res.sendStatus(200)
})

app.get("/ownedGroups", (req, res) => {
    var queryUser = req.query.user

    var responseArray = groups.filter(group => group["Owner"] == queryUser)

    res.send(responseArray)
})

app.get("/groupsFor", (req, res) => {
    var queryUser = req.query.user

    var responseArray = groups.filter(group => group["Client"] == queryUser)

    res.send(responseArray)
})

app.get("/joinGroup", (req, res) => {
    var queryID = req.query.id
    var user = req.query.user

    var findGroup = groups.filter(group => group.GroupID == queryID)

    var responseArray = [
        {
            "GroupName": findGroup[0]["GroupName"],
            "Appointments": []
        }
    ]

    if(findGroup != []) {
        for(var x in findGroup[0]["Appointments"]) {
            for(var y in appointments) {
                if(appointments[y]["AppointmentID"] == findGroup[0]["Appointments"][x]) {
                    appointments[y]["AssignedTo"] = user
                    responseArray[0]["Appointments"].push(appointments[y])
                }
            }
        }
    }

    res.sendStatus(200)
    // res.send(responseArray)
})

app.get("/addNewGroup", (req, res) => {
    var groupName = req.query.name
    var groupOwner = req.query.owner

    var newGroup = {
        "GroupID": groups.length + 1,
        "GroupName": groupName,
        "GroupOwner": groupOwner,
        "Appointments": []
    }

    groups.push(newGroup)

    res.sendStatus(200)
})

app.get("/groupAppoints", (req, res) => {
    var queryID = req.query.id
    var responseArray = []

    var filtered = groups.filter(group => group["GroupID"] == queryID)[0]

    for(var x in filtered["Appointments"]) {
        responseArray.push(appointments.filter(appoint => appoint["AppointmentID"] == filtered["Appointments"][x])[0])
    }
    
    res.send(responseArray)
})

app.get("/appointmentsFor", (req, res) => {
    var assignedUser = req.query.user
    var listOfAppointments = []

    for(var x in appointments) {
        if(appointments[x]["AssignedTo"].toString().trim().toLowerCase() == assignedUser.toString().trim().toLowerCase()) {
            listOfAppointments.push(appointments[x])
        }

        if(parseInt(x) + 1 == appointments.length) {
            res.send(listOfAppointments)
        }
    }
})

app.get("/allAppointments", (req, res) => {
    res.send(appointments)
})

app.get("/updateAppointment", (req, res) => {
    var appointmentID = req.query.id
    var date = req.query.date
    var time = req.query.time
    var bookedBy = req.query.bookedBy
    var assignedTo = req.query.assignedTo
    var title = req.query.title
    var desc = req.query.desc

    var newAppointment = {
        "AppointmentID": appointmentID,
        "Date": date,
        "Time": time,
        "BookedBy": bookedBy,
        "AssignedTo": assignedTo,
        "AppointmentTitle": title,
        "AppointmentDesc": desc
    }

    for(var x in appointments) {
        if(appointments[x]["AppointmentID"] == appointmentID) {
            appointments[x] = newAppointment
            res.status(200);
        }
    }
})

app.get("/reassignAppoint", (req, res) => {
    var appointID = req.query.id
    var assignedTo = req.query.user

    for(var x in appointments) {
        if(appointments[x]["AppointmentID"] == appointID) {
            appointments[x]["AssignedTo"] = assignedTo
            // res.status(200);
        }
    }

    res.status(200);
})

app.listen(port, () => {
    console.log("Localhost Server is hosted on port 3000")
})