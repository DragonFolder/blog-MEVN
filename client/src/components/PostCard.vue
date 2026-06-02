<script setup>
	import { storeToRefs } from 'pinia';
	import { useGlobalStore } from '../stores/global';

	const props = definedProps({
		post: {
			type: Object,
			required: true
		}
	});

	const emit = defineEmits(['delete']);

	const store = useGlobalStore();
	const { user } = storeToRefs(store);

	function onDelete(){
		emit('delete', props.post._id);
	}
</script>

<template>
	<div class="card mb-3">
		<div class="card-body d-flex justify-content-between align-items-start">
			<router-link :to="{ name: 'Post', params: { postId: post._id}}">
				<h5 class="mb-0">{{ post.title }}</h5>
			</router-link>
			<p class="card-text">{{ post.content }}</p>
			<button v-if="user.isAdmin" class="btn btn-danger btn-sm" @click="onDelete">
				<i class="bi bi-trash"></i>
			</button>
		</div>
	</div>
</template>