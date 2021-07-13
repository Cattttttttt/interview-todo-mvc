import { TodoStatusComponentMap, TODO_CHANGE_STATUS } from './mvc_constants';

export type TodoStatusType = keyof typeof TodoStatusComponentMap;
export type TodoAction = typeof TODO_CHANGE_STATUS;

export interface IStatusFilter {
  filter: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
};

export type StatusFilter = Readonly<IStatusFilter>;

export interface IStatusAction {
  action: (event: React.MouseEvent<HTMLButtonElement>) => void
  label: string
};

export type StatusAction = Readonly<IStatusAction>;

export interface IStatusProps {
  itemCount: number
  filters: Record<TodoStatusType, StatusFilter> & { All: IStatusFilter }
  actions: StatusAction[]
};

export type StatusProps = Readonly<IStatusProps>;

export interface IItemProperties {
  content: string
  status: TodoStatusType
  id: number
};

export type ItemProperties = IItemProperties;

export interface IItemProps {
  id: number
  content: string
  setContent?: (id: number) => (event: React.FocusEvent<HTMLInputElement>) => void
  status: TodoStatusType
  setStatus: (id: number) => () => void
  handleDelete: (id: number) => () => void
}

export type ItemProps = Readonly<IItemProps>;

export interface IInputProps {
  handleSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void
};

export type InputProps = Readonly<IInputProps>;

export interface IStorageList {
  list?: ItemProperties[]
};

export type StorageList = IStorageList;