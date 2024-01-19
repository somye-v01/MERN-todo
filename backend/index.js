const express = require('express')
const {postToDo,hasCompleted} = require("./types.js");
const {todoModel} = require("./db"); 
const app = express()
const port = 3000

app.use(express.json());

app.post('/todo', async(req, res) => {
    const temp_payload = req.body;
    const payload = postToDo.safeParse(temp_payload);
    if(!payload.success){
        return res.status(411).send({message: "please use words"}); //return in next ln
    }
//   res.send('Hello World!')
    await todoModel.create({
        title: payload.title,
        description:payload.description,
        completed:false
    });
    res.send({message:"Task added successfully"});
})

app.get('/todos',async (req, res) => {
    // res.send('Hello World!')
    const todos = await todoModel.find({});
    console.log(todos);
    res.json(todos);
  })
  
app.put('/completed',async(req, res) => {
    // res.send('Hello World!')
    const payload = req.body;
    const id = hasCompleted.safeParse(payload);
    if(!id.success){
        res.status(411).json({
            message: "Invalid id format"
        });
        return;
    }
    await todoModel.updateOne({
        _id: req.body.id
    },{
        completed:true
    });
    res.send({message:"Task completed successfully!"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})