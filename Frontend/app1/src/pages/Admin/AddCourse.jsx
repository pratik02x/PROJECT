import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../services/adminServices';
import { toast } from 'react-toastify';

function AddCourse() {
  const [course, setCourse] = useState({
    course_name: '',
    description: '',
    fees: '',
    start_date: '',
    end_date: '',
    video_expire_days: ''
  });
  
  const [imageFile, setImageFile] = useState(null); // Desktop image साठी
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // निवलेली पहिली फाईल
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // FormData तयार करा
    const formData = new FormData();
    formData.append('course_name', course.course_name);
    formData.append('description', course.description);
    formData.append('fees', Number(course.fees));
    formData.append('start_date', course.start_date);
    formData.append('end_date', course.end_date);
    formData.append('video_expire_days', Number(course.video_expire_days));
    
    if (imageFile) {
        // 'course_image' हे नाव तुमच्या Backend मधील upload.single('course_image') शी मॅच हवे
        formData.append('course_image', imageFile); 
    }

    const res = await addCourse(formData);
    
    if (res.status === 'success') {
      toast.success("Course added successfully!");
      navigate('/get-all-courses');
    } else {
      toast.error(res.error || "Error adding course");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-primary text-white p-3 text-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
              <h4 className="mb-0 fw-bold">Create New Course</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Course Name</label>
                  <input type="text" name="course_name" className="form-control" onChange={handleInput} required />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea name="description" className="form-control" onChange={handleInput} rows="2" required></textarea>
                </div>

                {/* File Upload Section */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Course Image (Desktop)</label>
                  <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} required />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Fees (₹)</label>
                    <input type="number" name="fees" className="form-control" onChange={handleInput} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Video Expire (Days)</label>
                    <input type="number" name="video_expire_days" className="form-control" onChange={handleInput} required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Start Date</label>
                    <input type="date" name="start_date" className="form-control" onChange={handleInput} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">End Date</label>
                    <input type="date" name="end_date" className="form-control" onChange={handleInput} required />
                  </div>
                </div>

                <div className="mt-4 d-grid gap-2">
                  <button type="submit" className="btn btn-primary py-2 fw-bold rounded-pill shadow-sm">Register Course</button>
                  <button type="button" className="btn btn-light py-2 fw-bold rounded-pill" onClick={() => navigate(-1)}>Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;