M.Tabs.init(document.querySelectorAll('.tabs'));
//dropdown button
let dropdowns = document.querySelectorAll('.dropdown-trigger')
for (let i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}

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

//PRODUCT

document.addEventListener('DOMContentLoaded', function() {
    console.log("HELLLLLOOOOO")
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        fullWidth: true,
        indicators: true,
        duration: 500
    });
});


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
