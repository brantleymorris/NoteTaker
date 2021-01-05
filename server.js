// variable declaration
    const express = require("express");
    const { v4: uuidv4 } = require("uuid");
    const fs = require("fs");
    const notes = require("./db.json");
    const path = require("path");

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());

// going to put routes in the main file for now, may move later
    // require("./routes/apiRoutes")(app);
    // require("./routes/htmlRoutes")(app);

// api routes
    // retrieves the currently stored notes from the db.json file
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    // adds new notes the db.json file
    app.post("/api/notes", function(req, res) {

        // validates that the title data field was entered
        if(!req.body.title) {
            return res.json({error: "Title Required"});
        }

        // takes the notes and assigns a random id to them, need to get uuid installed
        const note = {...req.body, id: uuidv4()};

        // pushes new note to the notes array locally, will need to be written to the db.json file later for perminant storage
        notes.push(note);

        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes), (err) => {
            if (err) {
                return res.json({error: "Your note could not be saved."});
            }

            return res.json(note);
        });
    });

    // deletes the selected note form the db.json file, and returns the new db.json file
    app.delete("/api/notes/", function(req, res) {
        // need to figure out have to remove notes by id
        let currentNotes = fs.readFileSync(path.join(__dirpath, "db.json"), notes, (err) => {
            if (err) {
                return res.json({error: "An error occured, you note could not be deleted."})
            }
        });

        for (let i = 0; i < currentNotes.length; i++) {
            if (currentNotes.id === req.params.id) {
                currentNotes.splice(i, 1);

                fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes), (err) => {
                    if (err) {
                        return res.json({error: "Your note could not be saved."});
                    }
        
                    return res.json(note);
                });
            };
        }
    });

// html routes, both work
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "./notes.html"));
    })

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./index.html"));
    });

// start server    
    app.listen(PORT, function() {
        console.log("App listening on PORT: " + PORT);
    });