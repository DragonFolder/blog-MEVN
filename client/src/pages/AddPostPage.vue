<script setup>
	import { ref, watch, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { Notyf } from 'notyf';
	import api from '../api';

	const route = useRoute();
	const router = useRouter();
	const notyf = new Notyf();


	const title = ref("");
	const content = ref("");
	const isEnabled = ref(false);

	watch([title, content], (current) => {
		isEnabled.value = current.every(field => field !== "");
	})

	async function handleSubmit(e){
		e.preventDefault();
		try{
			await api.post(`/posts`, {
				title: title.value,
				content: content.value
			});
			notyf.success("Post updated");
			router.push({ name: 'Feed'});
		} catch(e){
			notyf.error(e.response?.data.message ?? "Could not create post");
		}
	}
</script>

<template>
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">New Post</h1>

		<div class="row d-flex justify-content-center">
			<div class="col-md-6 mx-auto">
				<form v-on:submit="handleSubmit">
					<div class="mb-3">
						<label for="title" class="form-label">Title</label>
						<input type="text" class="form-control" id="title" v-model="title" />
					</div>
					<div class="mb-3">
						<label for="content" class="form-label">Content</label>
						<textarea class="form-control" id="content" rows="4" v-model="content" />
					</div>
					<div class="d-grid mt-4">
						<button type="submit" class="btn btn-primary" v-if="isEnabled">Publish</button>
						<button type="button" class="btn btn-danger" disabled v-else>Fill in all values</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>