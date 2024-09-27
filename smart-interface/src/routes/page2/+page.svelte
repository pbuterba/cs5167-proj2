<script>
	import ButtonTest from '$lib/components/ButtonTest/ButtonTest.svelte';
	import ExampleComponent from '$lib/components/ExampleComponent/ExampleComponent.svelte';
</script>

<ExampleComponent>
	<div class="content">DRAG ME</div>
</ExampleComponent>
<ButtonTest>Test Button</ButtonTest>

<style>
	.content {
		color: white;
		font-size: 135%;
		font-weight: 600;
		user-select: none;
	}
</style>
