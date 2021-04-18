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
        <td><domingo add-weeks="0" ref="do"></domingo></td>
        <td>folga</td>
        <td><domingo add-weeks="1" ref="d2"></domingo></td>
        <td>folga</td>
        <td><domingo add-weeks="2" ref="d3"></domingo></td>
        <td>folga</td>
        <td><domingo add-weeks="3" ref="d4"></domingo></td>
        <td>folga</td>
        <td v-show="condFivDom"><domingo add-weeks="4" ref="d5"></domingo></td>
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
            @input="updateHora(colab['.key'], 0)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[$refs.do.W].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[$refs.do.W].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d0_folga"
            @input="updateDia(colab['.key'], 0)"
            v-if="colab.edit"
            :get-value="colab.domingos[$refs.do.W].dia"
          ></folga><!--seletor de Array modificado-->
          <span v-else>{{ colab.domingos[$refs.do.W].dia | moment("ddd, DD/MMM") }}</span>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d1_hora"
            @input="updateHora(colab['.key'], 1)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[1].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[1].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d1_folga"
            @input="updateDia(colab['.key'], 1)"
            v-if="colab.edit"
            :get-value="colab.domingos[1].dia"
          ></folga>
          <span v-else>{{ colab.domingos[1].dia }}</span>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d2_hora"
            @input="updateHora(colab['.key'], 2)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[2].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[2].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d2_folga"
            @input="updateDia(colab['.key'], 2)"
            v-if="colab.edit"
            :get-value="colab.domingos[2].dia"
          ></folga>
          <span v-else>{{ colab.domingos[2].dia }}</span>
        </td>
        <td class="has-text-centered hora">
          <time-entrance
            v-model="d3_hora"
            @input="updateHora(colab['.key'], 3)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[3].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[3].hora }}</span>
        </td>
        <td class="dia has-text-centered">
          <folga
            v-model="d3_folga"
            @input="updateDia(colab['.key'], 3)"
            v-if="colab.edit"
            :get-value="colab.domingos[3].dia"
          ></folga>
          <span v-else>{{ colab.domingos[3].dia }}</span>
        </td>
        <td class="has-text-centered hora" v-if="condFivDom">
          <time-entrance
            v-model="d4_hora"
            @input="updateHora(colab['.key'], 4)"
            v-if="colab.edit"
            :setor="setor"
            :get-value="colab.domingos[4].hora"
          ></time-entrance>
          <span v-else>{{ colab.domingos[4].hora }}</span>
        </td>
        <td v-if="condFivDom" class="dia has-text-centered">
          <folga
            v-model="d4_folga"
            @input="updateDia(colab['.key'], 4)"
            v-if="colab.edit"
            :get-value="colab.domingos[4].dia"
          ></folga>
          <span v-else>{{ colab.domingos[4].dia }}</span>
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
    updateHora(k, i) {
      var vm = this;
      var obj;
      switch (i) {
        case 0:
          obj = { hora: vm.d0_hora };
          break;
        case 1:
          obj = { hora: vm.d1_hora };
          break;
        case 2:
          obj = { hora: vm.d2_hora };
          break;
        case 3:
          obj = { hora: vm.d3_hora };
          break;
        case 4:
          obj = { hora: vm.d4_hora };
      }
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    },
    updateDia(k, i) {
      var vm = this;
      var obj;
      switch (i) {
        case 0:
          obj = { dia: vm.d0_folga };
          break;
        case 1:
          obj = { dia: vm.d1_folga };
          break;
        case 2:
          obj = { dia: vm.d2_folga };
          break;
        case 3:
          obj = { dia: vm.d3_folga };
          break;
        case 4:
          obj = { dia: vm.d4_folga };
      }
      var url = k + "/domingos/" + i;
      return this.$firebaseRefs.banco.child(url).update(obj);
    }
  },
  computed: {
    id() {
        var url = this.$route.params.setor + '/organico'
      return url.toLowerCase();
    },
    noEmpty(){
    /*
    função usada para carregar o organico inicia, caso o mÊs esteja Vazio,
    */
    if (this.banco.length == 0) {
      return this.idy = "organico/" + this.$route.query.setor;
    } else {
      return this.idy = this.id;
    }
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
