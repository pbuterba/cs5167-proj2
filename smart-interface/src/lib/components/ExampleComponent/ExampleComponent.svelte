<script>
	import { mousePosition } from '$lib/utilities/stores.js';

	let divy;
	let divyX = 0;
	let divyY = 0;
	let dragging = false;
	let divyTop = 100;
	let divyLeft = 350;

	$: if (dragging) {
		divyTop = $mousePosition.y - divyY;
		divyLeft = $mousePosition.x - divyX;
	}

	function handleMouseDown(event) {
		dragging = true;
		divyX = event.offsetX;
		divyY = event.offsetY;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="divy"
	class:dragging
	bind:this={divy}
	on:mousedown={handleMouseDown}
	on:mouseup={() => (dragging = false)}
	style={`top: ${divyTop}px; left:${divyLeft}px`}
>
	<slot />
</div>

<style>
	@import '../../../variables.css';
	.divy {
		position: absolute;
		background-color: var(--color-navy);
		cursor: grab;
		border-radius: var(--border-radius-md);
		display: flex;
		flex-direction: column;
		width: fit-content;
		height: fit-content;
		padding: var(--size-lg);
	}

	.divy:hover {
		background-color: var(--color-red);
	}
	.dragging:hover {
		background-color: var(--color-green);
		cursor: grabbing;
	}
</style>
