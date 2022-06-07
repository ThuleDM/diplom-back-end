const $cart = document.querySelector('#cart');
//console.log("cart : " + cart);
if($cart) {
    $cart.addEventListener('click', event => {
        if(event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
              .then(cart => {
                if(cart.products.length){
                    const html = cart.products.map(c => {
                        return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btm-small js-remove" data-id="${c.id}">Delete</button>
                            </td>
                        </tr>
                        `
                    }).join('')

                    $cart.querySelector('tbody').innerHTML = html
                    $cart.querySelector('.price').textContent = toCurrency(cart.price)
                }
                else{
                    $cart.innerHTML = '<p>Cart is empty</p>'
                }
              })
        }
    })
}

