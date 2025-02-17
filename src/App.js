import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const FormComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    email: "",
    mobile: "",
    gender: "",
    sslc: "",
    hsc: "",
    sslcSchool: "",
    sslcGrade: "",
    hscSchool: "",
    hscGrade: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("editingId");
    if (storedId) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userToEdit = users.find((user) => user.id === Number(storedId));
      if (userToEdit) {
        setFormData(userToEdit);
        setEditingId(userToEdit.id);
      }
      localStorage.removeItem("editingId");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (editingId) {
      users = users.map((user) => (user.id === editingId ? formData : user));
    } else {
      users.push(formData);
    }

    localStorage.setItem("users", JSON.stringify(users));
    navigate("/details");
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="form-card"> 
        <h2 className="mb-4 neon-title">{editingId ? "Edit User Details" : "User Details Form"}</h2>
        <form onSubmit={handleSubmit} className="w-100 max-w-600">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control neon-input" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control neon-input" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input type="number" className="form-control neon-input" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-control neon-input" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Completed SSLC?</label>
            <select className="form-control neon-input" name="sslc" value={formData.sslc} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {formData.sslc === "Yes" && (
            <>
              <div className="mb-3">
                <label className="form-label">10th School Name</label>
                <input type="text" className="form-control neon-input" name="sslcSchool" value={formData.sslcSchool} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">10th Grade</label>
                <input type="number" className="form-control neon-input" name="sslcGrade" value={formData.sslcGrade} onChange={handleChange} required />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label">Completed HSC?</label>
            <select className="form-control neon-input" name="hsc" value={formData.hsc} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {formData.hsc === "Yes" && (
            <>
              <div className="mb-3">
                <label className="form-label">12th School Name</label>
                <input type="text" className="form-control neon-input" name="hscSchool" value={formData.hscSchool} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">12th Grade</label>
                <input type="number" className="form-control neon-input" name="hscGrade" value={formData.hscGrade} onChange={handleChange} required />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary neon-button">{editingId ? "Update" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};


const DetailsPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, []);

  const handleEdit = (id) => {
    localStorage.setItem("editingId", id);
    navigate("/");
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
    if (isConfirmed) {
      const updatedUsers = users.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };
  
  return (
    <div className="container">
      <h2 className="mb-4 neon-title">User Details</h2>
      <button className="btn btn-primary mb-3 neon-button" onClick={() => navigate("/")}>Home</button>
      {users.length > 0 ? (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>SSLC</th>
                <th>SSLC School</th>
                <th>SSLC Grade</th>
                <th>HSC</th>
                <th>HSC School</th>
                <th>HSC Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>{user.sslc}</td>
                  <td>{user.sslcSchool}</td>
                  <td>{user.sslcGrade}</td>
                  <td>{user.hsc}</td>
                  <td>{user.hscSchool}</td>
                  <td>{user.hscGrade}</td>
                  <td>
                    <div className="button-container">
                      <button className="btn btn-warning" onClick={() => handleEdit(user.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p>No data found.</p>}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
