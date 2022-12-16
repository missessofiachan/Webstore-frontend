/* eslint-disable no-useless-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const label = document.getElementById('label')
const ShoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem('data')) || []

const calculation = () => {
  const cartIcon = document.getElementById('cartAmount')
  const cartBubble = document.getElementById('cartBubble')
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  cartBubble.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation()

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        const { id, item } = x
        const search = shopItemsData.find((y) => y.id === id) || []
        return `
      
      <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <img width="80" src=${search.img} alt="" />
                  <h6 class="my-0">${search.name}</h6>
                
                  <span class="text-muted">$${search.price}</span>
                      </div>
              <i onclick="decrement(${id})" class="fa fa-minus""></i>
              <div id=${id} class="quantity"> ${item}</div>
              <i onclick="increment(${id})" class="fa fa-plus"></i>
          <h3>$ ${item * search.price}</h3>
          
        </div>
      </div>
    </li>
      `
      })
      .join(''))
  } else {
    ShoppingCart.innerHTML = ''
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn btn-lg btn btn-primary">Back to home</button>
    </a>
    `
  }
}

generateCartItems()

const increment = (id) => {
  const selectedItem = id
  const search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    search.item += 1
  }

  generateCartItems()
  update(selectedItem.id)
  localStorage.setItem('data', JSON.stringify(basket))
}
const decrement = (id) => {
  const selectedItem = id
  const search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }
  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0)
  generateCartItems()
  localStorage.setItem('data', JSON.stringify(basket))
}

const update = (id) => {
  const search = basket.find((x) => x.id === id)
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item
  calculation()
  TotalAmount()
}

const removeItem = (id) => {
  const selectedItem = id
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCartItems()
  TotalAmount()
  localStorage.setItem('data', JSON.stringify(basket))
}

const clearCart = () => {
  basket = []
  generateCartItems()
  localStorage.setItem('data', JSON.stringify(basket))
}

const TotalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((x) => {
        const { item, id } = x
        const search = shopItemsData.find((y) => y.id === id) || []
        return item * search.price
      })
      .reduce((x, y) => x + y, 0)
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button  class="btn btn-lg btn-primary" type="submit" class="checkout">Checkout</button>

    <button onclick="clearCart()" class=" btn-lg removeAll btn btn-danger">Clear Cart</button>
    `
  } else return
}

TotalAmount()
