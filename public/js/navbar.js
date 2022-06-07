console.log('asdasd');


// //todo think if this can me moved to a scpefic page script file
const toCurrency = price => {
    return price.toLocaleString('uk-UA') + ' ₴'
}

let dropdowns = document.querySelectorAll('.dropdown-trigger')
console.log(dropdowns);
for (let i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}
// new Intl.NumberFormat('uk-UA', {
//     currency: '₴',
//     style: 'currency'
// }

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

document.addEventListener('DOMContentLoaded', function() { 
    // console.log(document.querySelectorAll('.tabs'));

    // M.Tabs.init(document.querySelectorAll('.tabs'));
//dropdown button
    let butCol = document.querySelectorAll('.button-collapse');
    console.log('HELLO BUTTROM : ' + butCol);

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    
    // document.querySelectorAll('.price').forEach(node => {
    //     node.textContent = toCurrency(node.textContent);
    // })

    document.querySelectorAll('.date').forEach(node => {
        node.textContent = toDate(node.textContent);
    })
})