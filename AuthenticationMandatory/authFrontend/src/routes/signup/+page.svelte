<script>
	let username = '';
	let password = '';
	let email = '';

	async function signUp(event) {
		event.preventDefault(); // Prevent default form submission behavior

		const newUser = {
			username,
			password,
			email
		};

		const response = await fetch('http://localhost:8080/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});

		if (response.ok) {
			alert('Sign up successful!');
			window.location.href = '/login';
		} else {
			alert('Something went wrong, try again...');
		}
	}
</script>

<div class="container mx-auto max-w-md mt-20 justify-center border-2 border-black p-4">
	<h1 class="text-3xl font-bold mb-4 flex justify-center">Sign Up</h1>
	<form on:submit={signUp}>
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
		<div class="mb-4">
			<label for="email" class="block text-gray-700">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				class="border border-gray-300 px-4 py-2 rounded-md w-full"
			/>
		</div>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
	</form>
</div>
