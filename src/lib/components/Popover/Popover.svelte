<script>
	import { createPopper } from '@popperjs/core';
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import { createPopoverStore } from './PopoverStore.js';

	export let id = '';
	export let selectedItems = [];
	export let position = 'bottom';

	let popoverElement;
	let triggerElement;
	let contentElement;

	let popoverStore = createPopoverStore(id, selectedItems);
	setContext('popoverStore', popoverStore);

	const dispatch = createEventDispatcher();

	const popoverOverOpenedDispatch = () => {
		dispatch('popoverOverOpened', id);
	};

	const popoverOverClosedDispatch = () => {
		dispatch('popoverOverClosed', id);
	};

	const popoverItemsChangedDispatch = () => {
		dispatch('popoverItemsChanged', { id: id, selectedItems: $popoverStore.selectedItems });
	};

	function getTriggerElement() {
		let triggerElement = popoverElement.querySelector('#trigger');
		if (triggerElement) {
			return triggerElement;
		}
	}

	function getContentElement() {
		let contentElement = popoverElement.querySelector('#content');
		if (contentElement) {
			return contentElement;
		}
	}

	function createPopperInstance() {
		const triggerElement = getTriggerElement();
		const contentElement = getContentElement();

		if (triggerElement && contentElement) {
			createPopper(triggerElement, contentElement, {
				placement: position,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 8]
						}
					}
				]
			});
		}
	}

	$: $popoverStore.selectedItems, popoverItemsChangedDispatch();
	$: {
		if ($popoverStore.isOpen) {
			popoverOverOpenedDispatch();
		} else {
			popoverOverClosedDispatch();
		}
	}

	onMount(() => {
		createPopperInstance();
	});
</script>

<div class="popover" aria-haspopup="true" aria-expanded="true" bind:this={popoverElement}>
	<slot name="trigger" />
	<slot name="content" />
</div>

<style>
	.popover {
		width: fit-content;
	}
</style>
