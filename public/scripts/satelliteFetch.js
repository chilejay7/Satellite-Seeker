const satSearchForm = document.getElementById('satSearchForm');

const searchData = (e) => {
    e.preventDefault();
    console.log(e);
};

satSearchForm.addEventListener('submit', searchData);