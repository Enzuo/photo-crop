const fs = require('fs')
const path = require('path')
const gm = require('gm')//.subClass({imageMagick: true})

const CROP_SIZE = [800,300]
const RESIZE_SIZE = [800,800]
const PHOTOS_PER_LINE = 2
const DATA_FILE = 'data-sonynex3n'
const OUTPUT_HTML = 'photo.html'
const IMG_PATH = 'images_nex'


const dataPath = DATA_FILE
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
    let lastCtt = ctt[ctt.length-1]
    if(lastCtt && lastCtt.type === 'photo' && lastCtt.content.length < PHOTOS_PER_LINE){
        lastCtt.content.push(photo)
    }
    else {
        ctt.push({type : 'photo', content : [photo]})
    }
}

function generateHtml(parsedContent){
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
                body += '\t\t'+htmlPhoto(p)+'\n'
                body += '\t\t'+htmlLegendPhoto(p)+'\n'
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
    grid-template-columns: repeat(${PHOTOS_PER_LINE}, ${100/PHOTOS_PER_LINE}% [col-start]);
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

    fs.writeFileSync(OUTPUT_HTML, html)
}

function htmlPhoto(p){
    if(!p.file){
        return '<div class="photo-box"></div>'
    }
    return '<img src="./public/crops/'+p.file+'" alt="'+p.name+'"/>'
}
function htmlLegendPhoto(p){
    let legend = '<legend>'
    if(p.name){
        legend += p.name
    }
    if(p.name && p.speed){
        legend +=' - '
    }
    if(p.speed){
        legend += p.speed+' '+p.aperture+' '+p.focal
    }
    legend += '</legend>'
    return legend
}

function cropPhoto(photo){
    let sourcePath = path.join('public',IMG_PATH, photo.source)
    let targetName = photo.source
    let shouldCrop = !!photo.cropx
    if(shouldCrop){
        targetName = path.parse(photo.source).name + '_' + photo.cropx + '_' + photo.cropy + '.jpg'
    }
    let targetPath = path.join('public','crops', targetName)

    let file = gm(sourcePath)
    file.autoOrient()
    if(shouldCrop){
        file.crop(CROP_SIZE[0], CROP_SIZE[1], photo.cropx, photo.cropy)
    }
    else{
        file.resize(RESIZE_SIZE[0], RESIZE_SIZE[1])
    }
    file.noProfile()
        .write(targetPath, function (err) {
            if (!err) console.log('done');
        });
    return targetName
}