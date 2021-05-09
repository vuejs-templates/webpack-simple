<!-- timeEntrance -->
<template>
<div class="field has-addons">

    <div class="select is-small">
      <select
        v-bind:value="value"
        class="is-focused"
        v-on:input="$emit('input', $event.target.value)"
        v-model="ipt"
      >
        <option v-for="h in list" :value="h.hora">{{ h.hora }}</option>
      </select>
    </div>

  <div class="control">
    <button class="button is-small" @click="rem">[X]</button>
  </div>
</div>

</template>
<script>
import { db } from "../db.js";
const li = db.ref('horarios')
export default {
  name: "time-entrance",
  props: ["value", "getValue", "setor"],
  firebase: {
    list: db.ref('horarios/master')
  },
  data: function() {
    return {
      ipt: this.getValue,
      list: []
    };
  },
  methods: {
    rem(){
      this.ipt = ""
      this.$emit('input', "")
    }
  },
  /*watch:{
  setor: {
      immediate: true,
      handler(setor) {
          this.$rtdbBind("list", li.child(setor))
      }
  },
  }*/
};
</script>
<style>
.select > select {
  padding-right: 6.5px !important;
}
.select:after {
  border: 0px !important;
}
</style>
