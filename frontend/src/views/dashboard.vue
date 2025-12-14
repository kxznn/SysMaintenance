<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
    
    <div v-if="store.isLoading" class="text-center">Loading data...</div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KpiCard title="Delayed Maintenance" :value="store.kpis.late" colorClass="text-red-500" />
      <KpiCard title="Maintenance Completeds" :value="store.kpis.completed" colorClass="text-green-500" />
      <KpiCard title="Pending Maintenance" :value="store.kpis.pending" colorClass="text-yellow-500" />
    </div>

    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Evolution of maintenance</h2>
      <MaintenanceChart v-if="!store.isLoading" :chart-data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import KpiCard from '../components/KpiCard.vue';
import MaintenanceChart from '../components/ChartsMaintenance.vue'; 
import { useMaintenanceStore } from '../stores/StoreMaintenance';

const store = useMaintenanceStore();

onMounted(() => {
  store.fetchmaintenance();
});

// Prepara os dados para o gráfico
const chartData = computed(() => {
  const labels = ['Late', 'Completed', 'Pending'];
  const data = [
    store.kpis.late,
    store.kpis.completed,
    store.kpis.pending,
  ];

  return {
    labels: labels,
    datasets: [{
      label: 'Total Maintenance by Status',
      backgroundColor: ['#EF4444', '#22C55E', '#EAB308'],
      data: data,
    }]
  };
});
</script>