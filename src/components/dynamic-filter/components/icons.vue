<template>
  <div class="nbf__icon">
    <el-icon v-if="loading" class="el-icon-loading" />
    <el-link v-else-if="isQuery" icon="fas fa-filter" type="primary" :underline="false" @click="$emit('click')" />
    <el-icon v-else class="el-icon-search" />
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    isQuery: Boolean
  }
}
</script>
