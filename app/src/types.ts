export interface Guess {
  name: string;
  timeA: number;
  timeN: number;
}

export interface QuestionType {
  id: number;
  text: string;
  type: string;
}

export interface ResponseType {
  [key: number]: string | number;
}
