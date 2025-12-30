import React, { useEffect, useState } from 'react';
import { getVideos, deleteVideo } from '../../services/adminServices';
import { getcourses } from '../../services/coursesService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GetAllVideos() {
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const videoRes = await getVideos();
        const courseRes = await getcourses();
        if (videoRes.status === "success") setVideos(videoRes.data);
        if (courseRes.status === "success") setCourses(courseRes.data);
    };

    const onDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            const result = await deleteVideo(id);
            if (result.status === "success") {
                toast.success("Video deleted successfully");
                loadData();
            }
        }
    };

    const filteredVideos = videos.filter((v) => {
        return selectedCourse === "All" || v.course_name === selectedCourse;
    });

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold text-secondary">All Videos</h2>

            {/* Filter Section */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="form-label fw-bold text-muted">Filter by Course</label>
                    <select 
                        className="form-select shadow-sm" 
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="All">All Courses</option>
                        {courses.map(c => (
                            <option key={c.course_id} value={c.course_name}>{c.course_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-responsive shadow rounded-4 p-3 bg-white">
                <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Course</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Youtube URL</th>
                            <th>Added At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVideos.map((v) => (
                            <tr key={v.video_id}>
                                <td>{v.video_id}</td>
                                <td className="fw-bold">{v.course_name}</td>
                                
                                {/* Database column 'title' pramane */}
                                <td className="fw-semibold">{v.title || "Untitled"}</td>
                                
                                <td className="text-muted small">{v.description}</td>
                                
                                <td>
                                    {/* Database column 'youtube_url' pramane */}
                                    {v.youtube_url ? (
                                        <a 
                                            href={v.youtube_url.startsWith('http') ? v.youtube_url : `https://${v.youtube_url}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-primary text-decoration-none fw-bold"
                                        >
                                            Click here
                                        </a>
                                    ) : (
                                        <span className="text-muted">No URL</span>
                                    )}
                                </td>

                                <td>{new Date(v.added_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>

                                {/* --- ETHUN TUZYA ACTIONS BUTTONS CHI PROPER PLACE SURU HOTE --- */}
                                <td>
                                    <div className="d-flex justify-content-center gap-0">
                                        {/* EDIT BUTTON (YELLOW) */}
                                        <button 
                                            onClick={() => navigate(`/edit-video/${v.video_id}`, { state: { video: v } })}
                                            className="btn btn-warning btn-sm"
                                            style={{ 
                                                border: 'none', 
                                                padding: '6px 12px', 
                                                borderRadius: '6px 0px 0px 6px', // Left rounded
                                                backgroundColor: '#ffc107'
                                            }}
                                            title="Edit Video"
                                        >
                                            <i className="bi bi-pencil-square" style={{ color: 'black' }}></i>
                                        </button>

                                        {/* DELETE BUTTON (RED) */}
                                        <button 
                                            onClick={() => onDelete(v.video_id)}
                                            className="btn btn-danger btn-sm"
                                            style={{ 
                                                border: 'none', 
                                                padding: '6px 12px', 
                                                borderRadius: '0px 6px 6px 0px', // Right rounded
                                                backgroundColor: '#dc3545'
                                            }}
                                            title="Delete Video"
                                        >
                                            <i className="bi bi-trash-fill" style={{ color: 'white' }}></i>
                                        </button>
                                    </div>
                                </td>
                                {/* --- ACTIONS END --- */}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetAllVideos;