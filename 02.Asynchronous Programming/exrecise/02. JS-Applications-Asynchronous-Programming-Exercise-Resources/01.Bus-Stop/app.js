function getInfo() {
    const busNumberValue = document.getElementById('stopId').value
    let url = `http://localhost:3030/jsonstore/bus/businfo/${busNumberValue}`
    const stopName = document.getElementById('stopName')
    const ul = document.getElementById('buses')
    
    fetch(url)
    .then((response) => response.json() )
    .then((data)=> {
        let buses = data.buses
        let name = data.name
        stopName.textContent = name;
        ul.innerHTML = ''
        Object.keys(buses).forEach( bus => {
            const li = document.createElement('li')
            li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`
            ul.appendChild(li)
            
        })
        

    })
    .catch((error) => {
        stopName.textContent = 'Error'
        ul.innerHTML = ''
    })
    
}