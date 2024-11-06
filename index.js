import express from 'express';
import data from './data/mock.json' assert { type: 'json' };

const app = express();

const PORT = 8000;

//Using the public folder 
app.use(express.static("public"));

//Using the imgae foder at the route /images
app.use('/images',express.static('images'));

//Using express.json and express urlencoded
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Post -express.json and express.urlencoded
app.post('/item',(req,res) => {
    console.log(req.body);
    res.send(req.body)
})



//Route Changing
app
    .route('/class')
    .get((req,res) => {
        res.send('Retrieve class info')
    })
    .post((req,res) => {
        res.send("Create class info");
    })
    .put((req,res) => {
        res.send('Update class info')
    })
    ;

//GET
app.get('/',(req,res)=>{
    res.json(data);
});

//GET -download method
app.get('/download',(req,res) =>{
    res.download('images/11.jpg')
})

//GET - redirect method
app.get('/redirect',(req,res) => {
    res.redirect('https://www.youtube.com/')
})

//GET with next()
app.get('/next',(req,res,next) => {
    console.log('The response will send')
    next();
},(req,res) =>{
    res.send('I just set up a route with a second callback.')
}
);

//GET with Routing parameters
app.get('/class/:id',(req,res)=>{
    const studentId = Number(req.params.id);
    const student = data.filter((student)=>(
        student.id === studentId
    ))
    console.log(student)
    res.send(student)

});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Somthing is broken')
})

app.listen(PORT,() => {
    console.log(`The server is running on port ${PORT}`);
});
