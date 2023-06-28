export enum NotificationType {
  Success = 'success',
  Error = 'error',
}

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
};
