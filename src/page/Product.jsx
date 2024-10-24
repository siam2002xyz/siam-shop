import React, { useEffect, useState } from "react";
import Producthd from "../components/Producthd";
import { useParams } from "react-router-dom";
import all_products from "../assets/all_products";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import PopularProducts from "../components/PopularProducts";
import ProductAPI from "../apis/product";

const Product = () => {
  const { productId } = useParams();
  const [detailProduct, setDetailProduct] = useState({})

  // const product = all_products.find(e => e.id === Number(productId))
  useEffect(() => {
    async function fetchData() {
      const product = await ProductAPI.getDetailProduct(productId);
      setDetailProduct(product.product)
    }
    fetchData()
  }, [productId]);

  if (!detailProduct) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <Producthd product={detailProduct} />
      <ProductDisplay product={detailProduct} />
      <ProductDescription />
      <PopularProducts />
    </div>
  );
};

export default Product;
