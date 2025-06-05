import "./createorder.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  // const [ordernum, setOrderNum] = useState(0);
  const baseurl = "http://localhost:8080/";
  const [data, setData] = useState({});
  const [isaddAddress, setisaddAddress] = useState(false);
  const [newaddress, setNewAddress] = useState({});
  const [isorderconfirmation, setisorderConfirmation] = useState(false);
  const [rate, setRate] = useState({
    washing: 10,
    ironing: 20,
    bleach: 30,
    Chemical_wash: 40,
  });
  const [form, setform] = useState({
    shirts_quantity: 0,
    tshirts_quantity: 0,
    trousers_quantity: 0,
    jeans_quantity: 0,
    boxers_quantity: 0,
    joggers_quantity: 0,
    others_quantity: 0,
    pickupcharges: 90,
    type: "Home",
    location: "Jp Nagar",
    Address: "Near Phone booth, 10th road",
    phone: "91 9999999999",
    total: 0,
  });

  const [search, setSearch] = useState("");
  const clotdata = [
    "shirts",
    "tshirts",
    "trousers",
    "jeans",
    "boxers",
    "joggers",
    "others",
  ];

  const filteredData = search
    ? clotdata.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : clotdata;

  const [useraddress, setuserAddress] = useState([
    {
      type: "Home",
      location: "Jp Nagar",
      Address: "Near Phone booth, 10th road",
      phone: "91 9999999999",
    },
    {
      type: "Office",
      location: "Powai Naka",
      Address: "Near Powai Naka, 10th road",
      phone: "91 9999999111",
    },
  ]);

  // const [totalcost, setTotalcost] = useState(0);
  const [isproceed, setIsProceed] = useState(false);

  const navigate = useNavigate();
  const handelSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    // console.log(filteredData);
  };

  const handelcancel = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handelproceed = (e) => {
    form.total - 90 > 0 ? setIsProceed(true) : setIsProceed(false);
  };

  const [washtype, setWashType] = useState({
    shirts: [false, false, false, false, 0],
    tshirts: [false, false, false, false, 0],
    trousers: [false, false, false, false, 0],
    jeans: [false, false, false, false, 0],
    boxers: [false, false, false, false, 0],
    joggers: [false, false, false, false, 0],
    others: [false, false, false, false, 0],
  });

  const {
    shirts_quantity,
    tshirts_quantity,
    trousers_quantity,
    jeans_quantity,
    boxers_quantity,
    joggers_quantity,
    others_quantity,
    pickupcharges,
  } = form;

  const { shirts, tshirts, trousers, jeans, boxers, joggers, others } =
    washtype;
  useEffect(() => {
    const shirtRate = shirts[4];
    const tshirtRate = tshirts[4];
    const trouserRate = trousers[4];
    const jeanRate = jeans[4];
    const boxerRate = boxers[4];
    const joggerRate = joggers[4];
    const othersRate = others[4];

    const total =
      shirts_quantity * shirtRate +
      tshirts_quantity * tshirtRate +
      trousers_quantity * trouserRate +
      jeans_quantity * jeanRate +
      boxers_quantity * boxerRate +
      joggers_quantity * joggerRate +
      others_quantity * othersRate +
      pickupcharges;

    setform((prevform) => ({ ...prevform, total }));
  }, [
    shirts_quantity,
    tshirts_quantity,
    trousers_quantity,
    jeans_quantity,
    boxers_quantity,
    joggers_quantity,
    others_quantity,
    pickupcharges,
    shirts,
    tshirts,
    trousers,
    jeans,
    boxers,
    joggers,
    others,
  ]);

  const imgselect = (wash, clothtype, n) => {
    if (clothtype === "shirts") {
      if (washtype.shirts[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    if (clothtype === "tshirts") {
      if (washtype.tshirts[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    if (clothtype === "trousers") {
      if (washtype.trousers[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    if (clothtype === "jeans") {
      if (washtype.jeans[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    if (clothtype === "boxers") {
      if (washtype.boxers[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    if (clothtype === "joggers") {
      if (washtype.joggers[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    if (clothtype === "others") {
      if (washtype.others[n]) {
        return `/washtype/${wash}s.svg`;
      } else {
        return `/washtype/${wash}.svg`;
      }
    }
    return `/washtype/${wash}s.svg`;
  };

  const handelimgclick = (cloth, n) => {
    if (cloth === "shirts") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.shirts];
        updatedcloth[n] = !prevwashtype.shirts[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          shirts: updatedcloth,
        };
      });
    }
    if (cloth === "tshirts") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.tshirts];
        updatedcloth[n] = !prevwashtype.tshirts[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          tshirts: updatedcloth,
        };
      });
    }
    if (cloth === "trousers") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.trousers];
        updatedcloth[n] = !prevwashtype.trousers[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          trousers: updatedcloth,
        };
      });
    }
    if (cloth === "jeans") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.jeans];
        updatedcloth[n] = !prevwashtype.jeans[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          jeans: updatedcloth,
        };
      });
    }
    if (cloth === "boxers") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.boxers];
        updatedcloth[n] = !prevwashtype.boxers[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          boxers: updatedcloth,
        };
      });
    }
    if (cloth === "joggers") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.joggers];
        updatedcloth[n] = !prevwashtype.joggers[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          joggers: updatedcloth,
        };
      });
    }
    if (cloth === "others") {
      setWashType((prevwashtype) => {
        let updatedcloth = [...prevwashtype.others];
        updatedcloth[n] = !prevwashtype.others[n];
        updatedcloth[4] = 0;
        if (updatedcloth[0] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.washing;
        }
        if (updatedcloth[1] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.ironing;
        }
        if (updatedcloth[2] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.bleach;
        }
        if (updatedcloth[3] === true) {
          updatedcloth[4] = updatedcloth[4] + rate.Chemical_wash;
        }
        return {
          ...prevwashtype,
          others: updatedcloth,
        };
      });
    }
  };

  const washtypeimgsize = {
    washing_machine: ["25px", "29px"],
    ironing: ["26px", "26px"],
    towel: ["28px", "28px"],
    bleach: ["16px", "26px"],
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    // console.log(form,washtype);
    //do not use
  };

  const handelsubmitorder = async (e) => {
    e.preventDefault();
    console.log(data);
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    try {
      const response = await fetch(`${baseurl}user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      // console.log(data);
      const resdata = await response.json();
      if (resdata.message === "Success") {
        setIsProceed(false);
        setisorderConfirmation(true);
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    setData({ ...form, ...washtype, status: Math.floor(Math.random() * 3) });
  }, [isproceed, form.location]);

  function handelresetitems(type, washproducttype) {
    const clothtype = type;
    const washproduct = washproducttype;
    setform({ ...form, [clothtype]: 0 });
    setWashType((prevwashtype) => {
      let updatedcloth = prevwashtype.washproduct;
      updatedcloth = [false, false, false, false, 0];
      return {
        ...prevwashtype,
        [washproduct]: updatedcloth,
      };
    });
  }

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

  return (
    <div className="view-order-main-div">
      <div className="head">
        <div className="head-left-vieworder">
          <p className="order-num">Create Order</p>
        </div>
        <div className="head-right-vieworder">
          <img src="/images/search.svg" alt="" />
          <form action="#" onChange={handelSearchSubmit}>
            <input type="search" />
          </form>
        </div>
      </div>
      <div className="body">
        {/* {ordernum === 0 && (
          <div className="btn-order-zero">
            <p className="noorder">No Orders avaialble</p>
            <button onClick={handelcreate}>Create</button>
          </div>
        )} */}
        <div className="table-list-orders">
          <form action="#" onSubmit={handelsubmit}>
            <table>
              <thead>
                <tr>
                  <th>Produt Types</th>
                  <th>Quantity</th>
                  <th>Wash Type</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.includes("shirts") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/Shirts.png"
                        alt="Shirts"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>Shirts</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            shirts_quantity: e.target.value,
                          })
                        }
                        value={form.shirts_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("shirts", 0);
                              }}
                            >
                              <img
                                src={imgselect("washing-machine", "shirts", 0)}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("shirts", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "shirts", 1)}
                                alt="ironing"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("shirts", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "shirts", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("shirts", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "shirts", 3)}
                                alt="bleach"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.shirts_quantity !== 0 && (
                        <p>
                          {form.shirts_quantity} X {washtype.shirts[4]} ={" "}
                          <span>
                            {form.shirts_quantity * washtype.shirts[4]}
                          </span>
                        </p>
                      )}
                      {!form.shirts_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.shirts_quantity !== 0 && (
                        <button
                          onClick={() => {
                            handelresetitems("shirts_quantity", "shirts");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {filteredData.includes("tshirts") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/T Shirts.png"
                        alt="T Shirts"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>T Shirts</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            tshirts_quantity: e.target.value,
                          })
                        }
                        value={form.tshirts_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("tshirts", 0);
                              }}
                            >
                              <img
                                src={imgselect("washing-machine", "tshirts", 0)}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("tshirts", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "tshirts", 1)}
                                alt="ironing"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("tshirts", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "tshirts", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("tshirts", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "tshirts", 3)}
                                alt="bleach"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.tshirts_quantity !== 0 && (
                        <p>
                          {form.tshirts_quantity} X {washtype.tshirts[4]} ={" "}
                          <span>
                            {form.tshirts_quantity * washtype.tshirts[4]}
                          </span>
                        </p>
                      )}
                      {!form.tshirts_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.tshirts_quantity !== 0 && (
                        <button
                          type="reset"
                          onClick={() => {
                            handelresetitems("tshirts_quantity", "tshirts");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {filteredData.includes("trousers") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/Trousers.png"
                        alt="Trousers"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>Trousers</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            trousers_quantity: e.target.value,
                          })
                        }
                        value={form.trousers_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("trousers", 0);
                              }}
                            >
                              <img
                                src={imgselect(
                                  "washing-machine",
                                  "trousers",
                                  0
                                )}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("trousers", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "trousers", 1)}
                                alt="washing machine"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("trousers", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "trousers", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("trousers", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "trousers", 3)}
                                alt="bleach"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.trousers_quantity !== 0 && (
                        <p>
                          {form.trousers_quantity} X {washtype.trousers[4]} ={" "}
                          <span>
                            {form.trousers_quantity * washtype.trousers[4]}
                          </span>
                        </p>
                      )}
                      {!form.trousers_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.trousers_quantity !== 0 && (
                        <button
                          onClick={() => {
                            handelresetitems("trousers_quantity", "trousers");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {filteredData.includes("jeans") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/Jeans.png"
                        alt="Jeans"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>Jeans</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            jeans_quantity: e.target.value,
                          })
                        }
                        value={form.jeans_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("jeans", 0);
                              }}
                            >
                              <img
                                src={imgselect("washing-machine", "jeans", 0)}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("jeans", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "jeans", 1)}
                                alt="washing machine"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("jeans", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "jeans", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("jeans", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "jeans", 3)}
                                alt="bleach"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.jeans_quantity !== 0 && (
                        <p>
                          {form.jeans_quantity} X {washtype.jeans[4]} ={" "}
                          <span>{form.jeans_quantity * washtype.jeans[4]}</span>
                        </p>
                      )}
                      {!form.jeans_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.jeans_quantity !== 0 && (
                        <button
                          onClick={() => {
                            handelresetitems("jeans_quantity", "jeans");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {filteredData.includes("boxers") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/Boxers.png"
                        alt="Boxers"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>Boxers</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            boxers_quantity: e.target.value,
                          })
                        }
                        value={form.boxers_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("boxers", 0);
                              }}
                            >
                              <img
                                src={imgselect("washing-machine", "boxers", 0)}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("boxers", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "boxers", 1)}
                                alt="washing machine"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("boxers", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "boxers", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("boxers", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "boxers", 3)}
                                alt="washing machine"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.boxers_quantity !== 0 && (
                        <p>
                          {form.boxers_quantity} X {washtype.boxers[4]} ={" "}
                          <span>
                            {form.boxers_quantity * washtype.boxers[4]}
                          </span>
                        </p>
                      )}
                      {!form.boxers_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.boxers_quantity !== 0 && (
                        <button
                          onClick={() => {
                            handelresetitems("boxers_quantity", "boxers");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {filteredData.includes("joggers") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/Joggers.png"
                        alt="Joggers"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>Joggers</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            joggers_quantity: e.target.value,
                          })
                        }
                        value={form.joggers_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("joggers", 0);
                              }}
                            >
                              <img
                                src={imgselect("washing-machine", "joggers", 0)}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("joggers", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "joggers", 1)}
                                alt="washing machine"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("joggers", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "joggers", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("joggers", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "joggers", 3)}
                                alt="washing machine"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.joggers_quantity !== 0 && (
                        <p>
                          {form.joggers_quantity} X {washtype.joggers[4]} ={" "}
                          <span>
                            {form.joggers_quantity * washtype.joggers[4]}
                          </span>
                        </p>
                      )}
                      {!form.joggers_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.joggers_quantity !== 0 && (
                        <button
                          onClick={() => {
                            handelresetitems("joggers_quantity", "joggers");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {filteredData.includes("others") && (
                  <tr>
                    <td>
                      <img
                        src="/cloths/Others.png"
                        alt="Others"
                        height="43px"
                        width="45px"
                      />
                      <div>
                        <p>Others</p>
                        <p>Lorem Ipsum is simply dummy text of the</p>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="quantity"
                        // defaultValue="0"
                        min="0"
                        onChange={(e) =>
                          setform({
                            ...form,
                            others_quantity: e.target.value,
                          })
                        }
                        value={form.others_quantity}
                      />
                    </td>
                    <td>
                      <div>
                        <ul>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("others", 0);
                              }}
                            >
                              <img
                                src={imgselect("washing-machine", "others", 0)}
                                alt="washing machine"
                                height={washtypeimgsize.washing_machine[1]}
                                width={washtypeimgsize.washing_machine[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("others", 1);
                              }}
                            >
                              <img
                                src={imgselect("ironing", "others", 1)}
                                alt="washing machine"
                                height={washtypeimgsize.ironing[1]}
                                width={washtypeimgsize.ironing[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("others", 2);
                              }}
                            >
                              <img
                                src={imgselect("towel", "others", 2)}
                                alt="towel"
                                height={washtypeimgsize.towel[1]}
                                width={washtypeimgsize.towel[0]}
                              />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handelimgclick("others", 3);
                              }}
                            >
                              <img
                                src={imgselect("bleach", "others", 3)}
                                alt="bleach"
                                height={washtypeimgsize.bleach[1]}
                                width={washtypeimgsize.bleach[0]}
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      {form.others_quantity !== 0 && (
                        <p>
                          {form.others_quantity} X {washtype.others[4]} ={" "}
                          <span>
                            {form.others_quantity * washtype.others[4]}
                          </span>
                        </p>
                      )}
                      {!form.others_quantity && <span>____</span>}
                    </td>
                    <td>
                      {form.others_quantity !== 0 && (
                        <button
                          onClick={() => {
                            handelresetitems("others_quantity", "others");
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="btn-reset-submit">
              <button onClick={handelcancel}>Cancel</button>
              <button type="submit" onClick={handelproceed}>
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
      {isaddAddress && (
        <form action="#">
          <div className="addressformdiv">
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setisaddAddress(false);
                }}
              >
                X
              </button>
            </div>
            <input
              type="text"
              placeholder="Type"
              required
              onChange={(e) =>
                setNewAddress({ ...newaddress, type: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Loacation"
              required
              onChange={(e) =>
                setNewAddress({ ...newaddress, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              required
              onChange={(e) =>
                setNewAddress({ ...newaddress, Address: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Phone"
              required
              onChange={(e) => {
                setNewAddress({ ...newaddress, phone: e.target.value });
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setuserAddress([...useraddress, newaddress]);
                setisaddAddress(false);
              }}
            >
              Add New Address
            </button>
          </div>
        </form>
      )}
      {isorderconfirmation && (
        <div className="orderconfirm">
          <div className="circle">
            <p>✔</p>
          </div>
          <p className="message">Your order is successfully.</p>
          <button
            onClick={(e) => {
              setisorderConfirmation(false);
              navigate("/dashboard");
            }}
          >
            Go to orders
          </button>
        </div>
      )}
      {isproceed && form.total - 90 > 0 && (
        <div className="popupwindow">
          <div className="popuphead">
            <div className="summary">
              <p>Summary</p>
              <button onClick={() => setIsProceed(false)}>X</button>
            </div>
            <div>
              <div>
                <select
                  value={form.location}
                  onChange={(e) => {
                    e.preventDefault();
                    const selectedLocation = e.target.value;
                    const matched = useraddress.find(
                      (addr) => addr.location === selectedLocation
                    );

                    if (matched) {
                      setform((prevForm) => ({
                        ...prevForm,
                        location: selectedLocation,
                        type: matched.type,
                        address: matched.Address,
                        phone: matched.phone,
                      }));
                    } else {
                      setform((prevForm) => ({
                        ...prevForm,
                        location: selectedLocation,
                      }));
                    }
                  }}
                >
                  <option value="Select" disabled>
                    Select
                  </option>
                  {useraddress.map((address, index) => (
                    <option key={index} value={address.location}>
                      {address.location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Store Address</p>
                <p>{form.address}</p>
              </div>
              <div>
                <p>Phone</p>
                <p>{form.phone}</p>
              </div>
            </div>
          </div>
          <div className="popupcontent">
            <div>Order Detais</div>
            {form.shirts_quantity > 0 && (
              <div className="billqt">
                <p>Shirts</p>
                <p>{handelwashtype(washtype.shirts)}</p>
                <p>{form.shirts_quantity} X 20 =</p>
                <p>{form.shirts_quantity * washtype.shirts[4]}</p>
              </div>
            )}
            {form.tshirts_quantity > 0 && (
              <div className="billqt">
                <p>Tshirt</p>
                <p>{handelwashtype(washtype.tshirts)}</p>
                <p>{form.tshirts_quantity} X 20 =</p>
                <p>{form.tshirts_quantity * washtype.tshirts[4]}</p>
              </div>
            )}
            {form.trousers_quantity > 0 && (
              <div className="billqt">
                <p>trousers</p>
                <p>{handelwashtype(washtype.trousers)}</p>
                <p>{form.trousers_quantity} X 20 =</p>
                <p>{form.trousers_quantity * washtype.trousers[4]}</p>
              </div>
            )}
            {form.jeans_quantity > 0 && (
              <div className="billqt">
                <p>Jeans</p>
                <p>{handelwashtype(washtype.jeans)}</p>
                <p>{form.jeans_quantity} X 20 =</p>
                <p>{form.jeans_quantity * washtype.jeans[4]}</p>
              </div>
            )}
            {form.boxers_quantity > 0 && (
              <div className="billqt">
                <p>boxer</p>
                <p>{handelwashtype(washtype.boxers)}</p>
                <p>{form.boxers_quantity} X 20 =</p>
                <p>{form.boxers_quantity * washtype.boxers[4]}</p>
              </div>
            )}
            {form.joggers_quantity > 0 && (
              <div className="billqt">
                <p>Jogger</p>
                <p>{handelwashtype(washtype.joggers)}</p>
                <p>{form.joggers_quantity} X 20 =</p>
                <p>{form.joggers_quantity * washtype.joggers[4]}</p>
              </div>
            )}
            {form.others_quantity > 0 && (
              <div className="billqt">
                <p>Others</p>
                <p>{handelwashtype(washtype.others)}</p>
                <p>{form.others_quantity} X 20 =</p>
                <p>{form.others_quantity * washtype.others[4]}</p>
              </div>
            )}
            <div className="pickupcharge">
              <div>
                <p>Sub total:</p>
                <p>{form.total - 90}</p>
              </div>
              <div>
                <p>Pickup Charges:</p>
                <p>{form.pickupcharges}</p>
              </div>
            </div>
            <div className="totalproceedamt">
              <p>Total:</p>
              <p>Rs {form.total}</p>
            </div>
          </div>
          <div className="popupfooter">
            <div className="addressdiv">
              <div>
                <p>Address</p>
              </div>
              <div>
                {useraddress.map((add, index) => {
                  return (
                    <div key={index} className="locationbox">
                      <p>{add.type}</p>
                      <p>{add.Address}</p>
                    </div>
                  );
                })}
                <div className="add-address">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setisaddAddress(true);
                    }}
                  >
                    ADD NEW
                  </button>
                </div>
              </div>
            </div>
            <div className="confirmsubdiv">
              <form action="#" onSubmit={handelsubmitorder}>
                <button type="submit" className="confirmsubbtn">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
