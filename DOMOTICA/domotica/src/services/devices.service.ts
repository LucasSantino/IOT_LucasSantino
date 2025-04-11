import { getCdn, getApi } from "./services.config";

export const getDevices = ()=>{
    //const FormData = new FormDataEvent();
    //FormData.append('content_type','device');

    getCdn().get("?content_type=device")
    
}