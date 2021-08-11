const router = require('express').Router();
const Category = require("./../database/models/category");
const Todo = require("./../database/models/todo");

// GET ALL CATEGORIES
router.get('/', (req, res) => {
    Category.find({}, (err, data)=>{
        if(err) {
            console.log(err);
            res.status(400).send({"message":err});
        }
        else res.status(200).send(data);
    });
});

// GET ONE CATEGORY BY ID
router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err);
            res.status(400).send({"message":err});
        }
        else res.status(200).send(data);
    });
})

// CREATE NEW CATEGORY
router.post('/', (req, res) => {
    Category.create({'title': req.body.title}, (err, data) => {
        if(err) {
            console.log(err);
            res.status(400).send({"message":err});
        }
        else res.status(200).send(data);
    });
});

// UPDATE CATEGORY BY ID
router.patch('/:id', (req, res) => {
    Category.findOneAndUpdate( {'_id':req.params.id}, {$set: req.body}, 
    (err, data) => {
        if(err) {
            console.log(err);
            res.status(400).send({"message":err});
        }
        else res.status(200).send(data);
    });
});

// DELETE CATEGORY BY ID
router.delete('/:id', (req, res) => {
    const deleteTodo = (category) => {
        Todo.deleteMany({'_categoryId':category._id}, (err) => {
            if(err) {
                console.log(err);
                res.status(400).send({"message": err});
            }
        });
    };
    Category.findOneAndDelete( {'_id':req.params.id}, (err, data) => {
        if(err) {
            console.log(err);
            res.status(400).send({"message":err});
        }
        else {res.status(200).send(deleteTodo(data))};
    }); 
})

module.exports = router;