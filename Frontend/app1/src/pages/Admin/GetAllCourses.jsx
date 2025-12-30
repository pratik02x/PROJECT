import React, { useEffect, useState } from 'react';
import { getcourses } from '../../services/coursesService'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCourse } from '../../services/adminServices';

function GetAllCourses() {
    const [courses, setCourses] = useState([]);
   
    const [searchText, setSearchText] = useState("");
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

   
    const filteredCourses = courses.filter((course) => {
        return course.course_name.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold">All Courses</h2>

         
            <div className="row mb-4 justify-content-center">
                <div className="col-md-6">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control border-start-0" 
                            placeholder="Search course by name..." 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
            </div>

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
                        
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <tr key={course.course_id}>
                                    <td>{course.course_id}</td>
                                    <td className="fw-bold text-primary">{course.course_name}</td>
                                    <td>{course.description}</td>
                                    <td>₹{course.fees}</td>
                                    <td>{new Date(course.start_date).toLocaleDateString()}</td>
                                    <td>{new Date(course.end_date).toLocaleDateString()}</td>
                                    <td>{course.video_expire_days}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <button 
                                                onClick={() => navigate(`/edit-course/${course.course_id}`, { state: { course } })}
                                                className="btn btn-warning btn-sm shadow-sm"
                                                title="Edit Course"
                                            >
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button>

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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-muted p-4">No courses found matching "{searchText}"</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetAllCourses;