const fs = require('fs')
const path = require('path')

const dataFile = './data-zoom-compare'
const dataPath = path.join(__dirname,dataFile)
const dataContent = fs.readFileSync(dataPath, {encoding: 'utf-8'})
const dataLine = dataContent.split('\n')


const parsedContent = []
dataLine.forEach((line) => {
    if(line.match(/^\s*$/)){
        return
    }
    if(line.match(/^##.*/)){
        return parsedContent.push({type : 'text', content : line.match(/^#*\s*(.*)/)[1] })
        
    }
    if(line.match(/^#.*/)){
        return parsedContent.push({type : 'title', content : line.match(/^#*\s*(.*)/)[1] })
    }
    addPhoto(line, parsedContent)
})
console.log(parsedContent)

function addPhoto(line, ctt){
    let content = line.split(',')
    let photo = {
        file : content[0],
        name : content[1],
        cropx : content[2], 
        cropy : content[3],
    }

    // add photo to parsed content
    const maxPhotoPerLine = 5
    let lastCtt = ctt[ctt.length-1]
    if(lastCtt && lastCtt.type === 'photo' && lastCtt.content.length < maxPhotoPerLine){
        lastCtt.content.push(photo)
    }
    else {
        ctt.push({type : 'photo', content : [photo]})
    }
}