import React, { Fragment, useState, useCallback } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
//import DropZone from '../test'
import {useDropzone} from 'react-dropzone'


const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  
  //console.log(props)
  // const onChange = e => {
  //   setFile(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  // };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    console.log("*****")
    console.log(file)
    formData.append('file', file);

    try {
      const res = await axios.post("http://localhost:3000/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath, fileData } = res.data;

      // console.log(fileData)

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
       

 axios.post("http://localhost:3000/stageDetail",{data:fileData, jobId:props.id })

  props.settingFinish()



    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
    

  };


  const onDrop = useCallback((e) => {
    
    const file=e[0]
    console.log(file)
        

    setFile(file);
    setFilename(file.name)
      }, [])



      const {getRootProps, getInputProps} = useDropzone({onDrop})






  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}


      <form onSubmit={onSubmit}>

      <div {...getRootProps()} style={{backgroundColor: "lightblue"}}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      
    </div>


        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            // onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
    
    </Fragment>
  );
};

export default FileUpload;