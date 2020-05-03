import { combineReducers } from 'redux'
import shiftFormDateReducer from './shiftFormDateReducer'

// const songsReducer = () => {
//   return [
//     {
//       title: 'Song1',
//       duration: '3:21',
//     },
//     {
//       title: 'Song2',
//       duration: '3:22',
//     },
//   ]
// }

// const selectedSongReducer = (selectedSong = null, action) => {
//   if (action.type === 'SONG_SELECTED') {
//     return action.payload
//   }
//   return selectedSong
// }

export default combineReducers({
  shiftFormDate: shiftFormDateReducer,
})
