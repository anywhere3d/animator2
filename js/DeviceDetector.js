//  Device Detector.

    var isMobile = ( function () {
        var ua = navigator.userAgent,
            apple_phone      = /iPhone/i,
            apple_ipod       = /iPod/i,
            apple_tablet     = /iPad/i,
            android_phone    = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
            android_tablet   = /Android/i,
            windows_phone    = /IEMobile/i,
            windows_tablet   = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
            other_blackberry = /BlackBerry/i,
            other_opera      = /Opera Mini/i,
            other_firefox    = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i; // Match 'Firefox' AND 'Mobile'

        if (
        apple_phone.test( ua )      ||
        apple_phone.test( ua )      ||
        apple_ipod.test( ua )       ||
        apple_tablet.test( ua )     ||
        android_phone.test( ua )    ||
        android_tablet.test( ua )   ||
        windows_phone.test( ua )    ||
        windows_tablet.test( ua )   ||
        other_blackberry.test( ua ) ||
        other_opera.test( ua )      ||
        other_firefox.test( ua )
        ){

            return true;

        } else {

            return false;

        }
    })();
