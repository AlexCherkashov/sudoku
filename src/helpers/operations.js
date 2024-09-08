import { getRandomInt, getRandomFromArray } from './math-helper';
import { TABLE_SIZE, CUBE_SIZE } from '../constants/table-size';

const FIRST_IN_CUBE = 0;
const SECOND_IN_CUBE = 1;
const THIRD_IN_COBE = 2;

export function transposition(table) {
  const newTable = [];
  for (let i = 0; i < TABLE_SIZE; i ++) {
    newTable[i] = [];
    for (let j = 0; j < TABLE_SIZE; j ++) {
      newTable[i][j] = table[j][i];
    }
  }
  return newTable;
}

export function swapRows(table) {
  let firstRowIndex = getRandomInt(0, TABLE_SIZE);
  let secondRowIndex = 0;
  switch (firstRowIndex % CUBE_SIZE) {
    case FIRST_IN_CUBE:
      secondRowIndex = getRandomInt(firstRowIndex + 1, firstRowIndex + 2);
      break;
    case SECOND_IN_CUBE:
      secondRowIndex = getRandomFromArray([firstRowIndex - 1, firstRowIndex + 1]);
      break;
    case THIRD_IN_COBE:
      secondRowIndex = getRandomInt(firstRowIndex - 2, firstRowIndex - 1);
      break;
  }
  const temp = structuredClone(table[firstRowIndex]);
  table[firstRowIndex] = table[secondRowIndex];
  table[secondRowIndex] = temp;
  return table;
}

export function hideCells(table, cellsCount) {
  for (let i = 0; i < cellsCount; i++) {
    const x = getRandomInt(0, TABLE_SIZE);
    const y = getRandomInt(0, TABLE_SIZE);
    if (table[x][y]) {
      table[x][y] = null;
    } else {
      i--;
    }
  }
  return table;
}