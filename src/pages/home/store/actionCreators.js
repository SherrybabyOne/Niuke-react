import * as actionTypes from './actionTypes';

export const addGun = ()=> {
    return {type: actionTypes.ADD_GUN}
}
export const removeGun = ()=> {
    return {type: actionTypes.REMOV_GUN}
}
export const addGunAsync = ()=> {
    return dispatch=> {
        setTimeout(()=>{
            dispatch(addGun())
        },2000)
    }
}