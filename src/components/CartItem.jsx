import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { TbTrash } from "react-icons/tb";
import ProductAPI from "../apis/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  // const { userHandle, cartItems, removeCart, getTotalCartAmount } =
  // useContext(ShopContext);
const navigate = useNavigate()
  const [getCart, setGetCart] = useState([]);
  const [total, setTotal] = useState([]);

  const removeCart = async (id) => {
    try {
      const isRemoveCart = confirm("Do you want remove product?")
      if (!isRemoveCart) return  
      const resul = await ProductAPI.deletedCart({
        count: 1,
        idProduct: id,
        idUser: JSON.parse(localStorage.getItem("user")).id,
      });
      toast.success(resul.meta.message0);
      window.location.reload()
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitCoupon = () => {
    return toast.info("The code is not active, please wait the next time")
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    async function fetchData() {
      const cart = await ProductAPI.getCart(user.id);
      setGetCart(cart.cart.cartData);
      setTotal(cart.total);
    }
    fetchData();
  }, []);
  console.log(getCart);

  return (
    <section className="max-padd-container bg-primary rounded-3xl">
      <div className="py-24">
        <table className="w-full mx-auto">
          <thead>
            <tr className="border border-tertiary/90 bg-tertiary/90 text-white regular-16 sm:regular:18 text-start py-12">
              <th className="p-1 py-2">Products</th>
              <th className="p-1 py-2">Title</th>
              <th className="p-1 py-2">Price</th>
              <th className="p-1 py-2">Size</th>
              <th className="p-1 py-2">Color</th>
              <th className="p-1 py-2">Quantity</th>
              <th className="p-1 py-2">Total</th>
              <th className="p-1 py-2">Remove</th>
            </tr>
          </thead>
          <tbody className="border border-slate-900/20">
            {getCart?.map((product) => {
              if (getCart.length > 0) {
                return (
                  <tr
                    key={product.id}
                    className="border border-slate-900/20 text-gray-30 p-6 medium-14 text-center"
                  >
                    <td className="flex items-end justify-center">
                      <img
                        src={product.image}
                        alt="error"
                        height={55}
                        width={55}
                        className="rounded-lg ring-1 ring-slate-900/5 m-3 p-1"
                      />
                    </td>
                    <td>
                      <div className="line-clamp-3">{product.name}</div>
                    </td>
                    <td>${product.new_price}</td>
                    <td>{product?.size || "S"}</td>
                    <td>{product?.color || "default"}</td>
                    <td className="w-16 h-16 bg-white">{product.quantity}</td>
                    <td>${product.new_price * product.quantity}</td>
                    <td>
                      <div className="bold-22 relative left-1/2">
                        <TbTrash onClick={() => removeCart(product.id)} />
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="flex flex-col justify-between gap-y-16 mt-10 p-8 md:flex-row rounded-md w-full max-w-[777px]">
          <div className="flex flex-col gap-8">
            <h4 className="bold-22">Summary</h4>
            <div>
              <div className="flexBetween py-4">
                <h4 className="medium-16">Subtotal:</h4>
                <h4 className="text-gray-30 font-semibold">${total}</h4>
              </div>
              <hr />
              <div className="flexBetween py-4">
                <h4 className="medium-16">Shipping Fee:</h4>
                <h4 className="text-gray-30 font-semibold">free</h4>
              </div>
              <hr />
              <div className="flexBetween py-4">
                <h4 className="medium-18">Total:</h4>
                <h4 className="bold-18">${total}</h4>
              </div>
            </div>
            <button onClick={() => navigate("/checkout")} className="btn-dark w-44 rounded-xl">Checkout</button>
          </div>
          <div className="flex flex-col gap-10">
            <h4 className="bold-20 capitalize">Your coupon code enter here:</h4>
            <div className="flexBetween pl-5 h-[3.3rem] bg-white ring-1 ring-slate-900/10 w-full w-max-[366px] rounded-xl">
              <input
                type="text"
                placeholder="coupon code"
                className="bg-transparent border-none outline-none"
              />
              <button onClick={submitCoupon} className="btn-dark rounded-lg relative right-[0.33rem]">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
