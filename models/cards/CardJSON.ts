export default class CardJSON<T = any> {
    private id: number;
    private quantity: number;
    private game: string;
    private json: T;
  
    constructor(id: number, quantity: number, game: string, json: T) {
      this.id = id;
      this.quantity = quantity;
      this.game = game;
      this.json = json;
    }
  
    getId(): number {
      return this.id;
    }
  
    getQuantity(): number {
      return this.quantity;
    }
  
    getGame(): string {
      return this.game;
    }
  
    // Redundant in case we forget about getGame()
    getType(): string {
      return this.game;
    }
  
    getJSON(): T {
      return this.json;
    }
  }