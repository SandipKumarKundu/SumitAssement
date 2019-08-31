export const addChecks = (id,checked) => {
    console.log(`@add Checks ${id}`)
    return {
      type: 'ADD_CHECKS',
      id,
      checked
    }
  }