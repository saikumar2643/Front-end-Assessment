import React, { useEffect, useState } from "react";
import add from "../static/img/add.png"
import minus from "../static/img/minus-sign.png"

const axios = require("axios");

function Home() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);
    const [filter, setFilter] = useState({
        name: '',
        tag: ''
    })

    const onExpand = (student) => {
        setExpandedItems(prev => ({
            ...prev,
            ...student
        }))
    }

    const addTag = (student, e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (!student.tags) {
            student.tags = []
        }
        student.tags.push(formProps.tag);
        e.target.reset()

        setStudents(prev => (prev.map(s => {
            return s.id === student.id ? student : s
        })));
    }

    const onSearchChange = (e) => {
        const {name, value} = e.target;
        setFilter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        axios
            .get("https://api.hatchways.io/assessment/students")
            .then(function (response) {
                setStudents(response.data.students);
                setFilteredStudents(response.data.students);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setFilteredStudents(students.filter(s => {
            return (s.firstName.includes(filter.name) || s.lastName.includes(filter.name)) && (filter.tag.length ? (s.tags && s.tags.find(str => str.includes(filter.tag))) !==undefined : true)
        }))

    }, [filter])

    console.log(filter);

    return (
        <>
            <div className="student-container">
                <div className="student-main">
                    <input name="name" onChange={onSearchChange} className="student_search" placeholder="Search by name" />
                    <input name="tag" onChange={onSearchChange} className="student_search" placeholder="Search by tag" />
                    {filteredStudents &&
                        filteredStudents.map((student, index) => {
                            let average =
                                student.grades.reduce((acc, cur) => +acc + +cur, 0) /
                                student.grades.length;
                            return (
                                <div className="student-main-container" key={index}>
                                    <img src={student.pic} className="student_img" alt="" />
                                    <h1 className="student_name">
                                        {student.firstName} {student.lastName}
                                    </h1>
                                    <img
                                        className="expand-icon"
                                        src={!expandedItems[student.id] ? add : minus}
                                        alt=""
                                        onClick={() => onExpand({ [student.id]: !expandedItems[student.id] })} />
                                    <div className="student_profile">
                                        <p>Email:{student.email}</p>
                                        <p>Company:{student.company}</p>
                                        <p>Skill:{student.skill}</p>
                                        <p>Average:{average}</p>

                                        {student.grades.map((grade, index) => {
                                            return (
                                                <div key={index} style={{
                                                    display: !expandedItems[student.id] ? 'none' : 'block'
                                                }}>
                                                    {`Test ${index + 1}`} &emsp; {grade}
                                                </div>
                                            )
                                        })}

                                        {student.tags && student.tags.map((tag, index) => {
                                            console.log(tag);
                                            return (
                                                <div key={index}>
                                                    {tag}
                                                </div>
                                            )
                                        })}
                                        <form onSubmit={(e) => addTag(student, e)}>
                                            <input name="tag" className="student_search" placeholder="Add tag" required />
                                        </form>
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
