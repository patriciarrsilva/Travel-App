function handleSubmit(event) {
  event.preventDefault();

  const location = document.getElementById('location').value;
  const dateValue = document.getElementById('date').value;
  const date = new Date(document.getElementById('date').value);
  const today = new Date();
  const daysLeft = Math.ceil((date - today) / (24 * 60 * 60 * 1000));

  if (!location || !dateValue || date - today < 0) {
    alert('Please, fill both fields with valid information');
    return;
  }

  const locationList = location.split(',').map((l) => l.trim());

  const locationQuery = locationList.join('+');

  Client.postData('http://localhost:8081/base', {
    location,
    dateValue,
    daysLeft,
  }).then(() => {
    handleImage(dateValue, daysLeft, locationList, locationQuery);
  });
}

const handleImage = (dateValue, daysLeft, locationList, locationQuery) => {
  Client.getData(
    `https://pixabay.com/api/?key=15981019-602df5061e142303589608af5&q=${locationQuery}`
  ).then((data) => {
    if (data.total === 0) {
      const country = locationList[locationList.length - 1];
      Client.getData(
        `https://pixabay.com/api/?key=15981019-602df5061e142303589608af5&q=${country}`
      ).then((data) => {
        postPixabay(data, dateValue, daysLeft, locationQuery);
      });
    } else {
      postPixabay(data, dateValue, daysLeft, locationQuery);
    }
  });
};

const postPixabay = (data, dateValue, daysLeft, locationQuery) => {
  const imgSrc = data.hits[0].webformatURL;
  Client.postData('http://localhost:8081/pixabay', { imgSrc }).then(() => {
    handleWeather(dateValue, daysLeft, locationQuery);
  });
};

const handleWeather = (dateValue, daysLeft, locationQuery) => {
  Client.getData(
    `http://api.geonames.org/postalCodeSearchJSON?placename=${locationQuery}&username=snowi`
  ).then((data) => {
    const latitude = data.postalCodes[0].lat;
    const longitude = data.postalCodes[0].lng;

    if (!daysLeft) {
      Client.getData(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=349f7b9de5b24fb281f638662d60eeb8`
      ).then((data) => {
        const temperature = data.data[0].temp;
        const description = data.data[0].weather.description;

        postWeather(temperature, description);
      });
    } else {
      Client.getData(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=349f7b9de5b24fb281f638662d60eeb8`
      ).then((data) => {
        const daysList = data.data;
        const dayData = daysList.find((day) => day.valid_date === dateValue);
        let temperature;
        let description;

        if (!dayData) {
          temperature = daysList[15].temp;
          description = daysList[15].weather.description;
        } else {
          temperature = dayData.temp;
          description = dayData.weather.description;
        }

        postWeather(temperature, description);
      });
    }
  });
};

const postWeather = (temperature, description) => {
  Client.postData('http://localhost:8081/weatherbit', {
    temperature,
    description,
  }).then(() => {
    Client.updateUI();
  });
};

export { handleSubmit };
