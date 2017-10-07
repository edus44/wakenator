

export function getHost(){

    let os = window.require('electron').remote.require('os')

    let user = os.userInfo().username
    let hostname = os.hostname()

    return `${user}@${hostname}`
}