import React, { useContext } from "react";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import ProductAPI from "../apis/product";
import { toast } from "react-toastify";
import { delay } from "../util/async";


const ProductDisplay = ({ product }) => {
  // const { userHandle } = useContext(ShopContext);
  // console.log(localStorage.getItem("id_user"))
  // console.log(JSON.parse(localStorage.getItem("id_user")))
  const addToCart = async () => {
    try {
      const resul = await ProductAPI.postCart({
        count: 1,
        idProduct: product._id,
        idUser: localStorage.getItem("id_user"),
      });
      toast.info(resul.meta?.message, {
        closeOnClick: true,
        pauseOnHover: true,
      });

      await delay(5000)
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error("You need login to buy");
    }
  };

  const rate = product?.rate || 1;
  const stars = [];
  const totalStars = 5;

  const printStar = () => {
    for (let i = 0; i < rate; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }
    for (let i = rate; i < totalStars; i++) {
      stars.push(<FaRegStar key={`reg-star-${i}`} />);
    }
    return stars;
  };

  return (
    <section className="max-padd-container flex flex-col gap-8 xl:flex-row bg-primary py-4">
      <div className="flex gap-x-2 xl:flex-1 py-5">
        <div className="flex flex-col gap-[7x] flex-wrap">
          <img
            src={product.image}
            width={170}
            height={221}
            alt="productImg"
            className="max-h-[84px] rounded-xl"
          />
          <img
            src={product.image}
            width={170}
            height={221}
            alt="productImg"
            className="max-h-[84px] rounded-xl"
          />
          <img
            src={product.image}
            width={170}
            height={221}
            alt="productImg"
            className="max-h-[84px] rounded-xl"
          />
          <img
            src={product.image}
            width={170}
            height={221}
            alt="productImg"
            className="max-h-[84px] rounded-xl"
          />
        </div>
        <div className="max-h-[355px] w-auto flex">
          <img
            src={product.image}
            width={521}
            height={221}
            alt="bigImg"
            className="rounded-xl bg-gray-10"
          />
        </div>
      </div>
      <div className="flex-col flex xl:flex-[1.5] bg-white px-6 py-2 rounded-xl">
        <h3 className="h3 sm:line-clamp-1">{product.name}</h3>
        <div className="flex items-start gap-x-2 medium-16">
          {printStar()}
          <p>(233)</p>
        </div>
        <div className="flex items-baseline gap-x-6 bold-28 sm:bold-32 mt-4">
          <div className="">${product.new_price}.00</div>
          <div className="bold-20 sm:bold-28 line-through text-secondary">
            ${product.old_price}.00
          </div>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row gap-x-10 gap-y-3 my-6">
            <div>
              <h4 className="bold-16">Select Color:</h4>
              <div className="flex gap-3 my-3">
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryRed"></div>
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryYellow"></div>
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryBlue"></div>
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryGreen"></div>
              </div>
            </div>
            <div>
              <h4 className="bold-16">Select Size:</h4>
              <div className="flex gap-3 my-3">
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                  S
                </div>
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                  M
                </div>
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                  L
                </div>
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                  XL
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-8 max-w-[555px]">
            <button
              onClick={() => addToCart(product.id)}
              className="btn-dark rounded-md"
            >
              Add to cart
            </button>
            <button className="btn-secondary rounded-md !px-4">
              <FaHeart />
            </button>
          </div>
          <p>
            <span className="medium-16 text-tertiary">Category: </span>Home |
            Jacket | Winter
          </p>
          <p>
            <span className="medium-16 text-tertiary">Tags: </span> Modern | New
            Arrivals
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
