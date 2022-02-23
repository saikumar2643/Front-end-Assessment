import React, { useEffect, useState } from "react";
import StudentProfile from "../components/StudentProfile";


const axios = require("axios");

function Home() {
    const [students, setStudents] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);
    const [filter, setFilter] = useState({
        name: "",
        tag: "",
    });

    const onExpand = (student) => {
        setExpandedItems((prev) => ({
            ...prev,
            ...student,
        }));
    };

    const onAddTag = (e, student, value) => {
        e.preventDefault();

        if (!student.tags) {
            student.tags = [];
        }
        student.tags.push(value);

        setStudents((prev) =>
            prev.map((s) => {
                return s.id === student.id ? student : s;
            })
        );
    };

    const onSearchChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        axios
            .get("https://api.hatchways.io/assessment/students")
            .then(function (response) {
                setStudents(response.data.students.map(student => {
                    student.average = student.grades.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0) / student.grades.length;
                    return student
                }));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="student-container">
                <div className="student-main">
                    <input
                        name="name"
                        onChange={onSearchChange}
                        className="student_search"
                        placeholder="Search by name"
                    />
                    <input
                        name="tag"
                        onChange={onSearchChange}
                        className="student_search"
                        placeholder="Search by tag"
                    />
                    {students && students.filter((s) => {
                        return (
                            (`${s.firstName} ${s.lastName}`).toLowerCase().includes(filter.name.toLowerCase()) &&
                            (filter.tag.length ? (s.tags && s.tags.find((str) => str.toLowerCase().includes(filter.tag.toLowerCase()))) !== undefined : true)
                        );
                    }).map((student, index) => {
                        return (
                            <StudentProfile 
                                key={student.id}
                                student={student}
                                onAddTag={onAddTag}
                                onExpand={onExpand}
                                expandedItems={expandedItems} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;
