<script>
	import { createEventDispatcher } from 'svelte';
	export let label = '';
	export let placeholder = '';
	export let required = false;
	export let value = '';

	const dispatch = createEventDispatcher();

	function handleChange(event) {
		dispatch('change', { value: event.target.value });
	}
</script>

<div class="container">
	<div class="entryarea">
		<input type="text" {required} {placeholder} bind:value on:change={handleChange} />
		<div class="labelline">
			{label}
		</div>
	</div>
</div>

<style>
	@import '../../../variables.css';
	.container {
		width: auto;
	}

	.entryarea {
		position: relative;
		height: 50px;
		line-height: 50px;
	}

	input {
		position: absolute;
		width: 100%;
		box-sizing: border-box;
		border: none;
		font-size: 120%;
		padding: 0 30px;
		height: 50px;
		border-radius: var(--border-radius-sm);
		outline: 3px solid var(--color-edge-darker);
		background: transparent;
		transition: 0.1s ease;
		z-index: 1111;
	}

	.labelline {
		position: absolute;
		font-size: 120%;
		color: var(--color-text-lighter);
		padding: 0 30px;
		background-color: var(--color-surface);
		transition: 0.2s ease;
		width: fit-content;
	}

	input:focus + .labelline,
	input:valid + .labelline {
		height: 25px;
		line-height: 25px;
		transform: translate(0, -15px) scale(0.8);
		z-index: 1111;
		padding: 0 22px;
	}

	input:focus + .labelline {
		color: var(--color-green);
	}

	input:focus {
		outline: 3px solid var(--color-green);
	}
</style>
