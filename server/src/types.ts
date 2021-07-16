export const TodoStatus = ['TODO_STATUS_ACTIVE', 'TODO_STATUS_COMPLETED'];

export type TodoStatusType = 'TODO_STATUS_ACTIVE' | 'TODO_STATUS_COMPLETED';
export type TodoFilterType = TodoStatusType | 'All';

export interface IItemProperties {
  content: string
  status: TodoStatusType
  hashId: string
  updatedAt: number
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