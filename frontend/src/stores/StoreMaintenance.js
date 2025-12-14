import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api'; 

export const useMaintenanceStore = defineStore('maintenance', () => {
  // === STATE ===
  const maintenance = ref([]);
  const MachineOptions = ref([]);
  const TechnicalOptions = ref([]);
  const isLoading = ref(false);

  // === GETTERS ===
  const totalmaintenance = computed(() => maintenance.value.length);

  const kpis = computed(() => {
    return {
      completed: maintenance.value.filter(m => m.status === 'Completed').length,
      pending: maintenance.value.filter(m => m.status === 'Pending').length,
      late: maintenance.value.filter(m => m.status === 'Late').length,
    };
  });

  async function fetchmaintenance() {
    isLoading.value = true;
    try {
      const response = await api.getmaintenance();
      maintenance.value = response.date;
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addMaintenance(newMaintenance) {
    try {
      const response = await api.addMaintenance(newMaintenance);
      maintenance.value.push(response.date);
    } catch (error) {
      console.error('Erro ao adicionar manutenção:', error);
      throw error;
    }
  }

  async function updtMaintenance(currentMaintenance) {
    try {
      const response = await api.updtMaintenance(currentMaintenance);
      const index = maintenance.value.findIndex(m => m.id === response.date.id);
      if (index !== -1) {
        maintenance.value[index] = response.date;
      }
    } catch (error) {
      console.error('Erro ao atualizar manutenção:', error);
      throw error;
    }
  }

  async function deletMaintenance(id) {
    try {
      await api.deletMaintenance(id);
      maintenance.value = maintenance.value.filter(m => m.id !== id);
    } catch (error) {
      console.error('Erro ao excluir manutenção:', error);
      throw error;
    }
  }


  
  async function fetchOptions() {
    try {
      const [resMq, resTec] = await Promise.all([
        api.getMachines(),
        api.getTechnicals()
      ]);
      MachineOptions.value = resMq.date;
      TechnicalOptions.value = resTec.date;
    } catch (error) {
      console.error("Erro ao buscar opções:", error);
    }
  }

  async function saveMachine(newMachine) {
    if (newMachine.id) {
        try {
            const response = await api.updtMachine(newMachine);
            const index = MachineOptions.value.findIndex(m => m.id === newMachine.id);
            if (index !== -1) MachineOptions.value[index] = response.date;
        } catch (error) { console.error(error); throw error; }
    } else {
        try {
            const response = await api.createMachine(newMachine);
            MachineOptions.value.push(response.date);
        } catch (error) { console.error(error); throw error; }
    }
  }

  async function removeMachine(id) {
    try {
        await api.deletMachine(id);
        MachineOptions.value = MachineOptions.value.filter(m => m.id !== id);
    } catch (error) { 
        if (error.response && error.response.status === 404) {
            console.warn(`Máquina ${id} não encontrada no banco, removendo da lista local.`);
            MachineOptions.value = MachineOptions.value.filter(m => m.id !== id);
        } else {
            console.error(error); 
            throw error; 
        }
    }
  }

  async function saveTechnical(newTechnical) {
    if (newTechnical.id) {
        try {
            const response = await api.updtTechnical(newTechnical);
            const index = TechnicalOptions.value.findIndex(t => t.id === newTechnical.id);
            if (index !== -1) TechnicalOptions.value[index] = response.date;
        } catch (error) { console.error(error); throw error; }
    } else {
        try {
            const response = await api.createTechnical(newTechnical);
            TechnicalOptions.value.push(response.date);
        } catch (error) { console.error(error); throw error; }
    }
  }

  async function removeTechnical(id) {
    try {
        await api.deletTechnical(id);
        TechnicalOptions.value = TechnicalOptions.value.filter(t => t.id !== id);
    } catch (error) { 
        if (error.response && error.response.status === 404) {
            console.warn(`Técnico ${id} não foi encontrado em nosso banco, removendo da lista.`);
            TechnicalOptions.value = TechnicalOptions.value.filter(t => t.id !== id);
        } else {
            console.error(error); 
            throw error; 
        }
    }
  }

  return {
    maintenance,
    MachineOptions,
    TechnicalOptions,
    isLoading,
    totalmaintenance,
    kpis,
    fetchmaintenance,
    addMaintenance,
    updtMaintenance,
    deletMaintenance,
    fetchOptions,
    saveMachine,
    removeMachine,
    saveTechnical,
    removeTechnical
  };
});