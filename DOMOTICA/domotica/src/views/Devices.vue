<script setup lang="ts">
    import { Device, Environment } from '@/models/devices';
    import { reactive, ref } from 'vue';

    const environments: Array<Environment> = reactive([]);
  

    const ar: Device = reactive(new Device());
    ar.name = 'Ar condicionado';
    ar.color = '#3266a8';
    ar.icon = 'mode_fan';
    

    const tv: Device = reactive(new Device());
    tv.name = 'Smart TV';
    tv.color = '#a5c949';
    tv.state = true;
    tv.icon = 'tv';

    const iluminacao: Device = reactive(new Device());
    iluminacao.name = 'Iluminação';
    iluminacao.color = '#4d0d75';
    iluminacao.icon = 'light';
    
    const sala: Environment = reactive(new Environment());
    sala.name = 'Sala';
    sala.devices = [ar,tv,iluminacao];


    environments.push(sala);



</script>

<template>
    <main class="flex flex-column text-center justify-content-center align-items-center">
        <h1>Devices page!!!</h1>
        <section class="environments flex-column border-round-sm">
            <div class="device" v-for="(environment, env_id) in environments" :key="env_id">
                <h3>{{ environment.name }}</h3>
                <div v-for="(device, dev_id) in environment.devices" :key="dev_id">
                    <section>
                        <h5>{{ device.name }}</h5>
                        <button>ON</button>
                        <button>OFF</button>
                        
                    </section>

                </div>
                

            </div>

        </section>
    </main>
     
</template>

<style scoped lang="scss">
    main{
        width: 100vw;
        min-height: 100vh;
        .environments{
            width: 98vw;
            min-height:95vh;
            background-color: rgb(206, 160, 160);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


        }
    }

</style>