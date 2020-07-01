const init = [{ active: 0 }, { active: 0 }, { active: 0 }, { active: 0 }]
export default (state =  init , action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_PANEL': {
      const {pumpNumIndex,active}=action.payload  
      return state.map((p,index)=>{
          if(index===pumpNumIndex) return {active:active}
          else return p
      })
    }
    default:
      return state
  }
}
