import * as ffmpeg from 'fluent-ffmpeg';
import { env } from 'process';

ffmpeg.setFfprobePath(process.env.PATH_FFPROBE);

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