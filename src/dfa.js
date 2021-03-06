import { lambda } from './global.js'
import {NFA} from './nfa.js'

class DFA extends NFA {

  constructor(transitionFunction, acceptStates, startState){
    super(transitionFunction, acceptStates, startState)
    if(!this.validateDFA())
      throw {message:'DFA validation failed'}
  }

  validateDFA(){
    this.alphabet = this.alphabet.filter((symbol) => symbol !== lambda)
    return this.nodes.every((node) => {
      let tranSymbols = node.transitionFunction.map(({symbol}) => symbol)
      if(tranSymbols.includes(lambda)) return false
      //if array has duplicated elements or if it doesn't have the same amount of symbols as the alphabet
      //because NFA confirms all transitions symbols are part of the alphabet, this is the only check necessary
      if(new Set(tranSymbols).size !== tranSymbols.length || tranSymbols.length !== this.alphabet.length){
        return false
      }
      return true
    })
  } 

  //overwrite
  getNextStates(transitionSymbol, currNode){
    return currNode.transition(transitionSymbol)
  }

  //Overrwrite
  end (currNode) {
    return this.acceptNodes.includes(currNode)
  }

}
export {DFA}