import { ApiResponse, Device, Environment } from "@/models/devices";
import { getCdn, getApi } from "./services.config";

export const getDevices = (): Promise<ApiResponse<Device>>=> {
    return getCdn().get("?content_type=device");

}

export const getEnvironments = (): Promise<ApiResponse<Environment>>=> {
    return getCdn().get("?content_type=environment");
}