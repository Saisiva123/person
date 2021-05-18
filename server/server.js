const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;
const routes = require("./Routes/Route");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use('/api', routes);

var userResponses = {
    "userRes1": {
        source: "user",
        category: "btn",
        msg: ["Myself", "Someone Else"],
        nextIdReq: "botRes2"
    },
    "userRes3": {
        source: "user",
        category: "modelOptions",
        msg: [
            {
                txt: "Most Searched",
                list: ["Fever", "Cough", "Headache", "Stomach Pain", "Loose Motions", "Dark Patches on skin", "Acne/Pimples", "Hairfall", "Unprotected Sex"]
            },
            {
                txt: "Common Issues",
                list: ["Vomiting", "Yellowing of eyes", "Itching", "Abnormal Sweating", "Feeling Cold", "Body Pain", "Shivereing", "Weakness"]
            },
            {
                txt: "Skin and Hair Related Issues",
                list: ["Dark Circles", "Fungal infection", "Hairfall", "Dark Patches on Skin", "Scars", "Fungal Infection", "Grey hair", "Dry Skin", "Dandruff"]
            }
        ],
        nextIdReq: "botRes4"
    },
    "userRes4": {
        source: "user",
        category: "selection",
        msg: [
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/33/Orthopaedics.png",
                txt: "Bone & Joint Specialist"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/37/Physiotherapy.png",
                txt: "Physiotherapist"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/43/Ayurveda.png",
                txt: "Ayurveda"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/6/Physician.png",
                txt: "Chest Physician"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/10/10_child_specialist.png",
                txt: "Child Specialist"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/6/Physician.png",
                txt: "Coronovirus-COVID Related"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/31/Dentist.png",
                txt: "Dentist"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/22/Opthalmology.png",
                txt: "Eye Specialist"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/6/Physician.png",
                txt: "General Surgeon"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/2/Neurology.png",
                txt: "Neurologist"
            },
            {
                url: "https://doctors-production.s3.amazonaws.com/uploads/second_opinion/image_path/34/pathlogy.png",
                txt: "Pathologist"
            }
        ],
        nextIdReq: "botRes5"
    },
    "userRes5": {
        source: "user",
        category: "btn",
        msg: ["severe", "moderate"],
        nextIdReq: "botRes6"
    },
    
    "userRes7": {
        source: "user",
        category: "btn",
        msg: ["Male", "Female"],
        nextIdReq: "botRes8"
    },
    "userRes8": {
        source: "user",
        category: "btn",
        msg: ["0-15 days", "15-30 days", "More than 30 days"],
        nextIdReq: "botRes9"
    },
};

io.on('connection', socket => {

    console.log('a new user connected');
    console.log(Object.keys(userResponses).length)

    for(var i=1;i<=Object.keys(userResponses).length+2;i++)
    {
        socket.on("userRes"+i, (msg) => {
            console.log(userResponses[msg]);
            io.emit("userResponses", userResponses[msg])
        })
    }

    socket.on("close connection", (msg) => {
        console.log(msg)
        socket.disconnect()
    })

})

http.listen(port, function () {
    console.log("server running on " + port);
})
