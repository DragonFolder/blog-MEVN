<script setup>
	import { ref, onMounted } from 'vue';
	import PostCard from '../components/PostCard.vue';
	import api from '../api';
	import { Notyf } from 'notyf';

	const posts = ref([]);
	const notyf = new Notyf();

	onMounted(async() => {
		const { data } = await api.get('/posts');
		posts.value = (data.result ?? []).sort((a,b) =>
			new Date(b.creation_date) - new Date(a.creation_date)
		);
	})

	async function handleDelete(postId){
		try{
			await api.delete(`/posts/${postId}`);
			posts.value = posts.value.filter(p => p._id !== postId);
			notyf.success("Post deleted");
		}catch(e){
			notyf.error(e.response?.data?.message ?? "Delete failed");
		}
	}
</script>

<template>
	<div class="container-fluid">
		<div class="d-flex justify-content-end my-3">
			<router-link :to="{ name: 'AddPost'}" class="btn btn-success">
				<i class="bi bi-plus-lg">New Post</i>
			</router-link>
		</div>

		<PostCard
			v-for="post in posts"
			:key="post._id"
			:post="post"
			@delete="handleDelete"
		/>
	</div>
</template>