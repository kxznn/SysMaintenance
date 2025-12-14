<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Auxiliary Registrations</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div class="bg-white p-6 rounded-lg shadow-md h-fit">
        <h2 class="text-xl font-bold mb-4 text-indigo-700 flex justify-between items-center">
            Machines
            <span v-if="machineForm.id" class="text-xs font-normal text-orange-600 bg-orange-100 px-2 py-1 rounded border border-orange-200">
                Editing: #{{ machineForm.id }}
            </span>
        </h2>
        
        <form @submit.prevent="handleSubmitMachine" class="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200 relative transition-all" :class="{'border-orange-300 bg-orange-50': machineForm.id}">
          
          <button v-if="machineForm.id" type="button" @click="cancelEditMachine" class="absolute top-2 right-2 text-gray-400 hover:text-red-500" title="Cancelar Edição">
            <XMarkIcon class="h-5 w-5" />
          </button>

          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Machine name</label>
            <input v-model="machineForm.name" type="text" required placeholder="Ex: Torno CNC" 
                   class="mt-1 block w-full h-10 px-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">type</label>
            <input v-model="machineForm.type" type="text" required placeholder="Ex: Industrial" 
                   class="mt-1 block w-full h-10 px-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          </div>
          
          <button type="submit" 
            class="w-full text-white py-2 rounded-md font-medium transition-colors shadow-sm"
            :class="machineForm.id ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'"
          >
            {{ machineForm.id ? 'Salvar Alterações' : 'Adicionar Máquina' }}
          </button>
        </form>

        <button 
            @click="ShowMachineList = !ShowMachineList"
            class="w-full flex items-center justify-center text-indigo-600 border border-indigo-200 hover:bg-indigo-50 py-2 rounded-md transition-colors mb-2"
        >
            <component :is="ShowMachineList ? EyeSlashIcon : EyeIcon" class="h-5 w-5 mr-2" />
            {{ ShowMachineList ? 'Ocultar Lista' : 'Ver Máquinas Cadastradas' }}
        </button>

        <div v-if="ShowMachineList" class="border-t pt-2 transition-all">
            <ul class="divide-y divide-gray-200 max-h-60 overflow-y-auto pr-1">
            <li v-for="m in store.MachineOptions" :key="m.id" class="py-3 flex justify-between items-center group hover:bg-gray-50 rounded px-2 transition-colors">
                <div>
                    <div class="font-medium text-gray-800">{{ m.name }}</div>
                    <div class="text-xs text-gray-500">{{ m.type }}</div>
                </div>
                <div class="flex space-x-2">
                    <button @click="prepareEditMachine(m)" class="text-blue-500 hover:text-blue-700 p-1.5 bg-blue-50 rounded hover:bg-blue-100 transition-colors" title="Editar">
                        <PencilSquareIcon class="h-4 w-4" />
                    </button>
                    <button @click="handleDeletMachine(m.id)" class="text-red-500 hover:text-red-700 p-1.5 bg-red-50 rounded hover:bg-red-100 transition-colors" title="Excluir">
                        <TrashIcon class="h-4 w-4" />
                    </button>
                </div>
            </li>
            <li v-if="store.MachineOptions.length === 0" class="text-gray-500 text-sm py-4 text-center italic">
                Nenhuma máquina cadastrada.
            </li>
            </ul>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md h-fit">
        <h2 class="text-xl font-bold mb-4 text-indigo-700 flex justify-between items-center">
            Technicians
            <span v-if="techForm.id" class="text-xs font-normal text-orange-600 bg-orange-100 px-2 py-1 rounded border border-orange-200">
                Editando: #{{ techForm.id }}
            </span>
        </h2>
        
        <form @submit.prevent="handleSubmitTech" class="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200 relative transition-all" :class="{'border-orange-300 bg-orange-50': techForm.id}">
          
          <button v-if="techForm.id" type="button" @click="cancelEditTech" class="absolute top-2 right-2 text-gray-400 hover:text-red-500" title="Cancelar Edição">
            <XMarkIcon class="h-5 w-5" />
          </button>

          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Technician's name</label>
            <input v-model="techForm.name" type="text" required placeholder="Ex: Maria Silva" 
                   class="mt-1 block w-full h-10 px-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          </div>
          
          <button type="submit" 
            class="w-full text-white py-2 rounded-md font-medium transition-colors shadow-sm"
            :class="techForm.id ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'"
          >
            {{ techForm.id ? 'Save Changes' : 'Add Technician' }}
          </button>
        </form>

        <button 
            @click="ShowListTechnical = !ShowListTechnical"
            class="w-full flex items-center justify-center text-indigo-600 border border-indigo-200 hover:bg-indigo-50 py-2 rounded-md transition-colors mb-2"
        >
            <component :is="ShowListTechnical ? EyeSlashIcon : EyeIcon" class="h-5 w-5 mr-2" />
            {{ ShowListTechnical ? 'Ocultar Lista' : 'Ver Técnicos Cadastrados' }}
        </button>

        <div v-if="ShowListTechnical" class="border-t pt-2 transition-all">
            <ul class="divide-y divide-gray-200 max-h-60 overflow-y-auto pr-1">
            <li v-for="t in store.TechnicalOptions" :key="t.id" class="py-3 flex justify-between items-center group hover:bg-gray-50 rounded px-2 transition-colors">
                <span class="font-medium text-gray-800">{{ t.name }}</span>
                <div class="flex space-x-2">
                    <button @click="prepareEditTech(t)" class="text-blue-500 hover:text-blue-700 p-1.5 bg-blue-50 rounded hover:bg-blue-100 transition-colors" title="Editar">
                        <PencilSquareIcon class="h-4 w-4" />
                    </button>
                    <button @click="handleDeleteTech(t.id)" class="text-red-500 hover:text-red-700 p-1.5 bg-red-50 rounded hover:bg-red-100 transition-colors" title="Excluir">
                        <TrashIcon class="h-4 w-4" />
                    </button>
                </div>
            </li>
            <li v-if="store.TechnicalOptions.length === 0" class="text-gray-500 text-sm py-4 text-center italic">
                Nenhum técnico cadastrado.
            </li>
            </ul>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useMaintenanceStore } from '../stores/StoreMaintenance';
import { EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const store = useMaintenanceStore();

const machineForm = ref({ id: null, name: '', type: '' });
const techForm = ref({ id: null, name: '' });

const ShowMachineList = ref(false);
const ShowListTechnical = ref(false);

onMounted(() => {
  store.fetchOpcoes();
});

async function handleSubmitMachine() {
  if (!machineForm.value.name || !machineForm.value.type) return;
  
  await store.saveMachine({ ...machineForm.value });
  
  const acao = machineForm.value.id ? 'updated' : 'added';
  alert(`Machine ${acao}!`);
  
  cancelEditMachine(); 
  ShowMachineList.value = true; 
}

function prepareEditMachine(machine) {
    machineForm.value = { ...machine };
    ShowMachineList.value = true;
}

async function handleDeletMachine(id) {
    if (confirm("Tem certeza que deseja excluir esta máquina?")) {
        await store.removeMachine(id);
        if (machineForm.value.id === id) cancelEditMachine();
    }
}

function cancelEditMachine() {
    machineForm.value = { id: null, name: '', type: '' };
}

async function handleSubmitTech() {
  if (!techForm.value.name) return;
  
  await store.saveTechnical({ ...techForm.value });
  
  const acao = techForm.value.id ? 'updated' : 'added';
  alert(`Technical ${acao}!`);
  
  cancelEditTech();
  ShowListTechnical.value = true;
}

function prepareEditTech(tecnico) {
    techForm.value = { ...tecnico };
    ShowListTechnical.value = true;
}

async function handleDeleteTech(id) {
    if (confirm("Tem certeza que deseja excluir este técnico?")) {
        await store.removeTechnical(id);
        if (techForm.value.id === id) cancelEditTech();
    }
}

function cancelEditTech() {
    techForm.value = { id: null, name: '' };
}
</script>