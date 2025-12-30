import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVideo } from '../../services/adminServices'; 
import { getcourses } from '../../services/coursesService';
import { toast } from 'react-toastify';

function AddVideo() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [video, setVideo] = useState({
        course_id: '',
        title: '',
        youtube_url: '',
        description: ''
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const result = await getcourses();
        if (result.status === "success") {
            setCourses(result.data);
        }
    };

    const handleInput = (e) => {
        setVideo({ ...video, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        
        if (!video.course_id || !video.title || !video.youtube_url) {
            toast.error("Please fill all required fields!");
            return;
        }

        const result = await addVideo(video);
       

        if (result.status === "success") {
            toast.success("New Video Added Successfully!");
            navigate('/getallvideos'); 
        } else {
            toast.error("Failed to add video: " + result.error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
                <h3 className="text-center mb-4 fw-bold text-success">Add New Video</h3>
                <form onSubmit={onSubmit}>
                    
                    {/* Course Selection Dropdown */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Select Course <span className="text-danger">*</span></label>
                        <select 
                            name="course_id" 
                            className="form-select shadow-sm"
                            onChange={handleInput} 
                            value={video.course_id}
                            required
                        >
                            <option value="">-- Choose Course --</option>
                            {courses.map(c => (
                                <option key={c.course_id} value={c.course_id}>
                                    {c.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Video Title */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Video Title <span className="text-danger">*</span></label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Enter video title"
                            className="form-control shadow-sm" 
                            onChange={handleInput} 
                            required 
                        />
                    </div>

                    {/* YouTube URL */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">YouTube URL <span className="text-danger">*</span></label>
                        <input 
                            type="text" 
                            name="youtube_url" 
                            placeholder="e.g. https://www.youtube.com/watch?v=..."
                            className="form-control shadow-sm" 
                            onChange={handleInput} 
                            required 
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea 
                            name="description" 
                            placeholder="Briefly describe the video content"
                            className="form-control shadow-sm" 
                            rows="3"
                            onChange={handleInput}
                        ></textarea>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-success fw-bold py-2 shadow-sm">
                            <i className="bi bi-plus-circle me-2"></i> Save Video
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-secondary fw-bold py-2">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddVideo;