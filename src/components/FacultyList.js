// frontend/src/components/FacultyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    marginTop: '20px',
    width: '100%',
  },
  listItem: {
    backgroundColor: '#e3f2fd',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    padding: '5px 10px',
    marginLeft: '5px',
    backgroundColor: '#0080FF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    marginLeft: '5px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_FACULTY_API_URL;

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, department, designation };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setDesignation('');
      fetchFaculties();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculties();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (faculty) => {
    setEditingId(faculty._id);
    setName(faculty.name);
    setDepartment(faculty.department);
    setDesignation(faculty.designation);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Faculty List</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <button
          style={{ ...styles.button, backgroundColor: editingId ? '#0080FF' : '#4CAF50' }}
          onClick={saveFaculty}
        >
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>

      <ul style={styles.list}>
        {faculties.map(faculty => (
          <li key={faculty._id} style={styles.listItem}>
            <span>
              {faculty.name} - Department: {faculty.department}, Designation: {faculty.designation}
            </span>
            <div>
              <button
                style={styles.editButton}
                onClick={() => editFaculty(faculty)}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => deleteFaculty(faculty._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
