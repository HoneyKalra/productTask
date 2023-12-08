(function () {


    let invoice = {
        //getting elements//
        orderInfo: JSON.parse(localStorage.getItem("orderDetails")),
        detailsContainer: document.getElementById("js-invoice"),


        diplayInvoiceInfo: function (orderDetails) {
            //creation of elements//
            const orderId = document.createElement("p")
            orderId.innerText = `Order Id: ${orderDetails.orderId}`;

            const paymentId = document.createElement("p")
            paymentId.innerText = `Payment Id:${orderDetails.paymentId};`

            const signature = document.createElement("p")
            signature.innerText = `Signature:${orderDetails.signature}`;
            //appending of elements//
            this.detailsContainer.append(orderId, paymentId, signature)



        },
        bind: function () {

            this.diplayInvoiceInfo(this.orderInfo)


        }


    }
    invoice.bind()

})()