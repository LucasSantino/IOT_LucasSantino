<script setup lang="ts">
    import { Device, Environment } from '@/models/devices';
    import { reactive, ref, type Ref } from 'vue';
    import EnvironmentComponent from '@/components/EnvironmentComponent.vue';

    const environments: Array<Environment> = reactive([]);
    const selectEnvironment = ref(new Environment());
        
    const ar: Device = reactive(new Device());
    ar.name = 'Ar condicionado';
    ar.color = '#3266a8';
    ar.icon = 'heat_pump';
    ar.state = true;

    const tv: Device = reactive(new Device());
    tv.name = 'Smart TV';
    tv.color = '#a5c949';
    tv.state = true;   
    tv.icon = 'tv';

    const iluminacao: Device = reactive(new Device());
    iluminacao.name = 'Iluminação';
    iluminacao.color = '#4d0d75';
    iluminacao.icon = 'light'

    const tomada: Device = reactive(new Device());
    tomada.name = 'Tomada Inteligente';
    tomada.color = '#4d0d75';
    tomada.icon = 'power'

    const sala: Environment = reactive(new Environment());
    sala.name = 'Sala';
    sala.devices = [ar,tv,iluminacao,tomada];
   

    const cafeteira: Device = reactive(new Device());
    cafeteira.name = 'Cafeteira Wi-fi';
    cafeteira.icon = 'coffee_maker'

    const cozinha: Environment = reactive(new Environment());
    cozinha.name = 'Cozinha';
    cozinha.devices = [cafeteira];
 
    //environments.push(cozinha);  
    //environments.push(sala);  
</script>

<template>  
    <main class="flex flex-column text-center justify-content-center align-items-center">     
        <h1>Gerencie seus Dispositivos! ⚡</h1>
        <section class="environments flex flex-column border-round-sm">            
            <div class="flex flex-row">
                <label for="">Ambiente:</label>
                <select name="" id="" v-model="selectEnvironment">
                    <option v-for="(currentEnv,envId) in environments" 
                     :key="envId" :value="currentEnv" >
                        {{ currentEnv.name }}
                    </option>                
                </select>
                <button>
                    <span class="icons material-icons-round ">add</span> 
                </button>
                <div>
                    <label for="env-name">Nome: </label>
                    <input id="env-name" type="text">
                </div>
                <button>
                    <span class="icons material-icons-round ">save</span> 
                </button>
            </div>
            <div>
                <EnvironmentComponent :showDeviceButtons="false" 
                    :environment="selectEnvironment" />
            </div>
        </section>
    </main>  


</template>

<style scoped lang="scss">
    main{
        width: 100vw;
        min-height: 100vh;
        .environments{
            width: 90vw;
            min-height: 95vh;
            background-color: rgb(206, 160, 160);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }
</style>