/*  
  Every Recoil app will contain a SET of knownAtoms and knownSeletors properties in the 
  memoizedState linked list values. If there are no atoms or selectors used in app
  knownAtoms and knownSelectors value will be null. 
*/

// Creates Object to find atom/selectors on rendered DOM
export function getAtomSelector(fiberNode) {
  // object will store our known atoms and selctors when found in memoizedState
  const atomSelectors = {
    atoms: null,
    selectors: null,
  };

  // helper function to recursivly search memoizedState to find knownAtoms and knownSelectors
  const traverse = (node) => {
    // test if memoized state !== null and has a current property with knownAtoms
    if (
      node.memoizedState &&
      node.memoizedState.current.hasOwnProperty("knownAtoms")
    ) {
      // assign values in atomSelector obj when atoms and selectors are found
      atomSelectors.atoms = node.memoizedState.current.knownAtoms;
      atomSelectors.selectors = node.memoizedState.current.knownSelectors;
    } else {
      // recursively call traverse with memoized.next obj
      traverse(node.next);
    }
  };
  // invoke helper func to assign atoms and selectors to atomSelector object
  fiberNode.memoizedState
    ? traverse(fiberNode.memoizedState)
    : traverse(fiberNode.child.memoizedState);
  return atomSelectors;
}
