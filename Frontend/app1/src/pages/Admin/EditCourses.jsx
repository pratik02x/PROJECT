import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateCourse } from '../../services/coursesService';
import { toast } from 'react-toastify';

function EditCourse() {
    const { id } = useParams(); // URL madhun course ID ghenyasathi
    const { state } = useLocation(); // GetAllCourses madhun pathvalela data
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        course_name: '',
        description: '',
        fees: '',
        start_date: '',
        end_date: '',
        video_expire_days: ''
    });

    useEffect(() => {
        // Jeva page load hoil teva data form madhe bharne
        if (state && state.course) {
            const c = state.course;
            setCourse({
                course_name: c.course_name,
                description: c.description,
                fees: c.fees,
                // HTML date input sathi date format karne (YYYY-MM-DD)
                start_date: c.start_date ? c.start_date.split('T')[0] : '',
                end_date: c.end_date ? c.end_date.split('T')[0] : '',
                video_expire_days: c.video_expire_days
            });
        }
    }, [state]);

    const handleInput = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const onUpdate = async (e) => {
        e.preventDefault();
        
        // axios service function call karne
        const result = await updateCourse(id, course);

        if (result.status === "success") {
            toast.success("Course updated successfully!");
            navigate('getcourses'); 
        } else {
            toast.error("Update failed: " + result.error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
                <h3 className="text-center mb-4 fw-bold text-warning">Edit Course Details</h3>
                <form onSubmit={onUpdate}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Course Name</label>
                        <input type="text" name="course_name" value={course.course_name} onChange={handleInput} className="form-control" required />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea name="description" value={course.description} onChange={handleInput} className="form-control" rows="3"></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Fees (₹)</label>
                            <input type="number" name="fees" value={course.fees} onChange={handleInput} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Expire Days</label>
                            <input type="number" name="video_expire_days" value={course.video_expire_days} onChange={handleInput} className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Start Date</label>
                            <input type="date" name="start_date" value={course.start_date} onChange={handleInput} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">End Date</label>
                            <input type="date" name="end_date" value={course.end_date} onChange={handleInput} className="form-control" />
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button type="submit" className="btn btn-warning w-100 fw-bold">Update Course</button>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary w-100 fw-bold">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCourse;