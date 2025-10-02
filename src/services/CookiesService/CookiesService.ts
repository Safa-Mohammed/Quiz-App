import Cookies from "universal-cookie";

const cookie = new Cookies();

class CookiesService {


    get(name:string){
        return cookie.get(name)
    }
    
     set(name:string,value:string,Options?:object){
        return cookie.set(name,value,Options)
    }
    remove(name:string){
        return cookie.remove(name)
    }
}
export default new CookiesService