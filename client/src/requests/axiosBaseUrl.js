// ./request/axiosBaseUrl.js

// if client is at local host (port 3000) also server is asumed to be local (port 5000)
// else client is asumed to be on server url (local 5000 or cloud)
let baseUrl = '';
if(window.location.href === 'http://localhost:3000/'){
  baseUrl = 'http://localhost:5000';
}

export const axiosBaseUrl = baseUrl;