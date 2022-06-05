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
          <tr v-for="(correlation,index) in object.correlations" :key="correlation">  
            <td><div :style="`background-color:${correlation.object?.color};padding:5px;margin-top:${index==0?'10':'3'}px;margin-left:3px;height:19px;line-height: 19px;`">{{correlation.correlation}}</div></td>
            <td><div :style="`background-color:${correlation.object?.color};padding:5px;margin-top:${index==0?'10':'3'}px;height:19px;line-height: 19px;`">{{correlation.object?.name}}</div></td>
            <td><div :style="`background-color:${correlation.object?.color};padding:5px;margin-top:${index==0?'10':'3'}px;margin-right:3px;height:19px;line-height: 19px;`">{{ correlation.id }}</div></td>
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
  padding: 0px;
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
