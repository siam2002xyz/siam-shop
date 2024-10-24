import React, { useEffect, useState } from "react";
// import POPULAR from "../assets/popular";
import Item from "./Item.jsx";
import ProductAPI from "../apis/product.js";

const PopularProducts = () => {
  const [popuplarProduct, setPopuplarProduct] = useState([])

  useEffect(() => {
    async function fetchData() {
      const POPULAR = await ProductAPI.getTrenddingProduct("popular")
      setPopuplarProduct(POPULAR.popularProduct)
    }
    fetchData()
  }, [])


  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="h3">Popular Products</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          aliquam mollitia eaque, atque amet autem necessitatibus expedita
          facere incidunt reiciendis nobis sint quo placeat. Reprehenderit esse
          provident eos quibusdam soluta!
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32">
        {popuplarProduct?.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            _id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
