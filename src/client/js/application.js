function handleSubmit(event) {
  event.preventDefault();

  // TODO dont run if we dont have the 2 values

  const location = document.getElementById('location').value;
  const date = new Date(document.getElementById('date').value);
  const today = new Date();

  const locationQuery = location
    .split(',')
    .map((l) => l.trim())
    .join('+');

  const daysLeft = Math.round((date - today) / (24 * 60 * 60 * 1000));

  getData(
    `http://api.geonames.org/postalCodeSearchJSON?placename=${locationQuery}&username=snowi`
  ).then((data) => {
    const latitude = data.postalCodes[0].lat;
    const longitude = data.postalCodes[0].lng;

    getData(
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=349f7b9de5b24fb281f638662d60eeb8`
    ).then((data) => {
      const temperature = data.data[0].temp;
      const feel = data.data[0].app_temp;
      const description = data.data[0].weather.description;

      postData('/weatherbit', { temperature, feel, description });
    });
  });

  getData(
    `https://pixabay.com/api/?key=15981019-602df5061e142303589608af5&q=${locationQuery}`
  ).then((data) => {
    const imgSrc = data.hits[0].webformatURL;

    postData('/pixabay', { imgSrc });
  });
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getData = async (url) => {
  const response = await fetch(url);

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error: ', error);
  }
};

export { handleSubmit };
