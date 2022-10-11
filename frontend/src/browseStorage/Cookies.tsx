import Cookie from 'js-cookie'


class Cookies {

    static setCookie(cookieName:string, data:string, config:object){
        Cookie.set(cookieName, data, config);
    }

    static getCookie(cookieName: string) {
        return Cookie.get(cookieName); 
    }

    static removeCookie(cookieName: string) {
        return Cookie.get(cookieName); 
    }


}


export default Cookies;