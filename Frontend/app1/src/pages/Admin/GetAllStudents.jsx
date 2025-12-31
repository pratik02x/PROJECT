import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../../services/adminServices';
import { getcourses } from '../../services/coursesService';
import { toast } from 'react-toastify';

function GetAllStudents() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("All Courses");

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        const studentRes = await getAllStudents();
        const courseRes = await getcourses();
        
        if (studentRes.status === "success") setStudents(studentRes.data);
        if (courseRes.status === "success") setCourses(courseRes.data);
    };

    // Filter logic based on dropdown
    const filteredStudents = students.filter((s) => {
        if (selectedCourse === "All Courses") return true;
        return s.course === selectedCourse;
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5 fw-light" style={{ fontSize: '2.5rem', color: '#4a4a4a' }}>
                All Students
            </h2>

            {/* Filter by Course Section */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="form-label text-muted small fw-bold">Filter by Course</label>
                    <select 
                        className="form-select shadow-sm" 
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={{ borderRadius: '8px' }}
                    >
                        <option value="All Courses">All Courses</option>
                        {courses.map(c => (
                            <option key={c.course_id} value={c.course_name}>
                                {c.course_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Students Table */}
            <div className="table-responsive shadow-sm rounded-3 bg-white p-2">
                <table className="table table-hover align-middle text-center mb-0">
                    <thead style={{ backgroundColor: '#212529', color: 'white' }}>
                        <tr>
                            <th className="py-3">Reg No</th>
                            <th className="py-3">Name</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Course</th>
                            <th className="py-3">Mobile No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((s) => (
                                <tr key={s.reg_no}>
                                    <td className="fw-bold text-muted">{s.reg_no}</td>
                                    <td>{s.name}</td>
                                    <td>{s.email}</td>
                                    <td>
                                        <span className={`badge ${s.course ? 'bg-info text-dark' : 'bg-light text-muted'}`}>
                                            {s.course || "N/A"}
                                        </span>
                                    </td>
                                    <td>{s.mobile_no}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-5 text-muted">
                                    No students enrolled in this course yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetAllStudents;