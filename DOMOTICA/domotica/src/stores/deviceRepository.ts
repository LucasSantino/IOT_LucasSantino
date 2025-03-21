import { defineStore } from "pinia";
import { Environment, Device } from "@/models/devices";

export type DeviceRepository = {
    environments: Array<Environment>
}

export const useDeviceRepository = defineStore("device-repository",{
    state: (): DeviceRepository => ({
        environments: []
    }),
    actions: {
        addEnvironment(newEnvironment: Environment){
            const deepCopy = JSON.parse(JSON.stringify(newEnvironment));
            this.environments.push(deepCopy);
        },
        removeEnvironment(name: string){            
            const index = this.environments.findIndex(env => env.name === name);
            if(index >= 0){                
                this.environments.splice(index,1);
            }
        }
    },
    getters: {

    }
})