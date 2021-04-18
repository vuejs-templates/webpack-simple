<template>
    <div id="folga">
        
    </div>
</template>
<script>
import Vue from 'vue'
var Folga = Vue.extend({
    template:'<p> {{teste}} </p>',
    props: ['teste']
})
export default {
    name: "folgaw",
    props:['getVal'],
mounted() {
    new Folga({
    propsData:{
        teste: this.getVal
    }
}).$mount('#folga')
}
}
</script>