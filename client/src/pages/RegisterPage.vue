<script setup>
	 /* ACTIVITY SOLUTION START */
	import { watch, ref, onBeforeMount } from 'vue';

	import { Notyf } from 'notyf';
	import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/global.js';
	/* ACTIVITY SOLUTION END */
	import api from '../api.js';

	const firstName = ref("");
	const lastName = ref("");
	const mobileNum = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPassword = ref("");
	const isEnabled = ref(false);

	const notyf = new Notyf();

	/* ACTIVITY SOLUTION START */
    const router = useRouter()

    const { user, getUserDetails } = useGlobalStore();
    /* ACTIVITY SOLUTION END */

	watch([email, password, confirmPassword, firstName, lastName, mobileNum], (currentValue, oldValue) => {
		const [emailVal, passVal, confirmPassVal, fNameVal, lNameVal, mobileVal] = currentValue;

		if(
			emailVal !== "" && 
			passVal !== "" && 
			confirmPassVal !== "" && 
			fNameVal !== "" && 
			lNameVal !== "" && 
			mobileVal !== "" && 
			passVal === confirmPassVal
		) {
			isEnabled.value = true;
		} else {
			isEnabled.value = false;
		}

	});

	async function handleSubmit(e) {
		e.preventDefault();

		// console.log(email.value);
		// console.log(password.value);
		// console.log(confirmPassword.value);

		try {

			// await api.post('/users/check-email', {
			// 	email: email.value
			// });

			let response = await api.post('/users/register', {
				firstName: firstName.value,
				lastName : lastName.value,
				email: email.value,
				mobileNo: mobileNum.value,
				password: password.value
			})

			if(response.status === 201) {

				notyf.success(response.data.message);

				firstName.value = "";
				lastName.value = "";
				mobileNum.value = "";
				email.value = "";
				password.value = "";
				confirmPassword.value = "";

				router.push({ path: '/login'})

			} else {

				notyf.error("Registration Failed. Please contact admin.");
			}

		} catch(e) {

			const status = e.response?.status;
			const message = e.response?.data?.message;

			if (status === 404 || status === 401 || status === 400 || status === 409) {

				notyf.error(message ?? "Registration failed.");

			} else if (status === 500) {

				console.error('Server error on /users/register:', e.response?.data ?? e);
				notyf.error(message ?? "Server error - this email may already be registered.");

			} else {

				console.error(e);
				notyf.error("Registration Failed. Please contact admin.");
			}
		}
		
	}

    onBeforeMount(async () => {
        const token = localStorage.getItem("token");

        if (token && !user.email) {
            try {
                await getUserDetails(token);
            } catch (error) {
                console.error("Failed to load user details", error);
            }
        }

        if (user.email) {
            router.replace({ name: 'Home' });
        }
    })

</script>

<template>
	
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">
			Register Page
		</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 mx-auto">
			<form v-on:submit="handleSubmit">
				<div class="mb-3">
					<label for="fName" class="form-label">First Name:</label>
					<input type="text" class="form-control" placeholder="Enter your FirstName" id="fName" v-model="firstName">
				</div>
				<div class="mb-3">
					<label for="lName" class="form-label">Last Name:</label>
					<input type="text" class="form-control" placeholder="Enter your LastName "id="lName" v-model="lastName">
				</div>
				<div class="mb-3">
					<label for="emailInput" class="form-label">Email:</label>
					<input type="email" class="form-control" placeholder="Enter your email" id="emailInput" v-model="email">
				</div>	
				<div class="mb-3">	
					<label for="mobile" class="form-label">Mobile Number</label>
					<input type="text" class="form-control" placeholder="Enter your 11 digit mobile number" id="mobile" v-model="mobileNum">
				</div>
				<div class="mb-3">
					<label for="passwordInput" class="form-label">Password:</label>
					<input type="password" class="form-control" placeholder="Enter your password" id="passwordInput" v-model="password">
				</div>

				<div class="mb-3">
					<label for="cpasswordInput" class="form-label">Verify Password:</label>
					<input type="password" class="form-control" placeholder="Verify your password" id="cpasswordInput" v-model="confirmPassword">
				</div>

				<div class="d-grid mt-5">
					<button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Register</button>
					<button type="button" class="btn btn-danger btn-block" disabled v-else>Please enter your registration details</button>
				</div>
			</form>
			</div>
		</div>
	</div>
</template>