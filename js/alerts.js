//  alerts.js

    function bootboxSuccessAlert( msg ){
        var prefix = '<div class="alert-icon icon-success"></div><label class="alert-small">';
        var postfix = '</label>';
        var message =  [prefix, msg, postfix].join("") ;
        if (!bootbox) alert( msg );
        else bootbox.alert({size:"small", message: message});
    }

    function bootboxCancelAlert( msg ){
        var prefix = '<div class="alert-icon icon-cancel"></div><label class="alert-small">';
        var postfix = '</label>';
        var message =  [prefix, msg, postfix].join("") ;
        if (!bootbox) alert( msg );
        else bootbox.alert({size:"small", message: message});
    }

    function bootboxWarningAlert( msg ){
        var prefix = '<div class="alert-icon icon-warning"></div><label class="alert-small">';
        var postfix = '</label>';
        var message =  [prefix, msg, postfix].join("") ;
        if (!bootbox) alert( msg );
        else bootbox.alert({size:"small", message: message});
    }

    function bootboxErrorAlert( msg ){
        var prefix = '<div class="alert-icon icon-error"></div><label class="alert-small">';
        var postfix = '</label>';
        var message =  [prefix, msg, postfix].join("") ;
        if (!bootbox) alert( msg );
        else bootbox.alert({size:"small", message: message});
    }

    function bootboxInfoAlert( msg ){
        var prefix = '<div class="alert-icon icon-logo"></div><label class="alert-small">';
        var postfix = '</label>';
        var message =  [prefix, msg, postfix].join("") ;
        if (!bootbox) alert( msg );
        else bootbox.alert({size:"small", message: message});
    }

    function bootboxBugAlert( msg ){
        var prefix = '<div class="alert-icon icon-bug"></div><label class="alert-small">';
        var postfix = '</label>';
        var message =  [prefix, msg, postfix].join("") ;
        if (!bootbox) alert( msg );
        else bootbox.alert({size:"small", message: message});
    }

