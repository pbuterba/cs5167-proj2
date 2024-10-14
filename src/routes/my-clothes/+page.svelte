<script>
    import Tabs from '$lib/components/Tabs/Tabs.svelte';
    import TabLabel from '$lib/components/Tabs/TabLabel.svelte';
    import TabContent from '$lib/components/Tabs/TabContent.svelte';
    import Tag from '$lib/components/Tag/Tag.svelte';
    import {clothesStore} from '$lib/utilities/stores.js';

    let clothes = [];
    clothesStore.subscribe((clothesList) => {
        clothes = clothesList;
    });

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.substring(1);
    }

</script>
<main id="main-box">
    <Tabs activeTab="1">
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
                                <img src={clothingItem.img} alt={clothingItem.name} width="150" />
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
</style>