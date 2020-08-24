<template>
  <el-form :model="filter" size="mini" class="full-width">
    <el-row :gutter="5">
      <el-col
        v-for="field in fields"
        v-show="checkLinked(field)"
        :key="field.model"
        :sm="field.group ? 24 / field.group : 24"
        :md="field.group ? 24 / field.group : 24"
        :lg="field.group ? 24 / field.group : 24"
        :xl="field.group ? 24 / field.group : 24"
      >
        <el-form-item>
          <select-comp v-if="field.type === 'select'" :field="field" :filter="filter" @change="changeParam" />
          <date-comp v-if="field.type === 'date'" :field="field" :filter="filter" @change="changeParam" />
          <radio-group-comp v-if="field.type === 'radio-group'" :field="field" :filter="filter" @change="changeParam" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import SelectComp from './select'
import DateComp from './date'
import RadioGroupComp from './radio-group'
import fieldsMixin from './fields-mixin'
export default {
  components: { SelectComp, DateComp, RadioGroupComp },
  mixins: [fieldsMixin]
}
</script>
