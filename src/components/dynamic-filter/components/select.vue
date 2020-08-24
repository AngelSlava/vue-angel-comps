<template>
  <el-select
    v-model="filter[field.model]"
    :placeholder="field.placeholder"
    :clearable="field.clearable"
    :multiple="field.multiple"
    :collapse-tags="field.multiple"
    :class="{ 'invisible-input' : invisible }"
    size="mini"
    @change="change"
  >
    <el-option v-for="option in field.options" :key="option.value" :label="option.label" :value="option.value" />
  </el-select>
</template>

<script>
import propsMixin from './props-mixin'
export default {
  mixins: [propsMixin]
}
</script>
