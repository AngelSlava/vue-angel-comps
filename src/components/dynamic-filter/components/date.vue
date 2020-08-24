<template>
  <el-date-picker
    v-model="filter[field.model]"
    :type="field.type"
    :editable="field.editable || false"
    :clearable="field.clearable || false"
    :value-format="field.valueFormat"
    :default-time="field.model === 'startDate' ? '00:00:00' : field.model === 'endDate' ? '23:59:59' : ''"
    :placeholder="field.placeholder"
    class="hide-suffix"
    @change="change"
  />
</template>

<script>
import propsMixin from './props-mixin'
export default {
  mixins: [propsMixin]
}
</script>
