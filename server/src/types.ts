export interface IItemProperties {
  content: string
  status: string
  hashId: string
}

export type ItemProperties = IItemProperties;

export type TodoModelType = ItemProperties & { hashId: string };

export type AddTodoBody = {
  list: ItemProperties[]
};

export type DeleteTodoBody = {
  list: ItemProperties[]
};

export type UpdateTodoBody = {
  list: ItemProperties[]
};

export type AsyncFilter = <T>(
  values: T[],
  fn: (t: T) => Promise<boolean>,
) => Promise<T[]>;