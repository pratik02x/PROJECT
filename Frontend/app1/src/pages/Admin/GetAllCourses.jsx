import React, { useEffect, useState } from 'react';
import { getcourses } from '../../services/coursesService'; // deleteCourse service add kara
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCourse } from '../../services/adminServices';

function GetAllCourses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const result = await getcourses();
        if (result.status === "success") {
            setCourses(result.data);
        }
    };

    const onDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const result = await deleteCourse(id);
            if (result.status === "success") {
                toast.success("Course deleted successfully");
                loadCourses();
            } else {
                toast.error("Error deleting course");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Courses</h2>
            <div className="table-responsive shadow-sm p-3 mb-5 bg-white rounded">
                <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th>Fees</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Expire Days</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.course_id}>
                                <td>{course.course_id}</td>
                                <td className="fw-bold">{course.course_name}</td>
                                <td>{course.description}</td>
                                <td>₹{course.fees}</td>
                                <td>{new Date(course.start_date).toLocaleDateString()}</td>
                                <td>{new Date(course.end_date).toLocaleDateString()}</td>
                                <td>{course.video_expire_days}</td>
                                <td>
                                    {/* Action Buttons */}
                                    <div className="d-flex justify-content-center gap-2">
                                        {/* Edit Button (Yellow) */}
                                        <button 
                                            onClick={() => navigate(`/edit-course/${course.course_id}`, { state: { course } })}
                                            className="btn btn-warning btn-sm shadow-sm"
                                            title="Edit Course"
                                        >
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>

                                        {/* Delete Button (Red) */}
                                        <button 
                                            onClick={() => onDelete(course.course_id)}
                                            className="btn btn-danger btn-sm shadow-sm"
                                            title="Delete Course"
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetAllCourses;