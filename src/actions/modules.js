import uuid from 'uuid';
import database from '../firebase/firebase';
import moment from 'moment';

// COMPLETE_MODULE
export const completeModule = (module = {}) => {
  return ({
    type: 'COMPLETE_MODULE',
    module
  });
};

export const startCompleteModule = (module) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const currentTime = Number(moment());
    const moduleNumber = Number(module);
    return database.ref(`users/${uid}/modules/${moduleNumber}`).set(currentTime).then((ref) => {
      dispatch(completeModule({
        number: moduleNumber,
        moduleComplete: currentTime
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
      let modules = [
        {
          number: 1,
          moduleComplete: 0
        },
        {
          number: 2,
          moduleComplete: 0
        },
        {
          number: 3,
          moduleComplete: 0
        },
        {
          number: 4,
          moduleComplete: 0
        },
        {
          number: 5,
          moduleComplete: 0
        },
        {
          number: 6,
          moduleComplete: 0
        },
        {
          number: 7,
          moduleComplete: 0
        },
        {
          number: 8,
          moduleComplete: 0
        },
        {
          number: 9,
          moduleComplete: 0
        },
        {
          number: 10,
          moduleComplete: 0
        }
      ];
      
      snapshot.forEach((childSnapshot) => {
        let objIndex = modules.findIndex((obj => obj.number == childSnapshot.key));
        modules[objIndex].moduleComplete = childSnapshot.val();
      });
      
      dispatch(setModules(modules));
    });
  };
};