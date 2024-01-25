const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const inputVideo = './input2.mp4';
const outputFolder = 'public/videos';

const variants = [
    { resolution: '640x360', bitrate: '1100000' },
    // { resolution: '852x480', bitrate: '1460000' },
    // { resolution: '1280x720', bitrate: '3290000' },
    { resolution: '1920x1080', bitrate: '6610000' },
];

variants.forEach((variant, index) => {
    const outputName = `variant-${index + 1}`;
    const outputM3U8 = path.join(outputFolder, `${outputName}.m3u8`);

    ffmpeg(inputVideo)
        .outputOptions([
            '-c:v h264',
            '-c:a aac',
            '-strict -2',
            '-profile:v baseline',  // Add baseline profile
            '-f hls',
            '-hls_time 6', // Set the segment duration (in seconds)
            '-hls_list_size 0', // Set to 0 for an infinite playlist
            `-b:v ${variant.bitrate}`,
            `-s ${variant.resolution}`,
        ])
        .on('end', () => {
            console.log(`Conversion for ${outputName} finished!`);
        })
        .on('error', (err) => {
            console.error(`Error for ${outputName}:`, err);
        })
        .save(outputM3U8);
});
