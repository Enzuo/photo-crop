import './App.css'
import Image from './components/Image'
import ImageText from './components/ImageText'
import { useState } from 'react'

function App() {
  const baseImages = [
    // filePath, fileName, crop x, crop y
    ['P1270870_upscale.JPG','minolta 70mm',1825,1700],
    // ['P1270811.jpg','tamron 26A',1800,1910],
    ['P1270872.jpg','minolta 70mm x2',1390,1750],
  ]

  const [images, setImages] = useState(baseImages)

  function handleChange(d, index) {
    setImages((array) => {
      array[index] = d
      return [].concat(array) // force rerender
    })
  }

  const ImagesList = images.map((d, index) => <Image data={d} onChange={(d) => handleChange(d, index)}></Image>)
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
