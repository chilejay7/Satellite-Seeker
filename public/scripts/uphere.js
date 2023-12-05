// const satSearchForm = document.getElementById('satSearchForm');

// const searchData = async (e) => {
//     e.preventDefault();

//     console.log(e);

//     // These have to be defined within the code block of the function otherwise they'll be read as having an empty value if defined outside of the function.
//     const satelliteName = document.getElementById('satellite_name').value;
//     const latitude = document.getElementById('latitude').value;
//     const longitude = document.getElementById('longitude').value;
    
//     console.log(satelliteName);
//     console.log(latitude);
//     console.log(longitude);

//     const options = {
//         method: 'GET',
//         url: 'https://uphere-space1.p.rapidapi.com/satellite/20580/location',
//         params: {
//           lng: `${longitude}`,
//           lat: `${latitude}`,
//         },
//         headers: {
//           'X-RapidAPI-Key': '1cb9d85524mshe69404680419381p139451jsn1adb330d9846',
//           'X-RapidAPI-Host': 'uphere-space1.p.rapidapi.com'
//         }
//       };
      
//       try {
//           const response = await axios.request(options);
//           console.log(response.data);
//       } catch (error) {
//           console.error(error);
//       }
// };

// satSearchForm.addEventListener('submit', searchData);