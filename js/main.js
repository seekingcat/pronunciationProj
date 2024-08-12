//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getAudio);

function getAudio() {
  let word = document.querySelector('input').value;
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
  let phonetic = document.querySelector('#phonetic');
  let meaning = document.querySelector('#meaning');

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (data.title === 'No Definitions Found') {
        meaning.innerText = data.message;
        phonetic.innerText = '';
      }
      if (!data[0].phonetics[0].audio) {
        phonetic.innerText = `No audio found, but here is the phonetic pronunciation: ${data[0].phonetics[0].text}`;
      } else {
        document.querySelector('audio').src = data[0].phonetics[0].audio;
        phonetic.innerText = '';
      }
      meaning.innerText = data[0].meanings[0].definitions[0].definition;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  document.querySelector('input').value = '';
}
