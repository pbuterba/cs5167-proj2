<script>
	import Header from '$lib/components/Header/Header.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Popover from '$lib/components/Popover/Popover.svelte';
	import PopoverMultiSelectContent from '$lib/components/Popover/CustomPopoverContent/PopoverMultiSelectContent.svelte';
	import PopoverChipTrigger from '$lib/components/Popover/CustomPopoverTrigger/PopoverChipTrigger.svelte';
	import StandardContentLayout from '$lib/components/StandardContentLayout/StandardContentLayout.svelte';
	import {
		outfitStore,
		clothesStore,
		weatherStore,
		selectedOutfitId
	} from '../../lib/utilities/stores';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import TabContent from '$lib/components/Tabs/TabContent.svelte';
	import TabLabel from '$lib/components/Tabs/TabLabel.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';

	let popoverItems = [];
	let filteredOutfits = $outfitStore;
	let toast;
	let tabs;
	let activeTabNumber = $selectedOutfitId === undefined ? '1' : '2';

	// The DEFAULT temperature is 50 degrees unless specified to use current temp
	let clothingFilters = { cozy: false, formal: false, temp: 50 };

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
			toast.addToast();
		}
	}

	function handlePopoverItemsChanged(event) {
		popoverItems = event.detail.selectedItems;
		filterOutfits();
	}

	function submitOutfitChoice(outfitId) {
		selectedOutfitId.update(() => outfitId);
		tabs.changeTab('2');
	}

	filterOutfits();
</script>

<div class="components">
	<Tabs activeTab={activeTabNumber} bind:this={tabs}>
		<svelte:fragment slot="labels">
			<TabLabel tabnum="1">Choose Outfit</TabLabel>
			<TabLabel tabnum="2">Selected Outfit</TabLabel>
		</svelte:fragment>

		<svelte:fragment slot="contents">
			<TabContent tabnum="1">
				<StandardContentLayout>
					<div class="box">
						<Header type="h2">What type of outfit are you looking for today?</Header>
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
						</div>
					</div>
					<div class="outfit_cards">
						{#each $outfitStore as outfit}
							{#if filteredOutfits.includes(outfit)}
								<div class="display_outfit">
									<Header type="subheader">{outfit.name}</Header>
									<div class="img_wrapper">
										<img src={clothesStore.getClothingItemById(outfit.topid).img} alt="top" />
										<img src={clothesStore.getClothingItemById(outfit.bottomid).img} alt="bottom" />
									</div>
									<Button on:click={() => submitOutfitChoice(outfit.id)}>Choose this Outfit</Button>
								</div>
							{/if}
						{/each}
					</div>
				</StandardContentLayout>
			</TabContent>

			<TabContent tabnum="2">
				{#if $selectedOutfitId != undefined}
					<StandardContentLayout>
						<Header type="h1">Selected Outfit</Header>
						<div class="display_outfit full">
							<Header type="h2">{outfitStore.getOutfitById($selectedOutfitId).name}</Header>
							<div class="img_wrapper">
								<img
									src={clothesStore.getClothingItemById(
										outfitStore.getOutfitById($selectedOutfitId).topid
									).img}
									alt="top"
								/>
								<img
									src={clothesStore.getClothingItemById(
										outfitStore.getOutfitById($selectedOutfitId).bottomid
									).img}
									alt="bottom"
								/>
							</div>
						</div>
					</StandardContentLayout>
				{/if}
			</TabContent>
		</svelte:fragment>
	</Tabs>
	<Toast
		title="No Outfits Match Selected Preferences"
		message="There are no outfits that match your preferences. Please select a new preference combination."
		type="error"
		bind:this={toast}
	/>
</div>

<style>
	@import '/src/variables.css';
	.components {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}

	.checkboxes {
		display: flex;
		flex-direction: row;
	}

	.box {
		display: flex;
		justify-content: space-between;
		border-radius: 20px;
		padding: 8px;
		height: fit-content;
	}

	.img_wrapper img {
		border-radius: 8px;
		border: 3px solid var(--color-edge);
		padding: 4px;
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
		width: fit-content;
		border-radius: 8px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 16px;
		box-sizing: border-box;
	}

	.popover_content {
		padding-top: 0%;
	}

	.outfit_cards {
		display: flex;
		flex-direction: row;
		gap: 16px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.full {
		width: 100%;
	}
</style>
