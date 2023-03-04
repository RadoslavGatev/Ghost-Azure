const path = require('path');
const storage = require('../../adapters/storage');

module.exports = {
    docName: 'media',
    upload: {
        statusCode: 201,
        permissions: false,
        async query(frame) {
            let thumbnailPath = null;
            if (frame.files.thumbnail && frame.files.thumbnail[0]) {
                thumbnailPath = await storage.getStorage('media').save(frame.files.thumbnail[0]);
            }

            const filePath = await storage.getStorage('media').save(frame.files.file[0]);

            return {
                filePath,
                thumbnailPath
            };
        }
    },

    uploadThumbnail: {
        permissions: false,
        data: [
            'url',
            'ref'
        ],
        async query(frame) {
            const mediaStorage = storage.getStorage('media');
            const targetDir = path.dirname(mediaStorage.urlToPath(frame.data.url));

            // NOTE: need to cleanup otherwise the parent media name won't match thumb name
            //       due to "unique name" generation during save
            if (mediaStorage.exists(frame.file.name, targetDir)) {
                await mediaStorage.delete(frame.file.name, targetDir);
            }

            return await mediaStorage.save(frame.file, targetDir);
        }
    }
};
