class UserNotFoundException extends Error {
  message: string;

  constructor(value: string) {
    super(value);

    this.message = value;
  }
}
