import { Outlet, Link } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  const baseurl = "http://localhost:8080/";
  const [username, setuserName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseurl}user/username`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resdata = await response.json();
        if (resdata.error === "Invalid token") {
          navigate("/");
        }
        setuserName(resdata.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="main-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <Link to="/">LAUNDRY</Link>
        </div>
        <div className="li-dashboard-links">
          <ul>
            <li>
              <Link>Pricing</Link>
            </li>
            <li>
              <Link>Career</Link>
            </li>
            <li
              className="user-dropdown-container"
              onClick={() => setShowDropdown((prev) => !prev)}
              ref={dropdownRef}
            >
              <span>
                <img
                  src="/images/user.png"
                  alt="userimg"
                  width="43px"
                  height="43px"
                />
              </span>
              <span>{username}</span>
              {showDropdown && (
                <div className="user-dropdown">
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}

              <Link to="/"></Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="left">
          <ul>
            <Link to="/">
              <li className="home"></li>
            </Link>
            <Link to="/dashboard/create">
              <li className="create-post"></li>
            </Link>
            <Link to="/dashboard">
              <li className="display-post"></li>
            </Link>
          </ul>
        </div>
        <div className="right">
          {/* <div className="search-numorder">
            <p className="num-orders">Orders | 0</p>
            <input type="search" className="seach-order" />
          </div>
          <div className="order-main-div"> */}
          <Outlet />
          {/* </div> */}
        </div>
      </div>
      <div className="dashboard-footer">
        <p>2021 </p>
        <img src="/images/copysym.png" alt="copywright-logo" />
        <p> Laundry</p>
      </div>
      {/* {token} */}
    </div>
  );
}
