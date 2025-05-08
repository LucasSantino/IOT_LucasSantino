<script setup lang="ts">    
    import EnvironmentComponent from '@/components/EnvironmentComponent.vue';
    import { Device, Environment, mapApiResponseToEnvironments } from '@/models/devices';
    import { getEnvironments } from '@/services/environments.service';
    import { reactive, ref } from 'vue';
    
    const environments: Array<Environment> = reactive([]);
    
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
        <h1>Seus Dispositivos 🚥</h1>
        <section class="environments flex flex-column border-round-sm">
            <div v-for="(environment, env_id) in environments" :key="env_id">
                <EnvironmentComponent :environment="environment"/>
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