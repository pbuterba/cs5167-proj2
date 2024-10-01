<script>
	import { createEventDispatcher } from 'svelte';
	export let href = '';
	export let target = '';
	export let type = 'default';

	let button;
	let dispatch = createEventDispatcher();

	const onClick = (event) => {
		dispatch('click', event);
		const ripple = document.createElement('div');
		ripple.classList.add('ripple');
		button.appendChild(ripple);

		const rect = button.getBoundingClientRect();

		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Set the position of the ripple
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;

		setTimeout(() => {
			ripple.remove();
		}, 1000);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a
	class="button"
	class:inverse={type === 'inverse'}
	class:empty={type === 'empty'}
	{href}
	{target}
	on:click={onClick}
	bind:this={button}
>
	<span class="label">
		<slot />
	</span>
</a>

<style>
	@import '../../../variables.css';
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		padding: var(--size-sm) var(--size-md);
		border-radius: var(--border-radius-sm);
		background-color: var(--color-green);
		cursor: pointer;
		width: fit-content;
		user-select: none;
		transition: all 0.3s ease;
		text-decoration: none;
		border: 3px solid transparent;
	}

	.button:hover {
		background-color: var(--color-green-darker);
	}

	.inverse {
		background-color: transparent;
		border: 3px solid var(--color-green);
	}

	.inverse:hover {
		background-color: var(--color-green-transparent);
	}

	.empty {
		background-color: transparent;
		border: 3px solid transparent;
	}

	.empty:hover {
		background-color: var(--color-green-transparent);
	}

	.label {
		color: white;
		font-size: 20px;
		font-weight: 500;
		z-index: 2;
		height: 24px;
		display: flex;
		align-items: center;
	}

	.inverse .label {
		color: var(--color-green);
	}

	.empty .label {
		color: var(--color-green);
	}

	:global(.ripple) {
		position: absolute;
		border-radius: 50%;
		background-color: var(--color-green);
		width: 100px;
		height: 100px;
		transform: translate(-50%, -50%) scale(0);
		animation: ripple 1s forwards;
		pointer-events: none;
		z-index: 1;
	}

	@keyframes ripple {
		from {
			opacity: 1;
			transform: translate(-50%, -50%) scale(0);
		}
		to {
			opacity: 0;
			transform: translate(-50%, -50%) scale(4);
		}
	}
</style>
