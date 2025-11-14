(() => {
	const form = document.getElementById('contactForm');
	if (!form) return;

	const submitButton = document.getElementById('contactSubmit');
	const spinner = document.getElementById('contactSpinner');
	const successAlert = document.getElementById('contactSuccess');
	const errorAlert = document.getElementById('contactError');

	let contactSubmitEndpoint = 'https://formspree.io/f/xdoyvqab';
	const hostname = window.location.hostname;

	if (hostname === 'localhost') {
		contactSubmitEndpoint = 'http://localhost:8042/submit';
	}

	const toggleSubmitting = (isSubmitting) => {
		if (isSubmitting) {
			submitButton?.classList.add('disabled');
			submitButton?.setAttribute('disabled', 'disabled');
			spinner?.classList.remove('d-none');
		} else {
			submitButton?.classList.remove('disabled');
			submitButton?.removeAttribute('disabled');
			spinner?.classList.add('d-none');
		}
	};

	const checkSimulatedSubmission = () => ({
		simulateSubmit: window.simulateSubmit === true,
		simulateError: window.simulateError === true,
	});

	const submitForm = async (formData) => {
		const { simulateSubmit, simulateError } = checkSimulatedSubmission();
		if (simulateSubmit) {
			await new Promise((resolve, reject) =>
				setTimeout(simulateError ? reject : resolve, 400)
			);
			return;
		}

		const response = await fetch(contactSubmitEndpoint, {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Submission failed');
		}
	};

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		successAlert?.classList.add('d-none');
		errorAlert?.classList.add('d-none');
		toggleSubmitting(true);

		const data = new FormData(form);

		try {
			await submitForm(data);
			form.classList.add('d-none');
			successAlert?.classList.remove('d-none');
		} catch (error) {
			errorAlert?.classList.remove('d-none');
		} finally {
			toggleSubmitting(false);
		}
	});
})();
