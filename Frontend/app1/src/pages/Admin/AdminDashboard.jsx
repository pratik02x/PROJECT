import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents, deleteCourse } from '../../services/adminServices';
import { getcourses } from '../../services/coursesService';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 0,
        totalRevenue: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        const studentRes = await getAllStudents();
        const courseRes = await getcourses();

        if (studentRes.status === "success" && courseRes.status === "success") {
            const revenue = courseRes.data.reduce((acc, curr) => acc + (curr.fees || 0), 0);
            setStats({
                totalStudents: studentRes.data.length,
                totalCourses: courseRes.data.length,
                totalRevenue: revenue
            });
        }
    };

    const menuItems = [
        { title: "Manage Courses", icon: "bi-book", color: "bg-primary", path: "/getcourses" },
        { title: "View Students", icon: "bi-people", color: "bg-success", path: "/getallstudents" },
        { title: "Add New Course", icon: "bi-plus-circle", color: "bg-warning", path: "/addcourse" },
        { title: "Get All Videos", icon: "bi-plus-circle", color: "bg-primary", path: "/getallvideos" }
        
    ];

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Admin Dashboard</h2>
                
            </div>

            {/* Statistics Cards */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 bg-primary text-white h-100">
                        <div className="card-body d-flex align-items-center">
                            <i className="bi bi-people-fill fs-1 me-3"></i>
                            <div>
                                <h6 className="mb-0">Total Students</h6>
                                <h3 className="fw-bold">{stats.totalStudents}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 bg-success text-white h-100">
                        <div className="card-body d-flex align-items-center">
                            <i className="bi bi-journal-code fs-1 me-3"></i>
                            <div>
                                <h6 className="mb-0">Active Courses</h6>
                                <h3 className="fw-bold">{stats.totalCourses}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 bg-dark text-white h-100">
                        <div className="card-body d-flex align-items-center">
                            <i className="bi bi-currency-rupee fs-1 me-3"></i>
                            <div>
                                <h6 className="mb-0">Estimated Revenue</h6>
                                <h3 className="fw-bold">₹{stats.totalRevenue}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <h4 className="mb-4 fw-semibold text-muted">Quick Actions</h4>
            <div className="row g-4">
                {menuItems.map((item, index) => (
                    <div className="col-6 col-md-3" key={index}>
                        <div 
                            className="card h-100 shadow-sm text-center border-0 p-3 dashboard-card" 
                            style={{ cursor: 'pointer', transition: '0.3s' }}
                            onClick={() => navigate(item.path)}
                        >
                            <div className={`icon-box rounded-circle ${item.color} text-white mx-auto mb-3 d-flex align-items-center justify-content-center`} style={{ width: '60px', height: '60px' }}>
                                <i className={`bi ${item.icon} fs-3`}></i>
                            </div>
                            <h6 className="fw-bold">{item.title}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;