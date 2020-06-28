import MediaAsset from 'models/media-asset';
import path from 'path';

(async () => {
  for (const mediaAsset of await MediaAsset.findAll()) {
    if (!mediaAsset.path) {
      continue;
    }

    const location = path.join(path.resolve('/data'), mediaAsset.path);

    console.log({ location });
  }

  process.exit(0);
})();
