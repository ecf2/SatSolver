

let programa = require('./sat.js')

let objeto = programa.solve('hole5.cnf')

console.log (objeto.isSat)
console.log (objeto.satisfyingAssignment)
