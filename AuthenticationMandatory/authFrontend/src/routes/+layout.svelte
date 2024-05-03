<script>
	import '../app.css';

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
</script>

<slot />
