import ImageCrop from './ImageCrop'
import {useState} from 'react'

export default function Image ({data}) {
    const filePath = 'images/' + data[0]
    const fileName = data[1]

    let [cropOffsetX, setOffsetX] = useState(0)
    let [cropOffsetY, setOffsetY] = useState(0)

    return (
        <div className="image">
            {fileName}
            <img src={filePath} alt=""></img>
            <ImageCrop filePath={filePath} offset={[cropOffsetX,cropOffsetY]} size={[300,300]}></ImageCrop>
            <p>
                Offset x : 
                <input value={cropOffsetX} type="number" onChange={e => setOffsetX(parseInt(e.target.value))}/>
                <button onClick={() => setOffsetX((v) => v + 100)}>+</button>
                <button onClick={() => setOffsetX((v) => v - 100)}>-</button>
            </p>
            <p>
                Offset y : 
                <input value={cropOffsetY} type="number" onChange={e => setOffsetY(parseInt(e.target.value))}/>
                <button onClick={() => setOffsetY((v) => v + 100)}>+</button>
                <button onClick={() => setOffsetY((v) => v - 100)}>-</button>
            </p>
        </div>
    )
}