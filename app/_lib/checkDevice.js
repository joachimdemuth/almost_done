// check if device is mobile
export default function checkDevice() {


    if (typeof window !== "undefined") {
        const isMobile = window.innerWidth < 768;
        return isMobile;
    }
    return false;
}
