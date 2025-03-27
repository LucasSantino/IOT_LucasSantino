export class Caracters {
    name: string = "";
    state: boolean = false;
    color: string = "#827d85";
    icon: string = "device";
}

export class Environment {
    name: string = "";
    devices: Array<Caracters> = []
}
