<template>
  <el-input
    ref="search"
    v-model="filter[field.model]"
    size="mini"
    :placeholder="field.placeholder"
    :default-first-option="field.default"
    :clearable="field.clearable"
    :class="{ 'invisible-input' : invisible }"
    @focus="$emit('focus')"
    @keydown.native.enter="handleEnter"
  />
</template>

<script>
import propsMixin from './props-mixin'
export default {
  mixins: [propsMixin],
  methods: {
    handleEnter() {
      const value = this.filter[this.field.model]
      this.$refs.search.blur()
      this.change(value, true)
    }
  }
}
</script>
