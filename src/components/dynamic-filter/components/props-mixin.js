export default {
  props: {
    field: {
      type: Object,
      require: true,
      default: () => ({})
    },
    filter: {
      type: Object,
      require: true,
      default: () => ({})
    },
    invisible: Boolean
  },
  methods: {
    change(value, submit = false) {
      const { model } = this.field
      this.$emit('change', { model, value, submit })
    }
  }
}
