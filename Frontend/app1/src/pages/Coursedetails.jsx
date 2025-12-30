import { useLocation, useNavigate } from 'react-router-dom';

export default function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Home page varun course object ghene
  const course = location.state?.course;

  if (!course) {
    return (
      <div className="container mt-5 text-center">
        <h3>Course mahiti milali nahi!</h3>
        <button className="btn btn-primary" onClick={() => navigate('/home')}>Go Back</button>
      </div>
    );
  }

  // Date format function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-GB'); 
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center shadow-sm p-4 bg-white rounded border">
        
        {/* IMAGE SECTION */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div 
            style={{
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '350px', 
              padding: '15px'
            }}
          >
            <img 
              src={`/images/${course.image}`} 
              className="img-fluid" 
              alt={course.course_name} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="col-md-6 ps-md-5">
          <h1 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
            {course.course_name}
          </h1>
          
          <div className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '2' }}>
            <div>
               <strong style={{ width: '120px', display: 'inline-block' }}>Start Date:</strong> 
               <span>{formatDate(course.start_date)}</span>
            </div>
            <div>
               <strong style={{ width: '120px', display: 'inline-block' }}>End Date:</strong> 
               <span>{formatDate(course.end_date)}</span>
            </div>
            {/* Ithe Fees chi styling Start/End Date sarakhi keleli ahe */}
            <div>
               <strong style={{ width: '120px', display: 'inline-block' }}>Fees:</strong> 
               <span>₹{course.fees || '4000'}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/register', { state: { courseId: course.course_id } })} 
            className="btn btn-success px-5 py-2 fw-bold"
            style={{ 
              backgroundColor: '#1b5e20', 
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Register to Course
          </button>
        </div>
      </div>
    </div>
  );
}