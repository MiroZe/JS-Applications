export function getDataFromLocaleStorage () {
    return  JSON.parse(localStorage.getItem('userData'))

}


export function setDataToLocaleStorage (data) {
    localStorage.setItem('userData',JSON.stringify(data))

}

export function clearLocaleStorage() {

    localStorage.removeItem('userData')
}

export function createSubmitHandler(ctx,handler) {
    return function (event) {
        event.preventDefault()
        const formData = Object.fromEntries(new FormData(event.target))
        handler(ctx,formData,event)
    }
}