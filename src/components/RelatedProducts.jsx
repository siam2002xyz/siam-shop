import React, { useEffect, useState } from "react";
import LATEST from "../assets/latest";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Link } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import ProductAPI from "../apis/product";

const RelatedProducts = () => {
    const [newProducts, setNewProducts] = useState([])
  useEffect(() => {
    async function fetchData() {
      const products = await ProductAPI.getTrenddingProduct("new");
      setNewProducts(products.newProducts)
    }
    fetchData()
  }, []);

  return (
    <div>
      <h4 className="border-l-4 pl-2 border-secondary">Related Products</h4>
      <div className="mx-auto max-w-full">
        <Swiper
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          // className='h-[422px] sm:h-[477px] mt-5'>
          className="h-[188px] mt-5"
        >
          {newProducts?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                onClick={window.scrollTo(0, 0)}
                className="flexCenter gap-x-5 bg-white p-4 rounded-xl"
                to={`/product/${item._id}`}
              >
                <img
                  src={item.image}
                  height={77}
                  width={77}
                  alt=""
                  className="rounded-lg drop-shadow-xl"
                />
                <div className="flex flex-col gap-y-1">
                  <h4 className="line-clamp-1 medium-16">{item.name}</h4>
                  <p className="line-clamp-1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
                    nostrum error saepe. Est voluptas praesentium, saepe
                    voluptatibus at totam repellat maxime suscipit quibusdam,
                    quas, aspernatur quis fugiat recusandae temporibus ab.
                  </p>
                  <div className="flexBetween">
                    <div className="flexBetween gap-x-2 medium-16">
                      <span>${item.new_price}.00</span>
                      <span className="line-through text-secondary">
                        ${item.old_price}.00
                      </span>
                    </div>
                    <RiShoppingCart2Line className="text-xl hover:text-secondary" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
