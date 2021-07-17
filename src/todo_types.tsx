import { TodoStatusComponentMap, TODO_CHANGE_STATUS } from './todo_constants';

export type TodoStatusType = keyof typeof TodoStatusComponentMap;
export type TodoFilterType = TodoStatusType | 'All';
export type TodoAction = typeof TODO_CHANGE_STATUS;

export interface IStatusFilter {
  filter: () => void
  label: string
}

export type StatusFilter = Readonly<IStatusFilter>;

export interface IStatusAction {
  action: () => void
  label: string
}

export type StatusAction = Readonly<IStatusAction>;
export type StatusFilters = Record<TodoFilterType, StatusFilter>;

export interface IStatusProps {
  itemCount: number
  filters: Partial<StatusFilters>
  actions: StatusAction[]
  curFilter: TodoFilterType
}

export type StatusProps = Readonly<IStatusProps>;

export interface IItemProperties {
  content: string
  status: TodoStatusType
  hashId: string
  updatedAt: number
}

export type ItemProperties = IItemProperties;

export interface IItemProps {
  id: string
  content: string
  setContent?: (id: string) => (event: React.FocusEvent<HTMLInputElement>) => void
  status: TodoStatusType
  setStatus: (id: string) => () => void
  handleDelete: (id: string) => () => void
}

export type ItemProps = Readonly<IItemProps>;

export interface IInputProps {
  handleSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export type InputProps = Readonly<IInputProps>;

export interface IStorageList {
  list?: ItemProperties[]
}

export type StorageList = IStorageList;