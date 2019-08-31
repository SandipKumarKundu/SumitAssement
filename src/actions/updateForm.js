export const updateForm = (id,name,value) => {
    console.log(`@update Form ${id}`)
    return {
      type: 'UPDATE_FORM',
      id,
      name,
      value
    }
  }