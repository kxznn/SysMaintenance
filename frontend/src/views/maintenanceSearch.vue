<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Maintenance #{{ maintenanceId }}</h1>
    
    <div v-if="!maintenance" class="text-center">Loading details...</div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md space-y-4">
      
      <FormMaintenance 
        v-model:machine="maintenance.machine"
        v-model:date="maintenance.date"
        v-model:technical="maintenance.technical"
        v-model:status="maintenance.status"
        @submit="handleEditMaintenance"
        @cancel="handleCancel"
        
        button-text="Save Edit"
        cancel-text="Cancel Edit"
      >
        <template #footer-actions-left>
            <button 
                @click.prevent="handleDelet" 
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors mr-auto"
            >
                Excluir
            </button>
        </template>
      </FormMaintenance>

      <div class="mt-6 flex justify-start pt-4 border-t">
         <button @click="handleCancel" 
                 class="text-indigo-600 hover:text-indigo-900 font-medium flex items-center 
                        px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
            &larr; Return to List
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useMaintenanceStore } from '../stores/StoreMaintenance';
import FormMaintenance from '../components/FormMaintenance.vue';

const route = useRoute();
const router = useRouter();
const store = useMaintenanceStore();

const maintenanceId = computed(() => route.params.id);
const maintenance = ref(null); 

onMounted(async () => {
    if (store.maintenance.length === 0) {
        await store.fetchmaintenance();
    }
    const found = store.maintenance.find(m => String(m.id) === maintenanceId.value);
    if (found) {
        maintenance.value = { ...found }; 
    } else {
        console.error(`Manutenção com ID ${maintenanceId.value} não foi possível encontrar.`);
        router.push('/list'); 
    }
});

async function handleEditMaintenance(formdate) {
    try {
        const dateToSave = {
            id: maintenance.value.id,
            ...formdate,
        };
        await store.updtMaintenance(dateToSave);
        router.push('/list'); 
    } catch (error) {
        console.error('Erro ao salvar a edição:', error);
    }
}

async function handleDelet() {
    const confirmDelet = window.confirm(`Tem certeza que deseja excluir a manutenção #${maintenanceId.value}?`);

    if (confirmDelet) {
        try {
            await store.deletMaintenance(String(maintenance.value.id));
            router.push('/list');
        } catch (error) {
            console.error('Falha ao excluir a manutenção:', error);
            alert(`Erro ao excluir a manutenção. Detalhe: ${error.message}`);
        }
    }
}

function handleCancel() {
    router.push('/list');
}
</script>