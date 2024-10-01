<header>Header</header>

<main>
	<slot />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

	header {
		padding: 1rem;
		background-color: #f8f9fa;
	}
	main {
		font-family: 'Inter', sans-serif;
		padding: 32px 0;
		margin: 0 auto;
		max-width: 1800px;
	}
</style>
