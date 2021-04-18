<!-- timeEntrance -->
<template>
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
</template>
<script>
import { db } from "../db.js";
const li = db.ref('horarios')
export default {
  name: "time-entrance",
  props: ["value", "getValue", "setor"],
  data: function() {
    return {
      ipt: this.getValue,
      list: null
    };
  },
  watch:{
  setor: {
      immediate: true,
      handler(setor) {
          this.$rtdbBind("list", li.child(setor))
      }
  },
  }
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
