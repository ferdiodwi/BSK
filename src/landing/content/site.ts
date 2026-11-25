export type BikeSpec = {
  id: string;
  inquiryBikeId: string;
  name: string;
  watermark: string;
  category: "Tata Body Rangka" | "Full Build";
  categoryLabel: string;
  categoryLabelEn: string;
  imageUrl: string;
  facing: "right" | "left";
  platform: string;
  focus: string;
  focusEn: string;
  finishing: string;
  finishingEn: string;
};

export type AnatomyPoint = {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  xPercent: number;
  yPercent: number;
  standard: string;
  standardEn: string;
  detail: string;
  detailEn: string;
};

export const BSK_BIKES: BikeSpec[] = [
  {
    id: "cb-black-gold",
    inquiryBikeId: "cb-gelatik",
    name: "CB 100 Black Gold",
    watermark: "CB 100",
    category: "Tata Body Rangka",
    categoryLabel: "Tata Body & Rolling Chassis",
    categoryLabelEn: "Bodywork & Rolling Chassis",
    imageUrl: "/bikes/5.png",
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
    watermark: "RAW CB",
    category: "Tata Body Rangka",
    categoryLabel: "Tata Body Mentahan Presisi",
    categoryLabelEn: "Raw Frame Alignment",
    imageUrl: "/bikes/8.png",
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
    watermark: "RESTOMOD",
    category: "Full Build",
    categoryLabel: "Full Build Resto",
    categoryLabelEn: "Full Build Restoration",
    imageUrl: "/bikes/4.png",
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
    watermark: "HEREX",
    category: "Full Build",
    categoryLabel: "Full Build Racing Harian",
    categoryLabelEn: "Daily Racing Herex Build",
    imageUrl: "/bikes/7.png",
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
    watermark: "CLASSIC",
    category: "Tata Body Rangka",
    categoryLabel: "Tata Body & Kaki-Kaki",
    categoryLabelEn: "Bodywork & Suspension Setup",
    imageUrl: "/bikes/6.png",
    facing: "left",
    platform: "Rangka CB Silver",
    focus: "Fitting tangki biru metalik, arm kotak kokoh, shock tabung, dan penyetelan kelurusan ban belakang.",
    focusEn: "Metallic blue tank fitment, box swingarm, reservoir shock, and rear wheel centering.",
    finishing: "Rangka silver rapi dengan cover ban kontes",
    finishingEn: "Clean silver frame with show-ready wheel setup",
  },
];

export const ANATOMY_POINTS: AnatomyPoint[] = [
  {
    id: "komstir",
    number: "01",
    title: "Komstir & Leher Rangka",
    titleEn: "Steering Head & Neck Alignment",
    xPercent: 60,
    yPercent: 45,
    standard: "Sudut Rake Simetris & Bebas Oblak",
    standardEn: "Symmetrical Rake Angle & Zero Play",
    detail: "Kelurusan leher komstir diperiksa dengan mal ukur agar motor tetap lurus stabil saat lepas stang di kecepatan tinggi.",
    detailEn: "Steering neck alignment is checked with precision jigs so tracking stays straight at highway speed.",
  },
  {
    id: "tangki-jok",
    number: "02",
    title: "Pertemuan Tangki & Jok",
    titleEn: "Tank-to-Seat Flush Fitment",
    xPercent: 46,
    yPercent: 46,
    standard: "Garis Bodi Datar Tanpa Celah Renggang",
    standardEn: "Flush Profile With Zero Awkward Gap",
    detail: "Dudukan karet dan kait tangki disetel ulang supaya posisi tangki tidak mendongak dan ujung jok menempel rapat mengikuti lekuk tangki.",
    detailEn: "Tank mounts are repositioned so the tank sits level and the seat nose hugs the rear tank contour tightly.",
  },
  {
    id: "subframe",
    number: "03",
    title: "Subframe & Dudukan Shock",
    titleEn: "Subframe & Shock Mounts",
    xPercent: 31,
    yPercent: 52,
    standard: "Las Penetrasi Penuh & Kiri-Kanan Sejajar",
    standardEn: "Full-Penetration Weld & Equal Left-Right Geometry",
    detail: "Pemotongan dan penyambungan pipa subframe memakai pengelasan matang serta dudukan shock dobel yang simetris kiri-kanan.",
    detailEn: "Subframe pipe fabrication uses full-penetration welds with symmetrical left and right shock mounting bosses.",
  },
  {
    id: "arm-roda",
    number: "04",
    title: "Swingarm & Senter As Roda",
    titleEn: "Swingarm & Axle Centering",
    xPercent: 26,
    yPercent: 67,
    standard: "Senter Ban, Slebor & Gir Sejalur",
    standardEn: "Wheel, Fender & Sprocket Inline Alignment",
    detail: "Penataan bushing swingarm, jarak ban terhadap slebor belakang, serta garis rantai agar ban berputar lurus tanpa gesekan.",
    detailEn: "Swingarm bushings, rear fender clearance, and chain line are aligned so the rear wheel tracks true without rubbing.",
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
                { order: 1, title: "Anatomi Presisi", icon: "#anatomi" },
                { order: 2, title: "Layanan & Paket", icon: "#paket" },
                { order: 3, title: "Galeri Unit", icon: "#galeri" },
                { order: 4, title: "Bengkel", icon: "#bengkel" },
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
              subtitle: "TATA BODY CB",
              description:
                "Penataan tangki, jok, subframe, dan kelurusan kaki-kaki motor klasik maupun harian. Rapi di mata, lurus saat dikendarai.",
              extra: {
                section_id: "hero",
                primary_cta_label: "Konsultasi Konsep",
                secondary_cta_label: "Lihat Detail Garapan",
              },
            },
          ],
        },
        {
          type: "AnatomySection",
          order: 2,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Anatomi Tata Body Presisi",
              subtitle: "INSPEKSI TEKNIS",
              description:
                "Pilih titik pemeriksaan pada motor untuk melihat standar pengerjaan dan penyetelan BSK Custom.",
            },
          ],
        },
        {
          type: "ServicePackages",
          order: 3,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Layanan Tata Body & Jasa Bengkel",
              subtitle: "RUANG LINGKUP GARAPAN",
              description:
                "Penentuan rincian pengerjaan disesuaikan dengan kondisi rangka awal, basis motor, dan kelengkapan part. Kirim konsep motor Anda untuk cek jadwal dan penawaran langsung via WhatsApp.",
              extra: {
                note: "Waktu pengerjaan bergantung pada antrean bengkel, kondisi rangka awal, dan ketersediaan part.",
              },
              items: [
                {
                  order: 0,
                  id: "standar",
                  title: "Paket Tata Body Standar",
                  description:
                    "Pemasangan set bodi lengkap: dudukan tangki, setting jok presisi, dudukan slebor depan dan belakang, serta begel.",
                  extra: {
                    duration: "3 - 5 Hari Kerja",
                    scope: "Fitting Bodi & Braket",
                    highlights: [
                      "Fitting tangki rata tidak mendongak",
                      "Dudukan jok presisi tanpa celah",
                      "Penataan slebor, begel, dan stoplamp",
                    ],
                  },
                },
                {
                  order: 1,
                  id: "full-rangka",
                  title: "Paket Full Rangka & Senter Kaki",
                  description:
                    "Penyelarasan rangka total, bikin subframe pipa seamless baru, dudukan shock dobel simetris, dan senter as roda depan-belakang.",
                  extra: {
                    duration: "5 - 7 Hari Kerja",
                    scope: "Fabrikasi Subframe & Alignment",
                    featured: true,
                    highlights: [
                      "Semua cakupan Paket Standar",
                      "Potong dan sambung subframe pipa tebal",
                      "Senter as roda depan, swingarm, dan gir",
                    ],
                  },
                },
                {
                  order: 2,
                  id: "restorasi",
                  title: "Paket Restorasi Komplit + Cat Oven",
                  description:
                    "Bangun motor dari rangka dasar: tata body penuh, repaint oven 3 lapis rangka dan bodi, serta perakitan kabel bodi tersembunyi.",
                  extra: {
                    duration: "10 - 14 Hari Kerja",
                    scope: "Bangun Ulang & Finishing",
                    highlights: [
                      "Full tata body & alignment rangka",
                      "Repaint oven 3 lapis rangka dan tangki",
                      "Rakit kabel bodi rapi tersembunyi",
                    ],
                  },
                },
                {
                  order: 3,
                  id: "tune-up",
                  title: "Paket Tune-Up & Setting Harian / Herex",
                  description:
                    "Perawatan performa mesin dan kelistrikan: servis karburator atau throttle body, setel klep, cek pengapian, dan ganti oli.",
                  extra: {
                    duration: "1 - 2 Hari Kerja",
                    scope: "Performa Mesin & Kelistrikan",
                    highlights: [
                      "Servis karburator atau throttle body",
                      "Setting celah klep dan kelistrikan",
                      "Uji jalan respons tarikan",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          type: "ShowcaseGallery",
          order: 4,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Galeri 5 Unit Garapan BSK",
              subtitle: "UNIT NYATA WORKSHOP",
              description:
                "Lima contoh hasil penataan rangka dan full build dari studio BSK Custom. Klik unit untuk melihat spesifikasi ubahan lengkap.",
            },
          ],
        },
        {
          type: "WorkshopSection",
          order: 5,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Alur Kerja Bengkel",
              subtitle: "KONSULTASI & LOKASI",
              description:
                "Setiap unit melewati tahapan ukur sebelum las untuk menjamin kestabilan berkendara dan kerapian tampilan.",
              items: [
                {
                  order: 0,
                  title: "01. Cek Rangka Awal",
                  description: "Pemeriksaan kondisi leher komstir, lengan ayun, dan titik simetris rangka dasar.",
                },
                {
                  order: 1,
                  title: "02. Penentuan Konsep",
                  description: "Pemilihan tangki, jok, dan jarak main suspensi serta persetujuan rincian pengerjaan.",
                },
                {
                  order: 2,
                  title: "03. Fabrikasi & Las",
                  description: "Pemotongan, penyambungan subframe, serta pembuatan braket bodi yang kokoh.",
                },
                {
                  order: 3,
                  title: "04. Senter Kaki-Kaki",
                  description: "Penyelarasan as roda depan-belakang, posisi slebor, dan jalur rantai.",
                },
                {
                  order: 4,
                  title: "05. Finishing & Uji Jalan",
                  description: "Pembersihan las, perakitan akhir, dan pengecekan kestabilan sebelum serah terima.",
                },
              ],
            },
          ],
        },
        {
          type: "Footer",
          order: 6,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "BSK Custom",
              description: "Spesialis Tata Body CB & Rangka Presisi",
              extra: {
                copyright: "© 2026 BSK Custom. Tata Body CB & Rangka Presisi.",
              },
            },
          ],
        },
      ],
    },
  ],
};
