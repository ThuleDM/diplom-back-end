//Sort by asc/desc
document.querySelector('#sort-asc').onclick = mySort;
document.querySelector('#sort-desc').onclick = mySortDesc;

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
