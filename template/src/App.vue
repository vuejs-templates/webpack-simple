<template>
  <v-app navbar footer>
    <header>
      <v-navbar>
        <div class="navbar__logo">Welcome</div>
        <v-navbar-items>
          <v-navbar-item
            class="navbar__item--active"
            v-bind:item="item"
          >
          </v-navbar-item>
        </v-navbar-items>
      </v-navbar>
    </header>
      <main>
        <h1>Vuetify</h1>
        <h2>Essential Links</h2>
        <div class="intro">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a href="http://vuetifyjs.com">Vuetify Documentation</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a href="http://vuejs.org">VueJS Documentation</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        item: {
          href: '#!',
          text: 'Get Started'
        }
      }
    },

    mounted () {
      this.$vuetify.init()
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>