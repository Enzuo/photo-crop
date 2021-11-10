import './App.css'
import Image from './components/Image'
import ImageText from './components/ImageText'
import { useState } from 'react'

function App() {
  const baseImages = [
    // filePath, fileName
    ['P1240562.JPG', 'image 1', 0, 0],
    ['P1240562.JPG', 'image 2', 0, 0],
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
