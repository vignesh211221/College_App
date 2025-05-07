// AppliedStudentList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAppliedStudentsByDepartment } from '../../services/placementApi';
import Navbar from '../../components/Navbar';
import '../admin/StudentList.css'; // Import the CSS file

const AppliedStudentList = () => {
    const navigate = useNavigate();
  const { placementId, department } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getAppliedStudentsByDepartment(placementId, department);
      setStudents(data);
    };
    fetchStudents();
  }, [placementId, department]);

  return (
    <div>
        <Navbar onLogout={() => navigate("/login")} />
            <br></br>
        <button onClick={() => navigate(-1)} className="back-btn">
            Back
        </button>
        <br></br>
        <br></br>
        <div className="student-list-container">

      <h2 className="header">Applied Students - {department}</h2>
      <div className="table-wrapper">
        {students.length === 0 ? (
          <p className="no-data">No students applied from {department}</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Register Number</th>
                <th>Phone Number</th>
                <th>Regulation</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>10th Mark</th>
                <th>12th Mark</th>
                <th>Class Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.user?.username}</td>
                  <td>{student.user?.email}</td>
                  <td>{student.registerNumber}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.regulation}</td>
                  <td>{student.semester}</td>
                  <td>{student.cgpa}</td>
                  <td>{student.tenthMark}</td>
                  <td>{student.twelfthMark}</td>
                  <td>{student.className}</td>
                  <td>{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default AppliedStudentList;
