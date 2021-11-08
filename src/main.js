import App from './App.svelte';

const isProd = WEBPACK_OVERRIDE_PRODUCTION;

function log(message) {
	if (!isProd) {
		console.log(message);
	}
};

const app = new App({
	target: document.body,
	props: {
		log: log
	}
});

export default app;