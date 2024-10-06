import * as ffmpeg from 'fluent-ffmpeg';

export default async function getVideoDuration(filePath: string): Promise<number> {

    await ffmpeg.setFfprobePath(process.env.PATH_FFPROBE);

    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          console.error('Erro ao chamar ffprobe:', err); // Log do erro
          return reject(err);
        }
        const duration = metadata.format.duration;
        resolve(duration);
      });
    });
}