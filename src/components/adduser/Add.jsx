import React, { useState } from "react";
import "./add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const initialUser = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    mobileNo: ""
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:8000/api/create", user);
      const response = await axios.post("https://crud-server-70av.onrender.com/api/create", user);
      toast.success(response.data.msg, { position: 'top-right' });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add user", { position: 'top-right' });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="firstName"
            name="firstName"
            autoComplete="off"
            placeholder="Enter the First Name"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lastName"
            name="lastName"
            autoComplete="off"
            placeholder="Enter the Last Name"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" onChange={inputHandler} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            onChange={inputHandler}
            id="mobileNo"
            name="mobileNo"
            autoComplete="off"
            placeholder="Enter Mobile Number"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
