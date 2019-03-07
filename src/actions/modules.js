import uuid from 'uuid';
import database from '../firebase/firebase';
import moment from 'moment';

// COMPLETE_MODULE
export const completeModule = ({ moduleNumber }) => ({
  type: 'COMPLETE_MODULE',
  moduleNumber,
  moduleComplete: Number(moment())
});

export const startCompleteModule = (moduleNumber = undefined) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const currentTime = Number(moment());
    return database.ref(`users/${uid}/modules/${moduleNumber}`).set(currentTime).then((ref) => {
      dispatch(completeModule({
        moduleNumber,
      }));
    });
  };
};

export const setModules = (modules) => ({
  type: 'SET_MODULES',
  modules
});

export const startSetModules = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/modules`).once('value').then((snapshot) => {
      const modules = [];
      
      snapshot.forEach((childSnapshot) => {
        modules.push({
          number: childSnapshot.key,
          moduleComplete: childSnapshot.val()
        });
      });
      
      dispatch(setModules(modules));
    });
  };
};

// export const startCompleteModule = (moduleNumber = undefined) => {
//   console.log('moduleNumber: ', moduleNumber);
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     const currentTime = moment();
//     // const moduleNumber = 1;
//     // const module = { moduleNumber };
//     return database.ref(`users/1337/moduleComplete/${moduleNumber}/40`).push(module).then((ref) => {
//       dispatch(completeModule(moduleNumber));
//     });
//   };
// };