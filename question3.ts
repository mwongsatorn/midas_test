function quickestPath(board: { ladders: [number, number][]; snakes: [number, number][]; }): number[] {
  const queue: [position: number, path: number[]][] = []
  const visited = new Set<number>();
  const finishLine = 100;
  const laddersPosition = board.ladders
  const snakesPosition = board.snakes
  queue.push([1,[]])

  while(queue.length) {
    let [position , path] = queue.shift()!;

    for(let i=1; i <= 6; i++) {
      let newPath = [...path]
      let nextPosition = position + i

      const onLadder = laddersPosition.find((ladder) => ladder[0] === nextPosition)
      const onSnake = snakesPosition.find((snake) => snake[0] === nextPosition)
      if(onLadder) nextPosition = onLadder[1] 
      if(onSnake) nextPosition = onSnake[1]

      if(nextPosition === finishLine) {
        newPath.push(i)
        return newPath
      }
      
      if(!visited.has(nextPosition)) {
        visited.add(nextPosition)
        newPath.push(i)
        queue.push([nextPosition,newPath])
      }
    }

  }
  return []
}

console.log(quickestPath({
  ladders: [ [3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93] ],
  snakes: [ [21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66] ]
})) // [2,5,6,1,6]

console.log(quickestPath({
  ladders: [],
  snakes: [[8,1],[9,2],[10,3],[11,4],[12,5],[13,6] ]
})) // []

console.log(quickestPath({
  ladders: [[4,25],[22, 93]],
  snakes: [[33,21]]
})) // [3,2,6,1,1,6]

console.log(quickestPath({
  ladders: [],
  snakes: []
})) // [3,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]


