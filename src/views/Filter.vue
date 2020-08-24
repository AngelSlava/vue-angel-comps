<template>
  <div style="margin: -20px;">
    <div class="filter-wrapper">
      <dynamic-filter />
    </div>

    <div class="content">
      <el-row :gutter="10">
        <el-col :lg="12">
          <h3>1. Install required</h3>
            <ul>
              <li>Vue Router</li>
              <li>Fontawesome</li>
              <li>Sass/Node loader</li>
              <li></li>
            </ul>


          <h3>2. Structure</h3>
<pre>dynamic-filter
  |- components
    |- ... .vue
    |- ... .js
  |- layout.js
  |- index.js
icons
  |- index.js
theme
  |- _filter.scss
  |- main.scss
</pre>
        </el-col>
        <el-col :lg="12">
          <h3>Query params</h3>
          <pre>{{ this.$route.query }}</pre>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import DynamicFilter from '@/components/dynamic-filter'
export default {
  components: { DynamicFilter }
}
</script>

<style lang="scss" scoped>
  .content {
    padding: 0 1rem;
  }
  .filter-wrapper {
    box-shadow: 0 2px 4px 0 #efefef;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1000;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  h3{
    margin-top: 2rem;
    margin-bottom: .5rem;
    font-size: 16px;
    font-weight: 500;
  }
  pre {
    background: #333;
    padding: 1rem .5rem;
    color: orange;
  }
</style>
