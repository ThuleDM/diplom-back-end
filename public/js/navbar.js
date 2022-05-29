M.Tabs.init(document.querySelectorAll('.tabs'));
//dropdown button
let dropdowns = document.querySelectorAll('.dropdown-trigger')
for (let i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}

//todo think if this can me moved to a scpefic page script file
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

document.addEventListener('DOMContentLoaded', function() {     
    document.querySelectorAll('.price').forEach(node => {
        node.textContent = toCurrency(node.textContent);
    })

    document.querySelectorAll('.date').forEach(node => {
        node.textContent = toDate(node.textContent);
    })
})