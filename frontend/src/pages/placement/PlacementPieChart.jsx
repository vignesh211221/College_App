// pages/student/PlacementPieChart.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import { getAppliedStudentsByDepartment } from "../../services/placementApi";
import { getStudents } from "../../services/studentApi"; // IMPORT this
import Navbar from "../../components/Navbar";
import "../admin/StudentList.css";

const COLORS = [
  "red", "darkblue", "#ffc658", "#ff8042", "#8dd1e1", 
  "#a4de6c", "#d0ed57", "#ffc0cb", "#ffa07a", "#b0e0e6"
];

const PlacementPieChart = () => {
  const { placementId } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // or fetch from user object
    setRole(storedRole);
  }, []);


  const fetchDepartments = async () => {
    try {
      const allStudents = await getStudents(); // GET all students
      const departmentsSet = new Set();

      // Build unique department list dynamically
      allStudents.data.forEach(student => {
        if (student.department) {
          departmentsSet.add(student.department);
        }
      });

      const departments = Array.from(departmentsSet); // Unique departments
      const pieData = [];

      for (let dept of departments) {
        try {
          const students = await getAppliedStudentsByDepartment(placementId, dept);
          if (students.length > 0) {
            pieData.push({ name: dept, value: students.length });
          }
        } catch (error) {
          // department might not have students - ignore
        }
      }

      setData(pieData);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [placementId]);

  const handleClick = (data, index) => {
    const department = data.name;
    navigate(`/applied-list/${placementId}/${department}`);
  };

  return (
    <div>
      <Navbar onLogout={() => navigate("/login")} />
      <br />
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
      <button
          onClick={() => {
            if (role === "admin") {
              navigate("/admin-dashboard");
            } else if (role === "placementofficer") {
              navigate("/placement-dashboard");
            } else {
              toast.error("Unauthorized role");
            }
          }}
          className="dash-btn"
        >
          Back to Dashboard
        </button>
        <br></br>
        <br></br>
      <h2 className="header" style={{ textAlign: "center", margin: "20px" }}>
        Applied Students by Department
      </h2>

      {data.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>No applied students found.</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart width={500} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              onClick={handleClick}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  cursor="pointer"
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default PlacementPieChart;
