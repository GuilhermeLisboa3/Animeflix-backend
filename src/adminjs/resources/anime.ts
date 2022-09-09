import path from "path";
import uploadFileFeature from '@adminjs/upload';
import { ResourceOptions, FeatureType } from "adminjs";

export const animeResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "uploadThumbnail",
    "featured",
    "categoryId",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "featured", "categoryId"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "featured",
    "thumbnailUrl",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};

export const animeResourceFeatures: FeatureType[] =[
  uploadFileFeature({
    provider:{
      local:{
        bucket: path.join(__dirname, "..", "..", "..", "public")
      }
    },
    properties:{
      key: 'thumbnailUrl',
      file: 'uploadThumbnail'
    },
    uploadPath: (record, filename) => `thumbnails/anime-${record.get('id')}/${filename}`
  })
]