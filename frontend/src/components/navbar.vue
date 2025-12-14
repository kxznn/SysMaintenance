<template>
  <aside class="navbar">
    <h1 class="navbar-title"> SysMaintenance </h1>

    <nav class="navbar-nav">
      <router-link
        to="/" class="nav-links" active>
        <ChartBarIcon class="h-6 w-6 mr-3" /> Dashboard
      </router-link>

      <router-link
        to="/calendar" class="nav-links" active>
        <CalendarIcon class="h-6 w-6 mr-3" /> Calendar
      </router-link>

      <router-link to="/list" class="nav-links" active>
        <Cog6ToothIcon class="h-6 w-6 mr-3" /> Maintenance
      </router-link>

      <router-link to="/register" class="nav-links" active>
        <ListBulletIcon class="h-6 w-6 mr-3" /> Register
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import {  ChartBarIcon, CalendarIcon, ListBulletIcon, Cog6ToothIcon } from "@heroicons/vue/24/solid";
</script>


<style scooped>

/* Container principal */
.navbar {
    width: 260px;
    min-height: 100vh;
    background-color: #1F2937; /* cinza escuro */
    color: #FFFFFF;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

/* Título / Logo */
.navbar-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 32px;
    text-align: center;
    letter-spacing: 0.5px;
}

/* Lista de links */
.navbar-nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* Link individual */
.nav-link {
    display: flex;
    align-items: center;
    gap: 12px; /* espaço para ícones */
    padding: 12px 14px;
    border-radius: 10px;
    color: #E5E7EB;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: 
        background-color 0.25s ease,
        color 0.25s ease,
        transform 0.15s ease;
}

/* Hover */
.nav-link:hover {
    background-color: #374151;
    color: #FFFFFF;
    transform: translateX(4px);
}

/* Link ativo */
.nav-link.active {
    background-color: #111827;
    color: #FFFFFF;
    font-weight: 600;
    box-shadow: inset 4px 0 0 #3B82F6; /* barra azul */
}

/* Ícones dentro do link (opcional) */
.nav-link svg {
    width: 20px;
    height: 20px;
}

/* Responsivo (mobile) */
@media (max-width: 768px) {
    .navbar {
        width: 100%;
        min-height: auto;
        flex-direction: row;
        align-items: center;
    }

    .navbar-nav {
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }

    .navbar-title {
        display: none;
    }
}
</style>


