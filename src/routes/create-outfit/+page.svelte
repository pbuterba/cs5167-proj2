<script>
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import AccordionBody from '$lib/components/Accordion/AccordionBody.svelte';
	import AccordionHeader from '$lib/components/Accordion/AccordionHeader.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import Flyout from '$lib/components/Flyout/Flyout.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import Text from '$lib/components/Text/Text.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { clothesStore, outfitStore } from '$lib/utilities/stores.js';
	import { onMount } from 'svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import TabContent from '$lib/components/Tabs/TabContent.svelte';
	import TabLabel from '$lib/components/Tabs/TabLabel.svelte'; 

	let shirts = [];
	let pants = [];
	let currentShirtIndex = 0;
	let currentPantIndex = 0;
	let selectedShirt = null;
	let selectedPant = null;
	let outfitName = '';

	// Load all available shirts and pants when the component is mounted
	onMount(() => {
		shirts = clothesStore.getClothingItemsByType("top");
		pants = clothesStore.getClothingItemsByType("bottom");

		if (shirts.length) {
			selectedShirt = shirts[0];
		}
		if (pants.length) {
			selectedPant = pants[0];
		}
	});

	// Toggle through shirts
	function nextShirt() {
		if (shirts.length) {
			currentShirtIndex = (currentShirtIndex + 1) % shirts.length;
			selectedShirt = shirts[currentShirtIndex];
		}
	}

	function previousShirt() {
		if (shirts.length) {
			currentShirtIndex = (currentShirtIndex - 1 + shirts.length) % shirts.length;
			selectedShirt = shirts[currentShirtIndex];
		}
	}

	// Toggle through pants
	function nextPant() {
		if (pants.length) {
			currentPantIndex = (currentPantIndex + 1) % pants.length;
			selectedPant = pants[currentPantIndex];
		}
	}

	function previousPant() {
		console.log(pants.length);
		if (pants.length) {
			currentPantIndex = (currentPantIndex - 1 + pants.length) % pants.length;
			selectedPant = pants[currentPantIndex];
		}
	}

	// Save the outfit
	function saveOutfit() {
		if (outfitName && selectedShirt && selectedPant) {
			outfitStore.addOutfit(outfitName, selectedShirt.id, selectedPant.id, []);
			alert(`Outfit "${outfitName}" saved!`);
			outfitName = ''; // Clear outfit name after saving
		} else {
			alert('Please enter an outfit name and select a shirt and pants.');
		}
	}
</script>
<div class="components">
	<Tabs activeTab="1">
		<svelte:fragment slot="labels">
			<TabLabel tabnum="1">Create Outfit</TabLabel>
			<TabLabel tabnum="2">View Outfits</TabLabel>
		</svelte:fragment>
		<svelte:fragment slot="contents">
			<TabContent tabnum="1">
				<div class="header_container">
					<Header>Custom Outfits</Header>
					<Button>View Saved Outfits</Button>
				</div>
			
				<div class="body">
					<div class="select_item">
						<div class="select_shirt">
							<Header type="subheader" class="select_shirt_header">Select Shirt</Header>
							<div class="carousel">
								<Button on:click={previousShirt}>Previous Shirt</Button>
								{#if selectedShirt}
									<img src={selectedShirt.img} alt={selectedShirt.name} style="max-width: 200px;" />
								{/if}
								<Button on:click={nextShirt}>Next Shirt</Button>
							</div>
						</div>
					</div>
			
					<div class="select_item">
						<div class="select_pants">
							<Header type="subheader" class="select_pants_header">Select Pants</Header>
							<div class="carousel">
								<Button on:click={previousPant}>Previous Pant</Button>
								{#if selectedPant}
									<img src={selectedPant.img} alt={selectedPant.name} style="max-width: 200px;" />
								{/if}
								<Button on:click={nextPant}>Next Pant</Button>
							</div>
						</div>
					</div>
			
					<div class="save_outfit">
						<div style='display:flex; justify-content:center; padding:10px;'>
							<div style="display:flexbox; width :50%;">
								<TextInput placeholder="Enter Outfit Name" bind:value={outfitName} />
							</div>
						</div>
						<div style="display:flex; justify-content:center;">
							<Button style="align-items:center" on:click={saveOutfit}>Submit Outfit</Button>
						</div>
					</div>
				</div>
			</TabContent>
			</svelte:fragment>
		</Tabs>
</div>



<style>
	@import '/src/variables.css';

	.components {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}

	.header_container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		gap: 16px;
	}

	.select_shirt,
	.select_pants {
		flex-direction: column;
		padding: 6px;
		outline-style: solid;
		outline-color: var(--color-green);
	}

	.select_item {
		justify-content: center;
		text-align: center;
	}

	.save_outfit {
		display: flex;
		flex-direction: column;
	}

	.select_shirt_header,
	.select_pants_header {
		display: flex;
		width: 100%;
		flex-direction: column;
		text-align: center;
		margin:20px;
	}

	.carousel {
		display: flex;
		justify-content: space-between;
		align-items:end;
		width: 100%;
	}
</style>
