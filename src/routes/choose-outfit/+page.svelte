<script>
    import Header from '$lib/components/Header/Header.svelte';
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import Popover from '$lib/components/Popover/Popover.svelte';
    import {outfitStore} from '../../lib/utilities/stores';
    import {clothesStore} from '../../lib/utilities/stores';
    
    let isOutfitShown = false;
    let filteredOutfits;
    let clothingFilters = {cozy:false, formal: false, temphigh: 0, templow: 0}

    let clothingFiltersTEMP = {cozy:true, formal: false, temp: 65}
    
    function filterOutfits() {
        filteredOutfits = outfitStore.getOutfitByFilters(clothingFiltersTEMP);
        alert(JSON.stringify(filteredOutfits));
    }
    
    function toggleOutfitShowing() {
        if (isOutfitShown) {isOutfitShown = false;}
        else {isOutfitShown = true;}
    }
</script>

<div class="components">
    {#if isOutfitShown == false}
        <div class="box">
            <Header type="h2">What type of outfit are you looking for today? </Header>

            <div class="checkboxes">
                <Checkbox label="Checkbox" />
                <Checkbox label="Checkbox" />
                <Checkbox label="Checkbox" />
                <Checkbox label="Checkbox" />
                <Checkbox label="Checkbox" />
            </div>
            <br> <br>
            <Button on:click={()=>toggleOutfitShowing()} on:click={()=>filterOutfits()}>Submit Preferences</Button>
        </div>
    {:else}
        <Header type="h1">Outfit Suggestions </Header>
        <div class="display_outfit">
            <Header type="h2">{outfitStore.getOutfitById(1).name} </Header>

            <div class="img_wrapper">
                <img src={clothesStore.getClothingItemById(filteredOutfits[0].topid).img} alt="top"/>
                <img src={clothesStore.getClothingItemById(filteredOutfits[0].bottomid).img} alt="bottom"/>
            </div>
        </div>
        <div class="header_container">
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

    .header_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: var(--color-baige-dark);
        padding: 5%;
        border-radius: 40px;
        box-sizing: border-box;
    }

    .checkboxes {
        display: flex;
        flex-direction: row;
    }

    .box {
        background-color: var(--color-baige-dark);
        border: 5px solid var(--color-navy-dark);
        border-radius: 40px;
        padding: 5%;
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

</style>