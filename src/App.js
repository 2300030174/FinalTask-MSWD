import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<StudentList />} />           {/* Default Route */}
        <Route path="/studentlist" element={<StudentList />} /> {/* Student List Route */}
        <Route path="/facultylist" element={<FacultyList />} /> {/* Faculty List Route */}
      </Routes>
    </Router>
  );
}

export default App;
