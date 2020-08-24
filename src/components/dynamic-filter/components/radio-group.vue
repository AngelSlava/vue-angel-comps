<template>
  <el-radio-group
    v-model="filter[field.model]"
    @change="change"
  >
    <el-radio-button
      v-for="option in field.options"
      :key="option.value"
      :label="option.value"
    >
      {{ option.label }}
    </el-radio-button>
  </el-radio-group>
</template>

<script>
import propsMixin from './props-mixin'
export default {
  mixins: [propsMixin]
}
</script>
