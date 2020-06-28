import { encode } from 'blurhash';
import MediaAsset from 'models/media-asset';
import { join, resolve } from 'path';
import sharp from 'sharp';

// https://github.com/lovell/sharp/blob/master/docs/install.md#alpine-linux
sharp.cache(false);

// https://github.com/woltapp/blurhash/issues/43#issuecomment-597674435
const encodeImageToBlurhash = (path: string): Promise<string> => {
  console.log({ path });

  return new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) {
          return reject(err);
        }

        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });
};

(async () => {
  for (const mediaAsset of await MediaAsset.findAll()) {
    if (!mediaAsset.path) {
      continue;
    }

    const blurhash = await encodeImageToBlurhash(
      join(resolve('/data'), mediaAsset.path),
    );

    mediaAsset.blurhash = blurhash;
    await mediaAsset.save();
  }

  process.exit(0);
})();
