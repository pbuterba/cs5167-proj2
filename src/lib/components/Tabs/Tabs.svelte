<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import { createTabsStore } from './tabsStore.js';

	export let activeTab;

	let dispatch = createEventDispatcher();
	const tabsStore = createTabsStore(activeTab);

	setContext('tabsStore', tabsStore);
</script>

<div class="tabs">
	<div class="tab-labels">
		<slot name="label"></slot>
	</div>
	<div class="tab-content">
		<slot name="content"></slot>
	</div>
</div>

<style>
	@import '../../../variables.css';

	.tabs {
		display: flex;
		flex-direction: column;
	}

	.tab-labels {
		display: flex;
		gap: 4px;
	}

	.tab-labels > * {
		flex: 1;
		text-align: center;
		padding: 8px 16px;
		cursor: pointer;
	}

	.tab-labels > *:hover {
		background-color: var(--color-surface);
	}

	.tab-labels > *:not(:last-child) {
		border-right: 1px solid var(--color-surface);
	}

	.tab-content {
		padding: 16px;
	}
</style>
