<script setup>
	import { useRoute } from 'vue-router';
	import { computed } from 'vue';

	const route = useRoute();
	const postId = route.params.postId;

	const post = ref(null);

	onMounted(async() => {
		try{
			const { data } = await api.get(`/posts/${postId}`);
		} catch(e) {
			notyf.error("Post not found");
		}
	})

	const canEdit = computed(() => {
		post.value && user.value && (user.value.id === post.value.author || user.value.isAdmin)
	})
</script>

<template>
	<div v-if="post">
		<h1>{{ post.title }}</h1>
		<p class="text-muted">{{ new Date(post.creation_date).toLocalString() }}</p>
		<p>{{ post.content }}</p>
		<router-link v-if="canEdit" :to="{ name: 'EditPost', params: { postId: post._id }}" class="btn btn-primary">
			Edit
		</router-link>
	</div>
</template>