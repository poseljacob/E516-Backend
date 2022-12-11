import { React, useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function Upload() {
  const [url, setURL] = useState("");
  const [data, setData] = useState({age: "", gender: ""});
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [complete, setComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  const onImageChange = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", e.target.files[0]);
    setLoading(true)
    axios.post("https://faceapi.link", data).then((resp) => {
      setURL(URL.createObjectURL(e.target.files[0]));
      setData(resp.data);
      setLoading(false)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      "age": age,
      "gender": gender,
      "ethnicity": ethnicity,
      "predicted_age": data['age'],
      "predicted_gender": data['gender']
    }
    axios.post("https://faceapi.link/submit", submitData).then((resp) => {
      console.log(resp.data)
    })
    setAge("")
    setGender("")
    setEthnicity("")
    setData("")
    setURL("")
    setComplete(true)
    console.log(submitData)
  }

  let style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  let img_style = {
    maxWidth: "70vh",
    marginLeft: "5vh",
    maxHeight: "60vh",
  };

  let inputStyle = {
    margin: "1rem"
  }

  let inputStyleSubmit = {
    margin: "1rem",
    size: "10rem"
  }

  if (!complete) {
  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
    <div style={style}>
      <h1>Enter your details</h1>
    <div style = {inputStyle}>
    <div>
      <h5>Age</h5>
    </div>
      <label>
        True Age:
        <input 
          type="number"
          name="age" 
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </label>
      </div>
      <div style = {inputStyle}>
      <div>
          <h5>Gender</h5>
        </div>
      <label>Male</label>
        <input 
        type="checkbox" 
        name="Male" 
        value="Male" 
        onChange={(e) => setGender(e.target.value)}
        />
      <label>Female</label>
        <input 
        type="checkbox" 
        name="Female" 
        value="Female" 
        onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <div style = {inputStyle}>
        <div>
          <h5>Race/Ethnicity</h5>
        </div>
      <label>American Indian or Alaska Native</label>
        <input 
        type="checkbox" 
        name="American Indian or Alaska Native" 
        value="American Indian or Alaska Native" 
        onChange={(e) => setEthnicity(e.target.value)}
        />
        <br></br>
      <label>Asian</label>
        <input 
        type="checkbox" 
        name="Asian" 
        value="Asian" 
        onChange={(e) => setEthnicity(e.target.value)}
        />
      <br></br>
      <label>Black or African American</label>
        <input 
        type="checkbox" 
        name="Black or African American" 
        value="Black or African American" 
        onChange={(e) => setEthnicity(e.target.value)}
        />
        <br></br>

      <label>Hispanic or Latino</label>
        <input 
        type="checkbox" 
        name="Hispanic or Latino" 
        value="Hispanic or Latino" 
        onChange={(e) => setEthnicity(e.target.value)}
        />
                <br></br>

      <label>Native Hawaiian or Other Pacific Islander</label>
        <input 
        type="checkbox" 
        name="Native Hawaiian or Other Pacific Islander" 
        value="Native Hawaiian or Other Pacific Islander" 
        onChange={(e) => setEthnicity(e.target.value)}
        />
                <br></br>
      <label>White</label>
        <input 
        type="checkbox" 
        name="White" 
        value="White" 
        onChange={(e) => setEthnicity(e.target.value)}
        />
                <br></br>
      <label>Other</label>
        <input 
        type="checkbox" 
        name="Other" 
        value="Other" 
        onChange={(e) => setEthnicity(e.target.value)}
        />

      
      </div>
      <div style = {inputStyle}>
      <div>
        <h5>Image of face</h5>
      </div>
      <label>
        Upload Image:
        <input 
          type="file"
          multiple accept="image/*" 
          onChange={onImageChange} />
        </label>
      </div>
      <div>
        <img style={img_style} src={url} />
        {url && (
          <p>
            Predicted Age: {data.age}, Predicted Gender: {data.gender}
          </p>
        )}
      </div>
      <div >
      {loading ? <LoadingSpinner /> : (
        <input style = {inputStyleSubmit} type="submit" value="Submit" />
        )}
      </div>
    </div>
    </form>
    </div>
    </>
  )
  } else {
    return (
      <div style={style}>
        <h1>Thank you for participating!</h1>
      </div>
    )
  }
}

export default Upload;
