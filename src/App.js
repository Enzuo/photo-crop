import './App.css'
import Image from './components/Image'
import ImageText from './components/ImageText'
import { useState } from 'react'

function App() {
  const baseImages = [
    // filePath, fileName, crop x, crop y
    ['P1280016.JPG','tamron 23A 60-300',1100,1300],
    // ['P1270811.jpg','tamron 26A',1800,1910],
    ['P1280020.jpg','tamron 52B 90mm',1040,1200],
    ['P1280024.jpg','vivitar series 1',1280,1350],
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
