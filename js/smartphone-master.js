const getPhones = () => {
    const searchText = document.getElementById('search-input').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data));
}
const displayPhones = phones => {
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
        <div class="card mb-3 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 my-auto ps-2">
                    <img src="${phoneDetail.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${phoneDetail.name}</h5>
                    <p class="card-text">
                    <small class="text-muted">${phoneDetail.releaseDate ? phoneDetail.releaseDate: 'No Release Date Found'}</small><br />
                    <small class="text-muted">Brand: ${phoneDetail.brand}</small><br />
                    <small class="text-muted">Chipset: ${phoneDetail.mainFeatures.chipSet}</small><br />
                    <small class="text-muted">Memory: ${phoneDetail.mainFeatures.memory}</small><br />
                    <small class="text-muted">Storage: ${phoneDetail.mainFeatures.storage}</small><br />
                    <small class="text-muted">Display Size: ${phoneDetail.mainFeatures.displaySize}</small><br />
                    </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailsContainer.appendChild(div);
}