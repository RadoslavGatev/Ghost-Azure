declare function numbered (input: string): number;
declare function numbered (input: number): string;

declare namespace numbered {
  /**
   * Transform a number string into a number.
   */
  export function parse (input: string): number;

  /**
   * Transform a number into the string representation.
   */
  export function stringify (input: number): string;
}

export = numbered;
