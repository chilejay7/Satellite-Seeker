const satSearchForm = document.getElementById('satSearchForm');

const searchData = (e) => {
    e.preventDefault();

    // These have to be defined within the code block of the function otherwise they'll be read as having an empty value if defined outside of the function.
    const satelliteName = document.getElementById('satellite_name').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    
    console.log(satelliteName);
    console.log(latitude);
    console.log(longitude);
};

satSearchForm.addEventListener('submit', searchData);