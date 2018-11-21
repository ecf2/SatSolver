exports.solve = function(fileName) {

  let formula = readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result // two fields: isSat and satisfyingAssignment
}

// Receives the current assignment and produces the next one
function nextAssignment(currentAssignment) {
    let nextAssignment;
    let counter = currentAssignment.length - 1 //counter starts at the last element of the assignment

        while((counter>=0) && (currentAssignment[counter]!=false)) {
            counter = counter - 1;
        }   

    for (var i = counter; i < newAssignment.length; i++) {
        nextAssignment[i] = !currentAssignment[i]
    }
    return nextAssignment
}
    
 

// Checks if the clauses are satisfables 
function doSolve(clauses, assignment) {
  let isSat = false
  let initialCondition = false;

  //Transforms clauses in an array of integers
  for (let i = 0; i<clauses.length;i++){
    for (let j=0; j<clauses[i].length; j++){
     clauses[i][j] = clauses[i][j] - '0';
    }
}
  
  //Checks if the formula is satisfiable and if it hasn't tried all the values for the variables and then solves 
  while (!isSat && !initialCondition) {
      isSat = true
    for (let i= 0; i<clauses.length; i++){
        let aux = false
        for (let j=0; j<clauses[i].length; j++){
            if (clauses[i][j]<0){
                aux = aux || !(assignment[Math.abs(clauses[i][j])-1]) //variables
            }else{
                 aux = aux || assignment[clauses[i][j]-1] //variables
            }
            
        }
        isSat = isSat && aux //clauses
    }

    // If isSat is not true, gets the next assignment and try again. 
    if (isSat==false){
        assignment = nextAssignment(assignment)
    }

    //If isSat is true, initialCondition becomes true so the while stops
    initialCondition = true

    // Checks if it has tried all the possible values for the variables
    for (let i = 0; i<assignment.length; i++){
        if (assignment[i] == true){
            initialCondition = false
        } 
    }
   
  }

  // Creates the object that it will be returned
  let result = {'isSat': isSat, satisfyingAssignment: null}

  // If the problem is satisfiable, one of the atributes of the object receives the array which satisfies the problem
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  
  return result
}
 
//Reads the file
function readFormula(fileName) {
  let fs = require('fs')
  let text = fs.readFileSync(fileName, 'utf8')
  text = text.split('\n') // Splits text into an array containing the lines of text extracted from the file. 
  let clauses = readClauses(text)
  let variables = readVariables(clauses)
  
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