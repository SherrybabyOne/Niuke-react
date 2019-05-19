export function getRedirectPath({type,avator}){
    let url = type==='genius'? 'genius':'boss'
    if(!avator){
        url += 'info'
    }
    return url;
}