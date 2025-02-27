<script setup lang="ts">
    import { Places } from '@/models/devices';
    import { reactive, ref } from 'vue';

    const sala: Places = {
        nome: 'Sala de Estar',
        devices: []
    }

    const contador = ref(0);
    const somar = ()=> contador.value += 1;
</script>

<template>
     <h1>Contagem: {{ contador }}</h1>
     <button @click="somar">Somar</button>
</template>

<style scoped lang="scss">

</style>