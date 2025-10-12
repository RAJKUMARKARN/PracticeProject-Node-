const express= require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;

//middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({exrtended: true}));
app.use(express.static(path.join(__dirname,"public")));

 app.get("/", (req,res)=>{
    fs.readdir(`./files`, (err,files)=>{
    res.status(200).render("index",{files: files});
    })
    
 })
 //reads files in english file name  and file discription
 app.get("/files/:filename", (req, res)=>{
   fs.readFile(`./files/${req.params.filename}`,'utf-8' , (err,filedata)=>{
   res.render('show',{filename: req.params.filename, filedata, filedata: filedata})

   })

 })

 //re renders the page to edit.ejs

  app.get("/edit/:filename", (req, res)=>{
  
   res.render('edit', {filename: req.params.filename});

   })

    // edits the page title and also the file name

   app.post("/edit", (req, res)=>{
  
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.New}`, (err)=>{
        res.redirect("/")
        })

   })
 // this is a commi6
   // creates the name of the file and the discription and also adds the texttogether like nigga 1.txt to nigga.txt and also saves the file to files folder
 app.post('/create',(req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details, (err)=>{
        res.redirect('/');
    })
 })





//server listens here 
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})