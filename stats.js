const containerTables = document.getElementById('tabla');
const divtabla1 = document.getElementById('table1');
const divtabla2 = document.getElementById('table2');
const divtabla3 = document.getElementById('table3');
let pastData
async function tableStats() {
  try {
    const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    console.log(response)
    const data = await response.json();
    console.log(data.results);
    let events = data.events;
    console.log(events);
    const currentDate = data.currentDate
    console.log(currentDate)
    const pastData = events.filter(
      (event) => event.date <= currentDate
    );

    const upcomingData = events.filter(
      (event) => event.date > currentDate
    );


    const categPastEvents = Array.from(
      new Set(pastData.map((item) => item.category))
    );

    const categUpcomingEvents = Array.from(
      new Set(upcomingData.map((item) => item.category))
    );

    const dataPastEv = dataPastEvents(categPastEvents, pastData);
    console.log(categPastEvents)

    const dataUpcomingEv = dataUpcomingEvents(categUpcomingEvents, upcomingData);
    console.log(dataUpcomingEv)
    

    const table1 = document.createElement("table");
    table1.innerHTML = `<caption>
  Events statistics
</caption>
<thead>
  <tr>
    <th>event with the highest percentage of attendance</th>
    <th>Events with the lowest percentage of attendance</th>
    <th>Event with larger capacity</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>${statsMayor(pastData)}</td>
    <td>${statsMenor(pastData)}</td>
    <td>${statsCapacidad(pastData)}</td>
  </tr>
</tbody>`;

    let table2 = document.createElement("table");
    let bodyTable2 = document.createElement("tbody");
    table2.innerHTML = `<caption">
  Past events statistics
</caption>

<thead>
  <tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Attendance</th>
  </tr>
</thead>`;
    for (const event of dataPastEv) {
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${event.category}</td>
    <td>${event.revenues.toLocaleString("en", {
        style: "currency",
        currency: "USD",
      })}</td>
    <td>${event.attendance.toFixed(2)} %</td>`;
      bodyTable2.appendChild(tr);
    }
    //const tablePast = document.getElementById('table2')
    table2.appendChild(bodyTable2);

    let table3 = document.createElement("table");
    let bodyTable3 = document.createElement("tbody");
    table3.innerHTML = `<caption">
  Upcoming events statistics
</caption>
<thead>
  <tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Attendance</th>
  </tr>
</thead>`;

    for (const event of dataUpcomingEv) {
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${event.category}</td>
      <td>${event.revenues.toLocaleString("en", {
        style: "currency",
        currency: "USD",
      })}</td>
      <td>${event.attendance.toFixed(2)} %</td>`;
      bodyTable3.appendChild(tr);
    }
    table3.appendChild(bodyTable3);

    containerTables.append(table1, table2, table3);
  }
  catch (error) {
    console.log(error);
  }
}
tableStats()

function statsMayor(events) {
  let acumulador = 0;
  let contenedorAcumulador = "";
  events.forEach((event) => {
    let numero = (event.assistance / event.capacity) * 100;

    if (numero > acumulador) {
      acumulador = numero;
      contenedorAcumulador = event.name;
    }
  });

  return `El mayor es ${contenedorAcumulador} con ${acumulador.toFixed(2)}% de asistencia`;
}


function statsMenor(events) {
  let acumulador = 100;
  let contenedorAcumulador = "";
  events.forEach((event) => {
    let numero = (event.assistance / event.capacity) * 100;

    if (numero < acumulador) {
      acumulador = numero;
      contenedorAcumulador = event.name;
    }
  });

  return `El menor es ${contenedorAcumulador} con ${acumulador}% de asistencia`;
}

function statsCapacidad(events) {
  let acumulador = 0;
  let contenedorAcumulador = "";
  events.forEach((event) => {
    if (event.capacity > acumulador) {
      acumulador = event.capacity;
      contenedorAcumulador = event.name;
    }
  });

  return `El mayor es ${contenedorAcumulador} con ${acumulador}% de capacidad`;
}


function dataPastEvents(categories, events) {
  let resultado = [];
  categories.forEach((category) => {
    let categEvents = events.filter((event) => category == event.category);
    let revenues = categEvents.reduce(
      (acum, event) =>
        acum + event.price * (event.estimate || event.assistance),
      0
    );
    let attendance = categEvents.reduce(
      (acum, event) =>
        acum + ((event.assistance || event.estimate) / event.capacity) * 100,
      0
    );
    resultado.push({
      category,
      revenues,
      attendance: attendance / categEvents.length,
    });
  });
  return resultado;
}

function dataUpcomingEvents(categories, events) {
  let resultado = [];
  categories.forEach((category) => {
    let categEvents = events.filter((event) => category == event.category);
    let revenues = categEvents.reduce(
      (acum, event) =>
        acum + event.price * (event.estimate || event.assistance),
      0
    );
    let attendance = categEvents.reduce(
      (acum, event) =>
        acum + ((event.assistance || event.estimate) / event.capacity) * 100,
      0
    );
    resultado.push({
      category,
      revenues,
      attendance: attendance / categEvents.length,
    });
  });
  return resultado;
}
