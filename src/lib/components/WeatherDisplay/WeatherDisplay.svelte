<script>
	import WeatherDisplayCondition from './WeatherDisplayCondition.svelte';
	import { weatherStore } from '../../utilities/stores';

	let temp;
	let condition;
	let isRaining;

	weatherStore.subscribe((value) => {
		temp = value.temp;
		condition = value.condition;
		isRaining = value.isRaining;
	});
</script>

<div class="weather-display">
	<div class="conditions">
		<WeatherDisplayCondition condition="sunny" disabled={condition !== 'Clear'} />
		<WeatherDisplayCondition
			condition="partially"
			disabled={condition !== 'Partially cloudy' || isRaining}
		/>
		<WeatherDisplayCondition condition="cloudy" disabled={condition !== 'Overcast' || isRaining} />
		<WeatherDisplayCondition condition="rainy" disabled={!isRaining} />
	</div>
	<div class="divide" />
	<div class="temp">{temp ?? ''}°</div>
</div>

<style>
	.weather-display {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px;
		width: fit-content;
	}

	.conditions {
		display: flex;
		gap: 8px;
	}

	.divide {
		background-color: var(--color-edge-dark);
		width: 1px;
		height: 24px;
	}

	.temp {
		font-size: 24px;
		font-weight: 600;
		color: var(--color-navy);
	}
</style>
