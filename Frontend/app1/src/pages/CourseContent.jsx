import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCourseVideos } from '../services/coursesService'

function CourseContent() {
  const { state } = useLocation()
  const course = state?.course
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    const res = await getCourseVideos()
    console.log(res.data)
    if (res.status === 'success' && res.data) {
      // console.log("success")
      const filteredVideos = res.data.filter(v => v.course_id === course.course_id);
      setVideos(filteredVideos);
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  if (!course) return <div className="container mt-5 text-center"><h5>Loading...</h5></div>

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">Course Dashboard</h2>
      <div className="card shadow-sm border-primary mb-4" style={{ borderRadius: '10px' }}>
        <div className="card-header bg-primary text-white p-3">
          <h5 className="mb-0 fw-bold">{course.course_name} — Content</h5>
        </div>
        <div className="card-body p-4">
          
          <div className="mb-4 p-3 bg-light rounded border-start border-4 border-primary">
            <p className="mb-1"><strong>Start Date:</strong> {formatDate(course.start_date) || "Not Available"}</p>
            <p className="mb-0"><strong>End Date:</strong> {formatDate(course.end_date) || "To Be Announced"}</p>
          </div>

          <h5 className="fw-bold border-bottom pb-2 mb-3 text-secondary">Videos</h5>
          <div className="list-group list-group-flush">
            {videos.length > 0 ? (
              videos.map((v) => (
                <div key={v.video_id} className="list-group-item d-flex align-items-center py-3 border-0 border-bottom">
                  <div className="me-3">
                    <i className="bi bi-play-circle-fill text-primary fs-4"></i>
                  </div>
                  <div>
                    <a href={v.youtube_url} target="_blank" rel="noreferrer" className="text-decoration-none fw-bold text-dark d-block">
                      {v.title}
                    </a>
                    <small className="text-muted">Video Lecture</small>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-4">No courses Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseContent