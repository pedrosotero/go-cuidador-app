function onLoginClick() {
    var params = {
        data: {
            'email': $.email.textField.value,
            'password': $.password.textField.value
        }
    };
    var win = Alloy.createController('feed/index').getView();
    win.open();
    // var model = Alloy.createModel('User');
    // model.login(params, function (callback) {
    //     callbackValidate(callback);
    // });
}

function onRegisterClick() {
    var win = Alloy.createController('login/register').getView();
    win.open();
}

// Alloy.Globals.facebookProxy($.win);
//
// var fb = Alloy.Globals.Facebook;
function onFacebookLoginClick() {
    alert('logar com o facebook');
//     fb.logout();
//     if (fb.loggedIn) {
//         console.log('esta logado');
//     }
//     else {
//         fb.initialize();
//         fb.permissions = ['email', 'user_birthday'];
//         fb.addEventListener('login', function (e) {
//             // You *will* get this event if loggedIn == false below
//             // Make sure to handle all possible cases of this event
//             console.log('>>>attempt login');
//             if (e.success) {
//                 fb.requestWithGraphPath('me', {fields: 'name, email, birthday'}, 'GET', function (e) {
//                     if (e.success) {
//                         var me = JSON.parse(e.result);
//                         var params = {
//                             data: {
//                                 'facebook_id': me.id,
//                                 'name': me.name,
//                                 'email': me.email,
//                                 'birthday': me.birthday,
//                             }
//                         };
//                         var model = Alloy.createModel('User');
//                         model.facebookLogin(params, function (callback) {
//                             callbackValidate(callback);
//                         });
//                     } else if (e.error) {
//                         console.log(e.error);
//                     } else {
//                         console.log('Unknown response');
//                     }
//                 });
//             }
//             else if (e.cancelled) {
//                 // user cancelled
//                 console.log('>>> cancelled');
//             }
//             else {
//                 console.log('>>> error: ' + e.error);
//             }
//         });
//     }
//     fb.authorize();
}
//
// fb.addEventListener('logout', function (e) {
//     console.log('logged out');
// });

function callbackValidate(callback) {
    var json = callback.responseJSON;

    if (!callback.offline) {
        if (callback.code == 201) {
            var keys = Object.keys(json);
            Alloy.Globals.error($.win, json[keys[0]][0]);
        } else {
            var user = Alloy.createModel('User', json);
            user.save({}, {localOnly: true});

            Alloy.Globals.User = user;

            var win = Alloy.createController('').getView();
            Alloy.Globals.navcontroller.open(win);
        }
    } else {
        Alloy.Globals.ERR_ITERNET_DISCONNECTED($.win);
    }
}

//$.activityIndicator.show();

$.win.open();
