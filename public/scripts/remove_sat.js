// This is the button used to delete a post in the postById view.
const removeSatBtns = document.querySelectorAll('.removeSatBtn')
const updateBtns = document.querySelectorAll('.updateSatBtn');

const updateSat = async (e) => {
    e.preventDefault();
    console.log(e.target.classList[1]);
    const id = e.target.classList[1];
}

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

updateBtns.forEach( (btn) => {
    btn.addEventListener('click', updateSat)
});

removeSatBtns.forEach( (btn) => {
    btn.addEventListener('click', removeSat)
});