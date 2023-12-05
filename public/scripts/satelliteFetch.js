// dont really need satellite name yet but will test with that later
// const satellite_name = document.querySelector('#satellite_name').value.trim();

// Test URL
// https://us1.locationiq.com/v1/reverse?key=DB_API_KEY&lat=48.8584&lon=2.2945&format=json

// Fetches the URL using the longitude and latitude from the searchSatellitesForm function, and creates an image that attaches to the mapImage
const mapCoordinates = async (latitudeMap, longitudeMap) => {
  const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=pk.22d0edfddce32c550c5ec3ce624e2689&zoom=4&size=600x600&format=jpg&maptype=light&markers=icon:small-red-cutout|${latitudeMap},${longitudeMap}`;

  const response = await fetch(mapUrl, {
    method: 'GET',
  });

  if (response.ok) {
    const img = document.createElement('img');
    img.classList.add('mapLocation');
    img.src = mapUrl;

    const final = document.querySelector('#mapImage');
    final.innerText = '';
    final.appendChild(img);
  } else {
    console.log('Error fetching map image.');
  }
};

const searchSatellitesForm = async (event) => {
  event.preventDefault();

  const latitudeMap = document.querySelector('#latitudeMap').value.trim();
  const longitudeMap = document.querySelector('#longitudeMap').value.trim();

  const geoCodingUrl = `https://us1.locationiq.com/v1/reverse?key=pk.22d0edfddce32c550c5ec3ce624e2689&lat=${latitudeMap}&lon=${longitudeMap}&format=json`;

  if (latitudeMap && longitudeMap) {
    try {
      const response = await fetch(geoCodingUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();

        const city = data.address.city;
        const country = data.address.country;

        // might need these later?
        // const lat = data.lat;
        // const lon = data.lon;

        document.querySelector('#citySearch').innerText = `City is: ${city}`;

        document.querySelector(
          '#countrySearch'
        ).innerText = `Country is: ${country}`;

        mapCoordinates(latitudeMap, longitudeMap);

        console.log(data);
      } else {
        alert('Failed to find coordinates, please try again.');
      }
    } catch (err) {
      console.log(err);
      alert('An error has occured, please try again.');
    }
  }
};

document
  .querySelector('#satSearchForm')
  .addEventListener('submit', searchSatellitesForm);
