export interface Guess {
  name: string;
  guessedTimeInMs: number;
  diff?: number;
}

export interface WinnerResults {
  correct_answer: number;
  winners: Guess[];
}

export interface QuestionType {
  id: number;
  text: string;
  type: string;
}

export interface ResponseType {
  [key: number]: string | number;
}
