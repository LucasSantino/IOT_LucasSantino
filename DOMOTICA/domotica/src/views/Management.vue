<script setup lang="ts">
    import { Device, Environment, mapApiResponseToEnvironments } from '@/models/devices';
    import { reactive, ref, type Ref } from 'vue';
    import EnvironmentComponent from '@/components/EnvironmentComponent.vue';
    import { useDeviceRepository } from '@/stores/deviceRepository';
    import { getEnvironments, saveEnvironment } from '@/services/environments.service';

    const showNewEnvForm = ref(false);
    const newEnv = reactive(new Environment());
    const saveNewEnv = async()=> {

        try{
            await saveEnvironment(newEnv.name);
        } catch(error){
            console.error("Error when saving environment: ", newEnv);
        }
        
    }

    const environments: Array<Environment> = reactive([]);
    const selectEnvironment = ref(new Environment());

    getEnvironments()
        .then(response=>{
             mapApiResponseToEnvironments(response)
                .forEach(item=>environments.push(item));             
        })
        .catch(error=>{
            console.error("Error when getting Environments: ",error);
        });
        
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
                    <option v-if="environments.length == 0" value="">
                        Sem Componentes!
                    </option>          
                </select>
                <button @click="()=> showNewEnvForm = true">
                    <span class="icons material-icons-round ">add</span> 
                </button>
                <div v-show="showNewEnvForm">
                    <label for="env-name">Nome: </label>
                    <input id="env-name" type="text" v-model="newEnv.name">
                </div>
                <button v-show="showNewEnvForm" @click="saveNewEnv">
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