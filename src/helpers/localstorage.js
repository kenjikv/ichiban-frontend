export function setUserUID(uid) {
    localStorage.setItem("uid", uid)
}

export function getUserUID() {
    return localStorage.getItem("uid")
}

export function setUserId(id) {
    localStorage.setItem("id", id)
}

export function getUserId() {
    return localStorage.getItem("id")
}

export function setMail(mail) {
    localStorage.setItem("mail", mail)
}

export function getMail() {
    return localStorage.getItem("mail")
}

export function clean() {
    localStorage.removeItem('uid');
    localStorage.removeItem('id');
    localStorage.removeItem('mail');
}
