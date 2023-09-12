//console.log(data);

const $checks = document.getElementById('checkboxcat');
console.log($checks);
const $cards = document.getElementById("cardscontainer");
console.log($cards);
const $search = document.querySelector('input[type="search"]')
console.log($search);

fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then ( response => response.json())
.then( data => {
  let events = data.events
  console.log(events);
 
  imprimirCards(events)
 
const categchecks = [...new Set(data.events.map(event => event.category))];
checksEnHtml(categchecks, $checks)
   
 $search.addEventListener("keyup", () => {
    const returnFiltroA = filtrosAnidados(data.events, $search)
    cardsEnHTML(returnFiltroA, $cards)
  })
 
$checks.addEventListener("change", (e) => {
  let arrayfiltroAnid = filtrosAnidados(data.events, $search)
  console.log(arrayfiltroAnid);
  cardsEnHTML(arrayfiltroAnid, $cards)
})

})
.catch( error => { console.log(error)})

// cards
function imprimirCards (arrayEvent){
  let template = "";
  for (let event of arrayEvent) {
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
        $cards.innerHTML = template;  
}

// estructura checkbox
function estructuraCheckbox(categoria) {
  let template = ""
  template += `<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="checkboxcategorias" value="${categoria}">${categoria}
  <label class="form-check-label" for="inlineCheckbox"></label>
</div>` 
return template
}

 // impresion de checkbox
 function checksEnHtml(array, elemento) {
  let contenedor = ""
  array.forEach(categoria => {
    contenedor += estructuraCheckbox(categoria)
  });
  elemento.innerHTML = contenedor
}

// cards
function estructuraCards(event) {
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

function cardsEnHTML(events, elementoHTML) {
  if (events.length > 0) {
    let estructura = ""
    events.forEach(categoria => {
      estructura += estructuraCards(categoria)
    })
    elementoHTML.innerHTML = estructura
  } else {
    elementoHTML.innerHTML = `<div class="container-fluid d-flex flex-column h-auto"><h2>No results, please try another search</h2>
    </div>`
  }
}

function filtroSearch(events, input) {
  let arrayfiltro = events.filter(objeto => objeto.name.includes(input.value))
  console.log(arrayfiltro);
  return arrayfiltro
}

function filtroCheck(array) {
  let eventCheck = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(check => check.value)
  if (eventCheck.length > 0) {
    let categoriasFiltradas = array.filter(objeto => eventCheck.includes(objeto.category))
    return categoriasFiltradas
  } else {
    return array
  }
}

function filtrosAnidados(array, input) {
  const arrayFiltroCheck = filtroCheck(array)
  const arrayFiltroSearch = filtroSearch(arrayFiltroCheck, input)
  console.log(arrayFiltroCheck);
  console.log(arrayFiltroSearch);
  return arrayFiltroSearch
}