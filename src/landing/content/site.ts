export type BikeSpec = {
  id: string;
  inquiryBikeId: string;
  name: string;
  heroTitle: string;
  watermark: string;
  category: "Tata Body Rangka" | "Full Build";
  categoryLabel: string;
  categoryLabelEn: string;
  imageUrl: string;
  width: number;
  height: number;
  standXPercent: number;
  rearXPercent: number;
  frontXPercent: number;
  facing: "right" | "left";
  platform: string;
  focus: string;
  focusEn: string;
  finishing: string;
  finishingEn: string;
};

export const BSK_BIKES: BikeSpec[] = [
  {
    id: "cb-black-gold",
    inquiryBikeId: "cb-gelatik",
    name: "CB 100 Black Gold",
    heroTitle: "CB 100 BLACK",
    watermark: "CB 100",
    category: "Tata Body Rangka",
    categoryLabel: "Tata Body & Rolling Chassis",
    categoryLabelEn: "Bodywork & Rolling Chassis",
    imageUrl: "/bikes/5.png",
    width: 1531,
    height: 944,
    standXPercent: 43,
    rearXPercent: 18,
    frontXPercent: 83,
    facing: "right",
    platform: "Rangka CB 100 / 125",
    focus: "Fitting tangki hitam lis emas, jok slim kotak, sok depan gold, dan senter as roda.",
    focusEn: "Black-gold tank fitting, slim checkered seat, gold front fork, and axle alignment.",
    finishing: "Rolling chassis presisi siap naik mesin",
    finishingEn: "Precision rolling chassis ready for engine mount",
  },
  {
    id: "cb-raw-frame",
    inquiryBikeId: "cb-gelatik",
    name: "CB Raw Frame",
    heroTitle: "CB RAW FRAME",
    watermark: "RAW CB",
    category: "Tata Body Rangka",
    categoryLabel: "Tata Body Mentahan Presisi",
    categoryLabelEn: "Raw Frame Alignment",
    imageUrl: "/bikes/8.png",
    width: 1765,
    height: 1000,
    standXPercent: 42,
    rearXPercent: 19,
    frontXPercent: 84,
    facing: "right",
    platform: "Rangka Klasik CB / GL",
    focus: "Penataan tangki bahan primer, dudukan jok tipis presisi, subframe belakang, dan slebor chrome.",
    focusEn: "Primer tank alignment, tight slim seat fitment, rear subframe, and chrome fender setup.",
    finishing: "Siap masuk proses pengecatan dan rakit mesin",
    finishingEn: "Prepared for final paintwork and engine assembly",
  },
  {
    id: "gl-slate-blue",
    inquiryBikeId: "gl-series",
    name: "GL / CB Slate Blue",
    heroTitle: "GL SLATE BLUE",
    watermark: "RESTOMOD",
    category: "Full Build",
    categoryLabel: "Full Build Resto",
    categoryLabelEn: "Full Build Restoration",
    imageUrl: "/bikes/4.png",
    width: 1706,
    height: 992,
    standXPercent: 44,
    rearXPercent: 21,
    frontXPercent: 84,
    facing: "right",
    platform: "GL Series Restomod",
    focus: "Tata body utuh, bak mesin & begel chrome, shock tabung merah, rem cakram lebar depan.",
    focusEn: "Complete bodywork, chrome engine cover & grab rail, reservoir shocks, wide front disc.",
    finishing: "Cat biru keabuan striping merah siap jalan",
    finishingEn: "Slate blue paint with red striping, road ready",
  },
  {
    id: "mp-herex",
    inquiryBikeId: "megapro",
    name: "Megapro / GL Herex",
    heroTitle: "MP GL HEREX",
    watermark: "HEREX",
    category: "Full Build",
    categoryLabel: "Full Build Racing Harian",
    categoryLabelEn: "Daily Racing Herex Build",
    imageUrl: "/bikes/7.png",
    width: 1396,
    height: 816,
    standXPercent: 43,
    rearXPercent: 18,
    frontXPercent: 84,
    facing: "right",
    platform: "Megapro / GL Racing",
    focus: "Postur rangka herex harian, jok datar presisi, knalpot racing stainless, dan shock belakang kuning.",
    focusEn: "Daily herex stance, flush flat seat, stainless racing exhaust, yellow twin shocks.",
    finishing: "Cat hitam grafis lembayung ungu-hijau",
    finishingEn: "Gloss black finish with purple-green graphic livery",
  },
  {
    id: "cb-blue-track",
    inquiryBikeId: "cb-dream",
    name: "CB Blue Track",
    heroTitle: "CB BLUE TRACK",
    watermark: "CLASSIC",
    category: "Tata Body Rangka",
    categoryLabel: "Tata Body & Kaki-Kaki",
    categoryLabelEn: "Bodywork & Suspension Setup",
    imageUrl: "/bikes/6.png",
    width: 1806,
    height: 1180,
    standXPercent: 60,
    rearXPercent: 81,
    frontXPercent: 15,
    facing: "left",
    platform: "Rangka CB Silver",
    focus: "Fitting tangki biru metalik, arm kotak kokoh, shock tabung, dan penyetelan kelurusan ban belakang.",
    focusEn: "Metallic blue tank fitment, box swingarm, reservoir shock, and rear wheel centering.",
    finishing: "Rangka silver rapi dengan cover ban kontes",
    finishingEn: "Clean silver frame with show-ready wheel setup",
  },
];

export const site = {
  name: "BSK Custom",
  slug: "bsk-custom",
  category: "Bengkel Spesialis Tata Body CB & Rangka Presisi",
  tagline: "Tata Body CB · Rangka Presisi · Custom Klasik & Herex",
  description:
    "Bengkel spesialis tata body CB, penataan rangka center, fitting tangki dan jok presisi, serta custom kaki-kaki motor klasik dan harian.",
  preview_image_url: "/logo.png",
  contact: {
    whatsapp_number: "6280000000000",
    whatsapp_is_placeholder: true,
    whatsapp_display: "[Nomor WA Admin, atur di site.ts]",
    instagram_user: "@bsk.custom",
    instagram_url: "https://instagram.com/bsk.custom",
    tiktok_url: "https://tiktok.com/@bsk.custom",
    address: "[Alamat Workshop BSK Custom, atur di site.ts]",
    hours: "[Hari & Jam Buka Workshop, atur di site.ts]",
  },
  pages: [
    {
      title: "BSK CUSTOM | Spesialis Tata Body CB & Rangka Presisi",
      slug: "home",
      order: 0,
      is_home: true,
      sections: [
        {
          type: "Navbar",
          order: 0,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "BSK Custom",
              extra: {
                home_href: "#hero",
                instagram_url: "https://instagram.com/bsk.custom",
                menu_label: "Menu",
                menu_open_aria: "Buka menu navigasi",
                menu_close_aria: "Tutup menu navigasi",
              },
              items: [
                { order: 0, title: "Showcase", icon: "#hero" },
                { order: 1, title: "Tentang", icon: "#about" },
                { order: 2, title: "Konsultasi Konsep", icon: "#inquiry" },
                { order: 3, title: "Instagram", icon: "https://instagram.com/bsk.custom" },
              ],
            },
          ],
        },
        {
          type: "Hero",
          order: 1,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Tata Body CB & Rangka Presisi",
              subtitle: "BSK CUSTOM",
              description:
                "Penataan tangki, jok, subframe, dan kelurusan kaki-kaki motor klasik maupun harian. Rapi di mata, lurus saat dikendarai.",
              extra: {
                section_id: "hero",
                primary_cta_label: "Konsultasi Konsep Garapan",
              },
            },
          ],
        },
        {
          type: "AboutSection",
          order: 2,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Tentang BSK Custom",
              subtitle: "BSK CUSTOM - SPESIALIS TATA BODY CB & RANGKA PRESISI",
              description:
                "BSK Custom berfokus menangani tata body CB, perbaikan geometri rangka, dan penataan kaki-kaki motor klasik maupun harian. Setiap unit dikerjakan dengan pengukuran senter yang teliti, pengelasan matang, serta fitting tangki dan jok yang rapat agar tampilan motor rapi sekaligus stabil dikendarai.",
              items: [
                {
                  order: 0,
                  title: "Senter Rangka & Komstir",
                  description: "Geometri leher komstir dan as roda diukur presisi agar motor stabil saat berkendara.",
                },
                {
                  order: 1,
                  title: "Las Rapi & Kokoh",
                  description: "Sambungan pipa subframe dikerjakan matang agar kuat untuk pemakaian harian maupun touring.",
                },
                {
                  order: 2,
                  title: "Fitting Tanpa Celah",
                  description: "Pertemuan tangki, jok, dan slebor ditata proporsional tanpa celah renggang.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
