// dont really need satellite name yet but will test with that later
// const satellite_name = document.querySelector('#satellite_name').value.trim();

// Test URL
// https://us1.locationiq.com/v1/reverse?key=DB_API_KEY&lat=48.8584&lon=2.2945&format=json

// Uphere API uses parameter "noradId" when searching for norad ID. This then goes into the URL to retrieve coordinates for that satellite
const searchData = async (noradId) => {
  const options = {
    method: 'GET',
    url: `https://uphere-space1.p.rapidapi.com/satellite/${noradId}/location`,
    headers: {
      'X-RapidAPI-Key': '1cb9d85524mshe69404680419381p139451jsn1adb330d9846',
      'X-RapidAPI-Host': 'uphere-space1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    // Array order goes by longitude and latitude for values 0 and 1
    const longitudeMap = response.data.coordinates[0].toFixed(1);
    const latitudeMap = response.data.coordinates[1].toFixed(1);

    // Return these two as object for mapping fetch request
    return { latitudeMap, longitudeMap };
  } catch (error) {
    console.error(error);
  }
};

// Fetches the URL using the longitude and latitude from the searchSatellitesForm function, and creates an image that attaches to the mapImage
// Wouldn't normally need a fetch request as it just displays a URL, but since it goes through backend fetch request is required
const mapCoordinates = async (longitudeMap, latitudeMap) => {
  try {
    const response = await fetch('/api/satellite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // POST requests need to be in string form, so we convert longitudeMap and latitudeMap from object
      body: JSON.stringify({ longitudeMap, latitudeMap }),
    });

    if (response.ok) {
      const data = await response.json();
      const mapUrl = data.mapUrl;

      const img = document.createElement('img');
      img.classList.add('mapLocation');
      img.src = mapUrl;

      const final = document.querySelector('#mapImage');
      // Removes text content from div with mapImage id so that previous search result is cleared
      final.innerText = '';
      final.appendChild(img);
    } else {
      console.error('Failed to fetch map data');
    }
  } catch (error) {
    console.error(error);
  }
};

// Uses the latitudeMap and longitudeMap parameters from uphere API axios request to show/map location
const searchSatellitesForm = async (event) => {
  event.preventDefault();

  // Removes text content from div with new search
  document.querySelector('#locationSearch').innerText = '';

  // Retrieves value that was entered into norad_id input field
  const norad_id = document.querySelector('#norad_id').value.trim();

  // searchData function is called with norad_id argument, and object properties are destructured into local variables
  const { longitudeMap, latitudeMap } = await searchData(norad_id);

  if (longitudeMap && latitudeMap) {
    try {
      const response = await fetch('/api/satellite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longitudeMap,
          latitudeMap,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        // Mapbox API returns features array that may include elements depending on location, and will show satellite location if features array exists
        if (!data.place) {
          document.querySelector(
            '#mapCoordinates'
          ).innerText = `Current location is ${longitudeMap}, ${latitudeMap}`;
        } else {
          document.querySelector(
            '#locationSearch'
          ).innerText = `Satellite is over ${data.place}`;

          document.querySelector(
            '#mapCoordinates'
          ).innerText = `Current location is ${longitudeMap}, ${latitudeMap}`;
        }

        // mapCoordinates() function is called here with the coordinate values from the axios API call
        mapCoordinates(longitudeMap, latitudeMap);
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
