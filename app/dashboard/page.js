
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import '../styles/Auth.css';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2 style={{textAlign:"center",fontWeight:"800",marginBottom:"10px"}}>Dashboard</h2>

      <table className="border-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>birth_year</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.company_name}</td>
              <td>{u.designation}</td>
              <td>{u.gender}</td>
              <td>{u.birth_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}