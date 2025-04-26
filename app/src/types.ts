export interface Guess {
  name: string;
  guessedTimeInMs: number;
}

export interface QuestionType {
  id: number;
  text: string;
  type: string;
}

export interface ResponseType {
  [key: number]: string | number;
}
