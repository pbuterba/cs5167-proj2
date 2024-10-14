<script>
    import Header from '$lib/components/Header/Header.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import Popover from '$lib/components/Popover/Popover.svelte';
    import PopoverMultiSelectContent from '$lib/components/Popover/CustomPopoverTrigger/PopoverMultiSelectContent.svelte';
	import PopoverChipTrigger from '../../lib/components/Popover/CustomPopoverContent/PopoverChipTrigger.svelte';
    import {outfitStore, clothesStore} from '../../lib/utilities/stores';
    
    let popoverItems = [];
    let isOutfitShown = false;
    let filteredOutfits;
    let clothingFilters = {cozy:false, formal: false, temphigh: 0, templow: 0}

    let clothingFiltersTEMP = {cozy:false, formal: true, temp: 40}
    
    function filterOutfits() {
        filteredOutfits = outfitStore.getOutfitByFilters(clothingFiltersTEMP);
    }
    
    function toggleOutfitShowing() {
        if (isOutfitShown) {isOutfitShown = false;}
        else {isOutfitShown = true;}
    }

    function handlePopoverItemsChanged(event) {
		popoverItems = event.detail.selectedItems;
	}

    let preferenceItems = [
		{ label: 'Cozy', value: 'cozy' },
		{ label: 'Formal', value: 'formal' },
        { label: 'Cold Temp', value: 'cold' },
        { label: 'Hot Temp', value: 'hot' }
	];
</script>

<div class="components">
    {#if isOutfitShown == false}
        <div class="box">
            <Header type="h2">What type of outfit are you looking for today? </Header> <br>
            
            <div class="split_container">
                <div class="popover_content">
                    <Popover on:popoverItemsChanged={handlePopoverItemsChanged}>
                        <PopoverChipTrigger class="popover_content" slot="trigger" label="Preferences" />
                        <PopoverMultiSelectContent class="popover_content" slot="content" items={preferenceItems} />
                    </Popover>
                </div>
                <Button on:click={()=>toggleOutfitShowing()} on:click={()=>filterOutfits()}>Submit Preferences</Button>
            </div>
        </div>
    {:else}
        <Header type="h1">Outfit Suggestions </Header>
        <div class="display_outfit">
            <Header type="h2">{outfitStore.getOutfitById(2).name} </Header>

            <div class="img_wrapper">
                <img src={clothesStore.getClothingItemById(filteredOutfits[0].topid).img} alt="top"/>
                <img src={clothesStore.getClothingItemById(filteredOutfits[0].bottomid).img} alt="bottom"/>
            </div>
        </div>
        <div class="split_container">
            <Button on:click={()=>toggleOutfitShowing()}>Return to Preferences</Button>
            <Button>Submit Outfit Choice</Button>
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