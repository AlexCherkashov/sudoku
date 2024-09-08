<template>
  <div 
    style="
      display: flex;
      margin-bottom: 8px; 
      gap: 8px;">
    <button
      @click="generateSudoku(LEVELS.EASY)">
      Лёгкий
    </button>
    <button
      @click="generateSudoku(LEVELS.NORMAL)">
      Средний
    </button>
    <button
      @click="generateSudoku(LEVELS.HARD)">
      Сложный
    </button>
  </div>
  <table>
    <tbody>
      <tr 
        v-for="(row, index) in tableRef" 
        :key="index">
        <td 
          v-for="(cell, i) in row" 
          :key="i">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue';
import { TABLE_SIZE, CUBE_SIZE } from './constants/table-size';
import LEVELS from './constants/levels';
import { GENERATE_REPEAT, OPERATIONS } from './constants/generate-options';
import { getRandomFromArray } from './helpers/math-helper';
import { hideCells } from './helpers/operations';

const tableRef = ref([]);

function getInitializedTable() {
  const table = [];
  for (let i = 0; i < TABLE_SIZE; i ++) {
    table[i] = [];
    for (let j = 0; j < TABLE_SIZE; j ++) {
      table[i].push((j + (i % CUBE_SIZE) * CUBE_SIZE + Math.trunc(i / CUBE_SIZE)) % TABLE_SIZE + 1);
    }
  }
  return table;
}

function generateSudoku(hiddenCellsCount) {
  let table = getInitializedTable();
  for (let i = 0; i < GENERATE_REPEAT; i++) {
    const operation = getRandomFromArray(Object.values(OPERATIONS));
    table = operation(table);
  }
  tableRef.value = hideCells(table, hiddenCellsCount);
}

</script>
<style>
  #app {
    font-family: "Fira Sans", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    font-family: "Fira Sans", sans-serif;
    background-color: #04AA6D;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  button:hover {
    background-color: #059862;
  }

  table {
    border-collapse: collapse;
    font: Roboto;
  }
  td {
    border: 1px solid #dddddd;
    padding: 4px;
    width: 25px;
    height: 25px;
    text-align: center;
  }
  td:nth-child(3n) {
    border-right: 2px solid black;
  }
  td:first-child {
    border-left: 2px solid black;
  }
  tr:nth-child(3n) {
    border-bottom: 2px solid black;
  }
  tr:first-child {
    border-top: 2px solid black;
  }
</style>