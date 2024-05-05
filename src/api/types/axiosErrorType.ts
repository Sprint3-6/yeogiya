export interface ErrorType {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}
