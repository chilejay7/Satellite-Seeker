// This is the button used to delete a post in the postById view.
const removeSatBtns = document.querySelectorAll('.removeSatBtn')
const updateBtns = document.querySelectorAll('.updateSatBtn');

const removeSat = async (e) => {
    e.preventDefault();
    // console.dir(e.target);
    // console.log(e.target.classList.length);
    console.log(e.target.classList[1]);
  
   const id = e.target.classList[1];
    
    const sendDelete = await fetch(`/api/satellite/${id}`, {
        method: 'DELETE',
    });

    sendDelete.ok ? document.location.replace(`/`)
        : alert(`Unable to delete post ${id}`);
};

const updateSat = async (e) => {
    e.preventDefault();
    console.log(e.target);

        // This captures the values from the input fields.
        const satellite_name = document.getElementById('update_name').value;
        // const country_name = document.getElementById('update_country').value;
    
        // The window.location provides access to the page's URL, and the split method separates it based on the / symbols.
        // This returns an array, which is why square brackets are used to then call the .length method of -1 to get the index of the id value we need.
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];
    
        const sendUpdate = await fetch(`/api/satellite/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
                satellite_name,
                // country_name,
            })
        });
    
        sendUpdate.ok ? document.location.replace(`/api/satellite/${id}`)
            : console.log('Update failed');
}

updateBtns.forEach((btn) => {
    btn.addEventListener('click', updateSat)
});

removeSatBtns.forEach((btn) => {
    btn.addEventListener('click', removeSat)
});