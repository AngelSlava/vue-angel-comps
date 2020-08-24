<template>
  <div id="app">
    <el-container class="h-100">
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppAside from '@/components/aside'
export default {
  name: 'App',
  components: {
    AppAside
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
