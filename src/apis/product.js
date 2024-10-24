import axiosClient from "./axiosClient";

const ProductAPI = {
  getAllProduct: () => {
    const url = "/api/products";
    return axiosClient.get(url);
  },
  getCategory: (query) => {
    const url = `/api/products?category=${query}`;
    return axiosClient.get(url);
  },
  getDetailProduct: (id) => {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },
  updatedStarProduct: (params, id) => {
    const url = `/api/product/${id}`;
    return axiosClient.put(url, { ...params });
  },
  // getPagination: (query) => {
  // 	const url = `/api/products/pagination${query}`;
  // 	return axiosClient.get(url);
  // },
  getTrenddingProduct: (query) => {
    const url = `/api/products?status=${query}`;
    return axiosClient.get(url);
  },
  // Cart
  getCart: (id) => {
    const url = `/api/cart/${id}`;
    return axiosClient.get(url);
  },
  postCart: (query) => {
    const url = `/api/cart?count=${query.count}&idProduct=${query.idProduct}&idUser=${query.idUser}`;
    return axiosClient.post(url);
  },
  deletedCart: (query) => {
    const url = `/api/cart?count=${query.count}&idProduct=${query.idProduct}&idUser=${query.idUser}`;
    return axiosClient.delete(url);
  },
  // order
  getOrder: (id) => {
    const url = `/api/order/${id}`;
    return axiosClient.get(url);
  },
  postOrder: (params) => {
    const url = `/api/order`;
    return axiosClient.get(url, params);
  },
};

export default ProductAPI;
