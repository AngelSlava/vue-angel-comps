<template>
  <div class="nav-bar-filter">
    <slot name="icons" />

    <div class="nbf__main">
      <slot name="search-input" />

      <div v-if="drawer && !loading" class="nbf__panel" @click="$emit('drawer', false)" />
      <div v-if="drawer && !loading" class="nbf__panel--container">
        <div class="app-container">
          <el-row v-loading="loading" :gutter="10" type="flex">
            <el-col :lg="6">
              <slot name="panel-left" />
            </el-col>
            <el-col :lg="8">
              <slot name="panel-center" />
            </el-col>
            <el-col :lg="10">
              <slot name="panel-right" />
            </el-col>
          </el-row>
          <slot />
        </div>
        <div class="nbf__panel--container-footer">
          <slot name="panel-footer" />
        </div>
      </div>
    </div>
    <div class="nbf__informer">
      <slot name="panel-controls" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    drawer: Boolean,
    loading: Boolean
  }
}
</script>
