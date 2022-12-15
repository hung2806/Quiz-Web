const express = require('express');
const mongodb = require('mongodb');
const app = express();
const cors = require('cors');
// serve static files (html, css, js, images...)
app.use(express.static('public'));
//use cors
app.use(cors());
// decode req.body from form-data
app.use(express.urlencoded({ extended: true }));
// decode req.body from post body message
app.use(express.json());




//ass3
app.post('/questions', async function (req, res){
    const question = req.body;
    const abc = await db.collection('questions').insertOne(question);
    res.status(201).end(); 
});



app.put('/questions/:id', async function (req, res){
    const id = req.params.id;
    const Ques_text = req.body.text;
    const Ques_answers = req.body.answers;
    const Ques_correctAnswer = req.body.correctAnswer;
    const check = await db.collection('questions').find({_id: mongodb.ObjectId(id)}).count() > 0;
    if(check !== true){
        res.status(404).end();
    }
    else {
        const result = await db.collection('questions').updateOne({
            _id: mongodb.ObjectId(id)}
        ,{
            $set:{
                text: Ques_text,
                answers: Ques_answers,
                correctAnswer: Ques_correctAnswer
            }
        });
        res.status(200).end();
    }
});

app.get('/questions', async function (req, res){
    const questions = await db.collection('questions').find().toArray();
    res.status(200).json(questions);
});

app.delete('/questions/:id', async function (req, res){
    const id = req.params.id;
    const result = await db.collection('questions').deleteOne({_id: mongodb.ObjectId(id)});
    res.status(200).end(); 
});

app.get('/questions/:id', async function (req, res){
    const id = req.params.id;
    const check = await db.collection('questions').find({_id: mongodb.ObjectId(id)}).count() > 0;
    if(!check) {
        res.status(404).end();
    } 
    else {
        const output = await db.collection('questions').findOne({_id: mongodb.ObjectId(id)});
        res.status(200).json(output);
    }
});

//connect db
let db = null;
async function startSever() {

    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/wpr-quiz');
    db = client.db();

    console.log('connected to db.');
    app.listen(3001, function() {
        console.log('Listening on port 3001!');
    });
}
startSever();