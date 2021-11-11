const fs = require('fs')
const path = require('path')
const gm = require('gm')//.subClass({imageMagick: true})


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
generateHtml(parsedContent)

function addPhoto(line, ctt){
    let content = line.split(',')
    let photo = {
        source : content[0],
        name : content[1],
        cropx : content[2], 
        cropy : content[3],
        iso : content[4],
        speed : content[5],
        aperture : content[6],
        focal : content[7],
    }

    // crop or resize
    if(photo.source !== '--'){
        photo.file = cropPhoto(photo)
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

function generateHtml(parsedContent){
    console.log(JSON.stringify(parsedContent, null, 2))

    let body = ''

    parsedContent.forEach(element => {
        if(element.type === 'title'){
            if(body !== ''){
                body += '</section>\n'
            }
            body += '<section>'
            body += '<h1>'+element.content+'</h1>\n'
        }

        if(element.type === 'text'){
            body += '<p>'+element.content+'</p>\n'
        }

        if(element.type === 'photo'){
            body += '<div class="photo-container">\n'
            element.content.forEach(p => {
                body += '\t<div class="photo">\n'
                body += '\t\t'+imgPhoto(p)+'\n'
                body += '\t\t'+legendPhoto(p)+'\n'
                body += '\t</div>\n'
            })
            body += '</div>\n'
        }
    })

    let header = `
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>Page Title</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="./public/reset.css">
<link rel="stylesheet" href="./public/style.css">
    `
    let style = `
.photo-container {
    display: grid;
    grid-template-columns: repeat(5, 20% [col-start]);
}
.photo {
    padding: 0 5px;
}
.photo img {
    max-width:100%;
}
    `
    let html = `
${header}
<style>
${style}
</style>
<body>
${body}
</body>
    `

    console.log(html)

    fs.writeFileSync('photo.html', html)
}

function imgPhoto(p){
    if(!p.file){
        return '<div class="photo-box"></div>'
    }
    return '<img src="./public/crops/'+p.file+'" alt="'+p.name+'"/>'
}
function legendPhoto(p){
    let legend = '<legend>'
    if(p.name){
        legend += p.name
    }
    if(p.name && p.speed){
        legend +=' - '
    }
    if(p.speed){
        legend +=' - '+p.speed+' '+p.aperture+' '+p.focal
    }
    legend += '</legend>'
    return legend
}

function cropPhoto(photo){
    let sourcePath = path.join('public','images', photo.source)
    let targetName = photo.source
    let shouldCrop = !!photo.cropx
    if(shouldCrop){
        targetName = path.parse(photo.source).name + '_' + photo.cropx + '_' + photo.cropy + '.jpg'
    }
    let targetPath = path.join('public','crops', targetName)

    let file = gm(sourcePath)
    if(shouldCrop){
        file.crop(300, 300, photo.cropx, photo.cropy)
    }
    else{
        file.resize(300, 300)
    }
    file.noProfile()
        .write(targetPath, function (err) {
            if (!err) console.log('done');
        });
    return targetName
}