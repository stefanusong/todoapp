const router = require('express').Router();
const Todo = require('./../database/models/todo');


// GET ALL TODOS
router.get('/:categoryId', (req, res) => {
    Todo.find({'_categoryId': req.params.categoryId}, (err, data) => {
        if(err) {
            console.log(err);
            res.status(400).send({"message":err});
        }
        else res.status(200).send(data);
    });
});

// GET ONE TODO
router.get('/:categoryId/:todoId', (req, res) => {
    Todo.findById(req.params.todoId, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send({"message":err});
        } else {
            res.status(200).send(data);
        }
    });
});

// CREATE TODO
router.post('/:categoryId', (req, res) => {
    Todo.create({'title': req.body.title, '_categoryId':req.params.categoryId}, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send({"message":err});
        }
        else res.status(200).send(data);
    });
});

// UPDATE TODO
router.patch('/:categoryId/:todoId', (req, res) => {
    Todo.findOneAndUpdate({'_id':req.params.todoId}, {$set: req.body}, 
    (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send({"message":err});
        } else res.status(200).send(data);
    });
});

// DELETE TODO
router.delete('/:categoryId/:todoId', (req,res) => {
    Todo.findOneAndDelete({'_id':req.params.todoId}, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send({"message":err});
        } else{
            res.status(200).send(data);
        }
    });
});


module.exports = router;