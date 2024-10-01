<script>
	import Button from '$lib/components/Button/Button.svelte';
	import Flyout from '$lib/components/Flyout/Flyout.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { toggle } from '$lib/utilities/stores.js';
	function handleChange(event) {
		console.log(event.detail.value);
	}
	function handleClick() {
		toggle('flyout1');
	}
</script>

<div class="components">
	<TextInput label="This is an Input" required on:change={handleChange} />
	<Button on:click={handleClick}>This is A Button</Button>
	<Flyout id="flyout1" side="right">
		<div slot="flyout-body"><img class="shrek" src="/shrek.png" alt="shrek" />Shrek says hi</div>
		<div slot="flyout-footer" class="flyout-actions">
			<Button type="inverse">Cancel</Button><Button>Save</Button>
		</div>
	</Flyout>
</div>

<style>
	.components {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}

	.flyout-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		width: 100%;
	}

	.shrek {
		width: 100%;
	}
</style>
