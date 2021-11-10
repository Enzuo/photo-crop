export default function CropSquare({size, offset, crop}) {
    if(!size[0]){
        return <div></div>
    }

    let left = offset[0]/size[0]*100
    let top = offset[1]/size[1]*100

    let width = crop[0]/size[0]*100
    let height = crop[1]/size[1]*100

    return <div className="crop-square" style={{top:top+'%', left:left+'%', width:width+'%', height:height+'%'}}></div>
}