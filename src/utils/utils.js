export function getRedirectPath({type,avatar}){
    let url = type==='genius'? 'genius':'boss'
    if(!avatar){
        url += 'info'
    }
    return url;
}