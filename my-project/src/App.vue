<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      Id:"App"
    }
  }
}
</script>

<style lang="sass">
  @import '../node_modules/bulma/bulma.sass'
</style>
