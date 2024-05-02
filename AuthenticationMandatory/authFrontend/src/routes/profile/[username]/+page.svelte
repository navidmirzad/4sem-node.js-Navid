<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let posts = [];
	let title = '';

	onMount(async () => {
		// Fetch posts when the component is mounted
		await fetchPosts();
	});

	async function fetchPosts() {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			// Handle case where access token is missing
			console.error('Access token is missing');
			return;
		}

		try {
			const response = await fetch('http://localhost:8080/posts', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			});

			if (response.ok) {
				const data = await response.json();
				posts = data;
			} else {
				console.error('Failed to fetch posts:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	}

	async function createPost(title) {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			// Handle case where access token is missing
			console.error('Access token is missing');
			return;
		}

		try {
			const response = await fetch('http://localhost:8080/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify({ title })
			});

			if (response.ok) {
				// If post is created successfully, fetch posts again to update the list
				await fetchPosts();
			} else {
				console.error('Failed to create post:', response.statusText);
			}
		} catch (error) {
			console.error('Error creating post:', error);
		}
	}

	let username = $page.params.username;
	username = username.charAt(0).toUpperCase() + username.slice(1);
</script>

<div class="mx-20 mt-20">
	<h1 class="font-bold text-3xl mb-2">Welcome to your profile {username}</h1>
	<p class="text-lg font-bold">This is your profile page. You can see your information here.</p>

	<div class="create-post-form mx-20 mt-20 border border-gray-300 rounded p-4">
		<form on:submit|preventDefault={() => createPost(title)} class="flex items-center">
			<input
				type="text"
				bind:value={title}
				placeholder="Enter post title"
				class="mr-2 px-2 py-1 border rounded"
			/>
			<button type="submit" class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
				>Create Post</button
			>
		</form>
	</div>

	<div class="posts-container mx-20 mt-4 border border-gray-300 rounded p-4">
		<h2 class="font-bold text-xl mb-4">Your Posts</h2>
		<ul class="post-list">
			{#each posts as post}
				<li>{post.title}</li>
			{/each}
		</ul>
	</div>
</div>
