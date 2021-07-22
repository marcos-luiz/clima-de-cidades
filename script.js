document.querySelector('.busca').addEventListener('submit', async (event)=>{
	event.preventDefault();

	let input = document.querySelector('#searchInput').value;

	if(input !== '') {
		clearInfo();
		showWarning('Carregando...');
		
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=api.openweathermap.org/data/2.5/weather?q={city name}&appid=api.openweathermap.org/data/2.5/weather?q={city name}&appid=api.openweathermap.org/data/2.5/weather?q={city name}&appid=ea97559b2def35426e1bc8931c87ef6&units=metric&lang=pt_br`;
		
		let result = await fetch(url);
		let json = await result.json();

		if (json.cod === 200) {
			showInfo({
				name: json.name,
				country: json.sys.country,
				temp: json.main.temp,
				tempIcon: json.weather[0].icon,
				windSpeed: json.wind.speed,
				windAngle: json.wind.deg
			});
		} else {
			clearInfo();
			showWarning('Esta localização não foi encontrada.');
		}
	} else {
		clearInfo();
	}

});

function showInfo(json) {
	showWarning('');

	

	document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
	document.querySelector('.temInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
	document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

	document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempicon}@2x.png`);

	document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

	document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
	showWarning('');
	document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
	document.querySelector('.aviso').innerHTML = msg;
}