import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getcourses } from '../../services/adminServices';
import { getCourseVideos } from '../../services/coursesService';

function GetAllCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    const res = await getcourses();
    console.log(res.data)
   
    if (res.status === 'success' && res.data) {
      setCourses(res.data);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">Available Courses</h2>
      <div className="row g-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-md-4" key={course.course_id}>
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 text-center">
                  <h5 className="fw-bold mb-2">{course.course_name}</h5>
                  <p className="text-muted small">
                    Starts: {formatDate(course.start_date)}
                  </p>
                  <button 
                    className="btn btn-primary w-100 rounded-pill"
                    onClick={() => navigate('/course-content', { state: { course } })}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5 text-muted">No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default GetAllCourses;