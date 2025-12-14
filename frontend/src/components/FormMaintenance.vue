<template>
  <form class="form-container">
    <div class="form-group">
      <label class="form-label">Machines</label>
      <select class="form-select" required>
        <option value="" disabled selected>Select a machine</option>
        <option>Machine 1 (Type A)</option>
        <option>Machine 2 (Type B)</option>
      </select>
      <p class="form-error">No machines registered in the database.</p>
    </div>

    <div class="form-group">
      <label class="form-label">Technical</label>
      <select class="form-select" required>
        <option value="" disabled selected>Select a technician</option>
        <option>Technical 1</option>
        <option>Technical 2</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Date</label>
      <input type="date" class="form-input" required />
    </div>

    <div class="form-group">
      <label class="form-label">Status</label>
      <select class="form-select">
        <option>Completed</option>
        <option>Pending</option>
        <option>Late</option>
      </select>
    </div>

    <div class="form-footer">
      <button type="button" class="btn-cancel">Cancel</button>
      <button type="submit" class="btn-submit">Save</button>
    </div>
  </form>
</template>


<script setup>
import { ref, watch, onMounted } from "vue";
import { useMaintenanceStore } from "../stores/StoreMaintenance";

const store = useMaintenanceStore();

const props = defineProps({
  machine: [String, Object],
  technical: [String, Object],
  data: String,
  status: String,
  buttonText: { type: String, default: "Save" },
  cancelText: { type: String, default: "Cancel" },
});

const emit = defineEmits(["submit", "cancel"]);

onMounted(() => {
  if (store.MachineOptions.length === 0) store.fetchOpcoes();
});

const form = ref({
  machine: "",
  technical: "",
  date: "",
  status: "Pending",
});

watch(
  props,
  (newProps) => {
    form.value.machine =
      newProps.machine?.id || newProps.machine?._id || newProps.machine || "";
    form.value.technical =
      newProps.technical?.id || newProps.technical?._id || newProps.technical || "";
    form.value.date = newProps.date || "";
    form.value.status = newProps.status || "Pending";
  },
  { immediate: true }
);

function handleSubmit() {
  emit("submit", { ...form.value });
}
</script>
