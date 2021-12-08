export interface DigitInterface {
  length: number;
  letters: string[];
}

export interface DigitsData {
  [key: number]: DigitInterface;
}
