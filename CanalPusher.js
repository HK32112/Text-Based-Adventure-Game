// CanalPusher.js
export class CanalPusher {
    constructor() {
      this.health = 100;
      this.strength = 20;
    }
  
    attack(Player) {
      const damage = Math.floor(Math.random() * this.strength);
      Player.health -= damage;
      console.log(`Canal Pusher strikes! You lose ${damage} health.`);
    }
  }
  
  export default CanalPusher;
  