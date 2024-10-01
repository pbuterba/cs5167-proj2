<script>
	import Button from '$lib/components/Button/Button.svelte';
	import ExampleComponent from '$lib/components/ExampleComponent/ExampleComponent.svelte';
</script>

<ExampleComponent>
	<div class="content">DRAG ME</div>
</ExampleComponent>
<Button>Test Button</Button>

<style>
	.content {
		color: white;
		font-size: 135%;
		font-weight: 600;
		user-select: none;
	}
</style>
