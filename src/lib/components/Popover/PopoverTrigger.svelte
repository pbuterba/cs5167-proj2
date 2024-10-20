<script>
	import { getContext } from 'svelte';

	export let onhover = false;

	const popoverStore = getContext('popoverStore');

	function handleClick() {
		if (onhover) return;
		popoverStore.toggle();
	}

	function handleHover() {
		if (onhover) {
			popoverStore.toggle();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="trigger"
	class="popover-trigger"
	on:click={handleClick}
	on:mouseenter={handleHover}
	on:mouseleave={handleHover}
>
	<slot name="custom-trigger"></slot>
</div>

<style>
	.popover-trigger {
		cursor: pointer;
		width: fit-content;
	}
</style>
