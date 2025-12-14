<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Maintenance</h1>
      <button @click="showForm = !showForm" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        {{ showForm ? 'Close Form' : 'Add Maintenance' }}
      </button>
    </div>
    
    <div v-if="showForm" class="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Maintenance Log</h2>
        <FormMaintenance @submit="handleAddMaintenance" />
    </div>

    <div class="mb-6 bg-white p-4 rounded-lg shadow-md flex space-x-4">
        <div class="flex-1">
            <label for="filter-machine" class="block text-sm font-medium text-gray-700">Filter by Machine</label>
            <input v-model="filter.machine" type="text" id="filter-machine" class="mt-1 block w-full shadow-sm h-10 px-3 py-2 border-gray-300 rounded-md">
        </div>
        <div class="flex-1">
            <label for="filter-status" class="block text-sm font-medium text-gray-700">Filter by Status</label>
            <select v-model="filter.status" id="filter-status" class="mt-1 block w-full h-10 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">ALL</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Late">Late</option>
            </select>
        </div>
        <div class="flex-1">
            <label for="filter-data" class="block text-sm font-medium text-gray-700">Filter by Date</label>
            <input v-model="filter.datefilter" type="date" id="filter-data" class="mt-1 block w-full shadow-sm h-10 px-3 py-2 border-gray-300 rounded-md">
        </div>
    </div>

    <div v-if="store.isLoading" class="text-center">Carregando...</div>
    <TableMaintenance v-else :maintenance="maintenanceFilter" @view-edit="goToDetails" />
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import TableMaintenance from '../components/TableMaintenance.vue';
import FormMaintenance from '../components/FormMaintenance.vue';
import { useMaintenanceStore } from '../stores/StoreMaintenance';

const store = useMaintenanceStore();
const router = useRouter(); 
const showForm = ref(false);


const filter = ref({
  machine: '',
  status: '',
  datefilter: '', 
});

onMounted(() => {
  if (store.maintenance.length === 0) {
    store.fetchmaintenance();
  }
});

const maintenanceFilter = computed(() => {
  return store.maintenance.filter(m => {

    const namemachine = m.machine?.nome || ''; 
    
    const machineMatch = namemachine.toLowerCase().includes(filter.value.machine.toLowerCase());
    const statusMatch = filter.value.status === '' || m.status?.toLowerCase() === filter.value.status.toLowerCase();
    const dataMatch = filter.value.datefilter === '' || m.data === filter.value.datefilter;

    return machineMatch && statusMatch && dataMatch; 
  });
});

async function handleAddMaintenance(formData) {
  try {
    await store.addMaintenance(formData);
    showForm.value = false;
  } catch (error) {
    console.error(error);
  }
}

function goToDetails(id) {
    router.push(`/list/${id}`);
}
</script>