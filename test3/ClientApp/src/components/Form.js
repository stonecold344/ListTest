import React, { useState, useRef } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [fileSelectError, setFileSelectError] = useState(null);
  const [fileSelectSuccess, setFileSelectSuccess] = useState(null);
  const [preview, setPreview] = useState(null)
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMag] = useState("");
  const [id, setId] = useState(0)
  const imageInputRef = useRef()

    const populateListData = async () => {
        const formData = { id, title, image };
        console.log(formData)
        JSON.stringify(formData)
        console.log(JSON.stringify(formData))
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)}
        const response = await fetch("list", config);
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            setErrorMsg("");
            setSuccessMag("Upload Succeeded");
        } else {
            setSuccessMag("")
            setErrorMsg("Upload Failed!");
        }
    }


  const handleFileInput = (e) => {
      console.log(e.target.files[0])
    const file = e.target.files[0];
    const reader  = new FileReader()
    console.log(file.type)
    if (file.type === "image/png" || file.type === "image/jpeg"){
      setFileSelectSuccess({ success: "File format is acceptable!" });
      reader.onload = () =>{
        if(reader.readyState === 2){
          setPreview(reader.result)
          setImage(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
    else{
      setFileSelectError({ error: "Wrong file format!" });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    populateListData();
    setId(id + 1);
    setTitle("");
    imageInputRef.current.value = ""
    setImage(null)
    setPreview(null)
    setFileSelectSuccess("")
  };

  return (
    <div className="col-md-6 p-0 bg h-md-100 h-100">
      <div className="text1 align-items-center h-100 p-5 text-center justify-content-center">
        <div className="container d-flex justify-content-center py-2">

        </div>
              <form className="p-5" onSubmit={submitForm}>
                  <h3 className="mb-4 text-center text-">Enter Image Details</h3>
                  {errorMsg ? (<p className="text-danger">{errorMsg}</p>) : (null)}
                  {successMsg ? (<p className="text-success">{successMsg}</p>) : (null)}
          <div className="form-group p-1">
            <input
              className="form-control"
              name="name"
              type="text"
              value={title}
              onChange={(e) => {
                 setErrorMsg("")
                 setSuccessMag("")
                 setTitle(e.target.value)
              }}
              placeholder="Image Name"
              required=""
            />
          </div>

          <div className="form-group p-1">
            <div className="file-uploader">
              <input
                type="file"
                name="file"
                onChange={handleFileInput}
                onClick={() => {
                   setErrorMsg("")
                   setSuccessMag("")
                }}
                className="form-control"
                ref={imageInputRef}
              />
            </div>
            {fileSelectError ? (<p className="text-danger">{fileSelectError.error}</p>):(null)}
            {fileSelectSuccess ? (<p className="text-success p-2">{fileSelectSuccess.success}</p>):(null)}
            {preview !== null ? (<img src={preview} alt="preview" className="responsive preview"/>):(null)}

          </div>
                  <div className="p-2 ">
                      <button className="btn btn-info btn-lg " type="submit">
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default Form;
