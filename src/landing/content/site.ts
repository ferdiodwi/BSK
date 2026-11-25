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

export type GalleryCategory = "Rangka & Kaki-Kaki" | "Unit & Proses Bengkel";

export type GalleryItem = {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  category: GalleryCategory;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
};

export const BSK_GALLERY: GalleryItem[] = [
  {
    id: "galeri-1",
    imageUrl: "/galeri/galeri1.jpeg",
    width: 1080,
    height: 1080,
    category: "Rangka & Kaki-Kaki",
    title: "CB Hitam Rolling Chassis",
    titleEn: "Black CB Rolling Chassis",
    description: "Penataan rangka hitam, swingarm perak, dan shock tabung belakang di depan workshop BSK.",
    descriptionEn: "Black frame setup, silver swingarm, and reservoir twin shocks at BSK workshop.",
  },
  {
    id: "galeri-2",
    imageUrl: "/galeri/galeri2.jpeg",
    width: 1080,
    height: 1080,
    category: "Rangka & Kaki-Kaki",
    title: "Tata Body & Tangki Mentahan",
    titleEn: "Raw Tank & Slim Seat Fitment",
    description: "Fitting tangki mentahan dengan jok slim datar dan kaki-kaki depan USD.",
    descriptionEn: "Raw metal tank fitment paired with slim flat seat and USD front fork.",
  },
  {
    id: "galeri-3",
    imageUrl: "/galeri/galeri3.jpeg",
    width: 1206,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Detail Kaki Belakang & Jok Slim",
    titleEn: "Rear Stance & Flush Seat",
    description: "Jarak ban ke slebor belakang, shock gold, dan dudukan jok rata rangka.",
    descriptionEn: "Rear tire-to-fender clearance, gold shocks, and flush seat frame mount.",
  },
  {
    id: "galeri-4",
    imageUrl: "/galeri/galeri4.jpeg",
    width: 1206,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Rangka Mentahan & Subframe",
    titleEn: "Raw Frame & Subframe Fabrication",
    description: "Penyelarasan rangka dasar, lengan ayun, dan dudukan shock ganda.",
    descriptionEn: "Baseline frame alignment, swingarm setup, and twin shock mounts.",
  },
  {
    id: "galeri-5",
    imageUrl: "/galeri/galeri5.jpeg",
    width: 1206,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Setelan Sok Depan & Cakram",
    titleEn: "Front Fork & Wide Brake Setup",
    description: "Pemasangan shock gold, pelek jari-jari hitam, dan pengereman cakram lebar.",
    descriptionEn: "Gold front fork alignment, black spoke rims, and wide front disc brake.",
  },
  {
    id: "galeri-6",
    imageUrl: "/galeri/galeri6.jpeg",
    width: 1200,
    height: 1600,
    category: "Unit & Proses Bengkel",
    title: "CB 100 Black Gold Garapan BSK",
    titleEn: "CB 100 Black Gold Workshop Build",
    description: "Rangka silver, tangki hitam lis emas, dan ruang mesin terbuka saat penyetelan.",
    descriptionEn: "Silver frame, black-gold tank livery, and open engine bay during alignment.",
  },
  {
    id: "galeri-7",
    imageUrl: "/galeri/galeri7.jpeg",
    width: 1206,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Rolling Chassis CB Raw Silver",
    titleEn: "Raw Silver CB Rolling Chassis",
    description: "Pemasangan tangki mentahan rata komstir dengan jok slim dan kaki-kaki utuh.",
    descriptionEn: "Level primer tank alignment with slim seat and complete front-rear suspension.",
  },
  {
    id: "galeri-8",
    imageUrl: "/galeri/galeri8.jpeg",
    width: 1206,
    height: 1600,
    category: "Unit & Proses Bengkel",
    title: "Restomod CB Biru Muda",
    titleEn: "Light Blue CB Restomod",
    description: "Rangka silver rapi dengan bodi biru metalik dan shock tabung belakang.",
    descriptionEn: "Clean silver frame paired with metallic blue tank and rear reservoir shocks.",
  },
  {
    id: "galeri-9",
    imageUrl: "/galeri/galeri9.jpeg",
    width: 1206,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Fitting Bodi Mentahan & Slebor",
    titleEn: "Raw Tank & Contrast Fender Fitment",
    description: "Penataan postur rangka dengan tangki mentahan dan slebor depan kontras.",
    descriptionEn: "Frame stance calibration with raw steel tank and front fender alignment.",
  },
  {
    id: "galeri-10",
    imageUrl: "/galeri/galeri10.jpeg",
    width: 1206,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Setting Paddock & Pelek Jari-Jari",
    titleEn: "Paddock Stand Wheel Centering",
    description: "Pengecekan kelurusan kaki-kaki belakang di atas standar paddock bengkel.",
    descriptionEn: "Rear wheel centerline calibration checked directly on the workshop paddock stand.",
  },
  {
    id: "galeri-11",
    imageUrl: "/galeri/galeri11.jpeg",
    width: 1080,
    height: 1080,
    category: "Rangka & Kaki-Kaki",
    title: "Detail Las Subframe & Dudukan Shock",
    titleEn: "Subframe Weld & Shock Mount Detail",
    description: "Sambungan las pipa rangka dan bracket footstep yang kokoh dan simetris.",
    descriptionEn: "Clean welded subframe pipe joints and symmetrical billet footpeg bracket.",
  },
  {
    id: "galeri-12",
    imageUrl: "/galeri/galeri12.jpeg",
    width: 1080,
    height: 1080,
    category: "Unit & Proses Bengkel",
    title: "CB Biru Striping Putih Utuh",
    titleEn: "Complete Blue CB Classic Unit",
    description: "Unit CB lengkap dengan mesin terpasang, rangka hitam rapi, dan bodi presisi.",
    descriptionEn: "Running CB build with engine mounted, clean black frame, and tight body fitment.",
  },
  {
    id: "galeri-13",
    imageUrl: "/galeri/galeri13.jpeg",
    width: 1080,
    height: 1080,
    category: "Rangka & Kaki-Kaki",
    title: "Kokpit Segitiga T & Setang",
    titleEn: "CNC Triple Clamp & Handlebar",
    description: "Senter leher komstir, segitiga CNC silver, dan posisi setang proporsional.",
    descriptionEn: "Steering stem alignment, CNC silver triple tree, and balanced handlebar stance.",
  },
  {
    id: "galeri-14",
    imageUrl: "/galeri/galeri14.jpeg",
    width: 1080,
    height: 1080,
    category: "Unit & Proses Bengkel",
    title: "CB Hitam Striping Klasik",
    titleEn: "Classic Black CB Chassis",
    description: "Tata body tangki hitam klasik dengan rangka krom dan dudukan jok slim.",
    descriptionEn: "Classic black-striped tank fitment on polished frame rails with slim seat.",
  },
  {
    id: "galeri-15",
    imageUrl: "/galeri/galeri15.jpeg",
    width: 1080,
    height: 1080,
    category: "Rangka & Kaki-Kaki",
    title: "Setup Shock Tabung & Footstep",
    titleEn: "Reservoir Shock Angle & Footpeg",
    description: "Posisi kemiringan shock tabung belakang dan bracket footstep aluminium.",
    descriptionEn: "Measured rear reservoir shock rake angle and aluminum rearset bracket.",
  },
  {
    id: "galeri-16",
    imageUrl: "/galeri/galeri16.jpeg",
    width: 1080,
    height: 1080,
    category: "Rangka & Kaki-Kaki",
    title: "Komstir, Rangka Mentahan & Kaliper",
    titleEn: "Steering Neck & Front Brake Caliper",
    description: "Geometri leher rangka depan berpadu kaliper rem depan dan cakram lebar.",
    descriptionEn: "Raw steering neck gusset work paired with Brembo caliper and wide rotor.",
  },
  {
    id: "galeri-17",
    imageUrl: "/galeri/galeri17.jpeg",
    width: 1200,
    height: 1600,
    category: "Unit & Proses Bengkel",
    title: "CB Biru Tua Rangka Silver",
    titleEn: "Deep Blue CB Silver Frame",
    description: "Tata body rapi di atas rangka silver dengan shock depan emas.",
    descriptionEn: "Tight bodywork alignment over silver-painted frame with gold front forks.",
  },
  {
    id: "galeri-18",
    imageUrl: "/galeri/galeri18.jpeg",
    width: 1200,
    height: 1600,
    category: "Unit & Proses Bengkel",
    title: "Unit Jadi CB Tangki Oranye",
    titleEn: "Complete Orange Tank CB Build",
    description: "Garapan lengkap bermesin tegak, knalpot stainless, dan shock gold siap jalan.",
    descriptionEn: "Finished upright-engine CB build with stainless pipe and gold suspension.",
  },
  {
    id: "galeri-19",
    imageUrl: "/galeri/galeri19.jpeg",
    width: 1189,
    height: 1600,
    category: "Unit & Proses Bengkel",
    title: "Trail KLX di Workshop BSK",
    titleEn: "KLX Trail Setup at BSK",
    description: "Penanganan motor trail KLX dan setelan kaki-kaki di bengkel BSK Custom.",
    descriptionEn: "Off-road trail bike and suspension servicing right inside BSK workshop.",
  },
  {
    id: "galeri-20",
    imageUrl: "/galeri/galeri20.jpeg",
    width: 960,
    height: 1280,
    category: "Unit & Proses Bengkel",
    title: "Pengerjaan Mesin & Kelistrikan",
    titleEn: "Engine & Wiring Assembly",
    description: "Builder BSK Custom menyetel jalur kabel bodi dan ruang mesin CB oranye.",
    descriptionEn: "BSK builder routing the wiring loom and dialing in the engine bay.",
  },
  {
    id: "galeri-21",
    imageUrl: "/galeri/galeri21.jpeg",
    width: 960,
    height: 1280,
    category: "Unit & Proses Bengkel",
    title: "Penyetelan Karbu & Sektor Mesin",
    titleEn: "Carburetor & Engine Tuning",
    description: "Pemeriksaan area dapur pacu, pengapian, dan kelengkapan mesin harian.",
    descriptionEn: "Detailed inspection of carburetor tuning, ignition, and daily engine readiness.",
  },
  {
    id: "galeri-22",
    imageUrl: "/galeri/galeri22.jpeg",
    width: 960,
    height: 1280,
    category: "Rangka & Kaki-Kaki",
    title: "CB Blue Track Chassis",
    titleEn: "CB Blue Track Rolling Chassis",
    description: "Rangka silver rapi, tangki biru metalik, dan cover ban persiapan turun.",
    descriptionEn: "Clean silver frame, metallic blue tank, and wheel-covered show preparation.",
  },
  {
    id: "galeri-23",
    imageUrl: "/galeri/galeri23.jpeg",
    width: 1200,
    height: 1600,
    category: "Rangka & Kaki-Kaki",
    title: "Perakitan CB Raw Frame",
    titleEn: "CB Raw Frame Bench Assembly",
    description: "Proses tata tangki mentahan dan subframe di area kerja dalam bengkel.",
    descriptionEn: "Raw tank fitting and subframe welding right on the indoor workshop bay.",
  },
  {
    id: "galeri-24",
    imageUrl: "/galeri/galeri24.jpeg",
    width: 960,
    height: 1280,
    category: "Unit & Proses Bengkel",
    title: "Megapro / GL Herex Grafis",
    titleEn: "Megapro / GL Daily Herex Build",
    description: "Postur herex harian lengkap mesin, knalpot racing stainless, dan bodi hitam.",
    descriptionEn: "Daily herex stance complete with tuned engine, stainless pipe, and black livery.",
  },
  {
    id: "galeri-25",
    imageUrl: "/galeri/galeri25.jpeg",
    width: 960,
    height: 1280,
    category: "Rangka & Kaki-Kaki",
    title: "CB 100 Black Gold Chassis",
    titleEn: "CB 100 Black Gold Frame Setup",
    description: "Unit rolling chassis tangki hitam lis emas berdiri di depan workshop BSK.",
    descriptionEn: "Black-gold rolling chassis standing outside the BSK Custom bay.",
  },
  {
    id: "galeri-26",
    imageUrl: "/galeri/galeri26.jpeg",
    width: 960,
    height: 1280,
    category: "Unit & Proses Bengkel",
    title: "GL / CB Slate Blue Restomod",
    titleEn: "GL / CB Slate Blue Restomod",
    description: "Unit lengkap striping merah dan bak mesin poles berdiri di workshop.",
    descriptionEn: "Complete slate blue restomod with polished covers standing at the shop.",
  },
];

export type TestimonialItem = {
  id: string;
  name: string;
  bike: string;
  bikeEn: string;
  quote: string;
  quoteEn: string;
  is_sample?: boolean;
};

// Natural sample reviews tailored to Jember & Bondowoso CB workshop style (swap with verified owner reviews when ready)
export const BSK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Rendy Pratama",
    bike: "Honda CB 100 · Jember",
    bikeEn: "Honda CB 100 · Jember",
    quote:
      "Dulu pangkon tangki CB-ku ndongak, joknya juga renggang. Habis masuk BSK langsung rapet nempel rek, diajak lari kenceng tetep lempeng gak narik.",
    quoteEn:
      "My CB tank mount used to nose up with a huge seat gap. After BSK aligned it, the fitment sits tight and the bike tracks straight at speed.",
    is_sample: true,
  },
  {
    id: "testi-2",
    name: "Bagas Kurniawan",
    bike: "Megapro Primus · Bondowoso",
    bikeEn: "Megapro Primus · Bondowoso",
    quote:
      "Las subframenya rapi pol mas, gak asal tempel. Dipake turing luar kota tetep anteng, dilihat dari samping juga makin mbois.",
    quoteEn:
      "The subframe welds are super clean and solid. Steady out on long rides, and the side stance looks sharp.",
    is_sample: true,
  },
  {
    id: "testi-3",
    name: "Fajar Hidayat",
    bike: "Honda GL 100 · Jember",
    bikeEn: "Honda GL 100 · Jember",
    quote:
      "Komstir sama arm belakang beneran disenter ulang di sini. Dulu motorku agak buang ke kiri, sekarang lepas stang bentar aja wis lurus anteng.",
    quoteEn:
      "Steering neck and swingarm centering were dialed back in properly. My bike used to pull left; now it tracks dead straight.",
    is_sample: true,
  },
  {
    id: "testi-4",
    name: "Dwiki Ramadhan",
    bike: "CB Gelatik · Bondowoso",
    bikeEn: "CB Gelatik · Bondowoso",
    quote:
      "Enak diajak rembukan konsep pas bawa part sendiri. Jok tipis sama slebornya pas bener gak ada celah, tinggal langsung naik cat.",
    quoteEn:
      "Easy to bounce ideas around even when bringing my own parts. Slim seat and rear fender sit flush with zero gap, ready for paint.",
    is_sample: true,
  },
  {
    id: "testi-5",
    name: "Ilham Saputra",
    bike: "GL Pro Herex · Bondowoso",
    bikeEn: "GL Pro Herex · Bondowoso",
    quote:
      "Tadinya cuma mau tata bodi, eh sekalian tune-up harian juga. Setting karbu sama klepnya pas pol, tarikan bawahnya ngisi buat gas tipis-tipis.",
    quoteEn:
      "Came in just for bodywork and ended up getting a daily tune-up too. Carb and valve setup feels crisp right off idle.",
    is_sample: true,
  },
  {
    id: "testi-6",
    name: "Wahyu Nugroho",
    bike: "Honda Tiger 2000 · Jember",
    bikeEn: "Honda Tiger 2000 · Jember",
    quote:
      "Kabel bodi dirapiin ngumpet di balik tangki cek gak semrawut. Kelistrikan aman, lampu terang, dibawa jalan malem udah gak was-was.",
    quoteEn:
      "Wiring loom tucked neatly under the tank so nothing looks messy. Solid electricals and bright headlight at night.",
    is_sample: true,
  },
  {
    id: "testi-7",
    name: "Andika Mahendra",
    bike: "CB Dream · Situbondo",
    bikeEn: "CB Dream · Situbondo",
    quote:
      "As roda sama jalur rantai diukur teliti tenan di sini lur, bukan asal pasang. Setelan rantai enteng, ban belakang lempeng sejajar slebor.",
    quoteEn:
      "Front axle and chain tracking are measured carefully here, not slapped together. Adjusters turn smooth and the rear tire sits dead center.",
    is_sample: true,
  },
  {
    id: "testi-8",
    name: "Hendra Wijaya",
    bike: "Honda GL Max · Jember",
    bikeEn: "Honda GL Max · Jember",
    quote:
      "Pangkon shock dobelnya pas kiri-kanan rek. Buat boncengan tetep anteng gak oleng, tampilannya dapet, dipake harian juga nyaman pol.",
    quoteEn:
      "Twin shock mounts sit dead even left and right. Stable even riding two-up, looks clean, and rides comfortable every day.",
    is_sample: true,
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
    whatsapp_number: "6282223145215",
    whatsapp_is_placeholder: false,
    whatsapp_display: "+62 822-2314-5215",
    instagram_user: "@bsk_custom_wwe",
    instagram_url: "https://instagram.com/bsk_custom_wwe",
    tiktok_url: "https://tiktok.com/@bsk.custom",
    address: "BSK CUSTOM (Pin Lokasi Google Maps)",
    hours: "Konfirmasi jadwal & antrean via WhatsApp sebelum datang.",
    maps_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.294189781254!2d113.762836!3d-8.071447100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6eb0049ae15a7%3A0xf1b87ec022ef0a96!2sBSK%20CUSTOM!5e0!3m2!1sid!2sid!4v1795635024596!5m2!1sid!2sid",
    maps_url: "https://www.google.com/maps/search/?api=1&query=-8.0714471%2C113.762836",
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
                instagram_url: "https://instagram.com/bsk_custom_wwe",
                menu_label: "Menu",
                menu_open_aria: "Buka menu navigasi",
                menu_close_aria: "Tutup menu navigasi",
              },
              items: [
                { order: 0, title: "Showcase", icon: "#hero" },
                { order: 1, title: "Tentang", icon: "#about" },
                { order: 2, title: "Layanan", icon: "#layanan" },
                { order: 3, title: "Galeri", icon: "#galeri" },
                { order: 4, title: "Testimoni", icon: "#testimoni" },
                { order: 5, title: "Kontak", icon: "#kontak" },
                { order: 6, title: "Instagram", icon: "https://instagram.com/bsk_custom_wwe" },
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
              subtitle: "SPESIALIS TATA BODY CB & RANGKA PRESISI",
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
        {
          type: "ServicePackages",
          order: 3,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Rapi di tata body.",
              subtitle: "LAYANAN BENGKEL & GARAPAN CUSTOM",
              extra: {
                title_line2: "Presisi di rangka & mesin.",
              },
              items: [
                {
                  order: 0,
                  id: "full-rangka",
                  title: "Custom Rangka & Subframe",
                  description:
                    "Pembuatan dan perbaikan geometri rangka CB, GL, Megapro, hingga Tiger. Mulai dari potong-sambung subframe pipa seamless, las dudukan shock, sampai senter leher komstir agar lurus dikendarai.",
                  extra: {
                    span: 2,
                    iconKey: "rangka",
                    ctaLabel: "Konsultasi custom rangka",
                    tags: ["Potong & Sambung Subframe", "Senter Komstir", "Las Pipa Tebal"],
                  },
                },
                {
                  order: 1,
                  id: "standar",
                  title: "Tata Body & Fitting",
                  description:
                    "Penataan set bodi proporsional tanpa celah renggang: tangki duduk rata, jok slim ngepress rangka, serta pemasangan slebor dan begel.",
                  extra: {
                    span: 1,
                    iconKey: "body",
                    ctaLabel: "Konsultasi tata body",
                    tags: ["Fitting Tangki Rata", "Jok Slim Rapi", "Slebor & Begel"],
                  },
                },
                {
                  order: 2,
                  id: "kaki-kaki",
                  title: "Rolling Chassis & Kaki-Kaki",
                  description:
                    "Penyelarasan sektor kaki-kaki depan dan belakang: setel swingarm, dudukan cakram, kemiringan shock, dan senter jalur rantai serta as roda.",
                  extra: {
                    span: 1,
                    featured: true,
                    iconKey: "kaki",
                    ctaLabel: "Konsultasi kaki-kaki",
                    tags: ["Senter As Roda", "Setel Swingarm", "Jalur Rantai Lurus"],
                  },
                },
                {
                  order: 3,
                  id: "mesin",
                  title: "Garap Mesin, Tune-Up & Herex",
                  description:
                    "Penanganan dapur pacu untuk kebutuhan harian tangguh maupun spek touring dan herex. Meliputi servis rutin, korek harian, setting rasio, setel klep, serta penataan karburator atau throttle body.",
                  extra: {
                    span: 2,
                    iconKey: "mesin",
                    ctaLabel: "Konsultasi garap mesin",
                    tags: ["Tune-Up & Servis", "Spek Harian / Herex", "Karbu & Klep"],
                  },
                },
                {
                  order: 4,
                  id: "kelistrikan",
                  title: "Kelistrikan & Pengapian",
                  description:
                    "Perakitan dan perapihan jalur kabel bodi tersembunyi agar rangka bersih, pengecekan pengapian, kiprok, hingga instalasi lampu stabil.",
                  extra: {
                    span: 1,
                    iconKey: "kelistrikan",
                    ctaLabel: "Konsultasi kelistrikan",
                    tags: ["Kabel Bodi Rapi", "Cek Pengapian", "Full DC & Lampu"],
                  },
                },
                {
                  order: 5,
                  id: "mentahan",
                  title: "Rakitan Mentahan & Unit Utuh",
                  description:
                    "Perakitan motor dari rangka dasar sampai berdiri utuh siap jalan. Mencakup penataan braket, dudukan mesin, kelengkapan mekanis, dan pengecekan ulang sebelum turun jalan.",
                  extra: {
                    span: 1,
                    iconKey: "mentahan",
                    ctaLabel: "Konsultasi rakitan",
                    tags: ["Rakit Rolling Unit", "Braket & Dudukan", "Siap Turun Jalan"],
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
              title: "Galeri Unit & Rangka BSK",
              subtitle: "DOKUMENTASI GARAPAN NYATA",
            },
          ],
        },
        {
          type: "TestimonialsSection",
          order: 5,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Kata Anak Motor.",
              subtitle: "CERITA DARI BENGKEL",
              extra: {
                title_line2: "Lempeng, Rapi, Enak Dipake.",
              },
            },
          ],
        },
        {
          type: "ContactSection",
          order: 6,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "Hubungi BSK Custom",
              subtitle: "KONTAK & KONSULTASI BENGKEL",
              description:
                "Mau tanya soal tata bodi, custom rangka, kaki-kaki, atau janjian mampir ke bengkel? Kirim pesan lewat form di sebelah atau langsung chat WhatsApp.",
            },
          ],
        },
      ],
    },
  ],
};
