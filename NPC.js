import { Character } from './Character.js';

export class NPC extends Character {
    constructor(name, information) {
      super(name);
      this.information = information;
    }
  }