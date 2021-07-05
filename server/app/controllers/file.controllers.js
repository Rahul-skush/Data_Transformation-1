exports.fileData = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;
      console.log(file)
      const d = JSON.parse(file.data)
      console.log(d)
      
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}`, fileData: d });





  };
