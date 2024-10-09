<script>
    import Header from '$lib/components/Header/Header.svelte';
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import { presetClothes } from '../../presetClothingData';
    import {outfitStore} from '../../lib/utilities/stores'
    
    let isOutfitShown = false;
    let clothingFilters = {cozy:false, formal: false, temphigh: 0, templow: 0}

    let clothingFiltersTEMP = {cozy:true, formal: false, temphigh: 80, templow: 40}
    function filterOutfits() {
        let filteredOutfits = outfitStore.getOutfitsByFilters(clothingFiltersTEMP);
        alert(JSON.stringify(filteredOutfits));
    }
    
    function toggleOutfitShowing() {
        if (isOutfitShown) {isOutfitShown = false;}
        else {isOutfitShown = true;}
    }
</script>

<div class="components">
	<div class="header_container">
        <Header>Outfit Generator</Header>
        {#if isOutfitShown == true}
            <Button on:click={()=>toggleOutfitShowing()}>Return to Preferences</Button>
        {/if}
    </div> 
    <br>

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
            <Button on:click={()=>toggleOutfitShowing()}>Submit Preferences</Button>
        </div>
    {:else}
        <div class="display_outfit">
            <div class="box">
                <Header type="h2">Outfit Top: </Header> <br>
                <img src={presetClothes[0].img} alt="shirt">
            </div>
            <div class="box">
                <Header type="h2">Outfit Bottom: </Header> <br>
                <img src={presetClothes[1].img} alt="bottom">
            </div>
        </div> <br>
        <Button on:click={()=>filterOutfits()}>Submit Outfit Choice</Button>
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

    .display_outfit {
        display: flex;
		flex-direction: row;
		width: 100%;
		gap: 16px;
    }

    .display_outfit > div {
        flex: 1;
        height: 100%;
    }

</style>