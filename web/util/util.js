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
            callback(res.Body.splice(0, 20));
        },
        error: function(err) {
            console.log("err: " + JSON.stringify(err))
        }
    })
}

export const getRandomSongIndex = (songListLength) => {

    return parseInt(Math.random() * songListLength);
}




