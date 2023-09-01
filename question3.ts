type State = {
  position: number;
  ladderCheckpoint: number;
  snakeCheckpoint: number;
}

function quickestPath(board: { ladders: [number, number][]; snakes: [number, number][]; }): number[] {
 
  const state: State = {
    position: 1 ,
    ladderCheckpoint: 0 ,
    snakeCheckpoint: 0,
  }
  const {ladders, snakes} = board
  const path : number[] = []

  while(state.position !== 100) {

    const [nearestLadderPosition, nearestLadderDestination] = ladders[state.ladderCheckpoint] || []

    const distance = findDistance(nearestLadderPosition, state);
    
    const rolls = rollDice(distance,state,snakes)
    path.push(...rolls);

    if (nearestLadderPosition && nearestLadderPosition === state.position) {
      state.position = nearestLadderDestination
    }
    state.ladderCheckpoint++
  }
  return path
}

// find the distance between current position and ladder position or the finish line if there is no ladder left
function findDistance(ladderPosition: number | undefined, state: State) {
  let distance = 0
  if (!ladderPosition) {
    distance = 100 - state.position
  }
  if (ladderPosition && state.position < ladderPosition) {
    distance = ladderPosition - state.position;
  }
  return distance
}

// calculate best dice roll(s) from the given distance
function rollDice(distance: number, state: State, snakes: [number, number][] ) {
  const rolls: number[] = []
  while(true) {
    if (distance === 0) break;
    if (distance <= 6) {
      rolls.push(distance);
      state.position += distance;
      break;
    }
    
    let snakesPosition = snakes[state.snakeCheckpoint][0]
    while(state.position > snakesPosition) {
      state.snakeCheckpoint++
      snakesPosition = snakes[state.snakeCheckpoint][0]
    }
    let tempDistance = 6
    if(state.position + 6 === snakesPosition) tempDistance--

    distance -= tempDistance
    state.position += tempDistance
    rolls.push(tempDistance)
    
  }

  return rolls
}

console.log(quickestPath({
  ladders: [ [3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93] ],
  snakes: [ [21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66] ]
})) // [2,5,6,6,1]


