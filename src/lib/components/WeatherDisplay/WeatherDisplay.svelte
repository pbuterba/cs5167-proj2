<script>
	import WeatherDisplayCondition from './WeatherDisplayCondition.svelte';

	let location = 'Cincinnati';
	let baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;
	let apikey = import.meta.env.VITE_API_KEY;
	let apiParams = {
		include: 'days'
	};

	let temp;
	let condition;
	let isRaining = false;

	const queryString = new URLSearchParams(apiParams).toString();

	function updateWeather(weatherInfo) {
		let today = weatherInfo.days[0];
		temp = today.temp;
		condition = today.conditions;
		isRaining = today.preciptype?.includes('rain');
	}

	fetch(`${baseUrl}?${queryString}&key=${apikey}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => updateWeather(data))
		.catch((error) => console.error('Fetch error:', error));
</script>

<div class="weather-display">
	<div class="conditions">
		<WeatherDisplayCondition condition="sunny" disabled={condition !== 'Clear'} />
		<WeatherDisplayCondition
			condition="partially"
			disabled={condition !== 'Partially cloudy' || isRaining}
		/>
		<WeatherDisplayCondition condition="cloudy" disabled={condition !== 'Overcast' && isRaining} />
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
