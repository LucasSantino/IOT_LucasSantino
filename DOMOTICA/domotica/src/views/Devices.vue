<script setup lamg="ts">
    import {Places} from '@/models/devices';
    import {reactive, ref} from 'vue';

    sala: Places = {
        nome: 'Sala de Estar',
        devices: []
    }

    const contador = ref(0);
    const somar =()=> contador.value += 1;


</script>

<template>
    <h1>Contagem: {{  contador }}</h1>
    <button>@click="">Somar</button>

</template>

<style scooped lang="scss">

</style>