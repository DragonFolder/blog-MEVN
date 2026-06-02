<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useGlobalStore } from '../stores/global';
	import { Notyf } from 'notyf';
	import api from '../api';

	const route = useRoute();
	const postId = route.params.postId;
	const notyf = new Notyf();

	const store = useGlobalStore();
	const { user } = storeToRefs(store);

	const post = ref(null);

	onMounted(async() => {
		try{
			const { data } = await api.get(`/posts/${postId}`);
			post.value = data.result;
		} catch(e) {
			notyf.error("Post not found");
		}
	})

	const canEdit = computed(() => {
		post.value && user.value && (user.value.id === post.value.author || user.value.isAdmin)
	})
</script>

<template>
	<div v-if="post" class="container-fluid">
		<div class="col-md-8 mx-auto my-5">
			<h1>{{ post.title }}</h1>
			<p class="text-muted small">{{ new Date(post.creation_date).toLocalString() }}</p>
			<p>{{ post.content }}</p>
			<router-link v-if="canEdit" :to="{ name: 'EditPost', params: { postId: post._id }}" class="btn btn-primary">
				Edit
			</router-link>
		</div>
	</div>
</template>