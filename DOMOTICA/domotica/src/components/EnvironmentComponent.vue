<script setup lang="ts">
    import { Environment } from '@/models/devices';
    import DeviceComponent from './DeviceComponent.vue';

    const props = defineProps({
        environment: { type: Environment, required: true },
        showDeviceButtons: { type: Boolean, default: true }
    });
    
</script>

<template>
    <section class="flex flex-column">
        <h2 class="m-3">{{ props.environment.name }}</h2>
        <div class="flex flex-row">
            <div v-for="(device, dev_id) in props.environment.devices" :key="dev_id">
                <DeviceComponent :device="device" :showButtons="props.showDeviceButtons" />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">   

</style>