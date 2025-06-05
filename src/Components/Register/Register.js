import { Link ,useNavigate} from "react-router-dom";
import "./Register.css";
import { useState } from "react";


export default function Register() {
  const [isCheck, setIsCheck] = useState(false);
  const [form, setForm] = useState({
    district:"Satara",
    state : "maharashtra"    
  });

  const navigate = useNavigate();
  const baseurl = "http://localhost:8080/";
  const handelsubmit = async(e) => {
    e.preventDefault();
    if (form.checkStatus){
      try {
        const response = await fetch(`${baseurl}register/Adduser`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        // console.log(form)
        const data = await response.json();
        // console.log(`${data.user} data`);
  
        if (data.message) {
          alert(data.message)
        } else {
          navigate("/");
        }
      } catch (err) {
        alert(err.message);
      }
      // alert("Regestraion");
    }
  };
  return (
    <div className="regestration-main-div">
      <div className="left-reg">
        <div className="left-block">
          <p className="p1">Laundry Service</p>
          <p className="p2">Doorstep Wash & Dryclean Service</p>
          <p className="p3">Already Have Account</p>
          <button className="register-btn">
            <Link to="/">Sign In</Link>
          </button>
        </div>
      </div>
      <div className="right-reg">
        <div className="heading">
          <p>REGISTER</p>
        </div>
        <div className="form-div">
          <form method="POST" action="#" onSubmit={handelsubmit}>
            <div className="input-fileds">
              <div className="left-form">
                <input
                required
                  type="text"
                  className="name"
                  placeholder="Name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                required
                  type="text"
                  className="phone"
                  placeholder="Phone"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <select
                  name="district"
                  onChange={(e) =>
                    setForm({ ...form, district: e.target.value })
                  }
                >
                  <option value="" disabled>
                    District
                  </option>
                  <option value="Satara">Satara</option>
                  <option value="kolhapur">Kolhapur</option>
                </select>
                <input
                required
                  type="text"
                  className="pincode"
                  placeholder="Pincode"
                  onChange={(e) =>
                    setForm({ ...form, pincode: e.target.value })
                  }
                />
              </div>
              <div className="right-form">
                <input
                required
                  type="email"
                  name="email"
                  className="email"
                  placeholder="Email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <select
                  name="state"
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                >
                  <option value="" disabled>
                    State
                  </option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="rajesthan">Rajesthan</option>
                </select>
                <input
                required
                  type="text"
                  className="address"
                  placeholder="Address"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <input
                required
                  type="text"
                  className="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="agree-submit">
              <div className="agreement">
                <input
                  type="checkbox"
                  className="checkbox-agreement"
                  checked={isCheck}
                  onChange={(e) => {
                    setIsCheck(!isCheck);
                    isCheck ? setForm({...form,checkStatus : false }) : setForm({...form,checkStatus : true })
                  }}
                />
                <p>
                  <Link to="#">
                    I agree to Terms & Condition receiving marketing and
                    promotional materials
                  </Link>
                </p>
              </div>
              <div className="btn-register">
                <button className="btn-register-btn">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
