<!--Home.vue-->
<template>
  <div class="table-container">
    <table class="table is-bordered">
      <tr id="head-list" class="has-text-centered">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Domingo</td>
        <td></td>
        <td>Domingo</td>
        <td></td>
        <td>Domingo</td>
        <td></td>
        <td>Domingo</td>
        <td></td>
        <td v-if="condFivDom">Domingo</td>
        <td v-if="condFivDom"></td>
      </tr>
      <tr id="head-list" class="has-text-centered">
        <td>
          <input type="checkbox" v-model="edit" />
        </td>
        <td class="mat-ret">Matricula</td>
        <td>Colaborador</td>
        <td class="mat-ret">Retorno</td>
        <td><domingo add-weeks="0" ref="d0"></domingo></td>
        <td>folga</td>
        <td><domingo add-weeks="1" ref="d1"></domingo></td>
        <td>folga</td>
        <td><domingo add-weeks="2" ref="d2"></domingo></td>
        <td>folga</td>
        <td><domingo add-weeks="3" ref="d3"></domingo></td>
        <td>folga</td>
        <td v-show="condFivDom"><domingo add-weeks="4" ref="d4"></domingo></td>
        <td v-if="condFivDom">folga</td>
      </tr>
      <tr v-for="colab in banco" :class="{ 'is-selected': colab.edit }">
        <td class="p-0">
            <a
              class="button is-rounded is-success is-small"
              @click="editColab(colab.edit, colab['.key'])"
              v-show="edit"
              ><i class="material-icons">edit</i></a
            >
        </td>
        <td>{{ colab.mat }}</td>
        <td>{{ colab.nome }}</td>
        <td></td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d0_hora"
            @input="updateHora0(colab['.key'], $refs.d0.W)"
            v-if="colab.edit"

            :get-value="colab.domingos[$refs.d0.W].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[$refs.d0.W].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d0_folga"
            @input="updateDia0(colab['.key'], $refs.d0.W)"
            v-if="colab.edit"
            :get-value="colab.domingos[$refs.d0.W].dia"
          ></folga><!--seletor de Array modificado-->
          <span v-else>{{ colab.domingos[$refs.d0.W].dia }}</span>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d1_hora"
            @input="updateHora1(colab['.key'], $refs.d1.W)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[$refs.d1.W].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[$refs.d1.W].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d1_folga"
            @input="updateDia1(colab['.key'], $refs.d1.W)"
            v-if="colab.edit"
            :get-value="colab.domingos[$refs.d1.W].dia"
          ></folga>
          <span v-else>{{ colab.domingos[$refs.d1.W].dia }}</span>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d2_hora"
            @input="updateHora2(colab['.key'], $refs.d2.W)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[$refs.d2.W].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[$refs.d2.W].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d2_folga"
            @input="updateDia2(colab['.key'], $refs.d2.W)"
            v-if="colab.edit"
            :get-value="colab.domingos[$refs.d2.W].dia"
          ></folga>
          <span v-else>{{ colab.domingos[$refs.d2.W].dia }}</span>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d3_hora"
            @input="updateHora3(colab['.key'], $refs.d3.W)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[$refs.d3.W].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[$refs.d3.W].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d3_folga"
            @input="updateDia3(colab['.key'], $refs.d3.W)"
            v-if="colab.edit"
            :get-value="colab.domingos[$refs.d3.W].dia"
          ></folga>
          <span v-else>{{ colab.domingos[$refs.d3.W].dia }}</span>
        </td>
        <td class="has-text-centered hora" v-if="condFivDom">
          <time-entrance
            v-model="d4_hora"
            @input="updateHora4(colab['.key'], $refs.d4.W)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[$refs.d4.W].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[$refs.d4.W].hora }}</span>
        </td>
        <td v-if="condFivDom" class="dia has-text-centered">
          <folga
            v-model="d4_folga"
            @input="updateDia4(colab['.key'], $refs.d4.W)"
            v-if="colab.edit"
            :get-value="colab.domingos[$refs.d4.W].dia"
          ></folga>
          <span v-else>{{ colab.domingos[$refs.d4.W].dia }}</span>
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
import domingo from "../components/domingo.vue";
import timeEntrance from "../components/timeEntrance.vue";
const setores = db.ref("setores");
export default {
  name: "Mensal",
  //  props: ["id", "getDate", "setor"],
  data: function() {
    return {
      banco: [],
      nome: "",
      mat: "",
      edit: false,
      idy: "",
      updat: "",
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
    remColab(idColab) {
      this.$firebaseRefs.banco.child(idColab).remove();
    },
    editColab(idcol, coladKey) {
      //var check = this.$rtdbBind('edit', setores.child(this.$props.id + idcol + '/edit'))
      if (idcol == true) {
        this.$firebaseRefs.banco.child(coladKey).update({ edit: false });
      } else {
        this.$firebaseRefs.banco.child(coladKey).update({ edit: true });
      }
      return console.log("changed");
    },
    // funçoes de update hora
    updateHora0(k, i) {
      var obj = {hora: this.d0_hora}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateHora1(k, i) {
      var obj = {hora: this.d1_hora}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateHora2(k, i) {
      var obj = {hora: this.d2_hora}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateHora3(k, i) {
      var obj = {hora: this.d3_hora}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateHora4(k, i) {
      var obj = {hora: this.d4_hora}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateDia0(k, i) {
      var obj = {dia: this.d0_folga}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateDia1(k, i) {
      var obj = {dia: this.d1_folga}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateDia2(k, i) {
      var obj = {dia: this.d2_folga}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateDia3(k, i) {
      var obj = {dia: this.d3_folga}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateDia4(k, i) {
      var obj = {dia: this.d4_folga}
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
  },
  computed: {
    id() {
        var url = this.$route.params.setor + '/organico'
      return url.toLowerCase();
    },
   setor() {
      return this.$route.params.setor;
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
    domingo,
    timeEntrance
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
