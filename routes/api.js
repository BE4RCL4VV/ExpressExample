// dependencies
const { raw } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { join } = require('path');

//  ---------------------------------------------------------------------     Endpoints/Routes

//  CRUD - Create, Read, Update, Delete

// get all resources - read
router.get('/', function(req, res) {
    try{
        var rawdata = fs.readFileSync('data.json');
        var students = JSON.parse(rawdata);

        console.log(students);

        res.status(200).json(students);
    } catch (err){
        res.status(500).json({message: err});
    }


});

// create a new resource - create
router.post('/', function(req, res) {
    try{
        console.log("Posted Object is: ", req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        //  parse the file so we can use it
        var students = JSON.parse(rawdata);

        //  add data, but controlled
        var rawbody = req.body;

        var newObj = {
            name: null,
            age: null,
            currentGame: null
        };

        if (rawbody.name != null){
        newObj.name = rawbody.name;
        }
        if (rawbody.age != null){
        newObj.age = rawbody.age;
        }
        if (rawbody.currentGame != null){
        newObj.currentGame = rawbody.currentGame;
        }    


        // get the actual index
        newObj._id = students.length;
        // add our new object to the array
        students.push(newObj);

        // save the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(students));

        // return the data to the user
        res.status(201).json(newObj);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//  update a resource
router.patch('/:id', function( req, res) {
    try{
        console.log("Object being patched is: ", req.params.id, req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        //  parse the file so we can use it
        var students = JSON.parse(rawdata);

        //  add data, but controlled
        var id = req.params.id;
        var rawbody = req.body;

        if (rawbody.name != null){
        students[id].name = rawbody.name;
        }
        if (rawbody.age != null){
        students[id].age = rawbody.age;
        }
        if (rawbody.currentGame != null){
        students[id].currentGame = rawbody.currentGame;
        }    

        
        // save the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(students));

        // return the data to the user
        res.status(200).json(students[id]);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// delete a resourse
router.delete('/:id', function(req, res){
    // capture the id
    var id = req.params.id;
    // open the file for reading
    const rawdata = fs.readFileSync('data.json');
        //  parse the file so we can use it
    var students = JSON.parse(rawdata);

    // if found delete
    if(students.length > id){
        students.splice(id, 1);

// write back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(students));
  // show succeful message
        res.status(200).json({message: "ok"});
    } else {
  // if no item found throw error message
        res.status(500).json({ message: "Something went wrong"});
    }
});



//  ----------------------------------------------------------------  end routes/endpoints

module.exports = router;