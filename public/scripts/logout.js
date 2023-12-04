const logoutLink = document.getElementById('logout-link');

const sendLogout = async () => {
    const logout = await fetch('/login/end_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    logout.ok ? document.location.replace('/')
        : alert('Unable to logout.  Please try again');

};

logoutLink.addEventListener('click', sendLogout);