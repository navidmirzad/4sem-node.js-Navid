<script>
	let username = '';
	let password = '';
	let accessToken = '';
	let refreshToken = '';

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
			const data = await response.json();
			accessToken = data.token;
			refreshToken = data.refreshToken;
			alert('Login successful!');
			// Store the tokens in local storage with expiration time
			const accessTokenExpirationTime = new Date().getTime() + data.accessTokenExpiresIn * 900; // 15min
			const refreshTokenExpirationTime =
				new Date().getTime() + data.refreshTokenExpirationTime * 1800; // 30min
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('accessTokenExpiresAt', accessTokenExpirationTime);

			localStorage.setItem('refreshToken', refreshToken);
			localStorage.setItem('refreshTokenExpiresAt', refreshTokenExpirationTime);

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
				placeholder="Enter your username"
				class="border border-gray-300 px-4 py-2 rounded-md w-full"
			/>
		</div>
		<div class="mb-4">
			<label for="password" class="block text-gray-700">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				placeholder="Enter your password"
				class="border border-gray-300 px-4 py-2 rounded-md w-full"
			/>
		</div>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
	</form>
</div>
