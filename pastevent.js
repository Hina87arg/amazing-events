let pastEvent = [];
let template = ""
const currentDate = data.currentDate
console.log(currentDate)

function filtrarFecha(date){
    for(let event of data.events){
      if (date >= event.date){
        pastEvent.push(event)
      }
    }
}
filtrarFecha(currentDate)
console.log(pastEvent)

for (let event of pastEvent) {
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
const $cards = document.getElementById('cardscontainer');
console.log($cards)
$cards.innerHTML = template;


// checks
const $checks = document.getElementById('checkboxcat');
console.log($checks);


// categorias

const categchecks = [...new Set (pastEvent.map(event => event.category))];


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
checksEnHtml(categchecks, $checks)

// chequeados
function cardsEnHTML (events, elementoHTML){
  

  let estructura = ""
  events.forEach( categoria => {
       estructura += estructuraCards(categoria)
  } )
  elementoHTML.innerHTML = estructura  
}

$checks.addEventListener("change", (e) => {
  let arrayfiltroAnid = filtrosAnidados(pastEvent, $search)
  console.log(arrayfiltroAnid);
  cardsEnHTML(arrayfiltroAnid, $cards)
})

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

const $search = document.querySelector('input[type="search"]')
console.log($search);

$search.addEventListener("keyup", ()=>{
     const returnFiltroA = filtrosAnidados(pastEvent, $search)
  cardsEnHTML( returnFiltroA, $cards )
})

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
    return data.events
  }
}

function filtrosAnidados (array, input){
  const arrayFiltroCheck = filtroCheck(array)
  const arrayFiltroSearch = filtroSearch(arrayFiltroCheck, input)
  console.log(arrayFiltroCheck);
  console.log(arrayFiltroSearch);
     return arrayFiltroSearch
}