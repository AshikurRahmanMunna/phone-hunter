// spinner for using everywhere
const spinner = document.getElementById('spinner');
spinner.style.display = 'none';

// get phones
const getPhones = () => {
    const searchText = document.getElementById('search-input').value;
    const errorMessageContainer = document.getElementById('error');
    if(searchText === '') {
        errorMessageContainer.innerHTML = `
            <h1 class="text-danger text-center mt-5">Please Input Any Text To Search</h1>
        `;
        spinner.style.display = 'none';
        const detailsContainer = document.getElementById('phone-details');
        detailsContainer.textContent = '';
    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
        spinner.style.display = 'block';
    }
}

// display phones
const displayPhones = phones => {
    if(phones.length > 20) {
        phones.length = 20;
    }
    const errorMessageContainer = document.getElementById('error');
    if(phones.length == 0) {
        const phonesContainer = document.getElementById('phones-container');
        phonesContainer.textContent = '';
        errorMessageContainer.innerHTML = `
            <h1 class="text-danger text-center mt-5">No Results Found</h1>
        `;
        spinner.style.display = 'none';
    }
    else {
        errorMessageContainer.textContent = '';
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
            <div class="card shadow p-4 border-radius">
                <img src="${phone.image}" class="card-img-top img-fluid" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h5 class="card-title">${phone.brand}</h5>
                </div>
                <div class="ms-3 mb-3">
                    <button class="btn btn-dark" onclick="getPhoneDetails('${phone.slug}')">Details</button>
                </div>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div);
        spinner.style.display = 'none';
    })        
    }
}
// get phone details
const getPhoneDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data));
}

const showPhoneDetails = phoneDetail => {
    console.log(phoneDetail);
    const detailsContainer = document.getElementById('phone-details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3 mx-auto w-75 border-radius">
            <div class="row g-0">
                <div class="col-md-2 my-auto ps-2 pt-3 text-center">
                    <img src="${phoneDetail.image}" class="img-fluid rounded-start" alt="${phoneDetail.name}">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                    <h5 class="card-title">${phoneDetail.name}</h5>
                    <p class="card-text">
                    <small class="text-muted">${phoneDetail.releaseDate ? phoneDetail.releaseDate: 'No Release Date Found'}</small><br />
                    <small class="text-muted">Brand: ${phoneDetail.brand}</small><br />
                    <small class="text-muted">Chipset: ${phoneDetail.mainFeatures.chipSet}</small><br />
                    <small class="text-muted">Memory: ${phoneDetail.mainFeatures.memory}</small><br />
                    <small class="text-muted">Storage: ${phoneDetail.mainFeatures.storage}</small><br />
                    <small class="text-muted">Display Size: ${phoneDetail.mainFeatures.displaySize}</small><br />
                    <small class="text-muted">Sensors: ${phoneDetail.mainFeatures.sensors}</small><br />
                    </p>
                    <p class="card-text">
                        Others<br />
                        <small class="text-muted">Bluetooth: ${phoneDetail.others?.Bluetooth ? phoneDetail.others.Bluetooth: 'No data'}</small><br />
                        <small class="text-muted">GPS: ${phoneDetail.others?.GPS ? phoneDetail.others.GPS: 'No data'}</small><br />
                        <small class="text-muted">NFC: ${phoneDetail.others?.NFC ? phoneDetail.others.NFC: 'No data'}</small><br />
                        <small class="text-muted">Radio: ${phoneDetail.others?.Radio ? phoneDetail.others.Radio: 'No data'}</small><br />
                        <small class="text-muted">USB: ${phoneDetail.others?.USB ? phoneDetail.others.USB: 'No data'}</small><br />
                        <small class="text-muted">WLAN: ${phoneDetail.others?.WLAN ? phoneDetail.others.WLAN: 'No data'}</small><br />
                    </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailsContainer.appendChild(div);
    spinner.style.display = 'none';
}