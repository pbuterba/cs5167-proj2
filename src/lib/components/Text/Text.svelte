<script>
	export let type = 'default';
</script>

<span class="text" class:default={type === 'default'}>
	<slot></slot>
</span>

<style>
	.text {
		color: var(--color-text);
	}

	.default {
		font-size: 100%;
	}
</style>
