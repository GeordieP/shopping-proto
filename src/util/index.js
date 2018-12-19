// Take two arrays, return true if a2 contains at least everything in a1
export const arrayContainsArray = (a1, a2) => {
  // if a1 is empty (we're not verifying a2 contains anything), return true
  if (a1.length === 0) return true;
  // if a2 is empty (we've got nothing to search through/compare to), return false
  if (a2.length === 0) return false;

  // return false if we find any item in a1 that doesn't exist in a2
  for (let i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) return false;
  }

  return true;
}
