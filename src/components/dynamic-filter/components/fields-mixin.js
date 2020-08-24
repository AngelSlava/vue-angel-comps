export default {
  props: {
    fields: {
      type: Array,
      default: () => ([])
    },
    filter: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    changeParam(params) {
      this.$emit('change', params)
    },
    checkLinked(field) {
      if (field.linked) {
        const { model, value } = field.linked
        if (value === 'not empty' && this.filter[model] && this.filter[model].length) {
          return true
        }
        return this.filter[model] === value
      }
      return true
    }
  }
}
