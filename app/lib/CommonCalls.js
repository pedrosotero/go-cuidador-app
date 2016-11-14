function xhrCall(url, params, method, window, _callback) {
    if (Ti.Network.online) {
        var xhr = Ti.Network.createHTTPClient({timeout: 7000});

        xhr.onload = function () {
            var responseJSON, success = (this.status <= 304) ? "ok" : "error", status = true;

            // we dont want to parse the JSON on a empty response
            if (this.status != 304 && this.status != 204) {
                // parse JSON
                try {
                    responseJSON = JSON.parse(this.responseText);
                } catch (e) {
                    Ti.API.error('[REST API] xhrCall PARSE ERROR: ' + e.message);
                    Ti.API.error('[REST API] xhrCall PARSE ERROR: ' + this.responseText);
                    status = false;
                }
            }

            _callback({
                success: status,
                status: success,
                code: this.status,
                responseText: this.responseText || null,
                responseJSON: responseJSON || null,
                responseToken: this.getResponseHeader("token")
            });

            cleanup();
        }

        xhr.onerror = function (e) {
            var responseJSON;

            responseJSON = JSON.parse(this.responseText);
            var keys = Object.keys(responseJSON);

            if (keys[0] == 'expired_token' && this.status == 401) {
                var user = Alloy.createCollection('Auth');
                user.deleteAll();

                var newWindow = Alloy.createController('login/index').getView();
                newWindow.open();

                Alloy.Globals.navcontroller.close();

                window = newWindow;
            }
            Ti.API.info()
            Ti.API.info(responseJSON[keys[0]][0]);
            error(window, responseJSON[keys[0]][0]);

            Ti.API.error('[REST API] xhrCall ERROR: ' + this.responseText);
            Ti.API.error('[REST API] xhrCall ERROR CODE: ' + this.status);
            Ti.API.error('[REST API] xhrCall ERROR MSG: ' + e.error);
            Ti.API.error('[REST API] xhrCall ERROR URL: ' + url);

            cleanup();
        }

        if (!_.isEmpty(params) && method == "GET") {
            url = encodeData(params, url);
        }

        xhr.open(method, url);

        if (method == "POST") {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            params = JSON.stringify(params);
        }

        if (Alloy.Globals.User) {
            xhr.setRequestHeader("token", Alloy.Globals.User.get('token'));
        }

        if (method == 'PUT') {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        if (method != 'GET' && !_.isEmpty(params)) {
            xhr.send(params);
        } else {
            xhr.send();
        }

    } else {
        errorInternetDisconnected(window);
    }
};

function errorInternetDisconnected(win) {
    error(win, 'Verifique sua conexão com a internet.');
};

function error(win, error) {
    var errors = Alloy.createController('form/error', {
        error: error
    }).getView();

    win.add(errors);
};

function thisItemTemplate(e) {
    return e.section.getItemAt(e.itemIndex);
};

function cleanup() {
    xhr = null;
    _callback = null;
    responseJSON = null;
}

function encodeData(obj, url) {
    var str = [];
    for (var p in obj) {
        str.push(Ti.Network.encodeURIComponent(p) + "=" + Ti.Network.encodeURIComponent(obj[p]));
    }

    if (_.indexOf(url, "?") == -1) {
        Ti.API.info(url + "?" + str.join("&"));
        return url + "?" + str.join("&");
    } else {
        Ti.API.info(url + "?" + str.join("&"));
        return url + "&" + str.join("&");
    }
}

//we need underscore
var _ = require("alloy/underscore")._;

exports.error = error;
exports.ERR_ITERNET_DISCONNECTED = errorInternetDisconnected;
exports.xhr = xhrCall;
exports.thisItemTemplate = thisItemTemplate;