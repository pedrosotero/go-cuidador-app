var args = arguments[0] || {};

$.errorText.setText(args.error);

$.errorContainer.animate({
    top: 0,
    duration: 500
}, function () {
    $.errorContainer.animate({
        top: -50,
        duration: 500,
        delay: 2000
    });
});