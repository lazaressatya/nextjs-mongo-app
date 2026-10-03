"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  async function loadEmployees() {
    const response = await fetch("/api/employees");

    const data = await response.json();

    setEmployees(data);
  }

  async function addEmployee(event) {
    event.preventDefault();

    await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        department
      })
    });

    setName("");
    setEmail("");
    setDepartment("");

    loadEmployees();
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1>Employee Management</h1>

      <form onSubmit={addEmployee}>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Add Employee
        </button>

      </form>

      <hr />

      <h2>Employees</h2>

      {employees.map((employee) => (
        <div key={employee._id}>
          <p>
            <strong>{employee.name}</strong>
            {" - "}
            {employee.email}
            {" - "}
            {employee.department}
          </p>
        </div>
      ))}
    </main>
  );
}