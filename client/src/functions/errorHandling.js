// errorHandling.js

export default function errorHandling(error) {
  console.log('IN ERROR HANDLING');
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('In error.response');
    console.log(`error.message: ${error.message}`);
    console.log('error.response.data');
    console.log(error.response.data);
    console.log('error.response.status');
    console.log(error.response.status);
    console.log('error.response.headers');
    console.log(error.response.headers);

    if (error.response.status === 500) window.alert('Verkkoyhteys ongelma tietokantaan');
    if (error.response.data.message === 'Username already reserved in Database.')
      window.alert(`Käyttäjätunnus ${error.response.data.username} on jo käytössä, valitse toinen.`);
    if (error.response.data.message === 'Failed to find user in Database.' || error.response.data.message === 'Incorrect password.')
      window.alert('Käyttäjätunnus tai salasana väärin!');
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('In error.request');
    console.log('error.request');
    console.log(error.request);
    console.log(`error message: ${error.message}`);

    if (error.message === 'Network Error') window.alert('Verkkoyhteys ongelma serverille');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('In error else');
    console.log('Error', error.message);
  }
  console.log('error.config');
  console.log(error.config);
}
