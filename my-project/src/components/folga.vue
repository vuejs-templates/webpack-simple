<!--folga.vue-->
<template>
  <div class="flatpickr">
    <input
      type="text"
      v-bind:value="value"
      :placeholder="getValue"
      class="input is-size-7"
      @input="$emit('input', $event.target.value)"
      data-input
    />
  </div>
</template>
<script>
import moment from 'moment'
import flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
export default {
  name: "folga",
  props: ["value", "getValue"],
  mounted() {
    flatpickr(document.getElementsByClassName("flatpickr"), {
         wrap: true,
      dateFormat: "D,d/m",

      locale: Portuguese
    });
  },
  computed: {
    maxDate: moment(this.getValue).format('L')
  },
};
</script>
<style>
.input::placeholder {
  color: black !important;
}
.input {
  min-width: 75px !important;
}
</style>
