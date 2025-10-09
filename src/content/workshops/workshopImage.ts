// import TMEw1m from "/src/images/home/events/tme/w1/TMEw1m.webp";
import CenImg from "../../assets/images/workshops/engi/engi.webp";

export interface IWorkshopImage {
  code: string;
  cover: ImageMetadata;
  subImage?: ImageMetadata[];
}

const coverImages = await import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/workshops/**/*.{webp,jpg,png}",
  {
    eager: true,
  }
);

export const getWorkshopImageByCode = (code: string): IWorkshopImage | undefined => {
  const image = workshopImages.find((img) => img.code === code);
  return image ? image : undefined;
};

export const workshopImages: IWorkshopImage[] = [
  {
    code: "CEN",
    cover: CenImg,
    subImage: [CenImg, CenImg, CenImg, CenImg],
  },
  // {
  //   code: "CHE",
  //   cover: CHEw1m,
  //   subImage: [CHEw1s1, CHEw1s2, CHEw1s3],
  // },
  // {
  //   code: "ME",
  //   cover: MEw1m,
  //   subImage: [MEw1s1, MEw1s2, MEw1s3],
  // },
  // {
  //   code: "TME",
  //   cover: TMEw1m,
  //   subImage: [TMEw1s1, TMEw1s2, TMEw1s3],
  // },
  // {
  //   code: "EE",
  //   cover: EEw1m,
  //   subImage: [EEw1s1, EEw1s2, EEw1s3],
  // },
  // {
  //   code: "EE",
  //   cover: EEw2m,
  //   subImage: [EEw2s1, EEw2s2, EEw2s3],
  // },
  // {
  //   code: "CE",
  //   cover: CEw1m,
  //   subImage: [CEw1s1, CEw1s2, CEw1s3],
  // },
  // {
  //   code: "INC",
  //   cover: INCw1m,
  //   subImage: [INCw1s1, INCw1s2, INCw1s3],
  // },
  // {
  //   code: "INC",
  //   cover: INCw2m,
  //   subImage: [INCw2s1, INCw2s2, INCw2s3],
  // },
  // {
  //   code: "INC",
  //   cover: INCw3m,
  //   subImage: [INCw3s1, INCw3s2, INCw3s3],
  // },
  // {
  //   code: "ENV",
  //   cover: ENVw1m,
  //   subImage: [ENVw1s1, ENVw1s2, ENVw1s3],
  // },

  // {
  //   code: "ENV",
  //   cover: ENVw6m,
  //   subImage: [ENVw6s1, ENVw6s2, ENVw6s3],
  // },
  // {
  //   code: "ENE",
  //   cover: ENEw1m,
  //   subImage: [ENEw1s1, ENEw1s2, ENEw1s3],
  // },
  // {
  //   code: "ENE",
  //   cover: ENEw2m,
  //   subImage: [ENEw2s1, ENEw2s2, ENEw2s3],
  // },
  // {
  //   code: "PE",
  //   cover: PEw1m,
  //   subImage: [PEw1s1, PEw1s2, PEw1s3],
  // },
];
