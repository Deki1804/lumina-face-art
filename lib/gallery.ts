export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

export type GalleryGroup = {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

export const galleryGroups: GalleryGroup[] = [
  {
    id: "rodjendani",
    title: "Rođendani",
    description: "Oslikavanje lica za dječje rođendane.",
    images: [

    ],
  },
  {
    id: "eventi",
    title: "Eventi",
    description: "Face painting za vrtiće, fešte i posebne prigode.",
    images: [

    ],
  },
  {
    id: "motivi",
    title: "Motivi",
    description: "Primjeri motiva, likova, leptira, vila i čarobnih detalja.",
    images: [

    ],
  }
];
