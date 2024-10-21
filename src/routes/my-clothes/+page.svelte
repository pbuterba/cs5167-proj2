<script>
    import ClothingItemEditor from '$lib/components/ClothingItemEditor/ClothingItemEditor.svelte';
    import Tabs from '$lib/components/Tabs/Tabs.svelte';
    import TabLabel from '$lib/components/Tabs/TabLabel.svelte';
    import TabContent from '$lib/components/Tabs/TabContent.svelte';
    import Tag from '$lib/components/Tag/Tag.svelte';
    import {clothesStore} from '$lib/utilities/stores.js';

    let clothes = [];
    clothesStore.subscribe((clothesList) => {
        clothes = clothesList;
    });

    let tabs;

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.substring(1);
    }

    function addNewItem(itemData) {
        tabs.changeTab("1");
        clothesStore.addClothingItem(itemData.name, itemData.filters, itemData.type, itemData.img);
    }

</script>
<main id="main-box">
    <Tabs activeTab="1" bind:this={tabs}>
        <div class="tabs" slot="labels">
            <TabLabel tabnum="1">Manage clothes</TabLabel>
            <TabLabel tabnum="2">Add clothes</TabLabel>
        </div>
        <div class="contents" slot="contents">
            <TabContent tabnum="1">
                <div class="content-container">
                    <h1>My clothes:</h1>
                    <div id="clothes-list">
                        {#each clothes as clothingItem}
                            <div class="clothing-item">
                                {#if clothingItem.img}
                                    <img src={clothingItem.img} alt={clothingItem.name} width="150" />
                                {:else}
                                    <div class="no-img">
                                        <p>No image available</p>
                                    </div>
                                {/if}
                                <div class="clothing-item-info">
                                    <h2>{clothingItem.name}</h2>
                                    <p>{capitalize(clothingItem.type)}</p>
                                    <div class="filter-tags">
                                        {#each Object.entries(clothingItem.filters) as [filter, value]}
                                            {#if filter === "temphigh"}
                                                <div class="filter-tag">
                                                    <Tag color="red">Good up to {value} degrees</Tag>
                                                </div>
                                            {:else if filter === "templow"}
                                                <div class="filter-tag">
                                                    <Tag color="blue">Good down to {value} degrees</Tag>
                                                </div>
                                            {:else if value}
                                                <div class="filter-tag">
                                                    <Tag color="navy">{capitalize(filter)}</Tag>
                                                </div>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </TabContent>
            <TabContent tabnum="2">
                <ClothingItemEditor on:save={(event) => {addNewItem(event.detail)}}/>
            </TabContent>
        </div>
    </Tabs>
</main>
<style>
    @import '/src/variables.css';
    #main-box {
        background: var(--color-green);
    }
    .tabs {
        display: flex;
    }
    .content-container {
    }
    .content-container h1 {
        text-align: center;
        font-size: 1.2rem;
    }
    .clothing-item {
        background: white;
        border-width: 1px 0 1px 0;
        border-color: lightgray;
        border-style: solid;
        display: flex;
        padding: 1vh 1vw;
    }
    .clothing-item-info * {
        margin: 1vh 1vw;
    }
    .filter-tags {
        display: flex;
    }
    .filter-tag {
        margin: auto 0.1vw;
    }
    .no-img {
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .no-img p {
        text-align: center;
        font-weight: bold;
        color: var(--color-navy);
        margin: 1vh 1vw;
        width: 100px;
    }
</style>