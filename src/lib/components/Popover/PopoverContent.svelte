<script>
	import { getContext } from 'svelte';
	const popoverStore = getContext('popoverStore');
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="content" class="popover-content" class:hidden={!$popoverStore.isOpen}>
	<slot name="custom-content"></slot>
</div>

<style>
	.popover-content {
		gap: 8px;
		padding: 8px;
		background-color: var(--color-surface);
		box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
		position: absolute;
	}

	.hidden {
		display: none;
	}
</style>
