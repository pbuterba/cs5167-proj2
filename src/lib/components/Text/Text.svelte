<script>
	export let type = 'default';
</script>

<span class="text" class:default={type === 'default'} class:light={type === 'light'}>
	<slot></slot>
</span>

<style>
	.text {
		color: var(--color-text);
		font-size: 16px;
	}

	.light {
		color: #787878;
	}
</style>
