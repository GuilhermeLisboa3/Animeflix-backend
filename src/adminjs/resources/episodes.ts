import uploadFileFeature from "@adminjs/upload";
import { ResourceOptions, FeatureType } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "animeId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "animeId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "animeId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "animeId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};

export const episodeResourceFeatures: FeatureType[] =[
  uploadFileFeature({
    provider:{
      local:{
        bucket: path.join(__dirname, '..', '..', '..', 'uploads')
      }
    },
    properties:{
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath:(record, filename)=>`videos/anime-${record.get('animeId')}/${filename}`
  })
]
