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



export class DeviceResponseItem {
    fields: Device = new Device();
}

export class DeviceResponse {
    items: Array<DeviceResponseItem>=[]
}