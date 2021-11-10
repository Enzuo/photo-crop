export default function ImageCrop ({filePath, offset, size}) {
    return (
        <div className="crop" style={{
                backgroundImage: 'url('+filePath+')',
                backgroundPositionX: -offset[0],
                backgroundPositionY: -offset[1],
            }} 
        ></div>
    )
}