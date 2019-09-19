
const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.send();
}

function getProfiles(json){
  json.people.map(person => {
    getJSON(wikiUrl + person.name, generateHTML);
    console.log(wikiUrl + person.name);
  });
}

function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  
  // use the ternary operator to add the image to the page or a link to the Wikipedia disambiguation page
  section.innerHTML = `
    ${data.type === 'standard' ?
      `<img src=${data.thumbnail.source}>` :
      `<a href=${data.content_urls.desktop.page}>Wikipedia disambiguation page</a>`}
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
}


btn.addEventListener('click', (event) => {
  getJSON(astrosUrl, getProfiles);
  event.target.remove();
});
