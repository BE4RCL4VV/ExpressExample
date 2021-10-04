// dependencies
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

        var newObj = req.body;

        newObj._id = 1;
        // add our new object ot the array
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
    res.status(200).json({ message: "edited the resource"});
});

// delete a resourse
router.delete('/:id', function(req, res){
    res.status(200).json({ message: "deleted the resoure"});
});



//  ----------------------------------------------------------------  end routes/endpoints

module.exports = router;