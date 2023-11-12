const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const videos = require("./data")

server .use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url:'https://pps.whatsapp.net/v/t61.24694-24/352454538_978359386688343_7813039162647001749_n.jpg?ccb=11-4&oh=01_AdQln7_EfJVmGa6YIGLSrAHCsM-qXmmduQuVPGcyhyY9Tg&oe=64DE8865',
        name:"Antonio Thone",
        role:"Programador",
        description:"Desenvolvedor front-end, focado em aprimorar sempre suas habilidades",
        links: [
            { name:"Linkedin", url: "https://linkdein.com/in/antoniothone/" },
            { name:"X", url: "https://x.com/antoniothone/" }
        ]
    }


        return res.render("about", { about} )
})

server.get("/portfolio", function(req, res){

    return res.render("portfolio", {items: videos} )
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })
    
    if (!video){
        return res.send("Video not found")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log("Servidor em funcionamento ")
})
