<script>
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import AccordionBody from '$lib/components/Accordion/AccordionBody.svelte';
	import AccordionHeader from '$lib/components/Accordion/AccordionHeader.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { clothesStore, outfitStore } from '$lib/utilities/stores.js';
	import { onMount } from 'svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import TabContent from '$lib/components/Tabs/TabContent.svelte';
	import TabLabel from '$lib/components/Tabs/TabLabel.svelte';
	import { get, writable } from 'svelte/store';
	import Header from '$lib/components/Header/Header.svelte';
	import Text from '$lib/components/Text/Text.svelte';
	let shirts = [];
	let pants = [];
	let currentShirtIndex = 0;
	let currentPantIndex = 0;
	let selectedShirt = null;
	let selectedPant = null;
	let outfitName = '';
	let savedOutfits = get(outfitStore);

	// Load all available shirts and pants when the component is mounted
	onMount(() => {
		// Initialize shirts and pants from clothesStore
		shirts = clothesStore.getClothingItemsByType('top');
		pants = clothesStore.getClothingItemsByType('bottom');

		// Select the first shirt and pant
		if (shirts.length) {
			selectedShirt = shirts[0];
		}
		if (pants.length) {
			selectedPant = pants[0];
		}

		// Subscribe to the outfits store to display saved outfits
		outfitStore.subscribe((outfits) => {
			savedOutfits = outfits.map((outfit) => {
				const shirt = clothesStore.getClothingItemById(outfit.topid);
				const pants = clothesStore.getClothingItemById(outfit.bottomid);

				// Return outfit with full shirt and pants details
				console.log(savedOutfits);
				return {
					...outfit,
					shirt,
					pants
				};
			});
		});
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
		if (pants.length) {
			currentPantIndex = (currentPantIndex - 1 + pants.length) % pants.length;
			selectedPant = pants[currentPantIndex];
		}
	}

	// Save the outfit
	function saveOutfit() {
		if (outfitName && selectedShirt && selectedPant) {
			outfitStore.addOutfit(outfitName, selectedShirt.id, selectedPant.id, []); // Add the outfit to the store
			alert(`Outfit "${outfitName}" saved!`);
			outfitName = ''; // Clear outfit name after saving
		} else {
			alert('Please enter an outfit name and select a shirt and pants.');
		}
		console.log(get(outfitStore));
	}
</script>

<div class="components">
	<Tabs activeTab="1">
		<svelte:fragment slot="labels">
			<TabLabel tabnum="1">Create Outfit</TabLabel>
			<TabLabel tabnum="2">Saved Outfits</TabLabel>
		</svelte:fragment>
		<svelte:fragment slot="contents">
			<TabContent tabnum="1">
				<div class="body">
					<div class="selection">
						<!-- Select Shirt Section -->
						<div class="select_item">
							<div class="select_shirt">
								<Header type="subheader">Select Shirt</Header>
								<div class="carousel">
									<Button on:click={previousShirt}>Previous Shirt</Button>
									{#if selectedShirt}
										<img
											src={selectedShirt.img}
											alt={selectedShirt.name}
											style="max-width: 200px;"
										/>
									{/if}
									<Button on:click={nextShirt}>Next Shirt</Button>
								</div>
							</div>
						</div>

						<!-- Select Pants Section -->
						<div class="select_item">
							<div class="select_pants">
								<Header type="subheader">Select Pants</Header>
								<div class="carousel">
									<Button on:click={previousPant}>Previous Pant</Button>
									{#if selectedPant}
										<img src={selectedPant.img} alt={selectedPant.name} style="max-width: 200px;" />
									{/if}
									<Button on:click={nextPant}>Next Pant</Button>
								</div>
							</div>
						</div>
					</div>
					<!-- Save Outfit Section -->
					<div class="save_outfit">
						<div>
							<div style="width: 500px;">
								<TextInput label="Enter Outfit Name" bind:value={outfitName} />
							</div>
						</div>
						<div style="display:flex; justify-content:center;">
							<Button style="align-items:center" on:click={saveOutfit}>Submit Outfit</Button>
						</div>
					</div>
				</div>
			</TabContent>

			<!-- Saved Outfits Tab -->
			<TabContent tabnum="2">
				{#if savedOutfits}
					{#each savedOutfits as outfit (outfit.id)}
						<div class="accordion">
							<Accordion>
								<AccordionHeader slot="header">
									<Text>{outfit.name}</Text>
								</AccordionHeader>
								<AccordionBody slot="body">
									<div class="outfit-display">
										<div class="outfit-shirt">
											<Text type="light">{outfit.shirt.name}</Text>
											<div class="accordion-img">
												<img class="shirt-img" src={outfit.shirt.img} alt="shirt" />
											</div>
										</div>
										<div class="outfit-pants">
											<Text type="light">{outfit.pants.name}</Text>
											<div class="accordion-img">
												<img class="pant-img" src={outfit.pants.img} alt="shirt" />
											</div>
										</div>
									</div>
								</AccordionBody>
							</Accordion>
						</div>
					{/each}
				{:else}
					<p>No saved outfits yet.</p>
				{/if}
			</TabContent>
		</svelte:fragment>
	</Tabs>
</div>

<style>
	.components {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}

	.body {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}
	.selection {
		display: flex;
		flex-direction: row;
		gap: 16px;
	}
	.select_shirt,
	.select_pants {
		flex-direction: column;
		padding: 6px;
		outline-style: solid;
		outline-color: var(--color-green);
		border-radius: 10px;
		height: 330px;
		width: 450px;
	}

	.select_shirt img,
	.select_pants img {
		height: 300px;
		width: 250px;
	}

	.select_item {
		justify-content: center;
		text-align: center;
	}

	.save_outfit {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.carousel {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: end;
	}

	.save_outfit {
		display: flex;
		flex-direction: column;
	}
	.outfit-display {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.outfit-pants,
	.outfit-shirt {
		text-align: center;
	}
	.outfit-pants img,
	.outfit-shirt img {
		height: 250px;
		width: 175px;
	}
	.accordion-img {
		height: max-content;
	}
</style>
