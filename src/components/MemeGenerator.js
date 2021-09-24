import '../App.css';
import React, { useEffect, useState } from 'react';

let urlExample;
let idImg;

// Initialize state to save the following Data:
// Top Text ---  Bottom Text ---  Random Image//

const MemeGenerator = function () {
  const [allText, setAllText] = useState({
    topText: '',
    bottomText: '',
  });

  const [aRandomImg, setaRandomImg] = useState(
    'https://images.pexels.com/photos/92870/pexels-photo-92870.jpeg?cs=srgb&dl=pexels-leonie-fahjen-92870.jpg&fm=jpg',
  );

  // Initialize state to save the data that comes back
  const [everyMemeImgs, setEveryMemeImgs] = useState([]);
  // save the results from response.data to everyMemeImgs thats initialized as an empty array.

  // everyMemesImgs has now an array of 160 objects
  // ----------------------------------------------------------------------------------------------------------------
  //  Make an API call to https://memegen.link/ and save the data that comes back (an array -called response.data?-) to the new state property called everyMemeImgs

  // This returns a promise that we convert into a javascript method with the .json method.

  useEffect(() => {
    console.log('working 1?');
    fetch('https://api.memegen.link/templates') // call to Url
      .then((response) => response.json()) // turn promise into Js Object
      .then((data) => setEveryMemeImgs(data));
  }, []);

  // Received an object, need to convert it into an array and select what needed from it.
  // .then((response) => {

  // --------------------------------------------------------

  const handleChange = function (e) {

    setAllText({
      ...allText,
      [e.target.name]: e.target.value,
    });
  };

  // handleSubmit =>
  // Makes randNum = Random number from 0 until 160(objects.length in the array)
  // randMemeImg = the state of all MemeImgs[randNum]
  // #setRandomImg# (randMemeImg)

  const handleSubmit = function (e) {
    e.preventDefault();
    const randNumber = Math.floor(Math.random() * everyMemeImgs.length);
    console.log(randNumber);
    const selectedMeme = everyMemeImgs[randNumber];

    // const printImg = selectedMeme.blank; Optional without downloading

    idImg = selectedMeme.id;
    console.log(idImg);


    urlExample = `https://api.memegen.link/images/${idImg}/${allText.topText
      .replace(/ /g, '_')
      .replace(/\?/g, '~q')
      .replace(/#/g, '~h')
      .replace(/\//g, '~s')}/${allText.bottomText
      .replace(/ /g, '_')
      .replace(/\?/g, '~q')
      .replace(/#/g, '~h')
      .replace(/\//g, '~s')}`;



    setaRandomImg(urlExample);
  };

  const handleDownloadClick = () => {
    fetch(urlExample)
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download

        // The Blob object represents a blob, which is a file-like object of immutable, raw data; can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data. Look more into this...

        const blobLink = URL.createObjectURL(new Blob([blob]));

        const link = document.createElement('a');

        link.href = blobLink;

        console.log(link.setAttribute('download', `meme${idImg}.png`));

        // Append to html link element page
        // document.body.appendChild(link);

        link.click('download');
      });

    // function printed = printImg(url);
    // console.log(printed);
  };

  // ----------------------------------------------------------------------------------------------------------------
  // Input fields. One top - one bottom
  // randomImage = everyMemeImgs(randomNumber).img

  return (
    <div className="meme-container">
      <div>
        <button onClick={handleSubmit} className="download">
          Generate
        </button>
        <button onClick={handleDownloadClick}>Download</button>
      </div>

      <input
        name="topText"
        placeholder="Add Top Text"
        value={allText.topText}
        onChange={handleChange}
      />

      <input
        name="bottomText"
        placeholder="Add Bottom Text"
        value={allText.bottomText}
        onChange={handleChange}
      />
      <div className="meme">
        <img src={aRandomImg} alt="" />
      </div>
    </div>
  );
};

export default MemeGenerator;
