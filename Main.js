
const programa = require('SatSolver.js')

console.log ('SAT SOLVER:')


let result = programa.solve('./Examples/tutorial.cnf')

if (result.isSat==true){
    console.log ('It is a satisfiable problem.')
    console.log ('Values for the variables that satisfies the formula:')
    console.log (result.satisfyingAssignment)
} else{
    console.log ('It is not a satisfiable problem.')
}