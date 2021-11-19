import './App.css'
import Image from './components/Image'
import ImageText from './components/ImageText'
import { useState } from 'react'

const IMG_PATH = 'images_nex'

function App() {
  const baseImages = [
    // filePath, fileName, crop x, crop y
    ['P1280300.JPG','gx80',1000,1000],
    // ['P1270811.jpg','tamron 26A',1800,1910],
    ['DSC01048.jpg','nex3n',1000,1000],
    // ['P1280024.jpg','vivitar series 1',1280,1350],
  ]

  const [images, setImages] = useState(baseImages)

  function handleChange(d, index) {
    setImages((array) => {
      array[index] = d
      return [].concat(array) // force rerender
    })
  }

  const ImagesList = images.map((d, index) => <Image sourcePath={IMG_PATH} data={d} onChange={(d) => handleChange(d, index)}></Image>)
  const ImagesText = images.map(d => <ImageText data={d}></ImageText>)


  return (
    <div className="App">
      <div className="container">
        {ImagesList}
      </div>
      {ImagesText}
    </div>
  );
}

export default App;
