import React, { useState } from 'react';
import add from "../static/img/add.png";
import minus from "../static/img/minus-sign.png";

export default function StudentProfile(props) {
    const {student, onAddTag, onExpand, expandedItems} = props;
    const [tag, setTag] = useState('');

    return (
        <div className="student-main-container">
            <img src={student.pic} className="student_img" alt="" />
            <h1 className="student_name">
                {student.firstName} {student.lastName}
            </h1>
            <img
                className="expand-icon"
                src={!expandedItems[student.id] ? add : minus}
                alt=""
                onClick={() =>
                    onExpand({ [student.id]: !expandedItems[student.id] })
                }
            />
            <div className="student_profile">
                <p>Email:{student.email}</p>
                <p>Company:{student.company}</p>
                <p>Skill:{student.skill}</p>
                <p>Average:{student.average}</p>

                {student.grades.map((grade, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                display: !expandedItems[student.id]
                                    ? "none"
                                    : "block",
                            }}
                        >
                            {`Test ${index + 1}`} &emsp; {grade}
                        </div>
                    );
                })}

                {student.tags &&
                    student.tags.map((tag, index) => {
                        return (
                            <div className="tag" key={index}>
                                {tag}
                            </div>
                        );
                    })}
                <form onSubmit={(e) => {
                    onAddTag(e, student, tag)
                    setTag('')
                }}>
                    <input
                        name="tag"
                        className="student_search"
                        placeholder="Add tag"
                        required
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}
