import ImageCrop from './ImageCrop'
import {useState} from 'react'
import CropSquare from './CropSquare'
import EXIF from 'exif-js'

export default function Image ({data}) {
    const filePath = 'images/' + data[0]
    const fileName = data[1]

    let [cropOffsetX, setOffsetX] = useState(0)
    let [cropOffsetY, setOffsetY] = useState(0)
    let [imageWidth, setImageWidth] = useState(0)
    let [imageHeight, setImageHeight] = useState(0)

    const onImgLoad = function (e) {
        let img = e.target
        setImageWidth(img.naturalWidth)
        setImageHeight(img.naturalHeight)

        EXIF.getData(img, function() {
            let data = {
                make : EXIF.getTag(this, "Make"),
                model : EXIF.getTag(this, "Model"),
                iso : EXIF.getTag(this, "ISOSpeedRatings"), // ISO, PhotographicSensitivity
                speed : EXIF.getTag(this, "ExposureTime"),
                shutterSpeed : EXIF.getTag(this, "ShutterSpeedValue"),
                aperture : EXIF.getTag(this, "ApertureValue"),
                brightness : EXIF.getTag(this, "Brightness"),
                program : EXIF.getTag(this, "ExposureProgram"),
                focal : EXIF.getTag(this, "FocalLength"),
                lens : EXIF.getTag(this, "LensInfo"),
            }
            console.log(data)
        })
    }

    return (
        <div className="image">
            {fileName}
            <div className="image-preview">
                <img src={filePath} alt="" onLoad={onImgLoad}></img>
                <CropSquare size={[imageWidth, imageHeight]} offset={[cropOffsetX,cropOffsetY]} crop={[300,300]}></CropSquare>
            </div>
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