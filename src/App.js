import './App.css'
import Image from './components/Image'
import ImageText from './components/ImageText'
import { useState } from 'react'

function App() {
  const baseImages = [
    // filePath, fileName, crop x, crop y
    ['P1270610.JPG','tamron 26A f8',2580,2445],
    ['P1270607.JPG','vivitar series 1',2860,2090],
    ['P1270606.JPG','minolta',2990,2410],
    ['P1270605.JPG','olympus',2630,2340],
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
