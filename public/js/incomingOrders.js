const full = location.protocol + '//' + location.host;
function acceptOrder(orderId){
    fetch(`${full}/incomingOrders/${orderId}/status/accepted`, {
        method: 'PUT'
    })
        .then((res) => {
            console.log(res);
            alert("Accepted");
             location.href=`http://${location.host}/incomingOrders`
        })
        .catch((err) => alert("Error occured", err));
}

function rejectOrder(orderId){
    fetch(`${full}/incomingOrders/${orderId}/status/rejected`, {
        method: 'PUT'
    })
        .then((res) => {
            console.log(res);
            alert("Rejected");
             location.href=`http://${location.host}/incomingOrders`
        })
        .catch((err) => alert("Error occured", err));
}
