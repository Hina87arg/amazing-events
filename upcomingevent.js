//console.log(data)
let upcomingEvent = [];
let template = ""


const $cards = document.getElementById('cardscontainer');
console.log($cards)
$cards.innerHTML = template; 
const $search = document.querySelector('input[type="search"]')
console.log($search);
// checks
const $checks = document.getElementById('checkboxcat');
console.log($checks);

fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then ( response => response.json())
.then( data => {
  let events = data.events
  console.log(events);
  const currentDate = data.currentDate
console.log(currentDate)

  function filtrarFecha(date){    
    for(let event of events){
      if (date <= event.date){
        upcomingEvent.push(event)
      }
    }
    
  }
  console.log(upcomingEvent)
  filtrarFecha(currentDate)
// categorias
const categchecks = [...new Set (upcomingEvent.map(event => event.category))];
checksEnHtml(categchecks, $checks)

$checks.addEventListener("change", (e) => {
  let arrayfiltroAnid = filtrosAnidados(upcomingEvent, $search)
  console.log(arrayfiltroAnid);
  cardsEnHTML(arrayfiltroAnid, $cards)
})

$search.addEventListener("keyup", ()=>{
  const returnFiltroA = filtrosAnidados(upcomingEvent, $search)
cardsEnHTML( returnFiltroA, $cards )
})

})
.catch( error => { console.log(error)})

for (let event of upcomingEvent) {
      template += `<div class="d-flex flex-wrap p-5">
        <div class="card " style="width: 18rem;">
          <img src="${event.image}" class="card-img-top" alt="foto">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <p>${event.price}</p>
            <a href="Details.html?id=${event._id}" class="btn btn-outline-danger">Submit</a>
          </div>
        </div>
        </div>`;       
  }   

// estructura checkbox
function estructuraCheckbox(categoria) {
  let template = ""
  template = `<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="checkboxcategorias" value="${categoria}">${categoria}
  <label class="form-check-label" for="inlineCheckbox"></label>
</div>` 
return template
}
// impresion de checkbox
function checksEnHtml (array, elemento){
  let contenedor = ""
  array.forEach(categoria => {
    contenedor += estructuraCheckbox(categoria)    
  });
  elemento.innerHTML = contenedor
}

// chequeados
function cardsEnHTML (events, elementoHTML){
  if (events.length > 0){
    let estructura = ""
    events.forEach( categoria => {
         estructura += estructuraCards(categoria)
    } )
    elementoHTML.innerHTML = estructura  
  } else {
elementoHTML.innerHTML = `<div class="container-fluid d-flex flex-column h-auto"><h2>No results, please try another search</h2></div>
`
  }  
}

// cards
function estructuraCards (event){
  let template = ""
  template = `
      <div class="d-flex flex-wrap p-5">
        <div class="card " style="width: 18rem;">
          <img src="${event.image}" class="card-img-top" alt="foto">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <p>${event.price}</p>
            <a href="Details.html?id=${event._id}" class="btn btn-outline-danger">Submit</a>
          </div>
        </div>
        </div>`;
        return template
}
  
function filtroSearch (events, input){
  let arrayfiltro = events.filter(objeto => objeto.name.includes(input.value))
console.log(arrayfiltro); 
    return arrayfiltro 
}

function filtroCheck(array){
  let eventCheck = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(check=> check.value)
  if(eventCheck.length > 0){
    let categoriasFiltradas = array.filter(objeto => eventCheck.includes(objeto.category))
    return categoriasFiltradas
  }else{
    return array
  }
}

function filtrosAnidados (array, input){
  const arrayFiltroCheck = filtroCheck(array)
  const arrayFiltroSearch = filtroSearch(arrayFiltroCheck, input)
  console.log(arrayFiltroCheck);
  console.log(arrayFiltroSearch);
  return arrayFiltroSearch
}
