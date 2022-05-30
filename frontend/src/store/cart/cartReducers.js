import {
    CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_MODIFY_ITEM, CART_PAYMENT_METHOD_SAVE,
    CART_REMOVE_ITEM, CART_SHIPPING_ADDRESS_SAVE
} from "./cartConstants";

export const cartReducer = (state={ cartItems: [], shippingAddress: {} }, action) => {
    let item, cartItems, itemIdx;

    switch (action.type) {
        case CART_ADD_ITEM:
            item = action && action.payload;
            cartItems = [...state.cartItems];
            itemIdx = cartItems.findIndex(it => item.id === it.id);
            if(itemIdx !== -1) {
                cartItems[itemIdx].quantity += item.quantity;
            }
            else {
                cartItems.push(item);
            }
            return {
                ...state,
                cartItems: cartItems
            }

        case CART_MODIFY_ITEM:
            item = action && action.payload;
            cartItems = [...state.cartItems];
            itemIdx = cartItems.findIndex(it => item.id === it.id);
            if(itemIdx !== -1) {
                cartItems[itemIdx].quantity = item.quantity;
            }
            else {
                cartItems.push(item);
            }
            return {
                ...state,
                cartItems: cartItems
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            }

        case CART_SHIPPING_ADDRESS_SAVE:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_PAYMENT_METHOD_SAVE:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default :
            return state;
    }
}