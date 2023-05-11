const itemName = 'userData'


export function getUserData() {
    return JSON.parse(localStorage.getItem(itemName))
}

export function setUserData(data) {
    return localStorage.setItem(itemName,JSON.stringify(data))
}
export function clearUserData() {
    localStorage.removeItem(itemName)
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())

        if(Object.values(data).some((input) => input === '')) {
            return alert('Please, fill all input fields!')
        }
        for (const input in data) {
            data[input] = data[input].trim();
        }

        callback(data,form)
    }
}