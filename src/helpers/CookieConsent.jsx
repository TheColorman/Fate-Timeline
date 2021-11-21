import CookieConsent, { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";

const handleAccept = () => {
    window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
    });
}

export default function Cookie() {
    // Clear cookies if dev mode
    if (process.env.NODE_ENV === 'development') { resetCookieConsentValue(); }
    // Cookies enabled by default
    if (process.env.REACT_APP_COOKIES_ENABLED_DEFAULT === "true") {
        handleAccept();
    } else {   
        if (getCookieConsentValue() === true) { handleAccept(); }
    }
    return (
        <CookieConsent
            enableDeclineButton={process.env.REACT_APP_COOKIES_ENABLED_DEFAULT === "false"}
            onAccept={handleAccept}
            style={{
                zIndex: 2000    // who tf writes a component with a zIndex of 1000?
            }}
        >
            This website uses cookies because I want to know how many people are using it.
        </CookieConsent>
    );
}