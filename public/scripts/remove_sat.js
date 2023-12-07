// This is the button used to delete a post in the postById view.
const removeSatBtn = document.querySelectorAll('.satellite');

const removeSat = async (e) => {
    e.preventDefault();
    console.log(e);

    // The window.location provides access to the page's URL, and the split method separates it based on the / symbols.
    // This returns an array, which is why square brackets are used to then call the .length method of -1 to get the index of the id value we need.
    console.log

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const sendDelete = await fetch(`/api/satellite/${id}`, {
        method: 'DELETE',
    });

    sendDelete.ok ? document.location.replace(`/`)
        : alert(`Unable to delete post ${id}`);
};

removeSatBtn.addEventListener('click', deletePost);