(() => {
	const root = document.documentElement;
	const themeToggle = document.getElementById('themeToggle');
	const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
	const storageKey = 'preferred-theme';
	const systemMedia = window.matchMedia('(prefers-color-scheme: dark)');
	const onSystemThemeChange = (event) => {
		if (!getStoredTheme()) {
			setTheme(event.matches ? 'dark' : 'light', false);
		}
	};

	const getStoredTheme = () => localStorage.getItem(storageKey);
	const getPreferredTheme = () => {
		const storedTheme = getStoredTheme();
		if (storedTheme) return storedTheme;
		return systemMedia.matches ? 'dark' : 'light';
	};

	const updateThemeIcon = (theme) => {
		if (!themeIcon) return;
		themeIcon.classList.remove('fa-sun', 'fa-moon');
		if (theme === 'dark') {
			themeIcon.classList.add('fa-sun');
			themeToggle?.setAttribute('aria-label', 'Switch to light mode');
		} else {
			themeIcon.classList.add('fa-moon');
			themeToggle?.setAttribute('aria-label', 'Switch to dark mode');
		}
	};

	const setTheme = (theme, persist = true) => {
		root.setAttribute('data-bs-theme', theme);
		if (persist) {
			localStorage.setItem(storageKey, theme);
		}
		updateThemeIcon(theme);
	};

	setTheme(getPreferredTheme(), false);

	themeToggle?.addEventListener('click', () => {
		const currentTheme = root.getAttribute('data-bs-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
	});

	if (typeof systemMedia.addEventListener === 'function') {
		systemMedia.addEventListener('change', onSystemThemeChange);
	} else if (typeof systemMedia.addListener === 'function') {
		systemMedia.addListener(onSystemThemeChange);
	}

	// Smooth scroll for in-page navigation
	document.querySelectorAll('[data-scroll]').forEach((link) => {
		link.addEventListener('click', (event) => {
			const href = link.getAttribute('href');
			if (!href || !href.startsWith('#')) return;
			const target = document.querySelector(href);
			if (!target) return;
			event.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			link.blur();
		});
	});

	// Cookie consent
	const consentKey = 'cookieConsent';
	const cookieBanner = document.getElementById('cookieBanner');
	const acceptCookies = document.getElementById('acceptCookies');

	if (cookieBanner && !localStorage.getItem(consentKey)) {
		cookieBanner.classList.add('show');
	}

	acceptCookies?.addEventListener('click', () => {
		localStorage.setItem(consentKey, 'accepted');
		cookieBanner?.classList.remove('show');
		if (typeof gtag === 'function' && location.hostname === 'www.natevory.com') {
			gtag('consent', 'update', {
				analytics_storage: 'granted',
			});
		}
	});

	// Footer year
	const yearEl = document.getElementById('currentYear');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}
})();
