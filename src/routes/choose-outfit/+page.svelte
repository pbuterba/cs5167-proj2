<script>
	import Header from '$lib/components/Header/Header.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Popover from '$lib/components/Popover/Popover.svelte';
	import PopoverMultiSelectContent from '$lib/components/Popover/CustomPopoverTrigger/PopoverMultiSelectContent.svelte';
	import PopoverChipTrigger from '../../lib/components/Popover/CustomPopoverContent/PopoverChipTrigger.svelte';
	import { outfitStore, clothesStore, weatherStore } from '../../lib/utilities/stores';

	let popoverItems = [];
	let isOutfitShown = false;
	let filteredOutfits = [];
	let isOutfitSubmitted = false;

	// The DEFAULT temperature is 50 degrees unless specified to use current temp
	let clothingFilters = { cozy: false, formal: false, temp: 50 };
	let outfitCount = 0;

	let preferenceItems = [
		{ label: 'Cozy', value: 'cozy' },
		{ label: 'Formal', value: 'formal' },
		{ label: 'Current Temperature', value: 'temp' }
	];

	function filterOutfits() {
		// Reset filters so they are properly set each loop.
		filteredOutfits = [];
		clothingFilters.cozy = false;
		clothingFilters.formal = false;
		clothingFilters.temp = 50;

		popoverItems.forEach((element) => {
			if (element.value == 'cozy') {
				clothingFilters.cozy = true;
			} else if (element.value == 'formal') {
				clothingFilters.formal = true;
			} else if (element.value == 'temp') {
				clothingFilters.temp = weatherStore.getTemp();
			}
		});
		filteredOutfits = outfitStore.getOutfitByFilters(clothingFilters);

		// Ensure the outfits are clean
		let loopCount = 0;
		filteredOutfits.forEach((outfit) => {
			if (
				clothesStore.isClothingItemClean(outfit.topid) == false ||
				clothesStore.isClothingItemClean(outfit.bottomid) == false
			) {
				filteredOutfits.splice(loopCount, 1);
			}
			loopCount = loopCount + 1;
		});

		if (filteredOutfits.length == 0) {
			alert(
				'There are no outfits that match your preferences. Please select a new preference combination.'
			);
		} else {
			toggleOutfitShowing();
		}
	}

	function traverseOutfits(backwards = false) {
		if (backwards == true) {
			if (outfitCount - 1 < 0) {
				outfitCount = filteredOutfits.length - 1;
			} else {
				outfitCount = outfitCount - 1;
			}
		} else {
			if (outfitCount >= filteredOutfits.length - 1) {
				outfitCount = 0;
			} else {
				outfitCount = outfitCount + 1;
			}
		}
	}

	function toggleOutfitShowing() {
		if (isOutfitShown) {
			isOutfitShown = false;
		} else {
			isOutfitShown = true;
		}
	}

	function handlePopoverItemsChanged(event) {
		popoverItems = event.detail.selectedItems;
	}

	function clearPopoverItems() {
		popoverItems = [];
	}

	function submitOutfitChoice() {
		clothesStore.dirtyClothingItemById(filteredOutfits[outfitCount].topid);
		clothesStore.dirtyClothingItemById(filteredOutfits[outfitCount].bottomid);

		isOutfitSubmitted = true;
	}
</script>

<div class="components">
	{#if isOutfitShown == false && isOutfitSubmitted == false}
		<div class="box">
			<Header type="h2">What type of outfit are you looking for today?</Header> <br />

			<div class="split_container">
				<div class="popover_content">
					<Popover on:popoverItemsChanged={handlePopoverItemsChanged}>
						<PopoverChipTrigger class="popover_content" slot="trigger" label="Preferences" />
						<PopoverMultiSelectContent
							class="popover_content"
							slot="content"
							items={preferenceItems}
						/>
					</Popover>
				</div>
				<Button on:click={() => filterOutfits()}>Submit Preferences</Button>
			</div>
		</div>
	{:else if isOutfitShown == true && isOutfitSubmitted == false}
		<Header type="h1">Outfit Suggestions</Header>

		<div class="display_outfit">
			<Header type="h2">{filteredOutfits[outfitCount].name}</Header>
			<div class="split_container">
				<Button type="inverse" on:click={() => traverseOutfits(true)}>Previous Outfit</Button>
				<div class="img_wrapper">
					<img
						src={clothesStore.getClothingItemById(filteredOutfits[outfitCount].topid).img}
						alt="top"
					/>
					<img
						src={clothesStore.getClothingItemById(filteredOutfits[outfitCount].bottomid).img}
						alt="bottom"
					/>
				</div>
				<Button type="inverse" on:click={() => traverseOutfits()}>Next Outfit</Button>
			</div>
		</div>
		<div class="split_container">
			<Button on:click={() => toggleOutfitShowing()} on:click={() => clearPopoverItems()}
				>Return to Preferences</Button
			>
			<Button on:click={() => submitOutfitChoice()}>Submit Outfit Choice</Button>
		</div>
	{:else}
		<Header type="h1">Selected Outfit:</Header>
		<div class="display_outfit">
			<Header type="h2">{filteredOutfits[outfitCount].name}</Header>
			<div class="img_wrapper">
				<img
					src={clothesStore.getClothingItemById(filteredOutfits[outfitCount].topid).img}
					alt="top"
				/>
				<img
					src={clothesStore.getClothingItemById(filteredOutfits[outfitCount].bottomid).img}
					alt="bottom"
				/>
			</div>
		</div>
	{/if}
</div>

<style>
	@import '/src/variables.css';
	.components {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}

	.split_container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 5%;
		border-radius: 40px;
		box-sizing: border-box;
	}

	.checkboxes {
		display: flex;
		flex-direction: row;
	}

	.box {
		background-color: var(--color-baige);
		border: 5px solid var(--color-navy-dark);
		border-radius: 40px;
		padding: 5%;
		height: fit-content;
	}

	.img_wrapper img {
		border-radius: 8px;
		border: 3px solid var(--color-edge);
		padding: 16px;
		width: 200px;
		height: 200px;
		object-fit: cover;
	}

	.display_outfit {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		justify-content: center;
		width: 100%;
		border-radius: 8px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 16px;
		box-sizing: border-box;
	}

	.popover_content {
		padding-top: 0%;
	}
</style>
