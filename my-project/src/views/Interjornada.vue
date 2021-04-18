<template>
<!--Interjornada.vue-->
<div class="table-container">
    <table class="table is-bordered">
      <tr id="head-list" class="has-text-centered">
        <td></td>
        <td></td>
        <td></td>
        <td>Sabádo</td>

        <td>Sabádo</td>

        <td>Sabádo</td>

        <td>Sabádo</td>

        <td v-if="condFivDom">Sabádo</td>

      </tr>
      <tr id="head-list" class="has-text-centered">
        <td class="mat-ret">Matricula</td>
        <td>Colaborador</td>
        <td class="mat-ret">Retorno</td>
        <td><sabado add-weeks="0"></sabado></td>

        <td><sabado add-weeks="1"></sabado></td>

        <td><sabado add-weeks="2"></sabado></td>

        <td><sabado add-weeks="3"></sabado></td>

        <td v-if="condFivDom"><sabado add-weeks="4"></sabado></td>

      </tr>
      <tr
        v-for="colab in banco"
        :class="{ 'is-selected': colab.edit }"
        :key="colab.id"
      >

        <td>{{ colab.mat }}</td>
        <td>{{ colab.nome }}</td>
        <td>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d0_hora"
            @input="update_d0_hora(colab['.key'], 0)"
            v-if="colab.edit"
            :get-value="colab.domingos[0].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[0].hora }}</span>
        </td>
        
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d1_hora"
            @input="update_d1_hora(colab['.key'], 1)"
            v-if="colab.edit"
            :get-value="colab.domingos[1].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[1].hora }}</span>
        </td>
        
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d2_hora"
            @input="update_d2_hora(colab['.key'], 2)"
            v-if="colab.edit"
            :get-value="colab.domingos[2].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[2].hora }}</span>
        </td>
       
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d3_hora"
            @input="update_d3_hora(colab['.key'], 3)"
            v-if="colab.edit"
            :get-value="colab.domingos[3].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[3].hora }}</span>
        </td>
        
        <td class="has-text-centered hora" v-if="condFivDom">
          <time-entrance
            v-model="d4_hora"
            @input="update_d4_hora(colab['.key'], 4)"
            v-if="colab.edit"
            :get-value="colab.domingos[4].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[4].hora }}</span>
        </td>
        
      </tr>
     
    </table>
  </div>
</template>
<script>
import { db } from "../db";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import folga from "../components/folga.vue";
import sabado from "../components/sabado.vue";
import timeEntrance from "../components/timeEntrance.vue";
const setores = db.ref("interjornada");
export default {
  name: "Interjornada",
  props: ["getDate", "disabled"],
  data: function() {
    return {
      banco: [],
      nome: "",
      mat: "",
      edit: false,
      updat: "",
      rem: false,
      d0_hora: "",
      d0_folga: "",
      d1_hora: "",
      d1_folga: "",
      d2_hora: "",
      d2_folga: "",
      d3_hora: "",
      d3_folga: "",
      d4_hora: "",
      d4_folga: "",
      config: {
        dateFormat: "D,d/m",
        locale: Portuguese
      }
    };
  },
  methods: {
    addColab() {
      this.modalActive = false;
      return db
        .ref("escalas/" + this.id)
        .push({
          mat: this.mat,
          nome: this.nome,
          edit: false,
          domingos: [
            { dia: this.d0_folga, hora: this.d0_hora },
            { dia: this.d1_folga, hora: this.d1_hora },
            { dia: this.d2_folga, hora: this.d2_hora },
            { dia: this.d3_folga, hora: this.d3_hora },
            { dia: this.d4_folga, hora: this.d4_hora }
          ]
        })
        .then(this.clearAdd());
    },
    remColab(idColab) {
      this.$firebaseRefs.banco.child(idColab).remove();
    },
    editColab(idcol, coladKey){
        //var check = this.$rtdbBind('edit', setores.child(this.$props.id + idcol + '/edit'))
        if (idcol == true){
         this.$firebaseRefs.banco.child(coladKey).update({'edit': false})
        }else{
        this.$firebaseRefs.banco.child(coladKey).update({'edit': true})
        }
        return console.log('changed')
    },
    // funçoes de update hora
    update_d0_hora(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ hora: this.d0_hora });
    },
    update_d1_hora(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ hora: this.d1_hora });
    },
    update_d2_hora(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ hora: this.d2_hora });
    },
    update_d3_hora(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ hora: this.d3_hora });
    },
    update_d4_hora(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ hora: this.d4_hora });
    },
    // fim função e update
    // funçoes de update dia
    update_d0_dia(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ dia: this.d0_folga });
    },
    update_d1_dia(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ dia: this.d1_folga });
    },
    update_d2_dia(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ dia: this.d2_folga });
    },
    update_d3_dia(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ dia: this.d3_folga });
    },
    update_d4_dia(k, i) {
      var url = k + "/domingos/" + i;
      this.$firebaseRefs.banco.child(url).update({ dia: this.d4_folga });
    },
    clearAdd() {
      this.mat = "";
      this.nome = "";
      this.d0_folga = "";
      this.d0_hora = "";
      this.d1_folga = "";
      this.d1_hora = "";
      this.d2_folga = "";
      this.d2_hora = "";
      this.d3_folga = "";
      this.d3_hora = "";
      this.d4_folga = "";
      this.d4_hora = "";
      return console.log("Dados Apagados");
    }
  },
  computed: {
      id(){
          //const i = this.$route.query.setor + '/' + this.$route.query.mes
          return this.$parent.grota
      },
    condFivDom: function() {
      return (
        moment(this.validateDate)
          .add(3, "w")
          .month() ==
        moment(this.validateDate)
          .add(4, "w")
          .month()
      );
    },
    validateDate: function() {
      var initDate = moment(this.$parent.monthpick, "MMMM YYYY")
        .startOf("month")
        .toDate();
      if (moment(initDate).weekday() == 0) {
        return moment(initDate).toObject();
      } else {
        return moment(initDate)
          .startOf("week")
          .add(1, "week")
          .toObject();
      }
    }
  },
  components: {
    folga,
    sabado,
    timeEntrance,
  },
  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$rtdbBind("banco", setores.child(id));
      }
    }
  }
};
</script>
<style>
.hora {
  padding-left: 0px !important;
  padding-right: 0px !important;
  
}
.dia {
  padding-left: 6px !important;
  padding-right: 6px !important;
  width: 70px;
}
.list > td {
  padding: 5px !important;
}
#head-list > td {
  text-align: center;
}
.mat-ret {
  padding-left: 4px !important;
  padding-right: 4px !important;
}
</style>
