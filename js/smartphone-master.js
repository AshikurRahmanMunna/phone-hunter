const getPhones = () => {
    const searchText = document.getElementById('search-input').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data));
}
const displayPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);
    })
}