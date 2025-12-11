export interface UserProps {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class User {
  constructor(private props: UserProps) {}

  get id() { return this.props.id; }
  get name() { return this.props.name; }
  get email() { return this.props.email; }
  get createdAt() { return this.props.createdAt; }

  toJSON() {
    return { ...this.props };
  }
}
