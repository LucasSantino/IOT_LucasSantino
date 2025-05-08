export class Device {
    id: string = "";
    name: string = "";
    state: boolean = false;    
    icon: string = "device";
    pin: number = 0;
}

export class Environment {
    id: string = "";
    name: string = "";
    devices: Array<Device> = []
}

export class EnvironmentResponse {
    id: string = "";
    name: string = "";
    devices: Array<Omit<ResponseItem<null>,"fields">> = []
}

export class ResponseItem<T> {
    fields: T|null = null;
    sys: ResponseSys = new ResponseSys();
}

export class ResponseSys {
    id: string = "";
}

export class EntryResponse<T>{
    fields: T|null = null;
    sys: ResponseSys = new ResponseSys();
}

export class IncludesResponse<T> {
    Entry: Array<EntryResponse<T>> = [];
}

export class ApiResponse<T,Y> {
    items: Array<ResponseItem<T>> = [];
    sys: ResponseSys = new ResponseSys();
    includes: IncludesResponse<Y> = new IncludesResponse();
}

export class ApiAttribute<T> {
    pt: T|null = null;

    constructor(initialValue:T){
        this.pt = initialValue;
    }
}


export class NewEnvironment {
    name: ApiAttribute<String> = new ApiAttribute("");    
}

export class NewDevice {
    name: ApiAttribute<String> = new ApiAttribute("");
    icon: ApiAttribute<String> = new ApiAttribute("");    
    pin: ApiAttribute<Number> = new ApiAttribute(0);    
}

export class NewField<T> {
    fields: T|null = null;

    constructor(initialValue:T){
        this.fields = initialValue;
    }
}

export const mapApiResponseToEnvironments = 
    (apiResponse: ApiResponse<EnvironmentResponse,Device>): Array<Environment> => {
    const environments = apiResponse.items.map(item=>{
        if(item.fields){            
            const environment = new Environment();
            environment.name = item.fields.name;            
            environment.id = item.sys.id;
            environment.devices = item.fields.devices?.map(sysDevice =>{
                const device = apiResponse.includes.Entry
                    .find(dev=>dev.sys.id === sysDevice.sys.id);
                
                if(device?.fields) {
                    device.fields.id = sysDevice.sys.id;
                    return device.fields;
                }
                return new Device();                
            });
            return environment;
        }
        return new Environment();
    });
    return environments;
}