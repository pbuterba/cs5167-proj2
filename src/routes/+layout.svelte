<script>
	import Header from '$lib/components/Header/Header.svelte';
	import { page } from '$app/stores';
	import Button from '../lib/components/Button/Button.svelte';
	import WeatherDisplay from '../lib/components/WeatherDisplay/WeatherDisplay.svelte';
	import Flyout from '$lib/components/Flyout/Flyout.svelte';
	import { toggle, clothesStore } from '$lib/utilities/stores.js';
	import dresserImage from '$lib/img/dresser.png';
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import Text from '$lib/components/Text/Text.svelte';
	import Popover from '$lib/components/Popover/Popover.svelte';
	import PopoverTrigger from '$lib/components/Popover/PopoverTrigger.svelte';
	import PopoverContent from '$lib/components/Popover/PopoverContent.svelte';

	let clothes = [];
	clothesStore.subscribe((clothesList) => {
		clothes = clothesList;
	});

	let cleanItems = clothes.filter((item) => clothesStore.isClothingItemClean(item.id));
	let dirtyItems = clothes.filter((item) => !clothesStore.isClothingItemClean(item.id));

	function handleClick() {
		toggle('flyout1');
	}

	function handleChange(clothingItem) {
		if (clothesStore.isClothingItemClean(clothingItem.id) == true) {
			clothesStore.dirtyClothingItemById(clothingItem.id);
		} else {
			clothesStore.cleanClothingItemById(clothingItem.id);
		}
		updateItems();
	}

	function updateItems() {
		cleanItems = clothes.filter((item) => clothesStore.isClothingItemClean(item.id));
		dirtyItems = clothes.filter((item) => !clothesStore.isClothingItemClean(item.id));
	}
</script>

<main>
	{#if $page.data.hasHeader}
		<div
			class="header"
			class:navy={$page.data.headerColor === 'navy'}
			class:green={$page.data.headerColor === 'green'}
			class:red={$page.data.headerColor === 'red'}
		>
			<Header type="h1" color="baige">{$page.data.header}</Header>
			<div class="line1" />
			<div class="line2" />
			<span class="home-button">
				<Button type="empty-baige" href="/">
					<svg
						width="18"
						height="21"
						viewBox="0 0 18 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17.0001 6.02393L11.0001 0.763932C10.4501 0.271977 9.73803 0 9.00009 0C8.26216 0 7.55012 0.271977 7.00009 0.763932L1.00009 6.02393C0.682463 6.30801 0.428995 6.65649 0.256567 7.04618C0.0841385 7.43586 -0.00329256 7.85781 9.47941e-05 8.28393V17.0239C9.47941e-05 17.8196 0.316165 18.5826 0.878775 19.1453C1.44138 19.7079 2.20445 20.0239 3.00009 20.0239H15.0001C15.7957 20.0239 16.5588 19.7079 17.1214 19.1453C17.684 18.5826 18.0001 17.8196 18.0001 17.0239V8.27393C18.0021 7.84949 17.9139 7.42947 17.7416 7.04161C17.5692 6.65375 17.3165 6.30689 17.0001 6.02393ZM11.0001 18.0239H7.00009V13.0239C7.00009 12.7587 7.10545 12.5044 7.29299 12.3168C7.48052 12.1293 7.73488 12.0239 8.00009 12.0239H10.0001C10.2653 12.0239 10.5197 12.1293 10.7072 12.3168C10.8947 12.5044 11.0001 12.7587 11.0001 13.0239V18.0239ZM16.0001 17.0239C16.0001 17.2891 15.8947 17.5435 15.7072 17.731C15.5197 17.9186 15.2653 18.0239 15.0001 18.0239H13.0001V13.0239C13.0001 12.2283 12.684 11.4652 12.1214 10.9026C11.5588 10.34 10.7957 10.0239 10.0001 10.0239H8.00009C7.20444 10.0239 6.44138 10.34 5.87877 10.9026C5.31617 11.4652 5.00009 12.2283 5.00009 13.0239V18.0239H3.00009C2.73488 18.0239 2.48052 17.9186 2.29299 17.731C2.10545 17.5435 2.00009 17.2891 2.00009 17.0239V8.27393C2.00027 8.13195 2.03069 7.99163 2.08931 7.86231C2.14794 7.73299 2.23343 7.61764 2.3401 7.52393L8.34009 2.27393C8.52258 2.11361 8.75719 2.0252 9.00009 2.0252C9.243 2.0252 9.47761 2.11361 9.66009 2.27393L15.6601 7.52393C15.7668 7.61764 15.8523 7.73299 15.9109 7.86231C15.9695 7.99163 15.9999 8.13195 16.0001 8.27393V17.0239Z"
							fill="currentColor"
						/>
					</svg>
				</Button>
			</span>
		</div>
	{/if}
	{#if $page.data.showWeather}
		<div class="weather">
			<WeatherDisplay />
			<Button type="empty" on:click={handleClick}>View Dresser Description</Button>
		</div>
	{/if}
	<div class="app">
		<img class="left-leaves" src="left-leaves.svg" alt="leaves" />
		<img class="right-leaves" src="right-leaves.svg" alt="leaves" />
		<div class="content">
			<slot />
		</div>
	</div>
	<Flyout id="flyout1" header="Smart Dresser" subheader="Dresser Image">
		<div slot="flyout-body">
			<img class="dresser" src={dresserImage} alt="dresser" />
			<Header type="subheader">Description</Header> <br /> <br />
			<Text>
				The smart dresser offers several key features. There are 3 tabs, Choose Today's Outfit, My
				Clothes, and My Outfits. In My Clothes, users can add and remove clothing items from the
				dresser. In My Outfits, users can create their own presaved outfits. In Choose Today's
				Outfits, users can select from their presaved outfits based upon preferences.
			</Text> <br /> <br />
			<Header type="subheader">Sample Functionality</Header> <br /> <br />
			<Header type="subheader">Items in Dresser</Header>
			{#each cleanItems as clothingItem}
				<Checkbox
					label={clothingItem.name}
					checked={clothesStore.isClothingItemClean(clothingItem.id)}
					on:change={() => handleChange(clothingItem)}
				/>
			{/each}
			<br /><Header type="subheader">Items Out of Dresser</Header>
			{#each dirtyItems as clothingItem}
				<Checkbox
					label={clothingItem.name}
					checked={clothesStore.isClothingItemClean(clothingItem.id)}
					on:change={() => handleChange(clothingItem)}
				/>
			{/each}
		</div>
		<div slot="flyout-footer" class="flyout-actions"></div>
	</Flyout>
	{#if dirtyItems.length / $clothesStore.length > 0.6 && $page.data.showAlert}
		<div class="alert">
			<Popover>
				<PopoverTrigger slot="trigger" onhover={true}>
					<div slot="custom-trigger" class="outer-circle">
						<div class="inner-circle">
							<svg
								width="4"
								height="14"
								viewBox="0 0 4 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3.72933 11.1364V13.3636C3.72933 13.536 3.67229 13.6851 3.5582 13.8111C3.44411 13.937 3.30901 14 3.15289 14H0.847113C0.690993 14 0.555889 13.937 0.441801 13.8111C0.327714 13.6851 0.27067 13.536 0.27067 13.3636V11.1364C0.27067 10.964 0.327714 10.8149 0.441801 10.6889C0.555889 10.563 0.690993 10.5 0.847113 10.5H3.15289C3.30901 10.5 3.44411 10.563 3.5582 10.6889C3.67229 10.8149 3.72933 10.964 3.72933 11.1364ZM3.99954 0.636364L3.74734 8.27273C3.74134 8.44508 3.67979 8.59422 3.5627 8.72017C3.44561 8.84612 3.30901 8.90909 3.15289 8.90909H0.847113C0.690993 8.90909 0.554388 8.84612 0.437298 8.72017C0.320208 8.59422 0.258661 8.44508 0.252656 8.27273L0.000461894 0.636364C-0.00554273 0.464015 0.0469977 0.314867 0.158083 0.18892C0.269169 0.0629735 0.402771 0 0.558891 0H3.44111C3.59723 0 3.73083 0.0629735 3.84192 0.18892C3.953 0.314867 4.00554 0.464015 3.99954 0.636364Z"
									fill="white"
								/>
							</svg>
						</div>
					</div>
				</PopoverTrigger>
				<PopoverContent slot="content">
					<Text slot="custom-content">Your dresser is getting empty!</Text>
				</PopoverContent>
			</Popover>
		</div>
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

	main {
		font-family: 'Inter', sans-serif;
		position: relative;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 24px;
		height: 100px;
		position: relative;
	}

	.header div {
		position: absolute;
		width: 100%;

		background-color: var(--color-baige);
	}

	.line1 {
		top: 103px;
		height: 3px;
	}

	.line2 {
		top: 120px;
		height: 5px;
	}

	.navy {
		background-color: var(--color-navy);
	}

	.green {
		background-color: var(--color-green);
	}

	.red {
		background-color: var(--color-red);
	}

	.app {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}

	.content {
		width: 1000px;
		padding: 32px 4px;
		margin: 0 auto;
		background: var(--color-surface);
		overflow-y: auto;
		flex: 1;
		scrollbar-width: none;
	}

	.left-leaves {
		position: absolute;
		top: 50px;
		left: 0;
		z-index: -1;
	}

	.right-leaves {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: -1;
	}

	.home-button {
		position: absolute;
		left: 8px;
		top: 8px;
		width: fit-content;
	}

	.weather {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dresser {
		width: 100%;
	}

	.alert {
		position: absolute;
		top: 24px;
		right: 24px;
		width: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.outer-circle {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: transparent;
		border: 3px solid var(--color-red);
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inner-circle {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: var(--color-red);
		animation: pulse 1s infinite;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.85);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
