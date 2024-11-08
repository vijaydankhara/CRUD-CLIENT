import React, { useState } from "react";
import "./add.css";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";


const Add = () => {

const users = {
  fname: "",
  lname: "",
  email: "",
  password: ""
}
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandal = (e) => { 
    const { name, value } = e.target; 
     setUser({...user,  [name]:value});
     console.log(user);
 
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create",user)
    .then((response) =>{
     toast.success(response.data.msg, {position: 'top-right'})
     navigate("/")
    }).catch(error => console.log(error))
  }

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form onSubmit={submitForm}>
        <div className="inputrGroup">
          <label htmlFor="fname">Frist Name</label>
          <input
            type="text"
            onChange={inputHandal}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="Enter The Frist Name"
          />
        </div>

        <div className="inputrGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            onChange={inputHandal}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Enter The Frist Name"
          />
        </div>

        <div className="inputrGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={inputHandal}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputrGroup">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            onChange={inputHandal}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
        </div>

        <div className="inputrGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  );
}

export default Add;
