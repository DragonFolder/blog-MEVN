<script setup>
	import { ref, watch, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { Notyf } from 'notyf';
	import api from '../api';

	const route = useRoute();
	const router = useRouter();
	const notyf = new Notyf();

	const postId = route.params.postId;

	const title = ref("");
	const content = ref("");
	const isEnabled = ref(false);
	const isLoading = ref(true);

	onMounted(async() => {
		try {
			const { data } = await api.get(`/posts/${postId}`);
			title.value = data.result.title;
			content.value = data.result.content;
		} catch (e){
			notyf.error("Could not load post");
			router.push({ name: 'Feed' });
		} finally {
			isLoading.value = false;
		}
		
	})

	watch([title, content], (current) => {
		isEnabled.value = current.every(field => field !== "");
	})

	async function handleSubmit(e){
		e.preventDefault();
		try{
			await api.patch(`/posts/${postId}`, {
				title: title.value,
				content: content.value
			});
			notyf.success("Post updated");
			router.push({ name: 'Post', params: { postId }});
		} catch(e){
			notyf.error(e.response?.data?.message ?? "Update failed");
		}
	}
</script>

<template>
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">Edit Post</h1>

		<div v-if="isLoading">Loading...</div>
		<div v-else class="row d-flex justify-content-center">
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
						<button type="submit" class="btn btn-primary" v-if="isEnabled">Save Changes</button>
						<button type="button" class="btn btn-danger" disabled v-else>Fill in all values</button>
					</div>
				</form>
			</div>
		</div>

	</div>
</template>