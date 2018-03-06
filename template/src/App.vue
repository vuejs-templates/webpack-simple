<template>
  <div id="app">
    <lt-layout class="ltdemo-wrap" :width="layoutWidth">
      <lt-header class="ltdemo-header" height="60px">
        <div class="header-nav">
          <span>Lantern</span>
        </div>
      </lt-header>
      <lt-main class="ltdemo-main" height="100%">
        <div class="main-wrap">
          <lt-layout class="main-wrap-layout" :isRow="mainLayoutIsRow">
            <lt-aside width="300px">
              <lt-menu>
                <lt-menu-item :href="'/'">index</lt-menu-item>
                <lt-menu-item :href="'/test'">测试</lt-menu-item>
              </lt-menu>
            </lt-aside>
            <lt-main height="100%">
              <router-view></router-view>
            </lt-main>
          </lt-layout>
        </div>
      </lt-main>
    </lt-layout>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      layoutWidth: '100%',
      mainLayoutIsRow: true
    }
  }
}
</script>
<style>
</style>


