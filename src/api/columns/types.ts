export type Column = {
  id: number;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  summary: string;
  content: string;
  bgGradient: string;
  isNew: boolean;
  sortOrder: number;
};

export type ColumnInput = Omit<Column, 'id'>;

export interface ColumnsAPI {
  getAll: () => Promise<Column[]>;
  create: (input: ColumnInput) => Promise<Column>;
  update: (id: number, input: Partial<ColumnInput>) => Promise<Column>;
  remove: (id: number) => Promise<void>;
  seed: () => Promise<void>;
}
