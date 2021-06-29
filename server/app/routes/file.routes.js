module.exports = app => {
    const file= require("../controllers/file.controllers")
    
    //Parsing file into desired format
    app.post("/file", file.fileData);
 
  };