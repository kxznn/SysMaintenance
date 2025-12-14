<template>
  <div>
    <v-calendar
      :attributes="attributes"
      is-expanded
      title-position="left"
      class="custom_calen"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  manutencoes: Array,
});

const attributes = computed(() => {
  if (!props.manutencoes || props.manutencoes.length === 0) {
    return [];
  }

  return props.manutencoes.map((m) => {
    const color = getStatusColor(m.status);

    const dateString = m.data ? `${m.data}T00:00:00` : new Date();

    return {
      key: m.id,
      dates: new Date(dateString),
      highlight: {
        color: color,
        fillMode: "light",
        style: {
          borderRadius: "6px",
        },
      },
      popover: {
        label: `${m.maquina} (${m.status})`,
        visibility: "hover",
      },
    };
  });
});

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "green";
    case "pending":
      return "yellow";
    case "late":
      return "red";
    default:
      return "gray";
  }
};
</script>

<style>
.custom_calen.vc-container {
  --vc-bg: #ffffff;
  --vc-header-arrow-color: #4f46e5;
  --vc-title-color: #111827;
  --vc-weekday-color: #6b7280;
  --vc-font-family: inherit;

  border: none;
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
}
.custom_calen .vc-weeks {
  flex: 1;
}

.custom_calen .vc-day {
  min-height: 100px;
  border: 1px solid #666666dc;
  margin: 2px;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.custom_calen .vc-day:hover {
  background-color: #f9fafb;
  box-shadow: 0 1px 3px 0 rgba(34, 34, 34, 0.1);
}

.custom_calen .vc-day.is-today {
  border-color: #504d8a;
}

.custom_calen .vc-highlight {
  width: 85%;
  height: 85%;
}
</style>
