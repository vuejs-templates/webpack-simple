<!--folga.vue-->
<template>
  <div>
     <input
      type="date"
      :min="min"
      :max="max"
      :value="value"
      class="input is-size-7"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
import moment from 'moment'
// import flatpickr from "flatpickr";
// import { Portuguese } from "flatpickr/dist/l10n/pt.js";
export default {
  name: "folga",
  props: ["value", "getValue"],
  data(){
   return {
     nome: this.getValue,
     min:"",
     max:""
     }
  },
  created() {
    if (this.getValue !== 0){
      this.min = moment(this.getValue,'YYYY-MM-DD').subtract(1,'days').format('YYYY-MM-DD')
      this.max = moment(this.getValue,'YYYY-MM-DD').add(3,'days').format('YYYY-MM-DD')
      }
  },
    updated(){
    if (this.getValue !== 0){
      this.min = moment(this.getValue,'YYYY-MM-DD').subtract(1,'days').format('YYYY-MM-DD')
      this.max = moment(this.getValue,'YYYY-MM-DD').add(3,'days').format('YYYY-MM-DD')
      console.log("updated")
    }
  },
  /*mounted() {
    flatpickr(document.getElementsByClassName("flatpickr"), {
         wrap: true,
      dateFormat: "D,d/m",

      locale: Portuguese
    });
  },
  computed: {
    maxDate: moment(this.getValue).format('L')
  },*/
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
