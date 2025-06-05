import { useState, useEffect } from "react";
import "./vieworder.css";
import { useNavigate } from "react-router-dom";
import LaundryProgress from "../progressbar/progressbar";

export default function ViewOrder() {
  const [popupwin, setPopupwin] = useState(-1);
  const [order, setOrders] = useState([]);
  const [handelordcancel, sethandelordcancel] = useState("");
  const [isdatachange, setIsDataChange] = useState(true);
  const [iscancel, setIsCancel] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const baseurl = "http://localhost:8080/";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseurl}user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resdata = await response.json();
        if (resdata.error === "Invalid token") {
          navigate("/");
        }
        setOrders(resdata.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isdatachange]);

  function handelwashtype(arr) {
    let output = [];
    if (arr[0]) {
      output.push("Washing");
    }
    if (arr[1]) {
      output.push("Ironing");
    }
    if (arr[2]) {
      output.push("Bleach");
    }
    if (arr[3]) {
      output.push("Chemical wash");
    }
    return output.join(",");
  }

  const handelcreateorder = () => {
    navigate("/dashboard/create");
  };
  const status = [
    "Ready to pickup",
    "In Washing",
    "In Ironing",
    "Ready to Delivered",
  ];

  const handelcancelorder = async (id) => {
    try {
      const response = await fetch(`${baseurl}user/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resdata = await response.json();
      if (resdata.error === "Invalid token") {
        navigate("/");
      }
      setIsDataChange(!isdatachange);
    } catch (error) {
      console.log(error);
    }
  };

  const orders = order.filter((item) =>
    !search.trim()
      ? true // No filter if search is empty
      : Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
  );

  const ordernum = orders.length;
  return (
    <div className="order-veiw">
      <div className="head-left-vieworder">
        <p className="order-num">Orders | {ordernum}</p>
        <div className="search">
          <form action="#">
            {ordernum > 0 && <button>Create</button>}
            <img src="images/search.svg" alt="" />
            <input type="search" onChange={(e) => setSearch(e.target.value)} />
          </form>
        </div>
      </div>
      <div>
        {ordernum === 0 && (
          <div className="btn-order-zero">
            <p className="noorder">No Orders avaialble</p>
            <button onClick={handelcreateorder}>Create</button>
          </div>
        )}
      </div>
      {ordernum > 0 && (
        <div className="order-list-view">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Date & Time</th>
                  <th>Store Location</th>
                  <th>City</th>
                  <th>Store Phone</th>
                  <th>Total Items</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{`OR0000${ele._id.slice(-3).toUpperCase()}`}</td>
                      <td>{ele.submittedDate}</td>
                      <td>{ele.location}</td>
                      <td>Banglore</td>
                      <td>{ele.phone}</td>
                      <td>
                        {ele.shirts_quantity +
                          ele.tshirts_quantity +
                          ele.trousers_quantity +
                          ele.jeans_quantity +
                          ele.boxers_quantity +
                          ele.joggers_quantity +
                          ele.others_quantity}
                      </td>
                      <td>{ele.total}</td>
                      <td>
                        {status[ele.status]}
                        {ele.status === "Order Cancelled" && (
                          <span style={{ color: "red" }}>Order Cancelled</span>
                        )}
                      </td>
                      <td>
                        {status[ele.status] === "Ready to pickup" && (
                          <button
                            className="cancelorderbtn"
                            onClick={() => {
                              // handelcancelorder(ele._id);
                              sethandelordcancel(ele._id);
                              setIsCancel(true);
                            }}
                          >
                            Cancel Order
                          </button>
                        )}
                      </td>
                      <td>
                        {ele.status !== "Order Cancelled" && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setPopupwin(index);
                            }}
                          >
                            <img
                              src="/images/view.png"
                              alt="viewimage"
                              className="viewimg"
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {popupwin >= 0 && (
            <div className="popupwin-vieworder-details">
              <div className="head">
                <div className="summarry-div">
                  <div>Summary</div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPopupwin(-1);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className="head-location">
                  <div>
                    <p className="label-location">Store Location</p>
                    <p>{orders[popupwin].location}</p>
                  </div>
                  <div>
                    <p className="label-location">Store Address:</p>
                    <p>{orders[popupwin].address}</p>
                  </div>
                  <div>
                    <p className="label-location">Phone</p>
                    <p>{orders[popupwin].phone}</p>
                  </div>
                </div>
                <div className="progrss-details">
                  <LaundryProgress currentStep={orders[popupwin].status} />
                </div>
              </div>
              <div className="order-details">
                <p>Order Detais</p>
                <div>
                  {orders[popupwin].shirts[4] > 0 && (
                    <div>
                      <p>Shirts</p>
                      <p>{handelwashtype(orders[popupwin].shirts)}</p>
                      <p>
                        {orders[popupwin].shirts_quantity} X{" "}
                        {orders[popupwin].shirts[4]} =
                      </p>
                      <p>
                        {orders[popupwin].shirts_quantity *
                          orders[popupwin].shirts[4]}
                      </p>
                    </div>
                  )}
                  {orders[popupwin].tshirts[4] > 0 && (
                    <div>
                      <p>T Shirts</p>
                      <p>{handelwashtype(orders[popupwin].tshirts)}</p>
                      <p>
                        {orders[popupwin].tshirts_quantity} X{" "}
                        {orders[popupwin].tshirts[4]} =
                      </p>
                      <p>
                        {orders[popupwin].tshirts_quantity *
                          orders[popupwin].tshirts[4]}
                      </p>
                    </div>
                  )}
                  {orders[popupwin].trousers[4] > 0 && (
                    <div>
                      <p>Trousers</p>
                      <p>{handelwashtype(orders[popupwin].trousers)}</p>
                      <p>
                        {orders[popupwin].trousers_quantity} X{" "}
                        {orders[popupwin].trousers[4]} =
                      </p>
                      <p>
                        {orders[popupwin].trousers_quantity *
                          orders[popupwin].trousers[4]}
                      </p>
                    </div>
                  )}
                  {orders[popupwin].jeans[4] > 0 && (
                    <div>
                      <p>Jeans</p>
                      <p>{handelwashtype(orders[popupwin].jeans)}</p>
                      <p>
                        {orders[popupwin].jeans_quantity} X{" "}
                        {orders[popupwin].jeans[4]} =
                      </p>
                      <p>
                        {orders[popupwin].jeans_quantity *
                          orders[popupwin].jeans[4]}
                      </p>
                    </div>
                  )}
                  {orders[popupwin].boxers[4] > 0 && (
                    <div>
                      <p>Boxers</p>
                      <p>{handelwashtype(orders[popupwin].boxers)}</p>
                      <p>
                        {orders[popupwin].boxers_quantity} X{" "}
                        {orders[popupwin].boxers[4]} =
                      </p>
                      <p>
                        {orders[popupwin].boxers_quantity *
                          orders[popupwin].boxers[4]}
                      </p>
                    </div>
                  )}
                  {orders[popupwin].joggers[4] > 0 && (
                    <div>
                      <p>Joggers</p>
                      <p>{handelwashtype(orders[popupwin].joggers)}</p>
                      <p>
                        {orders[popupwin].joggers_quantity} X{" "}
                        {orders[popupwin].joggers[4]} =
                      </p>
                      <p>
                        {orders[popupwin].joggers_quantity *
                          orders[popupwin].joggers[4]}
                      </p>
                    </div>
                  )}
                  {orders[popupwin].others[4] > 0 && (
                    <div>
                      <p>Others</p>
                      <p>{handelwashtype(orders[popupwin].others)}</p>
                      <p>
                        {orders[popupwin].others_quantity} X{" "}
                        {orders[popupwin].others[4]} =
                      </p>
                      <p>
                        {orders[popupwin].others_quantity *
                          orders[popupwin].others[4]}
                      </p>
                    </div>
                  )}
                </div>
                <div className="value">
                  <p>
                    <span>Sub total:</span>
                    <span>
                      {orders[popupwin].total - orders[popupwin].pickupcharges}
                    </span>
                  </p>
                  <p>
                    <span>Pickup Charges:</span>
                    <span>{orders[popupwin].pickupcharges}</span>
                  </p>
                  <p>
                    <span>Total:</span>
                    <span>Rs {orders[popupwin].total}</span>
                  </p>
                </div>
              </div>
              <div className="address-details-view">
                <p className="address-label">Address</p>
                <div>
                  <p>{orders[popupwin].type}</p>
                  <p>{orders[popupwin].address}</p>
                </div>
              </div>
              <div className="btndiv-cancelorder">
                {status[orders[popupwin].status] === "Ready to pickup" && (
                  <button
                    onClick={() => {
                      // handelcancelorder(orders[popupwin]._id);
                      sethandelordcancel(orders[popupwin]._id);
                      setIsCancel(true);
                    }}
                  >
                    Cancel order
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {iscancel && (
        <div className="cancelorder">
          <div className="upper">
            <p>Alert</p>
            <p>
              <button onClick={() => setIsCancel(false)}>X</button>
            </p>
          </div>
          <div className="lower">
            <div>
              <img src="/images/danger.png" alt="disclamer" />
            </div>
            <div>
              <p>
                Are you sure want to cancel the order{" "}
                <span>
                  No:`OR0000{handelordcancel.slice(-3).toUpperCase()}`
                </span>
              </p>
              <button
                onClick={() => {
                  handelcancelorder(handelordcancel);
                  setIsCancel(false);
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
