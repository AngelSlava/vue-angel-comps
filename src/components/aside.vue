<template>
  <el-menu
    router
    :default-active="$route.path"
    class="h-100"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/">
      <i class="el-icon-document"></i>
      <span>Home</span>
    </el-menu-item>
    <el-menu-item index="/dynamic-filter">
      <i class="el-icon-document"></i>
      <span>Dynamic filter</span>
    </el-menu-item>
  </el-menu>
</template>
