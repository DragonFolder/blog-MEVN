import { defineStore } from 'pinia';
import { reactive } from 'vue';

import api from '../api';
//defineStore() creates a store. It has 2 arguments, the unique id of the store and the function that defines and returns the states and actions of the store.
export const useGlobalStore = defineStore('global', () => {

	let user = reactive({
		token: localStorage.getItem('token'),
		id: null,
		email: null,
		isAdmin: null
	})

	async function getUserDetails(token) {
		
		if(!token) {
			user.token = null;
			user.id = null;
			user.email = null;
			user.isAdmin = null;

			return
		}

		let { data } = await api.get('/users/details', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		// This API is inconsistent about envelopes: some endpoints return a
		// flat object, others wrap in { result } / { user }. Handle both.
		const u = data.result ?? data.user ?? data;

		user.token = token;
		user.id = u._id;
		user.email = u.email;
		user.isAdmin = u.isAdmin;
	}

	return {
		user,
		getUserDetails
	}
});