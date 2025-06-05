import { Outlet, Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ children }) {
  return (
    <div className="navbar">
      <div className="header">
        <div>
          <p>
            <Link to="/">LAUNDRY</Link>
          </p>
        </div>
        <div>
          <ul className="nav-ul">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Pricing</li>
            <li>Career</li>
            <li className="li-signin">
              <Link to="/" className="li-signin-text">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
      <div className="footer">
        <div className="up">
          <p className="refer">Now Refer & Earn ₹500 for every referral*</p>
          <p className="term">* Terms and conditions will be applied</p>
        </div>
        <div className="mid">
          <div className="block-left">
            <p className="about-us">ABOUT US</p>
            <p className="about-us-explain">Doorstep Wash & Dryclean Service</p>
          </div>
          <div className="block-mid-one">
            <ul>
              <li>Home</li>
              <li>Sign In</li>
              <li>Register</li>
            </ul>
          </div>
          <div className="block-mid-two">
            <p>Pricing</p>
          </div>
          <div className="block-mid-three">
            <ul>
              <li>Career</li>
              <li>Blogs</li>
              <li>Create</li>
            </ul>
          </div>
          <div className="block-mid-four">
            <p>Contact</p>
          </div>
          <div className="block-right">
            <p>SOCIAL MEDIA</p>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom">
        <p>2021 </p>
        <img src="/images/copysym.png" alt="copywright-logo" />
        <p> Laundry</p>
      </div>
    </div>
  );
}
