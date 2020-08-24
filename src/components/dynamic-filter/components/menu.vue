<template>
  <ul class="nbf__menu">
    <li v-for="item in menu.options" :key="item.value">
      <el-link
        :type="active === item.value ? 'primary' : 'info'"
        :class="active === item.value ? 'active' : ''"
        :underline="false"
        @click="clickMenuItem(item.value)"
      >
        {{ item.label }}
      </el-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      require: true,
      default: () => ([])
    },
    active: {
      type: String,
      default: () => ('')
    }
  },
  methods: {
    clickMenuItem(value) {
      const { model } = this.menu
      this.$emit('change', { model, value })
    }
  }
}
</script>
