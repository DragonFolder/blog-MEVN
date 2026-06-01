<script setup>
    import { watch, ref, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import { Notyf } from 'notyf';
    import { storeToRefs } from 'pinia';

    
    import api from '../api';

    const { getUserDetails } = useGlobalStore();
    const store = useGlobalStore();
    const { user } = storeToRefs(store);


    import { useRouter } from 'vue-router';

    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const emailTouched = ref(false);
    const passwordTouched = ref(false);
    const isEnabled = ref(false);

    const notyf = new Notyf();

    watch([email,password], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    async function handleSubmit(e){
        e.preventDefault();

        try {


            let res = await api.post('/users/login', {

                email: email.value,
                password: password.value
            })
            console.log(res.data)
            if(res.data) {
                notyf.success("Login Successful");

                localStorage.setItem("token", res.data.access);

                await getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                // window.location.reload();
                router.push({ name: 'Home' });

            }

        } catch(e) {

            if(e.response && [400,401,404].includes(e.response.status)) {
                notyf.error(e.response.data.message)
            } else {
                notyf.error("Login Failed. Please contact admin.");
            }
        }

        
    }


    onBeforeMount(async () => {
        const token = localStorage.getItem("token");

        // If a token is present but the store hasn't hydrated yet
        // (direct nav / refresh), hydrate before deciding.
        if (token && !user.value.email) {
            try {
                await getUserDetails(token);
            } catch (error) {
                console.error("Failed to load user details", error);
            }
        }

        if (user.value.email) {
            router.replace({ name: 'Home' });
        }
    })

</script>

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-primary text-center">Login Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5">
                <form v-on:submit="handleSubmit">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email" @blur="emailTouched = true" />
                        <span v-if="emailTouched && email === ''" class="text-danger small">Email is required.</span>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" @blur="passwordTouched = true" />
                        <span v-if="passwordTouched && password === ''" class="text-danger small">Password is required.</span>
                    </div>
                    <div class="d-grid mt-5">
                        <button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Login</button>
                        <button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>
                    </div>
                    <div class="text-center mt-3">
                        <span class="small">Don't have an account yet? </span>
                        <router-link to="/register" class="small">Click here</router-link>
                        <span class="small"> to register.</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
