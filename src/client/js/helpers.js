const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
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

const updateUI = async () => {
  const request = await fetch('http://localhost:8081/all');

  try {
    const allData = await request.json();

    const tripsPlaceholder = document.getElementById('trips-placeholder');
    console.log(tripsPlaceholder);

    const template = `
      <article>
        <div class="image-container">
          <img src="${allData.imgSrc}" alt="image of the trip destination"/>
          <a
            class="text-s"
            href="https://pixabay.com/"
            target="_blank"
            rel="noopener"
          >
            Pixabay - Free Images
          </a>
        </div>
        <div class="card-content">
          <p class="text-l">My trip to: ${allData.location}</p>
          <p class="text-l">Departing: ${allData.dateValue}</p>
          <p class="text-m">${allData.location} is ${allData.daysLeft} day(s) away</p>
          <div class="weather-container">
            <p class="text-m">Typical weather for then is:</p>
            <p class="text-s">Temperature - ${allData.temperature}</p>
            <p class="text-s">${allData.description}</p>
          </div>
        </div>
      </article>
      `;

    tripsPlaceholder.innerHTML = template;
  } catch (error) {
    console.log('Error: ', error);
  }
};

export { postData, getData, updateUI };
