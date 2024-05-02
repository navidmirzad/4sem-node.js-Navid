<script>
	import { page } from '$app/stores';
	let username = $page.params.username;
	username = username.charAt(0).toUpperCase() + username.slice(1);
</script>

<div class="mx-20 mt-20">
	<h1 class="font-bold text-3xl mb-2">Welcome to your profile {username}</h1>
	<p class="text-lg font-bold">This is your profile page. You can see your information here.</p>
</div>
