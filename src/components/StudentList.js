import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student List</h2>
      <div style={styles.form}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={styles.input}
        />
        <input 
          placeholder="Age" 
          type="number"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          style={styles.input}
        />
        <input 
          placeholder="Grade" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          style={styles.input}
        />
        <button onClick={saveStudent} style={styles.button}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <ul style={styles.list}>
        {students.map(student => (
          <li key={student._id} style={styles.listItem}>
            <span>{student.name} - Age: {student.age}, Grade: {student.grade}</span>
            <button onClick={() => editStudent(student)} style={styles.editButton}>Edit</button>
            <button onClick={() => deleteStudent(student._id)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

export default StudentList;
