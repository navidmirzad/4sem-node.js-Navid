<script>
	let username = '';
	let password = '';
	let email = '';

	import toastr from 'toastr';
	import 'toastr/build/toastr.min.css';

	toastr.options = {
		closeButton: true,
		progressBar: true,
		positionClass: 'toast-top-right',
		preventDuplicates: true,
		newestOnTop: true,
		showDuration: '300',
		hideDuration: '1000',
		timeOut: '5000',
		extendedTimeOut: '1000',
		showEasing: 'swing',
		hideEasing: 'linear',
		showMethod: 'fadeIn',
		hideMethod: 'fadeOut'
	};

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
			toastr.success('User created successfully!');
			window.location.href = '/login';
		} else {
			toastr.error('Failed to create user!');
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
		<div class="mb-4">
			<label for="email" class="block text-gray-700">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				placeholder="Enter your email"
				class="border border-gray-300 px-4 py-2 rounded-md w-full"
			/>
		</div>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
	</form>
</div>
