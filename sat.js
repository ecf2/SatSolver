exports.solve = function(fileName) {

  let formula = readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result // two fields: isSat and satisfyingAssignment
}

// Receives the current assignment and produces the next one
function nextAssignment(currentAssignment) {
    let newAssignment = currentAssignment
    let counter = newAssignment.length - 1
        while(counter >= 0 && newAssignment[counter] != false) {
            counter--
        }   

    for (var i = counter; i < newAssignment.length; i++) {
        newAssignment[i] = !newAssignment[i]
    }
    return newAssignment

}
    
 


function doSolve(clauses, assignment) {
  let isSat = false
  let initialCondition = false;
  for (let i = 0; i<clauses.length;i++){
    for (let j=0; j<clauses[i].length; j++){
     clauses[i][j] = clauses[i][j] - '0';
    }
}
  
  while (!isSat && !initialCondition) {
      isSat = true
    for (let i= 0; i<clauses.length; i++){
        let aux = false
        for (let j=0; j<clauses[i].length; j++){
            if (clauses[i][j]<0){
                aux = aux || !(assignment[Math.abs(clauses[i][j])-1])
            }else{
                 aux = aux || assignment[clauses[i][j]-1]
            }
            
        }
        isSat = isSat && aux
    }

    // if not, get the next assignment and try again. 
    if (isSat==false){
        assignment = nextAssignment(assignment)
    }
    initialCondition = true
    for (let i = 0; i<assignment.length; i++){
        if (assignment[i] == true){
            initialCondition = false
        } 
    }
   
  }

  let result = {'isSat': isSat, satisfyingAssignment: null}

  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}
  
function readFormula(fileName) {
  let fs = require('fs')
  let lines = fs.readFileSync(fileName, 'utf8')
  let text = lines.split('\n') //  an array containing lines of text extracted from the file. 
  let clauses = readClauses(text)
  let variables = readVariables(clauses)
  console.log(variables)
  // In the following line, text is passed as an argument so that the function
  // is able to extract the problem specification.

  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
  };
  
  function readClauses (text){
    let clauses =[]; // array of clauses
    let semEspacos = []
    for (let i = 0; i<text.length; i++){
       if (!(text[i].startsWith('c') || text[i].startsWith('p'))) {  
        let aux = text[i]; // var aux gets the lines that contains the clauses 
        aux = aux.split(' '); // var aux becomes an array without the spaces

        //removes any extra spaces
        for (let j = 0; j < aux.length; j++) {
            if (aux[j] != '') {
                semEspacos[semEspacos.length] = aux[j]
            }
        }
        if (semEspacos[semEspacos.length-1]=='0'){
            semEspacos.pop(); // removes the last element of the array
            clauses[clauses.length] = semEspacos;
            semEspacos =[];
           }
    }
  }
  return clauses;
}

  function readVariables (clauses){
     let variable = []
     for (let i = 0; i<clauses.length;i++){
       for (let j=0; j<clauses[i].length; j++){
        clauses[i][j] = clauses[i][j] - '0';
         variable[Math.abs(clauses[i][j])-1] = false;
       }
     }

     return variable;
  }

  function checkProblemSpecification (text, clauses, variables){ 
    var theresP = false
    for (let i = 0; i<text.length;i++){
        if (text[i].startsWith('p')){
            theresP = true
        }
    }
    if (theresP==true){
    for (let i = 0; i<text.length; i++){
        if (text[i].startsWith('p')){
            if (text[i].includes(variables.length + " " + clauses.length)){
                return true;
            } else {
                return false;
            }

      }
    }
} else{
    return true;
}
}


