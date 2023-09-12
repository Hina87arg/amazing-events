//console.log(data)
//console.log(window)
//console.log(location)
const locationSearch = location.search;
console.log(locationSearch);

const urlParam = new URLSearchParams(locationSearch);
console.log(urlParam);

const events = data.events;
const id = urlParam.get('id');

const eventSelected = events.find(event => event._id == id)
console.log(eventSelected);

const $contenedordetails = document.querySelector('.contenedordetail')
$contenedordetails.innerHTML =  `
<div class="d-flex flex-wrap p-5">
  <div class="card" style="width: 18rem;">
    <img src="${eventSelected.image}" class="card-img-top" alt="foto">
    <div class="card-body">
      <h5 class="card-title">${eventSelected.name}</h5>
      <p class="card-text">${eventSelected.description}</p>
      <p>${eventSelected.price}</p>     
    </div>
  </div>
  </div>`;
