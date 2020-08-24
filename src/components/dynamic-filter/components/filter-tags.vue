<template>
  <div class="tag-list">
    <span v-for="tag in tags" :key="tag.model">
      <div v-if="isArray(tag.value)" class="mt-05 mb-05">
        <span v-if="tag.label">{{ tag.label }}</span>
        <el-tag
          v-for="(t, i) in tag.value"
          :key="i"
          closable
          size="mini"
          :class="tag.model === 'status' ? `cu-tag cu-tag-${t.value}` : ''"
          @close="$emit('remove-multi', { tag, value: t.value || t })"
        >
          {{ t.label || t }}
        </el-tag>
      </div>
      <el-tag
        v-else
        closable
        size="mini"
        @close="$emit('remove', tag)"
      >
        <span v-if="tag.label">{{ tag.label }}</span> {{ tag.value }}
      </el-tag>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    isArray(val) {
      return Array.isArray(val)
    }
  }
}
</script>
