import React from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout";
import PrimaryButton from "../../shared/PrimaryButton";

const HomePage = () => {
  return (
    <HomeLayout>
      <>
        <section className="top_sectionMain">
          <div className="container h-100">
            <div className="row h-100 align-items-center ">
              <div className="col-md-8 text-center text-md-left">
                <h1 className="mainHeading text-light">
                  Are you a Javascript Developer looking for a job?
                </h1>

                <PrimaryButton
                  to="/signup"
                  value="Sign Up Now!"
                  outline={false}
                />
              </div>
              <div className="col-md-4">
                <img
                  src="/Img/main_Img.webp"
                  alt="main_right-side_image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="project-detail-sec">
            <div className="">
              <h2 className="">
                Our chrome extension will apply you to 100s of jobs a week.
              </h2>
              <span className="d-inline-block mt-2">&</span>
              <p className="font-weight-bold"> Allow you to grow your portfolio and contribute to the future of job search software.
              </p>
            </div>
          </div>
        </section>
        <section className="community-sec">
          <div className="container">
            <div className="row">
              <h1 className="text-justify text-light text-shadow">
                JobGenie Devs is the first community of software developers
                dedicated to making the job search easier.
              </h1>
              <h3 className="text-center text-light w-100 mb-md-4 my-4 my-md-0">Membership Privileges Include:</h3>
              <div className="col-xl-7 my-md-5">
                <h3 className="text-light">Lifetime access to JobGenie Developed software:</h3>
                <ul className="content-list">
                  <li>Chrome extension that applies to jobs for you</li>
                  <li>Web app that will scan your resume and tell you how compatible it is with different job
                    descriptions.
                  </li>
                  <PrimaryButton
                    to="/signup"
                    value="Join Now!"
                    outline={false}
                    className="ml-0"
                  />
                </ul>
              </div>
              <div className="col-xl-5 my-md-5 ifram-md-350">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: "none", minHeight: '310px' }}
                  src="https://www.youtube.com/embed/dASen4CRQug"
                  title="video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <h2 className="text-light text-center">+</h2>
        <section className="developer-code">
          <div className="container pt-5 ">
            {/* <h2 className="text-light text-center text-shadow mb-5">
              Access to our source code & developer community
            </h2> */}
            <div className="row">
              <div className="col-md-5 d-flex align-items-center mb-4 mb-md-0">
                <img
                  src="/Img/mainPage.png"
                  className="img-fluid styled-img"
                  alt="Challange_Image"
                />
              </div>
              <div className="col-md-7 pl-5 ">
                <h3 className="text-light mt-md-3">Access to our source code & developer community.</h3>
                <ul className="content-list">
                  <li>Improve your portfolio & Javascript skills by completing challenges.</li>
                  <li>Win cash prizes ($500+)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="find-job">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-center text-lg-left">
                <h3 className="">
                  Find a job and be part of a community improving the job
                  search.
                </h3>
                <p className="">
                  Together we will build a better way for everyone to find jobs
                  while helping you find yours.
                </p>
                <Link
                  to="/signup"
                  className="btn-own-outline d-block w-50 ml-lg-0"
                >
                  Sign me Up
                </Link>
              </div>
              <div className="col-lg-5 offset-lg-1 mt-4 mt-lg-0 text-center text-lg-left">
                <h2 className="">Price $199.99 membership for life.</h2>
                <ul className="mt-4 list-unstyled">
                  <li>The best part is you can get your money back.</li>
                  <li>For each person you refer, you receive $5 dollars.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    </HomeLayout>
  );
};

export default HomePage;
