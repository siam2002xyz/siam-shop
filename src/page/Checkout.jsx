import React, { useEffect, useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import ProductAPI from "../apis/product";
import { generateAccessToken } from "../util/async";
import axios from "axios";
import OrderAPI from "../apis/order";

const Checkout = () => {
  const [carts, setCarts] = useState([]);

  const [total, setTotal] = useState(0);
  // console.log(import.meta.env.VITE_CLIENT_ID);

  const [shipping, setShipping] = useState("");
  const [shippingError, setShippingError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  // const [emailRegex, setEmailRegex] = useState(false);
  const [idUser, setIdUser] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [message, setmessage] = useState("");

  const [methodPay, setMethodPay] = useState("");
  const [methodPayError, setMethodPayError] = useState(false);

  const [success, setSuccess] = useState(false);

  const [load, setLoad] = useState(false);

  // const createOrder = async (item, total) => {
  //   const accessToken = await generateAccessToken();

  //   const response = await axios({
  //     url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //     data: JSON.stringify({
  //       intent: "CAPTURE",
  //       purchase_units: [
  //         {
  //           items: item,

  //           amount: {
  //             currency_code: "USD",
  //             value: total,
  //             breakdown: {
  //               item_total: {
  //                 currency_code: "USD",
  //                 value: total,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //       application_context: {
  //         return_url: import.meta.env.VITE_URL_BASE + "/complete-order",
  //         cancel_url: import.meta.env.VITE_URL_BASE + "/cancel-order",
  //         shipping_preference: "NO_SHIPPING",
  //         user_action: "PAY_NOW",
  //         brand_name: "manfra.io",
  //       },
  //     }),
  //   });

  //   console.log(response.data);
  //   return response.data.links.find((link) => link.rel === "approve").href;
  // };

  //Hàm này dùng để gọi API và render số sản phẩm
  useEffect(() => {
    if (localStorage.getItem("id_user")) {
      const fetchData = async () => {
        const params = {
          idUser: localStorage.getItem("id_user"),
        };

        const query = "?";
        // + queryString.stringify(params);

        const response = await ProductAPI.getCart(params.idUser);
        setIdUser(params.idUser)
        // console.log(response);

        setCarts(response.cart.cartData);

        // getTotal(response.total);
        setTotal(response.total);
        // setFullname(response.cart.name);

        if (response.length === 0) {
          window.location.replace("/cart");
        }
      };
      // socket.on("send_order", (arg) => {
      // 	console.log(arg);
      // })
      fetchData();
    }
  }, []);

  //Hàm này dùng để tính tổng tiền carts
  // function getTotal(carts) {
  //   let sub_total = 0;
  //   // const sum_total =
  //   carts.map((value) => {
  //     return (sub_total +=
  //       parseInt(value.priceProduct) * parseInt(value.count));
  //   });

  //   setTotal(sub_total);
  // }

  //Check Validation
  const handlerSubmit = async () => {
    if (!shipping) {
      setShippingError(true);
      setEmailError(false);
      setPhoneError(false);
      setAddressError(false);
      setMethodPayError(false);
      return;
    } else {
      // if (!email) {
      //   setShippingError(false);
      //   setEmailError(true);
      //   setPhoneError(false);
      //   setAddressError(false);
      //   setMethodPayError(false);
      //   return;
      // }
      //  else {
        // setPhoneError(false);
        // setAddressError(false);
        // setMethodPayError(false);
        // setShippingError(false);
        // if (!validateEmail(email)) {
        //   setEmailRegex(true);
        //   setShippingError(false);
        //   setEmailError(false);
        //   setPhoneError(false);
        //   setAddressError(false);
        //   setMethodPayError(false);
        //   return;
        // } 
        // else {
        //   setEmailRegex(false);

          if (!phone) {
            setShippingError(false);
            setEmailError(false);
            setPhoneError(true);
            setAddressError(false);
            setMethodPayError(false);
            return;
          } else {
            setShippingError(false);
            setEmailError(false);
            setPhoneError(false);
            setAddressError(false);
            setMethodPayError(false);

            if (!address) {
              setShippingError(false);
              setEmailError(false);
              setPhoneError(false);
              setAddressError(true);
              setMethodPayError(false);
            } else {
              if (!methodPay) {
                setShippingError(false);
                setEmailError(false);
                setPhoneError(false);
                setAddressError(true);
                setMethodPayError(true);
            } else {
              const saveOrder = await OrderAPI.newOrder({
                user: idUser,
                phoneNumber: phone,
                message: message,
                address: address,
                shipping: shipping,
                cart: carts,
                methodPay: methodPay,
                progressingDelivery: "pendding"
              });
              const submitData = await OrderAPI.paymentOrder();
              await window.location.replace(submitData.link)
              console.log("link", submitData)
              console.log("result", saveOrder)
              // console.log("data", {
              //   phoneNumber: phone,
              //   message: message,
              //   address: address,
              //   shipping: shipping,
              //   methodPay: methodPay
              // })
              // return console.log(link);

              // setLoad(!load);
            }
          }
        }
      }
    }
  // };
// }

  //Hàm này bắt đầu gửi Email xác nhận đơn hàng
  useEffect(() => {
    if (load) {
      const sendMail = async () => {
        const params = {
          to: email,
          fullname: fullname,
          phone: phone,
          address: address,
          idUser: localStorage.getItem("id_user"),
        };

        const query = "?";
        // + queryString.stringify(params);

        const response = "";
        // await CheckoutAPI.postEmail(query);

        console.log(response);
      };

      sendMail();

      const data = localStorage.getItem("id_user");
      console.log(localStorage.getItem("user")?.email);
      setEmail(data);

      // Gửi socket lên server
      // socket.emit('send_order', data);

      //Dùng setTimeout delay 3s
      //Sau 4s nó sẽ thực hiện
      setTimeout(() => {
        setSuccess(!success);
        setLoad(!load);
      }, 4000);
    }
  }, [load]);

  const onChangeMessage = (e) => {
    setmessage(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangemethodPayment = (e) => {
    setMethodPay(e.target.value);
  };

  const onChangeshipping = (e) => {
    setShipping(e.target.value);
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}

      <div className="max-padd-container bg-primary">
        <section className="bg-light">
          <div className="pt-24 flexStart">
            <div className=" py-lg-4 align-items-center">
              <div className="col-lg-6">
                {/* <h1 className="h2 text-uppercase mb-0">Checkout</h1> */}
              </div>
              {/* <div className='col-lg-6 text-lg-right'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb justify-content-lg-end mb-0 px-0'>
										<li className='breadcrumb-item'>
											<a href='index.html'>Home</a>
										</li>
										<li className='breadcrumb-item'>
											<a href='cart.html'>Cart</a>
										</li>
										<li
											className='breadcrumb-item active'
											aria-current='page'>
											Checkout
										</li>
									</ol>
								</nav>
							</div> */}
              <div className="flex items-center flex-wrap gap-x-2 medium-16 py-8 capitalize">
                Home <TbArrowRight />
                Cart <TbArrowRight />
                checkout <TbArrowRight />
                {/* {product.name} */}
                user
              </div>
            </div>
          </div>
        </section>

        {!success && (
          <section className="pb-6">
            <h2 className="h3 text-uppercase mb-4">Billing details</h2>
            <div className="flexBetweenTop max-padd-container">
              <div className="w-[80%] mx-4">
                <form>
                  <div className="flex flex-col gap-4">
                    {/* <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Full Name:
                      </label>
                      <input
                        className="bg-transparent border-none outline-none form-control form-control-lg"
                        value={fullname}
                        onChange={onChangeName}
                        type="text"
                        placeholder="Enter Your Full Name Here!"
                      />
                      {fullnameError && (
                        <span className="text-danger">
                          * Please Check Your Full Name!
                        </span>
                      )}
                    </div> */}
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Message:{" "}
                      </label>
                      <input
                        className="bg-transparent border-none outline-none form-control form-control-lg"
                        value={message}
                        onChange={onChangeMessage}
                        type="text"
                        placeholder="Enter Your Email Here!"
                      />
                      {/* {emailError && (
                        <span className="text-danger">
                          * Please Check Your Email!
                        </span>
                      )} */}
                      {/* {emailRegex && (
                        <span className="text-danger">
                          * Incorrect Email Format
                        </span>
                      )} */}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Phone Number:{" "}
                      </label>
                      <input
                        className="bg-transparent border-none outline-none form-control form-control-lg"
                        value={phone}
                        onChange={onChangePhone}
                        type="text"
                        placeholder="Enter Your Phone Number Here!"
                      />
                      {phoneError && (
                        <span className="text-danger">
                          * Please Check Your Phone Number!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Address:{" "}
                      </label>
                      <input
                        className="bg-transparent border-none outline-none form-control form-control-lg"
                        value={address}
                        onChange={onChangeAddress}
                        type="text"
                        placeholder="Enter Your Address Here!"
                      />
                      {addressError && (
                        <span className="text-danger">
                          * Please Check Your Address!
                        </span>
                      )}
                    </div>
                    {/* FIX */}
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Shipping:{" "}
                      </label>
                      <input
                        className="bg-transparent border-none outline-none form-control form-control-lg"
                        value={shipping}
                        onChange={onChangeshipping}
                        type="text"
                        placeholder="Enter Your shipping Here!"
                      />
                      {shippingError && (
                        <span className="text-danger">
                          * Please Check Your Method Ship!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="methodpay"
                      >
                        MethodPay:{" "}
                      </label>
                      <select
                        value={methodPay}
                        onChange={onChangemethodPayment}
                        name="paymentMethod"
                        id=""
                      >
                        <option value="">Please choose method</option>
                        <option value="cash">cash</option>
                        <option value="cart">cart</option>
                      </select>
                      {methodPayError && (
                        <span className="text-danger">
                          * Please Check Your methodPay!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <button
                        className=" w-[50%] rounded-xl btn-dark"
                        style={{ color: "white" }}
                        // type="submit"
                        type="button"
                        onClick={handlerSubmit}
                      >
                        Complete order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="w-[70%] col-lg-4 flexCenterTop">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h2 className="h3 text-uppercase mb-4">Order{"'s "}</h2>
                    <ul className="list-unstyled mb-0">
                      {carts &&
                        carts.map((value) => (
                          <div key={value._id}>
                            <li className="d-flex align-items-center justify-content-between">
                              <strong className="small font-weight-bold">
                                {value.nameProduct}
                              </strong>
                              <br></br>
                              <span className="text-muted small">
                                {/* {convertMoney(
																	value.priceProduct
																)}{' '} */}
                                <b>{value.name}</b>: ${value.new_price} x{" "}
                                {value.quantity}
                              </span>
                            </li>
                            <li className="border-bottom my-2"></li>
                          </div>
                        ))}
                      <li className="d-flex align-items-center justify-content-between pt-5">
                        <strong className="text-uppercase text-2xl font-weight-bold">
                          Total:{" "}
                        </strong>
                        <span>
                          {/* {convertMoney(total)} VND */}$ {total}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className="py-5">
            <div className="p-5">
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Checkout;
