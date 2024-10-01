<script>
	import Button from '$lib/components/Button/Button.svelte';
	import Flyout from '$lib/components/Flyout/Flyout.svelte';
	import Tag from '$lib/components/Tag/Tag.svelte';
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
	<div class="buttons">
		<Button on:click={handleClick}>This is a Default Button</Button>
		<Button type="inverse">This is an Inverse Button</Button>
		<Button type="empty">This is an Empty Button</Button>
	</div>
	Click the Default Button to see a flyout
	<Flyout id="flyout1" header="This is a Flyout">
		<div slot="flyout-body"><img class="shrek" src="/shrek.png" alt="shrek" />Shrek says hi</div>
		<div slot="flyout-footer" class="flyout-actions">
			<Button type="inverse">Cancel</Button><Button>Save</Button>
		</div>
	</Flyout>
	<div class="tags">
		<Tag color="green">Green Tag</Tag>
		<Tag color="red">Red Tag</Tag>
		<Tag color="navy">Navy Tag</Tag>
		<Tag color="gray">Gray Tag</Tag>
		<Tag color="orange">Orange Tag</Tag>
		<Tag size="sm">Small Tag</Tag>
		<Tag size="lg">Large Tag</Tag>
	</div>
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

	.buttons,
	.tags {
		display: flex;
		gap: 8px;
		align-items: center;
	}
</style>
