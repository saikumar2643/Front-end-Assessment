import React, { useEffect, useState } from "react";
import add from "../static/img/add.png"
import minus from "../static/img/minus-sign.png"

const axios = require("axios");

function Home() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then(function (response) {
        // handle success
        setStudents(response.data.students);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  console.log(students);
  return (
    <>
      <div className="student-container">
        <div className="student-main">
          <input class="student_search" placeholder="Search by name" />
          <input class="student_search" placeholder="Search by tag" />
          {students &&
            students.map((student, index) => {
              console.log(student);
              let average =
                student.grades.reduce((acc, cur) => +acc + +cur, 0) /
                student.grades.length;
              return (
                <div class="student-main-container" key={index}>
                  <img src={student.pic} class="student_img" alt="" />
                  <h1 className="student_name">
                    {student.firstName} {student.lastName}
                  </h1>
                  <img src={add} alt="" />
                  <img src={minus} alt="" />
                  <div class="student_profile">
                    <p>Email:{student.email}</p>
                    <p>Company:{student.company}</p>
                    <p>Skill:{student.skill}</p>
                    <p>Average:{average}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
