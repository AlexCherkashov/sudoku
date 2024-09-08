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
        v-for="(row, rowIndex) in tableRef" 
        :key="rowIndex"
        :class="{ backlight: rowIndex === selectedCell.x }">
        <td 
          v-for="(cell, cellIndex) in row" 
          :key="cellIndex"
          :class="{ backlight: cellIndex === selectedCell.y, 'backlight-number': cell == selectedCell.value }"
          @click="cellClick(rowIndex, cellIndex, cell)">
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
const selectedCell = ref({});

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

function cellClick(x, y, value) {
  selectedCell.value = {x, y, value};
}

</script>
<style>
  #app {
    font-family: "Fira Sans", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .backlight {
    background-color: #04aa6d3b;
  }
  .backlight-number {
    font-weight: 600;
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
  }
  td {
    border: 1px solid #999999;
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