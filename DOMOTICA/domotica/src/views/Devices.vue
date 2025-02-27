<script setup lang="ts">
    import { Device, Environment } from '@/models/devices';
    import { reactive, ref } from 'vue';

    const environments: Array<Environment> = reactive([]);
  

    const ar: Device = reactive(new Device());
    ar.name = 'Ar condicionado';
    ar.color = '#3266a8'
    

    const tv: Device = reactive(new Device());
    tv.name = 'Smart TV';
    tv.color = '#a5c949';
    tv.state = true;

    const iluminacao: Device = reactive(new Device());
    iluminacao.name = 'Iluminação';
    iluminacao.color = '#4d0d75';
    
    const sala: Environment = reactive(new Environment());
    sala.name = 'Sala';
    sala.devices = [ar,tv,iluminacao];

    environments.push(sala);



    

</script>

<template>
     <h1>Devices page!!!</h1>
     {{ environments }}
</template>

<style scoped lang="scss">

</style>