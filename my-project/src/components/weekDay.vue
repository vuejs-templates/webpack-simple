<template>
  <div>
    <h2>{{weekday}}</h2>
  </div>
</template>
<script>
import moment from 'moment'
moment.locale('pt-br')
export default {
  name:"weekDay",
  data() {
    return {
      weekday: moment().add(-1,'d').format('L')}
  }
}
</script>
