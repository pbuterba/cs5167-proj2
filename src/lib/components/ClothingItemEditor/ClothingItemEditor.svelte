<script>
    import {createEventDispatcher} from 'svelte';
    import Button from '../Button/Button.svelte';
    import Checkbox from '../Checkbox/Checkbox.svelte';
    import TextInput from '../TextInput/TextInput.svelte';
    import Toast from '../Toast/Toast.svelte';

    export let itemData = {
        id: 0,
        name: "",
        img: "",
        type: "",
        filters: {
            cozy: false,
            formal: false,
            temphigh: null,
            templow: null,
        },
        dirty: false
    };

    let newItem = itemData.id === 0;
    let toast;

    const dispatch = createEventDispatcher();

    function typeChange(event) {
        itemData.type = event.currentTarget.value;
    }

    $: validData = itemData.name && itemData.type && typeof(itemData.filters.temphigh) === 'number' && typeof(itemData.filters.templow) === 'number';

    function resetItemData() {
        document.getElementById("top-choice").checked = false;
        document.getElementById("bottom-choice").checked = false;
        itemData = {
            id: 0,
            name: "",
            img: "",
            type: "",
            filters: {
                cozy: false,
                formal: false,
                temphigh: 0,
                templow: 0,
            },
            dirty: false
        };
    }

    function saveItem() {
        if(validData) {
            dispatch('save', itemData);
            resetItemData();
        } else {
            toast.addToast();
        }
    }

    function cancel() {
        dispatch('cancel');
        resetItemData();
    }

</script>
<main>
    <div id="main-info">
        <div id="name-and-type">
            <TextInput label="Name of item" required bind:value={itemData.name} />
            <div id="clothing-type-selector">
                <h3>Clothing type</h3>
                <div class="option">
                    <label for="top-choice">Top</label>
                    <input id="top-choice" type="radio" name="clothing-type" value="top" on:change={typeChange} />
                </div>
                <div class="option">
                    <label for="bottom-choice">Bottom</label>
                    <input id="bottom-choice" type="radio" name="clothing-type" value="bottom" on:change={typeChange} />
                </div>
            </div>
        </div>
        <div id="photo-select">
            <input id="image-upload" type="file" accept="image/*" bind:value={itemData.img} hidden={itemData.img === ""} />
            <button id="image-upload-button" on:click={() => {document.getElementById("image-upload").click()}}>Select photo</button>
        </div>
    </div>
    <div id="filters">
        <h2>Outfit Categories:</h2>
        <div id="filter-controls">
            <Checkbox label="Cozy" bind:checked={itemData.filters.cozy} />
            <Checkbox label="Formal"  bind:checked={itemData.filters.formal} />
            <TextInput label="Highest acceptable temperature" type="number" required bind:value={itemData.filters.temphigh} />
            <TextInput label="Lowest acceptable temperature" type="number" required bind:value={itemData.filters.templow} />
        </div>
    </div>
    <div id="submission-buttons">
        <Button on:click={() => {saveItem()}}>{newItem ? "Add" : "Update"}</Button>
        <Button on:click={() => {cancel()}} type="inverse">Cancel</Button>
    </div>
    <Toast
        title="Invalid clothing data"
        message="All clothing items must have a name, highest acceptable temperature, and lowest acceptable temperature, and be marked as either a top or a bottom"
        type="error"
        bind:this={toast}
    >
    </Toast>
</main>
<style>
    main {
        background-color: white;
    }
    h2 {
        font-size: 1rem;
    }
    h3 {
        color: var(--color-green-darker);
    }
    h3, label {
        font-size: 0.8rem;
        font-weight: normal;
    }
    #main-info {
        display: flex;
        justify-content: space-between;
    }
    #main-info > div {
        width: 40%;
    }
    #filters {
        padding: 1vh 1vw;
    }
    #main-info, #filters, #submission-buttons {
        padding: 2vh 1vw;
    }
    #clothing-type-selector {
        display: flex;
        margin-top: 1vh;
    }
    #clothing-type-selector * {
        margin: auto 0.25vw;
    }
    #photo-select {
        display: flex;
        justify-content: center;
    }
    #image-upload-button {
        border-radius: 500px;
        width: 10vh;
        height: 10vh;
        font-weight: bold;
        background: var(--color-green);
    }
    #filter-controls > :global(*) {
        margin: 2vh 0.5vw;
    }
    #submission-buttons {
        display: flex;
    }
    #submission-buttons > :global(*) {
        margin: auto 0.3vw;
    }
    
</style>