import axiosClient from './axiosClient';

const UserAPI = {
	login: (params) => {
		const url = '/login';
		return axiosClient.post(url, {...params});
	},
	register: (params) => {
		const url = '/signup';
		return axiosClient.post(url, {...params});
	},
	changePassword: (id, params) => {
		const url = `/change-password/${id}`;
		return axiosClient.put(url, {...params});
	},
	
	resetPassword: (email) => {
		const url = `/reset`;
		return axiosClient.post(url, {email: email});
	},

	vertifyCodePassword: (token) => {
		const url = `/reset-pass`;
		return axiosClient.post(url, {token: token});
	},

	logout: () => {
		const url = '/logout';
		return axiosClient.get(url)
	}
};

export default UserAPI;
