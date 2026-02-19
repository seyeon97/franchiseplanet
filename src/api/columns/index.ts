export type { Column, ColumnInput, ColumnsAPI } from "./types";
export { getColumns, createColumn, updateColumn, deleteColumn, seedColumns } from "./actions/columns";

import { getColumns, createColumn, updateColumn, deleteColumn, seedColumns } from "./actions/columns";
import type { ColumnsAPI } from "./types";

export const columns: ColumnsAPI = {
  getAll: getColumns,
  create: createColumn,
  update: updateColumn,
  remove: deleteColumn,
  seed: seedColumns,
};
