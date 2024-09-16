import * as ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfprobePath('/usr/bin/ffprobe');

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