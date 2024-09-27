<script>
	let thingy;

	const onClick = (event) => {
		const ripple = document.createElement('div');
		ripple.classList.add('ripple');
		thingy.appendChild(ripple);

		const rect = thingy.getBoundingClientRect();

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
<div class="thingy" on:click={onClick} bind:this={thingy}>
	<span class="label">
		<slot />
	</span>
</div>

<style>
	@import '../../../variables.css';
	.thingy {
		padding: var(--size-sm) var(--size-md);
		border-radius: var(--border-radius-sm);
		background-color: var(--color-orange);
		outline: none;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: fit-content;
		user-select: none;
		min-width: 25px;
		min-height: 25px;
		transition: all 0.3s ease;
	}

	.thingy:hover {
		background-color: var(--color-orange-darker);
	}

	.label {
		color: var(--color-text);
		font-size: 125%;
		font-weight: 600;
	}

	:global(.ripple) {
		position: absolute;
		border-radius: 50%;
		background-color: var(--color-orange-ripple);
		width: 100px;
		height: 100px;
		transform: translate(-50%, -50%) scale(0);
		animation: ripple 1s forwards;
		pointer-events: none;
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
