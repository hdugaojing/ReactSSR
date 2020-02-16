import { CHANGE_LIST } from './constants'
const defaultStatus = {
    list: []
}
export default (state=defaultStatus, action) => {
    switch(action.type){
        case 'CHANGE_LIST':
            return {
                ...state,
                list: action.list
            }
        default:
            return state
    }
}