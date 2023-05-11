function solve() {

    const spanInfo = document.querySelector('.info')
    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')
    let stops = 
    {
        next : "depot"
    }

    try {
        async function depart() {
            const url = `http://localhost:3030/jsonstore/bus/schedule/${stops.next}`
           const res = await fetch(url);
           
           stops = await res.json()
           spanInfo.textContent = `Next stop ${stops.name}`;
           departBtn.disabled = true;
           arriveBtn.disabled = false;
           
    
           
        }
    
        async function arrive() {
           
            spanInfo.textContent = `Arriving at ${stops.name}`;
            departBtn.disabled = false;
           arriveBtn.disabled = true;
           
           
    
    
        }


        return {
            depart,
            arrive
        };


    } catch (error) {
        spanInfo.textContent = 'Error'
        departBtn.disabled = true
        arriveBtn.disabled = true

    }
    

}

let result = solve();