<template>
  <filter-layout :drawer="drawer" @drawer="changeDrawer">
    <template slot="icons">
      <icons-comp :loading="loading" :is-query="isQuery" @click="drawer = !drawer" />
    </template>
    <template slot="search-input">
      <search-group v-if="slotSearch" :fields="slotSearch" :filter="filterModel" @change="handleChange" @drawer="changeDrawer" />
    </template>
    <template slot="panel-left">
      <menu-comp v-if="slotMenu" :menu="slotMenu" :active="activeSlotMenu" @change="handleChange" />
    </template>
    <template slot="panel-center">
      <fields-comp v-if="slotCenter" :fields="slotCenter" :filter="filterModel" @change="handleChange" />
    </template>
    <template slot="panel-right">
      <filter-tags :tags="filterTags" @remove="handleRemoveTag" @remove-multi="handleRemoveMultiTag" />
    </template>
    <template slot="panel-footer">
      <el-link type="info" class="link-mini mr-1" :underline="false" @click="clearFilter">Clear</el-link>
      <el-button :loading="loading" size="mini" type="primary" @click="handleSubmitForm">Submit</el-button>
    </template>
    <template slot="panel-controls">
      <el-button v-if="filterModel.search && drawer" size="mini" type="text" @click="handleAddSearchParam">Add</el-button>
      <el-button v-if="!drawer && isQuery" size="mini" type="text" @click="clearFilter(true)">Reset</el-button>
    </template>

  </filter-layout>
</template>

<script>
  import FilterLayout from './filter-layout'
  import FilterTags from './components/filter-tags'
  import IconsComp from './components/icons'
  import MenuComp from './components/menu'
  import FieldsComp from './components/fields'
  import {
    parseTime,
    uniqueArray,
    // compareObjects
  } from '@/utils/'
  import SearchGroup from './components/search-group'
  import demoSettings from './components/demo-settings'
  export default {
    components: {
      FilterLayout,
      IconsComp,
      MenuComp,
      FieldsComp,
      SearchGroup,
      FilterTags
    },
    data: () => ({
      loading: false,
      drawer: false,
      settings: [],
      isSubmitted: true,
      filterModel: {}
    }),
    computed: {
      slotMenu() {
        return this.settings.find(s => s.slot === 'menu')
      },
      activeSlotMenu() {
        const { model, default: active } = this.slotMenu
        return this.filterModel[model] || active
      },
      slotCenter() {
        return this.settings.filter(s => s.slot === 'center') || []
      },
      slotSearch() {
        return this.settings.filter(s => s.slot === 'search')
      },
      searchModel() {
        const filter = { ...this.filterModel }
        const settings = this.settings
        const search = {}
        Object.keys(filter).map(model => {
          const value = filter[model]
          const field = settings.find(s => s.model === model)
          if (field && !field.hidden && field.default !== value && value.length) {
            search[model] = value
          }
        })
        return search
      },
      isQuery() {
        return  !!Object.keys(this.$route.query).length
      },
      defaultParams() {
        const q = {}
        this.settings.map(s => {
          if ('default' in s) {
            const { model } = s
            q[model] = s.default
          }
        })
        return q
      },
      filterTags() {
        return Object.keys(this.searchModel).map(model => {
          const field = this.settings.find(f => f.model === model)
          let value = this.filterModel[model]

          if (field.type === 'select' && field.options.length) {
            if ('multiple' in field) {
              const values = field.options.filter(o => !!~value.indexOf(o.value))
              if (values.length) value = values
            } else {
              const { label } = field.options.find(o => o.value === value)
              value = label
            }
          }

          const tag = {
            model,
            label: field.tag || false,
            value
          }
          if (field.default) tag.default = field.default
          return tag
        })
      }
    },
    watch: {
      $route(to, from) {
        this.drawer = false
        to.path === from.path ? this.setQueryParams() : this.initFilter()
      }
    },
    beforeMount() {
      this.initFilter()
    },
    methods: {
      async initFilter() {
        this.loading = true
        await this.fetchSettings()
        this.setQueryParams()
        this.loading = false
      },
      async fetchSettings() {
        // const name = this.$route.name.toLowerCase()
        this.settings = await new Promise(resolve => {
          setTimeout(() => resolve(demoSettings), 1000)
        })
      },
      setDefaultParams() {
        this.filterModel = { ...this.defaultParams }
      },
      clearFilter(submit = false) {
        this.filterModel = {}
        this.setDefaultParams()
        if (submit) this.handleSubmitForm()
      },
      setQueryParams() {
        this.clearFilter()
        const q = this.mapQuery(this.$route.query)
        this.filterModel = { ...this.filterModel, ...q }
      },
      handleChange({ model, value, submit }) {
        this.filterModel[model] = value
        if (model === 'range') this.updateDates(value)
        this.handleAddSearchParam()
        this.cloneFilter()
        if (submit) this.handleSubmitForm()
      },
      handleRemoveMultiTag({ tag, value }) {
        const { model } = tag
        this.filterModel[model] = this.filterModel[model].filter(v => v !== value)
      },
      cloneFilter() {
        this.filterModel = { ...this.filterModel }
      },
      updateDates(val) {
        const end = new Date()
        const start = new Date()
        let startDate, endDate
        switch (val) {
          case 'custom':
            startDate = parseTime(start.setHours(0, 0, 0, 0))
            endDate = parseTime(start.setHours(23, 59, 59, 0))
            break
          case 'yesterday':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            startDate = parseTime(start.setHours(0, 0, 0, 0))
            endDate = parseTime(start.setHours(23, 59, 59, 0))
            break
          case 'today':
            startDate = parseTime(start.setHours(0, 0, 0, 0))
            endDate = parseTime(end.setHours(23, 59, 59, 0))
            break
          case 'lastWeek':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            startDate = parseTime(start.setHours(0, 0, 0, 0))
            endDate = parseTime(end.setHours(23, 59, 59, 0))
            break
          case 'lastMonth':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            startDate = parseTime(start.setHours(0, 0, 0, 0))
            endDate = parseTime(end.setHours(23, 59, 59, 0))
            break
          default:
            startDate = ''
            endDate = ''
        }
        this.filterModel.startDate = startDate
        this.filterModel.endDate = endDate
      },
      handleSubmitForm() {
        const query = this.remapQuery(this.searchModel)
        const oldQuery = { ...this.$route.query }
        this.isSubmitted = (JSON.stringify(oldQuery)) === JSON.stringify(query)
        if (!this.isSubmitted) {
          this.$router.push({ query })
          this.isSubmitted = true
        }
        this.drawer = false
      },
      changeDrawer(drawer) {
        this.drawer = drawer
      },
      mapQuery(query) {
        const q = {}
        Object.keys(query).map(model => {
          const field = this.settings.find(s => s.model === model)
          if (field && field.multiple) {
            if (query[model].length) {
              q[model] = uniqueArray(query[model].split(',').filter(v => v.length).map(v => v.trim()))
            }
          } else {
            q[model] = query[model]
          }
        })
        return q
      },
      remapQuery(query) {
        const q = {}
        Object.keys(query).map(name => {
          const value = query[name]
          Array.isArray(value) ? q[name] = value.join(',') : q[name] = value
        })
        return q
      },
      handleAddSearchParam() {
        const { searchBy: param, search: values } = this.filterModel
        if (values && values.trim().length) {
          const value = values.split(',').filter(v => v.length).map(v => v.trim())
          const candidate = this.filterModel[param]

          if (candidate) {
            this.filterModel[param] = uniqueArray([...candidate, ...value])
          } else {
            this.filterModel[param] = value
          }
          this.filterModel.search = ''
          this.cloneFilter()
        }
      },
      handleRemoveTag(tag) {
        const { model } = tag
        this.filterModel[model] = tag.default || ''

        if (model === 'range') {
          this.updateDates('')
        }
      }
    }
  }
</script>
