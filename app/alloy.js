// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var baseApiUrl = "";
Alloy.Globals.baseApiUrl = baseApiUrl;

Alloy.Globals.ERR_ITERNET_DISCONNECTED = function (win) {
    Alloy.Globals.error(win, 'Verifique sua conexão com a internet.')
};

Alloy.Globals.error = function (win, error) {
    var errors = Alloy.createController('form/error', {
        error: error
    }).getView();

    win.add(errors);
}

Alloy.Globals.callXhr = function (url, params, method, _callback) {
    console.log(url + ' :: ' + method);
    if (url && method) {
        var xhr = Ti.Network.createHTTPClient({
            onload: function (e) {
                var responseJSON = JSON.parse(this.responseText);
                _callback({
                    responseText: this.responseText || null,
                    responseJSON: responseJSON || null
                });
                // console.log('>>> responseText: ' + this.responseText);
            },
            onerror: function (e) {
                // console.log(this.responseText);
                console.log('>>> error: ' + e.error);
            },
            timeout: 5000
        });
        console.log(params);
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));
    }
    else {
        console.log('>>> parametros obrigatorios url e method.');
    }
};

//facebook
// Alloy.Globals.Facebook = require('facebook');
// var fb = Alloy.Globals.Facebook;
//
// Alloy.Globals.facebookProxy = function (window) {
//     if (Ti.Platform.name === 'android') {
//         window.fbProxy = fb.createActivityWorker({lifecycleContainer: window});
//     }
//     return true;
// }
