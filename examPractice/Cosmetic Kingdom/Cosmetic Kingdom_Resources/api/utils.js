export function getDataFromLocaleStorage () {
    return  JSON.parse(localStorage.getItem('userData'))

}


export function setDataToLocaleStorage (data) {
    localStorage.setItem('userData',JSON.stringify(data))

}

export function clearLocaleStorage() {

    localStorage.removeItem('userData')
}