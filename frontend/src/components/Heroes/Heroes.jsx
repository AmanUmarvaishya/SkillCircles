import React from "react";

export default function Heroes() {
  return (
    <section
      className="d-flex align-items-center"
      style={{ height: "85vh" }}
    ><div className="container" 

       >
        <div className="row align-items-center"  data-aos="fade-left"      >

          {/* LEFT : TEXT */}
          <div className="col-lg-6 col-md-12 text-center text-lg-start">
            <h1 className="fw-bold display-5">
             Welcome to SkillCircle
            </h1>
            <p className="lead text-muted mt-3">
              Learn First here all skill with affordable price .
            </p>

            <div className="mt-4">
              <button className="btn btn-primary btn-lg me-3">
                Get Started
              </button>
              <button className="btn btn-outline-secondary btn-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT : IMAGE */}
          <div className="col-lg-6 d-none d-lg-block text-center">
            <img
              src="https://illustrations.popsy.co/gray/web-design.svg"
              alt="hero"
              className="img-fluid"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
