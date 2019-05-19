import * as actionTypes from './actionTypes';

const defaultState = {
    num: 0
}

export default (state=defaultState,action) => {
    switch(action.type){
        case actionTypes.ADD_GUN:
            return {num: state.num+1}
        case actionTypes.REMOV_GUN:
            return {num: state.num-1}
        default:
            return {num:0}
    }
}