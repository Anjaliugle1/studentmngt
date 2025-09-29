import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({ name: "", email: "", course: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:8080/api/students");
    setStudents(response.data);
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const createStudent = async () => {
    await axios.post("http://localhost:8080/api/students", student);
    fetchStudents();
    setStudent({ name: "", email: "", course: "" });
  };

  const updateStudent = async () => {
    await axios.put(`http://localhost:8080/api/students/${editingId}`, student);
    fetchStudents();
    setEditingId(null);
    setStudent({ name: "", email: "", course: "" });
  };

  const editStudent = (student) => {
    setEditingId(student.id);
    setStudent(student);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-4">
      <h2>Student Management System</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
        />
        <button onClick={editingId ? updateStudent : createStudent}>
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.course}</td>
              <td>
                <button onClick={() => editStudent(stu)}>Edit</button>
                <button onClick={() => deleteStudent(stu.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
