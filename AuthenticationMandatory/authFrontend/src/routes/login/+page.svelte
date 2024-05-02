<script>
	let username = '';
	let password = '';

	async function login(event) {
		event.preventDefault();

		const user = {
			username,
			password
		};

		const response = await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		if (response.ok) {
			alert('Login successful!');
			window.location.href = `/profile/${username}`;
		} else {
			alert('Login failed, try again...');
		}
	}
</script>

<div class="container mx-auto max-w-md mt-20 justify-center border-2 border-black p-4">
	<h1 class="text-3xl font-bold mb-4 flex justify-center">Login</h1>
	<form on:submit={login}>
		<div class="mb-4">
			<label for="username" class="block text-gray-700">Username</label>
			<input
				type="text"
				id="username"
				bind:value={username}
				class="border border-gray-300 px-4 py-2 rounded-md w-full"
			/>
		</div>
		<div class="mb-4">
			<label for="password" class="block text-gray-700">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				class="border border-gray-300 px-4 py-2 rounded-md w-full"
			/>
		</div>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
	</form>
</div>
