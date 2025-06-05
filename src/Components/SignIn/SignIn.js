import { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../AuthContext";


const baseurl = "http://localhost:8080/";
export default function SignIn() {
  const [form, setForm] = useState({});
  const [err, setError] = useState("");
  const [showpass, setshowpass] = useState(false);
  const [iserror, setIserror] = useState({
    emailornum: false,
    password: false,
  });
  // const {setToken} = useAuth();
  const navigate = useNavigate();

  const handelsubmit = async (e) => {
    e.preventDefault();
    // console.log(form)
    try {
      const response = await fetch(`${baseurl}signIn/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      await localStorage.setItem("token", data.token);
      if (data.token) {
        // console.log(data.token)
        // await setToken({usertoken:data.token})
        navigate("/dashboard");
      } else {
        if (data.message === "Please enter a valid phone number or Email") {
          setError("Please enter a valid phone number or Email");
          setIserror({ ...iserror, emailornum: true });
        }
        if (data.message === "Password Incorrect") {
          setError("Please enter a valid Password");
          setIserror({ ...iserror, password: true });
        }
      }
    } catch (err) {
      alert("err");
    }
  };
  return (
    <div className="sign-in-main">
      <div className="left-block">
        <p className="p1">Laundry Service</p>
        <p className="p2">Doorstep Wash & Dryclean Service</p>
        <p className="p3">Don’t Have An Account?</p>
        <button className="register-btn">
          <Link to="/register">Register</Link>
        </button>
      </div>
      <div className="right-block">
        <p className="p1">SIGN IN</p>
        <div className="form-sign-in">
          <form method="POST" action="#" onSubmit={handelsubmit}>
            <label htmlFor="email">Mobile / Email</label>
            <br />
            <input
              type="text"
              placeholder="Mobile / Email"
              name="email"
              id="email"
              className={iserror.emailornum ? "err-red" : ""}
              onChange={(e) => {
                setForm({ ...form, user_email_phone: e.target.value });
                setIserror({ ...iserror, emailornum: false });
              }}
            />
            <br />
            <div className="error">
              {iserror.emailornum && "Please enter a valid phone number"}
            </div>
            <br />
            <label htmlFor="email">Password</label>
            <br />
            <input
              type={showpass ? "text" : "password"}
              id="Password"
              placeholder="Password"
              name="password"
              className={iserror.password ? "err-red" : ""}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setIserror({ ...iserror, password: false });
              }}
            />
            <span className="padlock">
              <img
                src="/images/padlock.svg"
                alt="padlock"
                onClick={() => setshowpass(!showpass)}
              />
            </span>
            <br />
            <div className="error">
              {iserror.password && "Please enter a valid Password"}
            </div>
            <br />
            <p>Forget Password?</p>
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
