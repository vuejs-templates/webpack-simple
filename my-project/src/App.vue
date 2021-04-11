<template>
  <div id="app">
    <input type="text" v-model="pickMonth" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      pickMonth: null
    }
  }
}
</script>
