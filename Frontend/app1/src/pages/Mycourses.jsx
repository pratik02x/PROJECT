import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyRegisteredCourses } from '../services/userServices'

function Mycourses() {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await getMyRegisteredCourses()
    if (res.status === "success" && res.data) {
      setCourses(res.data)
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary mb-4">My Enrolled Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-lg-4 col-md-6 mb-4" key={course.course_id}>
            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="p-3 bg-light text-center" style={{ height: "180px" }}>
                <img src={`/images/${course.image}`} className="img-fluid" alt={course.course_name} style={{ maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div className="card-body text-center">
                <h5 className="fw-bold">{course.course_name}</h5>
                {/* state pathvne garjeche aahe */}
                <button 
                  onClick={() => navigate('/course-content', { state: { course } })}
                  className="btn btn-primary w-100 fw-bold mt-2"
                >
                  Go to Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mycourses