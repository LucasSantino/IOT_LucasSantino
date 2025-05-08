import type { ApiResponse, Device, Environment, NewDevice } from "@/models/devices";
import { getCdn, getApi } from "./services.config";

export const getDevices = (): Promise<ApiResponse<Device, null>>=> {    
    return getCdn().get("?content_type=device");
}

export const saveDevice = (device:NewDevice): Promise<void>=> {    
    return getApi().post("/", device);
}