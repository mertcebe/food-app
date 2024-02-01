let initialState = {
    productBoxIsOpen: false,
    actionIsVis: false
};

const MenuItemReducers = ( state = initialState, action ) => {
    switch (action.type) {
        case 'REFRESH':
            return {
                ...state,
                productBoxIsOpen: action.payload.isOpen
            };
        case 'ACTION_TOGGLE':
            return {
                ...state,
                actionIsVis: action.payload.isVis
            }
        default:
            return state;
    }
}

export default MenuItemReducers