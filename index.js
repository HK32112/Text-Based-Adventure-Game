import inquirer from 'inquirer'
import { Player } from './Player.js';
import { NPC } from './NPC.js';
import { CanalPusher } from './CanalPusher.js';


const askForName = async () => {
  console.log(`Welcome to the game. In the heart of Manchester, a series of mysterious deaths along its historic canals gives rise to the legend of the Manchester Canal Pusher.`);
  console.log(`As a private investigator you have been tasked to explore the canals in an attempt to uncover the truth behind the mysterious deaths but be careful though as one crucial mistake could be fatal as the Manchester canal pusher can weaken and destroy you`);
  
  const { playerName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'playerName',
      message: 'What is your name, detective?',
    }
  ]);
  return new Player(playerName);
};


const mainMenu = async (player) => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `What would you like to do, ${player.name}?`,
      choices: ['Investigate the canal', 'Speak to a local', 'Search for Canal Pusher'],
    },
  ]);

  switch (action) {
    case 'Investigate the canal':
      return investigateCanal(player);
    case 'Speak to a local':
      return speakToLocal(player);
    case 'Search for Canal Pusher':
      return encounterCanalPusher(player);
  }
};


const investigateCanal = async (player) => {
  const { foundClue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'foundClue',
      message: 'You search around the canal. Did you find any clues?',
    },
  ]);

  if (foundClue) {
    player.cluesFound++;
    console.log("Clue suggests you go to the deepest part of the canal.");
    return findOldPaper(player);
  } else {
    console.log("No clues found this time.");
  }

  return mainMenu(player);
};

const findOldPaper = async (player) => {
  const { pickUpPaper } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'pickUpPaper',
      message: 'You spot a old piece of paper partly submerged in the water. Do you want to pick it up?',
    },
  ]);

  if (pickUpPaper) {
        console.log("You now have an old piece of paper. Maybe it contains some clues! Open it up.");
        return followOldMap(player);
  } else {
    console.log("You decided to leave the piece of paper.");
  }

  return mainMenu(player);
};

const followOldMap = async (player) => {
  const { goFurther } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'goFurther',
      message: 'It is a map of the canals, with certain areas circled or marked.',
    },
  ]);

  if (goFurther) {
        console.log("You must follow the arrows in the map which point forward for you to go deeper into the canal.");
return mysteriousFootprints (player);
} else {
  console.log("You decided to turn back.");
}

return mainMenu(player);
}

const mysteriousFootprints = async (player) => {
  const { followFootprints } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'followFootprints',
      message: `Near the canal's edges, you see huge wet footprints leading away from the water`,
    },
  ]);

  if (followFootprints) {
        console.log("Follow the footprints to see where they lead. Being that huge, do they belong to a human or something else");
return flyingFoot (player);
  } else {
    console.log("You decided to turn back.");
  }

  return mainMenu(player);
}
const flyingFoot = async (player) => {
  const { footHitsYou } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'footHitsYou',
      message: `A flying foot emerges out of the footprints`,
    },
  ]);

  if (footHitsYou) { // Corrected the variable name here
    console.log("The foot emerges from an area marked on the old map, it rapidly flies towards you but you catch it.");
    return bloodiedFoot(player);
  } else {
    console.log("You decided to turn back.");
  }

  return mainMenu(player);
}

  const bloodiedFoot = async (player) => {
    const { footClue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'footClue',
        message: 'You catch the foot and see it is dripping with blood.',
      },
    ]);
   if (footClue) {
      console.log("It feels warm and has words carved into it- look up");
      return shadowyFigure (player);              
    } else {
      console.log("No clues found this time.");
      return mainMenu(player);
    }  
  };

  const shadowyFigure = async (player) => {
    const {figureAtTop} = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'figureAtTop',
        message: 'You see a shadowy figure at the top of the canal,' // Corrected the quotation here
      }
    ]);
  
    if (figureAtTop) {
          console.log("You find a ladder- do you want to climb it?");
          return runningAway (player);
    } else {
      console.log("You decide to not climb.");
    }
  
    return mainMenu(player);
  };


const runningAway = async (player) => {
    const {chase} = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'chase',
        message: 'You see the canal pusher running away,' 
      }
    ]);
    if (chase) {
      console.log("He sprays you with pepper spray and escapes");
      return confrontVillain (player)
} else {
  console.log("You lost the game.");
}

return mainMenu(player);
};



  const confrontVillain = async (player) => {
      const {seeVillain} = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'seeVillain',
          message: `Pursue canal pusher.` 
        }
      ]);
    
      if (seeVillain) {
            console.log("You trap the canal pusher with a net. Well done you have caught the canal pusher.");
      } else {
        console.log("You decide to not confront him.");
      }
    
      return mainMenu(player);
    };
  
  
  
  
  const speakToLocal = async (player) => {
  const npc = new NPC("Dave", "I've heard strange stories about this canal.");

  const { talk } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'talk',
      message: `You approach ${npc.name}. Do you want to ask about the canal pusher?`,
    },
  ]);

  if (talk) {
    console.log(`${npc.name} says, "${npc.information} He has been seen around these parts"`);
    return inquireMoreAboutMyth(player, npc);  // Invoking the new function 
  } else {
    console.log(`${npc.name} nods and walks away.`);
  }

  return mainMenu(player);
};

const inquireMoreAboutMyth = async (player, npc) => {
  const { askMore } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'askMore',
      message: `Do you want to ask ${npc.name} more about the myth?`,
    },
  ]);

if (askMore) {
    console.log(`${npc.name} says, "Well, legend has it that the canal is haunted by a ghostly figure who appears on moonless nights. Some say it's the spirit of a sailor lost in a shipwreck, while others believe it's the vengeful soul of a demon. The truth? No one really knows."`);
  } else {
    console.log(`${npc.name} says, "Very well. If you have any other questions, let me know."`);
  }

  return mainMenu(player);
};

export const encounterCanalPusher = async (player) => {
  console.log("You feel a chilling presence. The notorious Canal Pusher could be nearby!");

  const { decision } = await inquirer.prompt([
    {
      type: 'list',
      name: 'decision',
      message: 'What will you do?',
      choices: ['Confront the Canal Pusher', 'Stay hidden and observe', 'Leave the area'],
    },
  ]);

  switch (decision) {
    case 'Confront the Canal Pusher':
      return fightCanalPusher(player);
    case 'Stay hidden and observe':
      console.log("You observe the Canal Pusher from a safe distance. He seems to be looking for something...");
      break;
    case 'Leave the area':
      console.log("Deciding not to risk it, you quickly leave the area.");
      break;
  }

  return mainMenu(player);
};

export const fightCanalPusher = async (player) => {
  const canalPusher = new CanalPusher();

  while (player.health > 0 && canalPusher.health > 0) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What will you do?',
        choices: ['Attack', 'Defend', 'Run'],
      },
    ]);

    switch (action) {
      case 'Attack':
        const attackStrength = Math.floor(Math.random() * player.strength);
        canalPusher.health -= attackStrength;
        console.log(`You attack! Canal Pusher loses ${attackStrength} health.`);
        console.log("Player health" + player.health)
        console.log("Canal Pusher health" + canalPusher.health)
        break;

      case 'Defend':
        console.log("You brace yourself, reducing the damage you'll take.");
        canalPusher.attack(player);
        player.health += 10; // Some damage absorption due to defense
        console.log("Player health" + player.health)
        console.log("Canal Pusher health" + canalPusher.health)
        break;

      case 'Run':
        console.log("You decide to flee from the Canal Pusher. Safety first!");
        return mainMenu(player);

      default:
        console.log("Not sure what to do.");
    }

    if (canalPusher.health > 0) {
      canalPusher.attack(player);
    }
  }

  if (player.health <= 0) {
    console.log("You've been defeated by the Canal Pusher. Game over!");
    return startGame();  // Resetting the game.
  } else if (canalPusher.health <= 0) {
    console.log("You've successfully defeated the Canal Pusher! Well done!");
    return startGame();  // Resetting the game.
  }
  
  return mainMenu(player);
};


const startGame = async () => {
  const player = await askForName();
  mainMenu(player);
};

startGame();



