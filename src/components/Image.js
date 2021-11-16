import ImageCrop from './ImageCrop'
import {useState} from 'react'
import CropSquare from './CropSquare'
import EXIF from 'exif-js'

export default function Image ({data, onChange}) {
    const filePath = 'images/' + data[0]
    const fileName = data[1]

    let cropOffsetX = data[2]
    let cropOffsetY = data[3]
    let [imageWidth, setImageWidth] = useState(0)
    let [imageHeight, setImageHeight] = useState(0)

    const setOffsetX = function(fn){
        data[2] = fn(cropOffsetX)
        onChange(data)
    }
    
    const setOffsetY = function(fn){
        data[3] = fn(cropOffsetY)
        onChange(data)
    }

    const handleImgLoad = function (e) {
        let img = e.target
        setImageWidth(img.naturalWidth)
        setImageHeight(img.naturalHeight)

        EXIF.getData(img, function() {
            let exifData = {
                make : EXIF.getTag(this, "Make"),
                model : EXIF.getTag(this, "Model"),
                iso : EXIF.getTag(this, "ISOSpeedRatings"), // ISO, PhotographicSensitivity
                exposureTime : EXIF.getTag(this, "ExposureTime"), // ShutterSpeedValue
                aperture : EXIF.getTag(this, "FNumber"),
                program : EXIF.getTag(this, "ExposureProgram"),
                focal : EXIF.getTag(this, "FocalLength"),
                lens : EXIF.getTag(this, "LensInfo"),
            }
            onChange(data.concat([
                exifData.iso, 
                '1/' + (exifData.exposureTime ? exifData.exposureTime.denominator/exifData.exposureTime.numerator : '?'),
                'f/' + (exifData.aperture || '?'),
                (exifData.focal ? exifData.focal.numerator/exifData.focal.denominator || '?' : '?') + 'mm'
            ]))

            console.log('EXIF', exifData)
        })
    }

    return (
        <div className="image">
            {fileName}
            <div className="image-preview">
                <img src={filePath} alt="" onLoad={handleImgLoad}></img>
                <CropSquare size={[imageWidth, imageHeight]} offset={[cropOffsetX,cropOffsetY]} crop={[300,300]}></CropSquare>
            </div>
            <ImageCrop filePath={filePath} offset={[cropOffsetX,cropOffsetY]} size={[300,300]}></ImageCrop>
            <p>
                Offset x : 
                <input value={cropOffsetX} type="number" onChange={e => setOffsetX(()=>parseInt(e.target.value))}/>
                <button onClick={() => setOffsetX((v) => v + 100)}>+</button>
                <button onClick={() => setOffsetX((v) => v - 100)}>-</button>
            </p>
            <p>
                Offset y : 
                <input value={cropOffsetY} type="number" onChange={e => setOffsetY(()=>parseInt(e.target.value))}/>
                <button onClick={() => setOffsetY((v) => v + 100)}>+</button>
                <button onClick={() => setOffsetY((v) => v - 100)}>-</button>
            </p>
        </div>
    )
}