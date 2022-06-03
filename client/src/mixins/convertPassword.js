export function enCodePassword(pw) {
    return (encodeURIComponent(pw))
}

export function deCodePassword(pw) {
    return decodeURIComponent(pw)
}