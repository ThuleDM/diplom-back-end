const $cart = document.querySelector('#cart');
//console.log("cart : " + cart);

        document.querySelectorAll('.minus').forEach(butt => butt.addEventListener('click', event => {
                const id = event.target.dataset.id
                console.log(id);
                fetch('/cart/remove/' + id, {
                    method: 'delete'
                }).then(res => res.json())
                .then(cart => {
                    if(cart.products.length){
                        let countSpan = document.getElementById('count-' + id);
                        console.log(countSpan.innerHTML);
                        if(parseInt(countSpan.innerHTML) > 1 ){
                            countSpan.innerHTML = parseInt(countSpan.innerHTML) - 1;
                        }else{
                            document.getElementById("cart-position-" + id).remove(); 
                        }
                        $cart.querySelector('.price').textContent = cart.price;
                    }
                    else{
                        $cart.innerHTML = '<p>Cart is empty</p>'
                    }
                })
            }))

    document.querySelectorAll('.plus').forEach(butt => butt.addEventListener('click', event => {
        console.log(event.target.classList.contains('plus') );
        const id = event.target.dataset.id
        console.log(id);
        fetch('/cart/add/' + id, {
            method: 'post'
        }).then(res => res.json())
        .then(cart => {
           let countSpan = document.getElementById('count-' + id);
           console.log(countSpan.innerHTML);
           countSpan.innerHTML = parseInt(countSpan.innerHTML) + 1;
           
           $cart.querySelector('.price').textContent = cart.price
        })
    }))

        document.querySelectorAll('.js-remove').forEach(butt => butt.addEventListener('click', event => {
        const id = event.target.dataset.id
        fetch('/cart/remove/' + id, {
            method: 'delete'
        }).then(res => res.json())
        .then(cart => {
            document.getElementById("cart-position-" + id).remove(); 

            $cart.querySelector('.price').textContent = cart.price
        })
    }))

// if($cart) {
//     $cart.addEventListener('click', event => {
//         if(event.target.classList.contains('js-remove') || event.target.classList.contains('minus')) {
//             const id = event.target.dataset.id
//             console.log(id);
//             fetch('/cart/remove/' + id, {
//                 method: 'delete'
//             }).then(res => res.json())
//               .then(cart => {
//                 if(cart.products.length){
//                     const html = cart.products.map(c => {
//                         return `
//                         <tr>
//                             <td>${c.title}</td>

//                             <td>
//                             <span class="valign-wrapper">
//                                 <a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons minus" data-id="${id}">remove</i></a>
//                                     <span >${c.count}</span>
//                                 <a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons plus" data-id="${id}">add</i></a>
//                             </span>
//                             </td>   

//                             <td>
//                                 <button class="btn btm-small js-remove" data-id="${c.id}">Delete</button>
//                             </td>
//                         </tr>
//                         `
//                     }).join('')

//                     $cart.querySelector('tbody').innerHTML = html
//                     $cart.querySelector('.price').textContent = cart.price
//                 }
//                 else{
//                     $cart.innerHTML = '<p>Cart is empty</p>'
//                 }
//               })
//         }
//         if(event.target.classList.contains('plus')){
//             console.log(event.target.classList.contains('plus') );
//             const id = event.target.dataset.id
//             console.log(id);
//             fetch('/cart/add/' + id, {
//                 method: 'post'
//             }).then(res => res.json())
//               .then(cart => {
//                 if(cart.products.length){
//                     const html = cart.products.map(c => {
//                         return `
//                         <tr>
//                             <td>${c.title}</td>

//                             <td>
//                             <span class="valign-wrapper">
//                                 <a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons minus" data-id="${id}">remove</i></a>
//                                     <span >${c.count}</span>
//                                 <a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons plus" data-id="${id}">add</i></a>
//                             </span>
//                             </td>   

//                             <td>
//                                 <button class="btn btm-small js-remove" data-id="${c.id}">Delete</button>
//                             </td>
//                         </tr>
//                         `
//                     }).join('')

//                     $cart.querySelector('tbody').innerHTML = html
//                     $cart.querySelector('.price').textContent = cart.price
//                 }
//               })
//         }
//     })
// }

