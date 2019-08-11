import database from '../firebase/firebase';

// const firstWord = {
//   word: 'hangapp',
//   wordType: 'noun',
//   def: 'A game made by Kyle'
// };

// database.ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1/pastGames`).push(firstWord);
// database.ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1/pastGames`).push(firstWord);
// database.ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1/pastGames`).push(firstWord);
// database.ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1/stats/wins`).set(10);
// database.ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1/stats/losses`).set(5);

// database.ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1`).once('value').then((snapshot) => {
//   console.log(snapshot.val());
// });

// database
//   .ref(`players/eOfOObhH88VpsHhNnx9RreEHG9i1`)
//   .once('value')
//   .then((snapshot) => {
//     const pastGames = [];
//
//     for(let game in snapshot.val().pastGames) {
//       pastGames.push(snapshot.val().pastGames[game]);
//     }
//
//     const stats = snapshot.val().stats;
//     console.log(pastGames);
//   });
