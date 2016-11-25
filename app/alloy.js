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

var baseApiUrl = "http://192.168.1.127/api";
Alloy.Globals.baseApiUrl = baseApiUrl;
var NavigationController = require('NavigationController'); // use the NavigationController library

var navController = new NavigationController();
Alloy.Globals.navcontroller = navController;

var CommonCalls = require('CommonCalls');

Alloy.Globals.ERR_ITERNET_DISCONNECTED = CommonCalls.ERR_ITERNET_DISCONNECTED;
Alloy.Globals.error = CommonCalls.error;
Alloy.Globals.callXhr = CommonCalls.xhr;
Alloy.Globals.thisItemTemplate = CommonCalls.thisItemTemplate;