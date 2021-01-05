// requireds
    var fs = require("fs");

// access notes, my need to double check that this is the right target, may need to access the new file after it is writen
    var notes = require("../../../db/db.json");

// export function
    module.exports = function(app) {

        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        app.post("/api/notes", function(req, res) {
            // will need fs to write to db.json file
            // using append so that the previous files aren't overwritten
            fs.appendFile("../../../db/db.json", req, function(err) {
                if (err) throw err;
                console.log("Your note was saved");
            })
        });

        // not sure how to handle the delete
        app.delete("/api/notes/", function(req, res) {
            // need to figure out have to remove notes by id
        })
    }