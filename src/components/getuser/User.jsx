import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./user.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

   // Pagination calculations
   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
 
   const totalPages = Math.ceil(users.length / usersPerPage);
 
   // Handle page change
   const handleNextPage = () => {
     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
   };
 
   const handlePrevPage = () => {
     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("http://localhost:8000/api/getall");
        const response = await axios.get("https://crud-server-70av.onrender.com/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users", { position: "top-right" });
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
        const response = await axios.delete(`https://crud-server-70av.onrender.com/api/delete/${userId}`);
        
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success(response.data.msg, { position: "top-right" });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user", { position: "top-right" });
      }
    }
  };

 

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">Add User</Link>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>Gender</th>
            <th>User Email</th>
            <th>Mobile No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.mobileNo}</td>
              <td className="actionsButton">
                <button onClick={() => deleteUser(user._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <Link to={`/edit/${user._id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default User;
