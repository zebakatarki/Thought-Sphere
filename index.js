const express=require("express");
const app=express();

const port=8080;
const path=require("path");

//require uuid package to generate id automatically
const { v4: uuidv4 } = require('uuid');

//method-overrid package to change the routes
const methodOverride = require("method-override");
  

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let chaters=[
    {
        id:uuidv4(),
        username:"Zeba_09",
        chat:"\"Kindness is a powerful force that has the ability to create positive ripples in the world. Small acts of kindness can make a big difference in someone's day and contribute to a more compassionate and connected society.\"",
        phoneno:"9902133414",
        location:"Karnataka",
        password:"user1",

    },
];

//Home page
app.get("/chaters",(req,res)=>{
     res.render("index.ejs",{ chaters });
});

//Providing the new post
app.get("/chaters/new",(req,res)=>{
    res.render("new.ejs");
});

//when submit is clicked the data from new post push into the array via post request  to the home page
app.post("/chaters",(req,res)=>{
    //we fetch the username and chat from request body
    let {username, chat, phoneno, location, password}=req.body;

    let id=uuidv4();
    console.log("new post ID:",id);

    //pushing data in the form of objects
    chaters.push({id, username, chat, phoneno, location, password});
    res.redirect("/chaters");
});

//View Password Confirm Form
app.get("/chaters/privacypassword",(req,res)=>{
    // res.send("Working");
    res.render("idconfirm.ejs"); 
})

//view password check
app.post("/chaters/viewpassword",(req,res)=>{ 
    let{password}=req.body;
    console.log("Confirm password:",password);
    
    let chater=chaters.find((c)=>password === c.password);

    if(chater){
        res.render("view.ejs",{chater});
    }else{
        res.render("iderror.ejs");
    }

});

//Update content
app.get("/chaters/editpassword",(req,res)=>{ 
    res.render("addcontent.ejs");
});

app.patch("/chaters/editpwerror",(req,res)=>{
    let {content, password}=req.body;
    let newChat=content;
    let chater=chaters.find((c)=>password === c.password);

    if(chater){
        console.log("Working");
        chater.chat=newChat;
        
    }else{
        res.render("iderror1.ejs",{chater});
    }
    res.redirect("/chaters")
});

//Delete Post
app.post("/chaters/:id",(req,res)=>{
    let id=req.params.id;
    res.render("deleteconfirm.ejs",{id});
});

app.post("/chaters/delete1/:id",(req,res)=>{
    let newid=req.params.id;
    chaters=chaters.filter((c)=> c.id !== newid);
    res.redirect("/chaters");
    
});

//Server testing path
app.listen(port,()=>{
    console.log("Listening to port :8080");
});


