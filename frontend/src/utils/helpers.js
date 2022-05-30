import React from 'react';
import * as _ from "lodash";
import axios from "axios";
import Message from "../components/ui/Message";

const backendUrl = '';

function snakeToCamel(obj) {
    let newObj = {};
    Object.keys(obj).forEach((k) => {
        if(!obj[k]) newObj[_.camelCase(k)] = obj[k];
        else if(Array.isArray(obj[k])) {
            newObj[_.camelCase(k)] = obj[k].map(ele => snakeToCamel(ele));
        }
        else if(typeof obj[k] === 'object') {
            newObj[_.camelCase(k)] = snakeToCamel(obj[k]);
        }
        else newObj[_.camelCase(k)] = obj[k];
    });
    return newObj;
}

function camelToSnake(obj) {
    let newObj = {};
    Object.keys(obj).forEach((k) => {
        if(!obj[k]) newObj[_.snakeCase(k)] = obj[k];
        else if(Array.isArray(obj[k])) {
            newObj[_.camelCase(k)] = obj[k].map(ele => camelToSnake(ele));
        }
        else if(typeof obj[k] === 'object') {
            newObj[_.snakeCase(k)] = camelToSnake(obj[k]);
        }
        else newObj[_.snakeCase(k)] = obj[k];
    });
    return newObj;
}

function parseProductListResponse(response) {
    return response.data.map(d => {
        let newData = snakeToCamel(d);
        newData.image = `http://localhost:8000${newData.image}`;
        return newData;
    });
}

function parseProductResponse(response) {
    let data = snakeToCamel(response.data);
    data.image = `http://localhost:8000${data.image}`;
    return data;
}

function orderCreateRequestObj(data) {
    data = camelToSnake(data);
    const {cart_items, shipping_address, payment_method, total_amount, tax_amount, shipping_amount} = data;
    let reqObj = {
        total_amount,
        tax_amount,
        shipping_amount
    };

    reqObj['product_items'] = []
    for(let item in cart_items) { // because camelToSnake converted it to object.
        reqObj['product_items'].push({
            product: item.id,
            quantity: item.quantity
        })
    }
    reqObj['shipping_address'] = shipping_address
    reqObj['payment'] = {
        payment_method: payment_method
    }
    return reqObj;
}

function priceCalculator(cartItems) {
    const totalItems = Number(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    const totalAmount = Number((cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)).toFixed(2));
    const taxAmount = Number((totalAmount * 0.082).toFixed(2));
    const shippingAmount = +0;
    const totalPrice = (totalAmount + taxAmount + shippingAmount).toFixed(2);

    return {totalItems, totalAmount, taxAmount, shippingAmount, totalPrice};
}

function orderStatusDecoder(order, message=true) {
    const decoder = {
        'PL': message ? <Message variant={'warning'}>{'Placed'}</Message> : 'Placed',
        'PR': message ? <Message variant={'info'}>{'Processing'}</Message> : 'Processing',
        'OW': message ? <Message variant={'info'}>{'On the way'}</Message> : 'On the way',
        'OD': message ? <Message variant={'info'}>{'Out for delivery'}</Message> : 'Out for delivery',
        'DL': message ? <Message variant={'info'}>{`Delivered on ${getDateTime(order.modified)}`}</Message> : 'Delivered',
        'RT': message ? <Message variant={'danger'}>{'Return'}</Message> : 'Return',
        'FL': message ? <Message variant={'danger'}>{'Failed'}</Message> : 'Failed',
        'CL': message ? <Message variant={'danger'}>{'Cancelled'}</Message> : 'Cancelled',
        'EX': message ? <Message variant={'info'}>{'Exchange'}</Message> : 'Exchange'
    }
    return decoder[order.status];
}

function paymentStatusDecoder(payment, message=true) {
    const decoder = {
        'PE': message ? <Message variant={'warning'}>{'Pending'}</Message> : 'Pending',
        'PR': message ? <Message variant={'info'}>{'Processing'}</Message> : 'Processing',
        'SF': message ? <Message variant={'success'}>{`Successfully payed on ${getDateTime(payment.modified)}`}</Message> : 'Successful',
        'FA': message ? <Message variant={'danger'}>{'Failed'}</Message> : 'Failed',
        'RE': message ? <Message variant={'info'}>{'Refund'}</Message> : 'Refund'
    }
    return decoder[payment.paymentStatus];
}

function orderStatus() {
    return {
        'PL': 'Placed',
        'PR': 'Processing',
        'OW': 'On the way',
        'OD': 'Out for delivery',
        'DL': 'Delivered',
        'RT': 'Return',
        'FL': 'Failed',
        'CL': 'Cancelled',
        'EX': 'Exchange'
    };
}

function paymentStatusEncoder(status) {
    const encoder = {
        'Pending': 'PE',
        'Processing': 'PR',
        'Successful': 'SF',
        'Failed': 'FA',
        'Refund': 'RE',
    }
}

function getDateTime(d) {
    const date = new Date(d);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const HH = String(date.getHours()).padStart(2, '0');
    const MM = String(date.getMinutes()).padStart(2, '0');

    return `${dd}-${mm}-${yyyy} ${HH}:${MM}`;
}

function request(config) {
    return axios.request(config);
}

export const HELPERS = {
    snakeToCamel,
    camelToSnake,
    parseProductListResponse,
    parseProductResponse,
    request,
    orderCreateRequestObj,
    priceCalculator,
    paymentStatusDecoder,
    orderStatusDecoder,
    paymentStatusEncoder,
    getDateTime,
    orderStatus,
    backendUrl
}