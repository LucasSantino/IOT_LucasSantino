export class Device {
    name: string = "";
    state: boolean = false;    
    icon: string = "device";
    pin: number = 0;
}

export class Environment {
    name: string = "";
    devices: Array<Device> = []
}

export class ResponseItem<T> {
    fields: T|null = null;
}

export class ApiResponse<T> {
    items: Array<ResponseItem<T>> = []
}

export class ApiAttribute<T> {
    enUs: T|null = null;

    constructor(initialValue:T){
        this.enUs = initialValue;
    }
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