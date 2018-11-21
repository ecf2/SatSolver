
let programa = require('./SatSolver.js')

console.log ('SAT SOLVER:\n')

let file = readLine.question("What's the name of the file?/n")

let result = programa.solve(file)

if (result.isSat==true){
    console.log ('It is a satisfiable problem.\n')
    console.log ('Values for the variables that satisfies the formula:\n')
    console.log (objeto.satisfyingAssignment)
} else{
    console.log ('It is not a satisfiable problem.')
}