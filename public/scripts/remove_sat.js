// This is the button used to delete a post in the postById view.
const deletePostBtn = document.getElementById('deletePostBtn');

const deletePost = async (e) => {
    e.preventDefault();
    console.log(e);

    // The window.location provides access to the page's URL, and the split method separates it based on the / symbols.
    // This returns an array, which is why square brackets are used to then call the .length method of -1 to get the index of the id value we need.
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const sendDelete = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    sendDelete.ok ? document.location.replace(`/api/posts`)
        : alert(`Unable to delete post ${id}`);
};

deletePostBtn.addEventListener('click', deletePost);