const fs = require('fs')
const path = require('path')
const gm = require('gm')//.subClass({imageMagick: true})

const SOURCE_PATH = './public/images_collection'
const OUTPUT_PATH = './public/crops_collection'
const RESIZE_SIZE = [150,150]


let dirContent = fs.readdirSync(SOURCE_PATH)

dirContent.forEach(f => {
    // avoid pesky .DS_STORE
    if(f.match(/^\..*/)){
        return
    }
    
    let file = gm(path.join(SOURCE_PATH,f))
    // file.noProfile().autoOrient()
        

    file.size((err, s) => {
        let width = s.width
        let height = s.height
        let max_size = Math.min(width, height)

        let cropx = width/2 - max_size/2
        let cropy = height/2 - max_size/2

        console.log('crop', f, max_size, max_size, cropx, cropy)
        file.crop(max_size, max_size, cropx, cropy)
        file.resize(RESIZE_SIZE[0], RESIZE_SIZE[1])

        let targetName = f
        file.write(path.join(OUTPUT_PATH, targetName), function (err) {
            if (!err) console.log('done');
        });
    })
        // file.resize(RESIZE_SIZE[0], RESIZE_SIZE[1])

})

console.log(dirContent)