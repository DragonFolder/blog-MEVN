<script setup>
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useGlobalStore } from '../stores/global';

	const props = defineProps({
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

	const postedOn = computed(() =>
		new Date(props.post.creation_date).toLocaleDateString(undefined, {
			year: 'numeric', month: 'short', day: 'numeric'
		})
	);
</script>

<template>
	<div class="card mb-3">
		<!-- <div class="card-body d-flex justify-content-between align-items-start">
			<router-link :to="{ name: 'Post', params: { postId: post._id}}">
				<h5 class="mb-0">{{ post.title }}</h5>
			</router-link>
			<p class="card-text">{{ post.content }}</p>
			<button v-if="user.isAdmin" class="btn btn-danger btn-sm" @click="onDelete">
				<i class="bi bi-trash"></i>
			</button>
		</div> -->
		<div class="card-body">
			<div class="d-flex justify-content-between align-items-start">
				<router-link :to="{ name: 'Post', params: { postId: post._id}}">
					<h5 class="mb-0">{{ post.title }}</h5>
				</router-link>
				<button v-if="user.isAdmin" class="btn btn-danger btn-sm" @click="onDelete">
					<i class="bi bi-trash"></i>
				</button>
			</div>

			<p class="text-muted small mb-2">
				By {{ post.author?.firstName }} {{ post.author?.lastName }} · {{ postedOn }}
			</p>

			<p class="card-text mb-0">{{ post-content }}</p>
		</div>
	</div>
</template>