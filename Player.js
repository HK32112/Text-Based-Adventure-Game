import { Character } from './Character.js';

export class Player extends Character {
  constructor(name) {
    super(name);
    this.health = 100;
    this.strength = 20;
  }
}



