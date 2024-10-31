import products from './data.js'
import {v4 as uuidv4} from 'https://cdn.jsdelivr.net/npm/uuid@11.0.2/+esm'

const mainEl = document.querySelector('.main');
const cardsEl = document.querySelector('.cards');
const ordersEl = document.querySelector('.orders');

let orderList = [];

function renderProducts() {
    let cardsHTML = "";
    products.forEach((product) => {
        cardsHTML += `
        <div class="product-card">
            <div class=product-card-img>
                <i class="fa-solid ${product.icon} fa-2xl product-icon"></i>
            </div>
            <div class="product-info">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-ingredients">${product.ingredients.join(', ')}</p>
                <p class="product-price">$${product.price}</p>
            </div>
            <div class="product-add" data-product="${product.id}">
                <i class="fa-solid fa-plus"></i>
            </div>
        </div>`
    })
    cardsEl.innerHTML = cardsHTML; 
}

document.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product-add');
    if (productElement && productElement.dataset.product) {
        const productIndex = Number(productElement.dataset.product);
        const selectedProduct = products[productIndex];
        
        const order = {
            name: selectedProduct.name,
            price: selectedProduct.price,
            uuid: uuidv4()
        }

        orderList.push(order);
        renderOrders();
    } else if (event.target.dataset.removeOrder) {
        orderList = orderList.filter((order) => order.uuid !== event.target.dataset.removeOrder)
        renderOrders();
    }
})
 
function renderOrders() {
    if(orderList.length === 0) {
        ordersEl.innerHTML = '';
        return;
    }

    const totalPrice = orderList.reduce((acc, curr) => {
        return acc + curr.price;
    }, 0)

    let ordersHTML = `
    <div class="order-section">
        <div class="order-section-header">
            <h1 class="order-header">Your Orders</h1>
        </div>
        <div class="order">
    `;

    orderList.forEach((product) => {
        ordersHTML += `
        <div class="product-order">
            <p class="product-order-name">${product.name}</p>
            <button class="remove-product-btn" data-remove-order="${product.uuid}">remove</button>
            <p class="product-order-price">$${product.price}</p>
        </div>
        `;
    })

    ordersHTML += `
    </div>
    <div class=total-price-section">
        <p>Total price: <span class="total-price">$${totalPrice}</span></p>
    </div>
    <div class="complete-section">
        <button class="complete-order-btn">Complete order</button>
    </div>
    </div>
    `;

    ordersEl.innerHTML = ordersHTML;
}

renderProducts();