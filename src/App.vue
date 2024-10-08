<template>
  <div 
    style="
      display: flex;
      margin-bottom: 8px; 
      gap: 8px;">
    <button
      @click="generateSudoku(CELLS_TO_HIDE.EASY)">
      Лёгкий
    </button>
    <button
      @click="generateSudoku(CELLS_TO_HIDE.NORMAL)">
      Средний
    </button>
    <button
      @click="generateSudoku(CELLS_TO_HIDE.HARD)">
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
          :class="{ 
            backlight: cellIndex === selectedCell.y, 
            'backlight-number': cell.value && cell.value == selectedCell.value,
            'error-cell': cell.value && answer[rowIndex][cellIndex] !== cell.value,
          }"
          @click="cellClick(rowIndex, cellIndex, cell)">
          {{ cell.value }}
        </td>
      </tr>
    </tbody>
  </table>
  <input 
    ref="inputCell" 
    type="text" 
    style="position: absolute; top: -50px" 
    @keyup="inputValue"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { TABLE_SIZE, CUBE_SIZE } from './constants/table-size';
import CELLS_TO_HIDE from './constants/cells-to-hide';
import { GENERATE_REPEAT, OPERATIONS } from './constants/generate-options';
import { getRandomFromArray } from './helpers/math-helper';
import { hideCells } from './helpers/operations';

const tableRef = ref([]);
const selectedCell = ref({});
const inputCell = ref();
let answer = [];

const initializedTable = computed(() => {
  const table = [];
  for (let i = 0; i < TABLE_SIZE; i ++) {
    table[i] = [];
    for (let j = 0; j < TABLE_SIZE; j ++) {
      table[i].push((j + (i % CUBE_SIZE) * CUBE_SIZE + Math.trunc(i / CUBE_SIZE)) % TABLE_SIZE + 1);
    }
  }
  return table;
})

function generateSudoku(hiddenCellsCount) {
  selectedCell.value = {};

  let table = initializedTable.value;
  const operations = Object.values(OPERATIONS);
  for (let i = 0; i < GENERATE_REPEAT; i++) {
    const operation = getRandomFromArray(operations);
    table = operation(table);
  }
  
  answer = structuredClone(table);
  tableRef.value = hideCells(table, hiddenCellsCount);
}

function cellClick(x, y, cell) {
  selectedCell.value = { x, y, value: cell.value };
  if (cell.isEntered) {
    inputCell.value.focus();
  }
}

function inputValue(event) {
  const inputNumber = +event.key;
  const {x, y} = selectedCell.value;
  if (inputNumber && inputNumber > 0 && inputNumber <= TABLE_SIZE) {
    tableRef.value[x][y].value = inputNumber;
    selectedCell.value.value = inputNumber;
  } else if (event.code === 'Backspace'){
    tableRef.value[x][y].value = null;
  }
}

</script>
<style>
  #app {
    font-family: "Fira Sans", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cell-input {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    background-color: #00000000;
  }

  .backlight {
    background-color: #04aa6d3b;
  }
  .backlight-number {
    font-weight: 600;
    background-color: #04aa6d6e;
  }
  
  .error-cell {
    background-color: #ff000052;
    color: red;
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
    font-size: 20px;
    border: 1px solid #999999;
    width: 40px;
    height: 40px;
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