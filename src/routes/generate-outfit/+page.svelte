<script>
    import Header from '$lib/components/Header/Header.svelte';
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import Button from '$lib/components/Button/Button.svelte';
</script>

<div class="components">
	<Header>Outfit Generator</Header> <br> 

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
        <Button>Submit Preferences</Button>
    </div>
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
        background-color: var(--color-baige-dark);
        border: 5px solid var(--color-navy-dark);
        border-radius: 40px;
        padding: 5%;
    }
</style>