<template>
  <el-form :model="filter" size="mini" class="full-width">
    <el-row type="flex" :gutter="5">
      <el-col
        v-for="field in fields"
        :key="field.model"
        :class="{'w-auto': field.model !== 'search'}"
      >
        <search-comp v-if="field.model === 'search'" :field="field" invisible :filter="filter" @change="changeParam" @focus="$emit('drawer', true)" />
        <select-comp v-if="field.type === 'select'" :field="field" invisible :filter="filter" @change="changeParam" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import SearchComp from './search'
import SelectComp from './select'
import fieldsMixin from './fields-mixin'
export default {
  components: { SearchComp, SelectComp },
  mixins: [fieldsMixin]
}
</script>
