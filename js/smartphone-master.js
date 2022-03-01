const getPhones = () => {
    const searchText = document.getElementById('search-input').value;
    const errorMessageContainer = document.getElementById('error');
    if(searchText === '') {
        errorMessageContainer.innerHTML = `
            <h1>Please Input Any Text To Search</h1>
        `;
    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
    }
}
    // const showAll = document.getElementById('show-all');
    // showAll.style.display = 'none';
const displayPhones = phones => {
    // if(phones.length > 20) {
    //     phones.length = 20;
    //     showAll.style.display = 'block';
    // }
    console.log(phones);
    const errorMessageContainer = document.getElementById('error');
    if(phones.length == 0) {
        const phonesContainer = document.getElementById('phones-container');
        phonesContainer.textContent = '';
        errorMessageContainer.innerHTML = `
            <h1 class="text-danger text-center mt-5">No Results Found</h1>
        `;
    }else {
        errorMessageContainer.textContent = '';
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${phone.image}" class="card-img-top img-fluid w-100" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h5 class="card-title">${phone.brand}</h5>
                </div>
                <div class="ms-3 mb-3">
                    <button class="btn btn-primary" onclick="getPhoneDetails('${phone.slug}')">Details</button>
                </div>
            </div>
        </div>
        `
        phonesContainer.appendChild(div);
    })        
    }
}

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
        <div class="card mb-3 mx-auto w-75">
            <div class="row g-0">
                <div class="col-md-2 my-auto mx-auto ps-2">
                    <img src="${phoneDetail.image}" class="img-fluid rounded-start" alt="...">
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
                        <small class="text-muted">Bluetooth: ${phoneDetail.others.Bluetooth}</small><br />
                        <small class="text-muted">GPS: ${phoneDetail.others.GPS}</small><br />
                        <small class="text-muted">NFC: ${phoneDetail.others.NFC}</small><br />
                        <small class="text-muted">Radio: ${phoneDetail.others.Radio}</small><br />
                        <small class="text-muted">USB: ${phoneDetail.others.USB}</small><br />
                        <small class="text-muted">WLAN: ${phoneDetail.others.WLAN}</small><br />
                    </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailsContainer.appendChild(div);
}