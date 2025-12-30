import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateVideo } from '../../services/adminServices';
import { getcourses } from '../../services/coursesService';
import { toast } from 'react-toastify';

function EditVideo() {
    const { id } = useParams(); 
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [video, setVideo] = useState({
        course_id: '',
        title: '',
        youtube_url: '',
        description: '',
        added_at: '' // Added At sathi navin field
    });

    useEffect(() => {
        loadCourses();
        
        if (state && state.video) {
            setVideo({
                course_id: state.video.course_id,
                title: state.video.title,
                youtube_url: state.video.youtube_url,
                description: state.video.description,
                // Date format karun dakhvne (YYYY-MM-DD)
                added_at: state.video.added_at ? state.video.added_at.split('T')[0] : ''
            });
        }
    }, [state]);

    const loadCourses = async () => {
        const result = await getcourses();
        if (result.status === "success") {
            setCourses(result.data);
        }
    };

    const handleInput = (e) => {
        setVideo({ ...video, [e.target.name]: e.target.value });
    };

    const onUpdate = async (e) => {
        e.preventDefault();
        
        // added_at update karnyachi garaj naste, mhanun te kadhun taku shakto
        const { added_at, ...dataToUpdate } = video;
        const result = await updateVideo(id, dataToUpdate);

        if (result.status === "success") {
            toast.success("Video Updated Successfully!");
            navigate('/getallvideos');
        } else {
            toast.error("Update Failed: " + result.error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
                <h3 className="text-center mb-4 fw-bold text-primary">Edit Video</h3>
                <form onSubmit={onUpdate}>
                    
                    {/* Course Selection */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Course</label>
                        <select 
                            name="course_id" 
                            value={video.course_id} 
                            onChange={handleInput} 
                            className="form-select" 
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map(c => (
                                <option key={c.course_id} value={c.course_id}>
                                    {c.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Video Title */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Video Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={video.title} 
                            onChange={handleInput} 
                            className="form-control" 
                            required 
                        />
                    </div>

                    {/* YouTube URL */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">YouTube URL</label>
                        <input 
                            type="text" 
                            name="youtube_url" 
                            value={video.youtube_url} 
                            onChange={handleInput} 
                            className="form-control" 
                            required 
                        />
                        <small className="text-muted">Paste your video link here</small>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea 
                            name="description" 
                            value={video.description} 
                            onChange={handleInput} 
                            className="form-control" 
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Added At (Read-Only) */}
                    <div className="mb-3">
                        <label className="form-label fw-bold text-muted">Added At (Disabled)</label>
                        <input 
                            type="date" 
                            name="added_at" 
                            value={video.added_at} 
                            className="form-control bg-light" 
                            disabled 
                        />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-primary fw-bold py-2 shadow-sm">
                            Update Video
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

export default EditVideo;