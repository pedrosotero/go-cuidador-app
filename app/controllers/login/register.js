function close() {
    Alloy.Globals.navcontroller.close();
}

function onRegisterClick() {
    if ($.password.textField.value == $.repassword.textField.value) {
        var params = {
            'first_name': $.first_name.textField.value,
            'last_name': $.last_name.textField.value,
            'email': $.email.textField.value,
            'password': $.password.textField.value
        };

        callXhr("/users", params);

    } else {
        Alloy.Globals.error($.win, 'As senhas não coincidem.');
    }
}

var i = 0;
function callXhr(url, params) {
    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + url, params, "POST", $.win, function (e) {
        Ti.API.info('>>> header token ' + e.responseToken);
        Ti.API.info(e.responseText);
        data = {
            "id": e.responseJSON.user_id,
            "token": e.responseToken
        };

        var user = Alloy.createModel('user', data);
        user.save();

        Alloy.Globals.User = user;
        i++;

        var win = Alloy.createController('feed/index').getView();
        Alloy.Globals.navcontroller.open(win);
    });
}

Alloy.Globals.facebookProxy($.win);
var fb = Alloy.Globals.Facebook;
function onFacebookButtonClick() {
    fb.logout();
    if (fb.loggedIn) {
        Ti.API.info('>>>> logged');
    }
    else {
        fb.initialize();
        fb.permissions = ['email'];
        fb.addEventListener('login', function (e) {
            // You *will* get this event if loggedIn == false below
            // Make sure to handle all possible cases of this event
            Ti.API.info('>>>attempt login');
            if (e.success) {
                fb.requestWithGraphPath('me', {fields: 'first_name, last_name, email'}, 'GET', function (e) {
                    if (e.success) {
                        var me = JSON.parse(e.result);

                        var params = {
                            'facebook_id': me.id,
                            'first_name': me.first_name,
                            'last_name': me.last_name,
                            'email': me.email
                        };

                        Ti.API.info(me.id, me.first_name, me.last_name, me.email);
                        Ti.API.info('here');
                        if (i == 0) {
                            callXhr('/auth_facebook', params);
                        }
                    } else if (e.error) {
                        Ti.API.info(e.error);
                    } else {
                        Ti.API.info('Unknown response');
                    }
                });
            }
            else if (e.cancelled) {
                // user cancelled
                Ti.API.info('>>> cancelled');
            }
            else {
                Ti.API.info('>>> error: ' + e.error);
            }
        });
    }
    fb.authorize();
}

fb.addEventListener('logout', function (e) {
    Ti.API.info('>>>>logged out');
});
