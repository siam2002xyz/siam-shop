import React, { useEffect, useState } from "react";
import LATEST from "../assets/latest.js";
import Item from "./Item.jsx";
import ProductAPI from "../apis/product.js";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const products = await ProductAPI.getTrenddingProduct("new")
      setNewProducts(products.newProducts)
    }
    fetchData()
  }, [])

  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="h3">New Arriavals</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          aliquam mollitia eaque, atque amet autem necessitatibus expedita
          facere incidunt reiciendis nobis sint quo placeat. Reprehenderit esse
          provident eos quibusdam soluta!
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32">
        {newProducts.map((item, index) => (
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
}

export default NewArrivals