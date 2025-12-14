<template>
  <div class="card">
    <h2 class="card-title">Lista de Manutenções</h2>
    <table class="table">
      <thead class="table-head">
        <tr>
          <th>ID</th>
          <th>Machine</th>
          <th>Technical</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="manutencao in maintenance" :key="manutencao.id">
          <td class="table-td">
            {{ manutencao.id }}
          </td>

          <td class="machine-table">
            {{ manutencao.machine?.nome || "Unknown" }}
          </td>

          <td class="technical-table">
            {{ manutencao.technical?.nome || "Not assigned" }}
          </td>

          <td class="date-table">{{ formatDate(manutencao.date) }}</td>

          <td class="px-6 py-4 whitespace-nowrap">
            <span class="span-css" :class="getStatusClass(manutencao.status)">
              {{ manutencao.status }}
            </span>
          </td>

          <td class="btn-actions">
            <button @click="emit('viewEdit', manutencao.id)" class="btn-indigo">
              Edit / See
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  maintenance: Array,
});

const emit = defineEmits(["viewEdit"]);

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "late":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return isoDate;
};
</script>

<style scooped>
/* Card */
.card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Título */
.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827; /* gray-900 */
}

/* Tabela */
.table {
  width: 100%;
  border-collapse: collapse;
}

/* Cabeçalho */
.table-head {
  background-color: #f9fafb; /* gray-50 */
}

.table-head th {
  padding: 12px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280; 
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb; 
}

/* Corpo */
.table-body tr {
  border-bottom: 1px solid #e5e7eb;
}

.table-body td {
  padding: 16px 24px;
  font-size: 14px;
  white-space: nowrap;
}

/* Textos */
.text-muted {
  color: #6b7280; 
}

.text-strong {
  color: #202124; 
  font-weight: 500;
}

/* Status */
.status {
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  display: inline-block;
}

/* Cores de status */
.status-success {
  background-color: #dcfce7;
  color: #166534;
}

.status-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.status-danger {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Botão */
.btn-action {
  background: transparent;
  border: none;
  color: #4f46e5; 
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-action:hover {
  color: #312e81; 
  background-color: #eef2ff; 
}

.btn-indigo {
    color: #4F46E5;          
    font-weight: 500;       
    padding-left: 12px;     
    padding-right: 12px;     
    padding-top: 4px;       
    padding-bottom: 4px;     
    border-radius: 6px;    
}

/* Hover */
.btn-indigo:hover {
    color: #312E81;       
    background-color: #EEF2FF; 
}

</style>
