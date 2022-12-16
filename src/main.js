/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem('data')) || []

const generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      const { id, name, price, desc, img } = x
      const search = basket.find((x) => x.id === id) || []
      return `
 <div class="card">
    <div id=product-id-${id} class="item">
          <img src="${img}" alt="${name}" style="width:100%">
            <h1>${name}</h1>
            <p class="price">$${price}</p>
            <p>${desc}</p>
                <p>Quantity in basket</p><div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
            <p><button onclick="increment(${id})">Add to Cart</button></p>
        </div>
      </div>
    </div>
    `
    })
    .join(''))
}

generateShop()

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

  // console.log(basket);
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
  // console.log(basket);
  localStorage.setItem('data', JSON.stringify(basket))
}
const update = (id) => {
  const search = basket.find((x) => x.id === id)
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item
  calculation()
}

const calculation = () => {
  const cartIcon = document.getElementById('cartAmount')
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation()
