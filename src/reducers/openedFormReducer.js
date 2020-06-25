export default (state = {}, action) => {
    switch (action.type) {
        case 'OPEN_FORM':
            return action.payload.form 
        case 'CLOSE_FORM':
            return {}
        default:
            return state;
    }
};