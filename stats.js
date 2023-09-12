const table1 = document.getElementById('table1').getElementsByTagName('tbody')[0];
const tabla2 = document.getElementById('table2')
const tabla3 = document.getElementById('table3')

fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then ( response => response.json())
.then( data => {
  let events = data.events
  console.log(events);
  let datos = data.events
  crearTabla1(datos)
  
  
})
.catch( error => { console.log(error)})

function crearTabla1(arrayDatos){
  let template = ""
  for(let datos of arrayDatos){
   template =`
   <table class="table table-success table-striped">
   <thead>          
     <tr>
       <th colspan="3">Event Stadistic</th>            
     </tr>        
   </thead>
        <tr>
         <td>Events with highest % of assistance</td>
         <td>Events with lowest % of assistance</td>
         <td>Events with larger capacity</td>
        </tr>
        <tr>
         <td></td>
         <td></td>
         <td></td>
        </tr>  
</table>
   `
  } 
}

function highestAssistance (){}
