import '../App.css';
import React, { useEffect, useState } from 'react';

//Initialize state to save the following Data:
//Top Text ---  Bottom Text ---  Random Image
const MemeGenerator = function () {
  const [allText, setAllText] = useState({
    topText: '',
    bottomText: '',
    aRandomImg:
      'https://images.pexels.com/photos/92870/pexels-photo-92870.jpeg?cs=srgb&dl=pexels-leonie-fahjen-92870.jpg&fm=jpg',
  });

  const [aRandomImg, setaRandomImg] = useState('');

  //Initialize state to save the data that comes back
  const [everyMemeImgs, setEveryMemeImgs] = useState([]);
  //save the results from response.data to allMemeImgs thats initialized as an empty array.

  //allMemesImgs has now an array of 160 objects
  // ('----------------------------------------------------------');
  //  Make an API call to https://memegen.link/ and save the data that comes back (an array -called response.data?-) to the new state property called allMemeImgs

  //This returns a promise that we convert into a javascript method with the .json method.

  useEffect(() => {
    console.log('working 1?');
    fetch('https://api.memegen.link/templates') //call to Url
      .then((response) => response.json()) //turn promise into Js Object
      .then((data) => setEveryMemeImgs(data));
  }, []);

  //I receive an object need to convert it in an array and select what I need from it.
  // .then((response) => {

  //   // const { memes } = response.data; //pull memes array from response.data
  //   const { memes } = response.data;
  //   setAllMemeImgs(memes);

  // setallMemeImgs(response.data.memes);
  // set allMemeImgs state

  // // --------------------------------------------------------

  const handleChange = function (e) {
    const { name, value } = e.target;
    setAllText({
      ...allText,
      [e.target.name]: e.target.value,
    });
  };

  // handleSubmit =>
  // Makes randNum = Random number from 0 until 160(objects.length in the array)
  //randMemeImg = the state of all MemeImgs[randNum]
  //#setRandomImg# (randMemeImg)

  const handleSubmit = function (e) {
    e.preventDefault();
    const randNumber = Math.floor(Math.random() * everyMemeImgs.length);
    console.log(randNumber);
    const selectedMeme = everyMemeImgs[randNumber];

    const printImg = selectedMeme.blank;

    const idImg = selectedMeme.id;
    console.log(idImg);

    // const selectedText = selectedMeme.name;
    // console.log(selectedText);
    // selectedMeme.name = setAllText;
    // const urlExample = `https://api.memegen.link/images/${idImg}/${allText.topText}/${allText.bottomText}.png}`;

    const newPrinting = selectedMeme;

    setaRandomImg(printImg);

    // function printed = printImg(url);
    // console.log(printed);
  };

  // randomImage = allMemeImgs(randomNumber).img(----------------------------------------------------------
  //Input fields. One top - one bottom
  return (
    <div className="meme-container">
      {console.log('working 2!', everyMemeImgs)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Add Top Text"
          value={allText.topText}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bottomText"
          placeholder="Add Bottom Text"
          value={allText.bottomText}
          onChange={handleChange}
        />

        <button>Generate</button>
      </form>
      <div className="meme">
        <img src={aRandomImg} alt="" />
        <h2 className="top">{allText.topText}</h2>
        <h2 className="bottom">{allText.bottomText}</h2>
      </div>
    </div>
  );
};

// id":"buzz","name":"X, X Everywhere","lines":2,"styles":

export default MemeGenerator;
