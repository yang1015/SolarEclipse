export const musicRequest = (url, method, callback) => {
    $.ajax({
        url: url,
        type: method,
        data: {
            "TransCode": "020336",
            "OpenId": "123456789",
            "Body": {
                "key": "mamamoo"
            }
        },
        success: function(res) {
            callback(res.Body.splice(0, 10));
        },
        error: function(err) {
            console.log(JSON.stringify(err))
        }
    })
}



