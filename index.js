require("./database").connect();
const express = require('express');
const cors = require("cors");
const postModel = require('./Model/posts');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//
app.post("/post",async(req, res) => {
const { userId,
    title,
    body} =req.body

    await postModel.create({userId, title, body});
    return res.status(201).send("Post created successfully")

})

app.post('/addcomments',async (req, res) => {
    const {
       postId,
       body
    }=req.body;

    if(body){
       try{
        await postModel.update({"_id":postId},{$push:{"comments":body}});
        res.end("comment created successfully !")
       }
       catch(err){
        res.end("Post not exist")
        console.log(err);
       }

    }else{
        return res.send("Body is required !");
    }
})

app.get("/getposts",async (req, res) => {
    const data=await postModel.find({});
    return res.json(data);
});




const PORT=8080;
app.listen(PORT,()=>{
    console.log(`server  listening on ${PORT}`);
})