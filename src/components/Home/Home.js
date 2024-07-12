import React from "react";
import video from "../../assets/video-home.mp4";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { loginState } from "../../store/selector";
import { useSelector } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const statusLoginState = useSelector(loginState);
  const { dataPostLogin } = statusLoginState;

  const handleClickStartNow = () => {
    navigate("/user");
  };
  return (
    <div className="layout-home container">
      <div className="box-title">
        <h1>Plan in seconds, not weekends.</h1>
        <h3 className="mt-4 mb-4">
          Deliver instruction that’s relevant for every student — now with a
          boost from AI.
        </h3>
        <div className="box-button">
          {!dataPostLogin ? (
            <>
              <div className="bt-1">
                <p>TEACHERS</p>
                <div className="box-bt-ic">
                  <button>Sign up for free</button>
                  <MdOutlineArrowForwardIos />
                </div>
              </div>
              <div className="bt-2">
                <p>ADMINISTRATORS</p>
                <div className="box-bt-ic">
                  <button>Learn More</button>
                  <MdOutlineArrowForwardIos />
                </div>
              </div>
            </>
          ) : (
            <div className="bt-1" onClick={handleClickStartNow}>
              <p>DOING</p>
              <div className="box-bt-ic">
                <button>Start Now</button>
                <MdOutlineArrowForwardIos />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="box-video">
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Home;
