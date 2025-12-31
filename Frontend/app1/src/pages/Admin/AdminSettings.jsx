import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateusername } from '../../services/adminServices';

function AdminSettings() {
    const [userName, setUserName] = useState("admin1"); 
    const navigate = useNavigate();

    const handleUpdateUsername = async (e) => {
        e.preventDefault();

        const result= await updateusername(userName);

        if(result.status=="success"){
            toast.success("UserName updated");
            sessionStorage.setItem("email",userName)
        }
        else{
            console.log(result)

            
            toast.error("alredy exist")
        }

        
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 p-4">
                        <h4 className="fw-bold mb-4 text-center">Admin Settings</h4>
                        
                        <form onSubmit={handleUpdateUsername}>
                           
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">User Name</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-person text-primary"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control border-start-0" 
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                           
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary fw-bold">
                                    Update Username
                                </button>

                               
                                <button 
                                    type="button" 
                                    className="btn btn-outline-dark fw-bold mt-2"
                                    onClick={() => navigate('/updatepassword')}
                                >
                                    <i className="bi bi-key me-2"></i> Update Password
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <button className="btn btn-link btn-sm text-decoration-none text-muted" onClick={() => navigate(-1)}>
                                <i className="bi bi-arrow-left"></i> Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSettings;