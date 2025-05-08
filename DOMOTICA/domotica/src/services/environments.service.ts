import { NewEnvironment, NewField, type ApiResponse, type Device, type Environment, type EnvironmentResponse } from "@/models/devices";
import { getCdn, getApi } from "./services.config";

export const getEnvironments = (): Promise<ApiResponse<EnvironmentResponse,Device>>=> {
    return getCdn().get("?content_type=environment");
}

export const saveEnvironment = (name: string): Promise<void>=> {    

    
    const env = new NewEnvironment();
    env.name.pt = name;
    const field = new NewField<NewEnvironment>(env);
    
    return getApi().post("/", field, {
        headers: {
            'X-Contentful-Content-Type' : 'environment'
        }
    });
}