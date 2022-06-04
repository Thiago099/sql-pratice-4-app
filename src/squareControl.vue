<script setup lang="tsx">
// text prop
import { ref,computed, toRefs,defineProps } from 'vue'
const props = defineProps<{object:any}>()
const { object } = toRefs(props)
</script>

<template>
<div class="card-container"  :style="`background-color:${object.color}`">
  <div class="card" :class="{'named':object.named}" >
    <div class="card-title" >
      {{ object.name }}
      </div>
      <div class="card-body">
        <table class="card-table">
          <tr>
            <th>Correlation</th>
            <th>To</th>
            <th>Id</th>
          </tr>
          <tr v-for="correlation in object.correlations" :key="correlation" :style="`background-color:${correlation.object?.color}`">
            <td>{{correlation.correlation}}</td>
            <td>{{correlation.object?.name}}</td>
            <td>{{ correlation.id }}</td>
          </tr>
        </table>
      </div>

  </div>
  </div>
</template>

<style scoped>
.card-title{
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding: 10px 20px;  
}
.card-table{
  border-collapse: collapse;
  margin: 10px;
  table-layout: fixed;
  width:calc(100% - 20px);
}
.card-table th{
  padding: 5px;
  border-bottom: 1px dashed black;
}
.card-table td{
  padding: 5px;
}
.card-body{
  width: 100%;
}
.card{
  text-align: center;

  display: inline-block;
  border: 1px solid black;
  height: calc(100% - 20px);  
  width: calc(100% - 20px);
  margin:10px;
}
.card-container{
  width: 400px;
}
</style>
