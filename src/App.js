import logo from './logo.svg'
import './App.css'
import Image from './components/Image'

function App() {
  const images = [
    // filePath, fileName
    ['P1240562.JPG', 'image 1'],
    ['P1240562.JPG', 'image 2'],
  ]

  const ImagesList = images.map(d => <Image data={d}></Image>)


  return (
    <div className="App">
      <div className="container">
        {ImagesList}
      </div>
    </div>
  );
}

export default App;
