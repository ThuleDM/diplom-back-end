document.addEventListener('DOMContentLoaded', function() {
    console.log("HELLLLLOOOOO")
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        fullWidth: true,
        indicators: true,
        duration: 500
    });
  });



const toCurrency = price => {
    return new Intl.NumberFormat('de-DE', {
        currency: 'EUR',
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
})

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent);
})

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


M.Tabs.init(document.querySelectorAll('.tabs'));
//dropdown button
let dropdowns = document.querySelectorAll('.dropdown-trigger')
for (let i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}

//Sort by asc/desc
//todo uncomment
// document.querySelector('#sort-asc').onclick = mySort;
// document.querySelector('#sort-desc').onclick = mySortDesc;

function mySort(){
    let cards = document.querySelector('.main-card');
    console.log(cards.children[0].getAttribute('data-price'));

    for(let i = 0; i < cards.children.length; i++){
        for(let j = i; j < cards.children.length; j++){
            if(+cards.children[i].getAttribute('data-price') > +cards.children[j].getAttribute('data-price')){
                replacedNode = cards.replaceChild(cards.children[j], cards.children[i]);
                insertAfter(replacedNode, cards.children[i]);
            }
        }
    }
}

function mySortDesc(){
    let cards = document.querySelector('.main-card');
    console.log(cards.children[0].getAttribute('data-price'));

    for(let i = 0; i < cards.children.length; i++){
        for(let j = i; j < cards.children.length; j++){
            if(+cards.children[i].getAttribute('data-price') < +cards.children[j].getAttribute('data-price')){
                replacedNode = cards.replaceChild(cards.children[j], cards.children[i]);
                insertAfter(replacedNode, cards.children[i]);
            }
        }
    }
}

function insertAfter(elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

// function dragNdrop(event){

//     console.log(event.target.files[0]);
// 	var filename = URL.createObjectURL(event.target.files[0]);
//     console.log(filename);
// 	var preview = document.getElementById('preview'); 
// 	var previewImg = document.createElement("img"); 
// 	previewImg.setAttribute("src", filename);

// 	// preview.innerHTML = "";
// 	preview.appendChild(previewImg);
    
//     for(let i = 0; i < preview.children.length; i++){
//         console.log('HTML : ' + preview.children[i].getAttribute('src'));
//     }

// }

// function drag(){
// 	document.getElementById('uploadFile').parentNode.className = "draging dragBox";
// }

// function drop(){
// 	document.getElementById('uploadFile').parentNode.className = 'dragBox';
// }

