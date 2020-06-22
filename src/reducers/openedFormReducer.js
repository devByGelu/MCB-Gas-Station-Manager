export default (state = {}, action) => {
    switch (action.type) {
        case 'OPEN_FORM':
            return action.payload.form 
        default:
            return state;
    }
};