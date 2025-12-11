export interface UserCreatedEvent {
  event: "USER_CREATED";
  userId: string;
  name: string;
  age?: number;
}
