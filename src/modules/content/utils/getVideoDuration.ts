import * as ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfprobePath('C:\\Users\\macie\\Downloads\\ffmpeg-master-latest-win64-gpl\\ffmpeg-master-latest-win64-gpl\\bin\\ffprobe.exe');

export default function getVideoDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          return reject(err);
        }
        const duration = metadata.format.duration;
        resolve(duration);
      });
    });
}