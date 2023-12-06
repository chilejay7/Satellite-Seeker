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
// Doesn't need a fetch request because we are only using URL to create image
const mapCoordinates = async (longitudeMap, latitudeMap) => {
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-communications-tower+f74e4e(${longitudeMap},${latitudeMap})/${longitudeMap},${latitudeMap},2/500x500?access_token=pk.eyJ1IjoiYndpbmciLCJhIjoiY2xwdTJvOHR5MGZoZTJ2b2piMWdneXplbyJ9.09m-T__wSv-CJIdU63eYaQ`;

  const img = document.createElement('img');
  img.classList.add('mapLocation');
  img.src = mapUrl;

  const final = document.querySelector('#mapImage');
  // Removes text content from div with mapImage id so that previous search result is cleared
  final.innerText = '';
  final.appendChild(img);
};

// Uses the latitudeMap and longitudeMap parameters from uphere API axios request to show/map location
const searchSatellitesForm = async (event) => {
  event.preventDefault();

  // Retrieves value that was entered into norad_id input field
  const norad_id = document.querySelector('#norad_id').value.trim();

  // searchData function is called with norad_id argument, and object properties are destructured into local variables
  const { longitudeMap, latitudeMap } = await searchData(norad_id);

  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitudeMap},${latitudeMap}.json?access_token=pk.eyJ1IjoiYndpbmciLCJhIjoiY2xwdTJvOHR5MGZoZTJ2b2piMWdneXplbyJ9.09m-T__wSv-CJIdU63eYaQ`;

  if (longitudeMap && latitudeMap) {
    try {
      const response = await fetch(geoCodingUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Mapbox API returns features array that may include elements depending on location, and will show satellite location if features array exists
        if (!data.features.length) {
          document.querySelector(
            '#mapCoordinates'
          ).innerText = `Current location is ${longitudeMap}, ${latitudeMap}`;
        } else {
          const place = data.features[0].place_name;
          console.log(data.features[0]);

          document.querySelector(
            '#locationSearch'
          ).innerText = `Satellite is over ${place}`;

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
