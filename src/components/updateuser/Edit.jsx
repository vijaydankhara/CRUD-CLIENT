import React, { useEffect, useState } from "react";
import "./edit.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const users = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    gender: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(users);

  const InputChangeHandal = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      // .get(`http://localhost:8000/api/getone/${id}`)
      .get(`https://crud-server-70av.onrender.com/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .put(`http://localhost:8000/api/update/${id}`, user)
      .put(`https://crud-server-70av.onrender.com/api/update/${id}`, user)
      .then(() => {
        console.log("User updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form onSubmit={handleSubmit}>
        <div className="inputrGroup">
          <label htmlFor="firstName">Frist Name</label>
          <input
            type="text"
            onChange={InputChangeHandal}
            value={user.firstName}
            id="firstName"
            name="firstName"
            autoComplete="off"
            placeholder="Enter The Frist Name"
          />
        </div>

        <div className="inputrGroup">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            onChange={InputChangeHandal}
            value={user.lastName}
            id="lastName"
            name="lastName"
            autoComplete="off"
            placeholder="Enter The Frist Name"
          />
        </div>
        <div className="inputrGroup">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            onChange={InputChangeHandal}
            value={user.mobileNo}
            id="mobileNo"
            name="mobileNo"
            autoComplete="off"
            placeholder="Enter the Mobile Number"
          />
        </div>

        <div className="inputrGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={InputChangeHandal}
            value={user.email}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputrGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
