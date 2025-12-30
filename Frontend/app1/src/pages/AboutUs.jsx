import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function AboutUs() {
  // Accordion toggle karnyathi state
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  const register=()=>{
    navigate("/register");
  }

  return (
    <div className="container py-5 mt-3">
      {/* 1. Breadcrumb - (Commented as per your code) */}
      
      <div className="row">
        {/* --- LEFT SECTION: MAIN CONTENT --- */}
        <div className="col-lg-8 pe-lg-5">
          <h3 className="fw-bold mb-4 text-uppercase" style={{ color: '#444', borderBottom: '1px dotted #ccc', paddingBottom: '10px' }}>
            ABOUT SUNBEAM
          </h3>

          {/* Main Building Image - Size Kami Keli Ahe */}
          <div className="mb-4 text-center">
            <img 
              src="/images/sunbeam.png" 
              alt="Sunbeam Building" 
              className="img-fluid rounded shadow-sm border"
              style={{ 
                width: '100%', 
                maxWidth: '650px', // Width kami keli
                maxHeight: '350px', // Height control keli
                objectFit: 'cover', 
                border: '5px solid #fff' 
              }}
            />
          </div>

          {/* About Text Content */}
          <div className="about-text" style={{ textAlign: 'justify', color: '#555', fontSize: '15px', lineHeight: '1.8' }}>
            <p>At Sunbeam we believe retaining a competitive edge is imperative for any individual in today's professional world. Companies are restructuring their organizations & reengineering their business processes. Not only have the challenges become more demanding, but also the rewards of staying at the forefront seem to be promising.</p>
            
            <p>In this scenario, technical & personal skills which provide effective solutions & time critical support are of principal significance for the long term growth of professionals. Sunbeam's expertise in effectively delivering training, solutions & services has made it a favored institution to many students & professionals focused on an aggressive career growth strategy.</p>
            
            <p>Sunbeam's proven track record in bringing about effective transformations in individuals is backed by a solid understanding of the rapidly changing needs of the industry & the global business scenario. Sunbeam's success has been built on its comprehensively researched, innovative training methodologies, deployment of technology and an emphasis on transformational & industry-relevant programs offering value-added services to its clients. A young and dynamic management team and carefully recruited and trained staff members drive Sunbeam's business vision & have established strong credentials in a short span of time.</p>
            
            <p>Sunbeam Group's expertise in effectively delivering training & solutions has made it a favored associate to many establishments focused on aggressive growth strategies. Since it's humble beginnings in the late 90's Sunbeam Group has today, evolved into a multi-technology, multi-location competency center with IT professionals capable of delivering high-end technological training & solutions in diverse modes. Their expertise in various IT fields has made Sunbeam Group a premium turnkey solution provider.</p>
          </div>

          {/* --- ACCORDION SECTION (Hinjawadi Campus Info) --- */}
          <div className="mt-4 border rounded shadow-sm overflow-hidden bg-white">
            <div 
              className="p-3 d-flex justify-content-between align-items-center" 
              style={{cursor: 'pointer', color: '#0099cc', borderLeft: '4px solid #0099cc'}}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="fw-bold">SunBeam Institute of Information Technology, Hinjawadi, Pune</span>
              <span className="fw-bold fs-4">{isOpen ? '−' : '+'}</span>
            </div>

            {isOpen && (
              <div className="p-4 border-top animate__animated animate__fadeIn" style={{ fontSize: '14px', color: '#555' }}>
                <div className="row mb-4 align-items-center">
                  <div className="col-md-4">
                    <img src="/images/sunbeam.png" alt="Campus" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">SunBeam IT Park, Hinjawadi campus is located in Phase 2 area of Rajiv Gandhi IT Park Hinjawadi. It is just opposite to Infosys Phase 2 campus. The institute is spread across a campus of 70,000 sq ft.</p>
                  </div>
                </div>

                <div className="row mb-4 align-items-center flex-row-reverse">
                  <div className="col-md-4">
                    <img src="/images/sun2.png" alt="Classroom" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">The campus houses a world class academic and computing infrastructure. The campus consists of state-of-the-art classrooms each equipped with ergonomic seating arrangements, air conditioning, LCD projection system and soothing interiors.</p>
                  </div>
                </div>

                <div className="row mb-4 align-items-center">
                  <div className="col-md-4">
                    <img src="/images/classroom.png" alt="Labs" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">The computing infrastructure consists of state-of-the-art labs designed to enable students to spend prolonged hours in practicals. Concurrent conduct of lectures and practicals is possible here.</p>
                  </div>
                </div>

                <div className="row align-items-center flex-row-reverse">
                  <div className="col-md-4">
                    <img src="/images/sun4.png" alt="Reception" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">The campus also houses a well equipped library, reading rooms, administrative blocks, canteen etc. The institute also assists with private third party hostels in the vicinity.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT SECTION: SIDEBAR --- */}
        <div className="col-lg-4 mt-5 mt-lg-0 text-center">
          <div className="card mb-4 border-0 shadow-sm text-start">
            <div className="card-header text-white fw-bold" style={{ backgroundColor: '#337ab7' }}>
              ABOUT US
            </div>
            <ul className="list-group list-group-flush border">
              <li className="list-group-item text-primary" style={{ fontSize: '14px', cursor: 'pointer' }}>About Sunbeam</li>
            </ul>
          </div>

          {/* Registration Card - Height Vadhvli Ahe */}
          <div className="card text-center text-white border-0 shadow" 
               style={{ 
                 background: 'linear-gradient(to bottom, #4eb8d1, #3a97ae)', 
                 minHeight: '520px' // Height increase keli
               }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
               <div className="mb-4">
                  <i className="bi bi-person-circle" style={{fontSize: '5rem'}}></i>
               </div>
               <h4 className="fw-bold mb-4">Registration <br /> & <br /> Online Admission</h4>
               <button className="btn btn-light rounded-pill px-4 mt-4 fw-bold text-primary text-uppercase shadow-sm py-2" onClick={register}>
                 Register Now
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;