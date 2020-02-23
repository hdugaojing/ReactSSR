import { CHANGE_LIST } from './constants'
const defaultStatus = {
    translationList: []
}
export default (state=defaultStatus, action) => {
    switch(action.type){
        case CHANGE_LIST:
            return {
                ...state,
                translationList: action.list
            }
        default:
            return state
    }
}