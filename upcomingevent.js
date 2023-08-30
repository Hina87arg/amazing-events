//console.log(data)
let upcomingEvent = [];
let template = ""
const currentDate = data.currentDate
console.log(currentDate)

function filtrarFecha(date){
    for(let event of data.events){
      if (date <= event.date){
        upcomingEvent.push(event)
      }
    }
}
filtrarFecha(currentDate)
console.log(upcomingEvent)

for (let event of upcomingEvent) {
      template += `<div class="d-flex flex-wrap p-5">
        <div class="card " style="width: 18rem;">
          <img src="${event.image}" class="card-img-top" alt="foto">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <p>${event.price}</p>
            <a href="Details.html" class="btn btn-outline-danger">Submit</a>
          </div>
        </div>
        </div>`;
  }
const $cards = document.getElementById('cardscontainer');
console.log($cards)
$cards.innerHTML = template;


