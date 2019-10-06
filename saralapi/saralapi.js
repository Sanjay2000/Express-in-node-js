const express = require("express");
const app = express();
const fs = require('fs')
app.use(express.json())

app.get('/getdata', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        res.send(data)
    })
})


app.get('/getdata/:id', (req, res) => {
    var id = req.params.id
    var list = []
    fs.readFile(__dirname + "/api.json", (err, data) => {
        data = JSON.parse(data)
        for (i of data) {
            if (i['id'] == id) {
                list.push(i)
            }
        }
        res.send(list)
    })
})

app.get('/course/:courseId/exercise/:exerciseId', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        var store = JSON.parse(data)
        for (i of store) {
            if (i.id == req.params.courseId) {
                for (j of i.exercises){
                    if (j.exercises_id == req.params.exerciseId){
                        res.send(j)
                    }
                    
                    
                }
            }
        }

    })
})

   

app.get('/course/:courseId/exercise/:exerciseId/submission/:submissionId', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        var full_data = JSON.parse(data)
        for (i of full_data) {
            if (i.id == req.params.courseId){
                for (j of i.exercises){
                    if (j.exercises_id == req.params.exerciseId){
                        for ( k of j.submission){
                            if (k.submission_id == req.params.submissionId){
                                res.send(k)

                            }
                        }
                    }
                }
            }
            


        }

        
    })
})


app.post('/postdata', (req, res) => {

    fs.readFile(__dirname + "/api.json", (err, data) => {
        var store = JSON.parse(data)
        var Div = {
            "name": req.body.name,
            "description": req.body.description,
            "id": store.length + 1,
            "exercises": []
        }
        store.push(Div)
        fs.writeFileSync(__dirname + "/api.json", JSON.stringify(store, null, 2))
        res.send(store)

    })

})


app.post('/course/:courseId/exercise', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        var store = JSON.parse(data)
        for (i of store) {
            if (i.id == req.params.courseId) {
                
                var dist = {
                    "exercises_id": i.exercises.length + 1,
                    "name": req.body.name,
                    "content": req.body.content,
                    "hint": req.body.hint,
                    "submission": []
                }
                i.exercises.push(dist)
                res.send(i)
            }
        }
        fs.writeFile(__dirname + "/api.json", JSON.stringify(store, null, 2))
    })
})



app.post('/course/:courseId/exercises/:exercisesId/submissions', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        var store = JSON.parse(data)
        for (i of store) {
            if (i.id == req.params.courseId) {
                for (j of i.exercises) {
                    if (j.exercises_id == req.params.exercisesId) {
                        var storge = {
                            "submission_id": j.submission.length + 1,
                            "content": req.body.content,
                            "user": req.body.user
                        }
                        j.submission.push(storge)
                    }
                }
                fs.writeFileSync(__dirname + "/api.json", JSON.stringify(store, null, 2))
                res.send(j)

            }

        }
    })
});





app.put("/putdata/:id", (req, res) => {
    var id = req.params.id
    fs.readFile(__dirname + "/api.json", (err, data) => {
        data = JSON.parse(data)
        for (i of data) {
            if (i["id"] == id) {
                i['name'] = req.body.name
                i['description'] = req.body.description
                break
            }
        }
        console.log('chal rha hai')
        fs.writeFileSync(__dirname + "/api.json", JSON.stringify(data, null, 2))
        res.send(data)
    })
})


app.put('/course/:courseId/exercises/:exerciseId/', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        var store = JSON.parse(data)
        
        for (i of store) {
            
            if (i.id == req.params.courseId) {
                for (j of i.exercises) {
                    if (j["exercises_id"] == req.params.exerciseId) {
                        j["name"] = req.body.name
                        j["content"] = req.body.content
                        j["hint"] = req.body.hint
                    }
                    break
                }
                break
            }
        }
        fs.writeFile(__dirname + "/api.json", JSON.stringify(store, null, 2))
        res.send(store)
       
    })
})


app.put('/course/:courseId/exercises/:exerciseId/submissions/:submissionId', (req, res) => {
    fs.readFile(__dirname + "/api.json", (err, data) => {
        var store = JSON.parse(data)
        for (i of store) {
            if (i.id == req.params.courseId) {
                for (j of i.exercises) {
                    if (j.exercises_id == req.params.exerciseId){
                        for ( k of j.submission){
                            if (k["submission_id"] == req.params.submissionId){
                                k["content"] = req.body.content
                                k["user"] = req.body.user
                            

                            }
                        }
                    }
                    
                }
            }
        }
        fs.writeFile(__dirname + "/api.json", JSON.stringify(store, null, 2))
        res.send(store)
        
    })
})





app.listen(8000)
console.log("working,,.......")