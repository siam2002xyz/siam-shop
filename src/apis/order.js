import axiosClient from './axiosClient';

const OrderAPI = {
	newOrder: (params) => {
		const url = '/api/order';
		return axiosClient.post(url, {...params});
	},
	paymentOrder: () => {
		const url = '/api/test';
		return axiosClient.get(url);
	},
};

export default OrderAPI;
