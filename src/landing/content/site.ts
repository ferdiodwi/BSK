export const site = {
  name: "BSK Custom",
  slug: "bsk-custom",
  category: "Bengkel Spesialis Tata Body CB & Rangka Presisi",
  tagline: "Tata Body CB · Rangka Presisi · Custom Classic & Herex",
  description:
    "Bengkel spesialis tata body CB, restorasi rangka presisi, custom bodi, dan setting kaki-kaki motor klasik/herex. Rapi, center, bergaransi, dan siap harian maupun kontes.",
  preview_image_url: "/logo.png",
  contact: {
    whatsapp: "6285159506662",
    instagram: "bsk.custom",
    instagram_url: "https://instagram.com/bsk.custom",
    tiktok_url: "https://tiktok.com/@bsk.custom",
    address: "Jl. Otomotif Presisi No. 12, Workshop BSK Custom",
    operating_hours: "Senin - Sabtu: 08:30 - 17:30 WIB",
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
                home_href: "#top",
                whatsapp_number: "6285159506662",
                instagram_user: "@bsk.custom",
                lang_id_label: "ID",
                lang_en_label: "EN",
                menu_label: "Menu",
                menu_open_aria: "Buka menu navigasi",
                menu_close_aria: "Tutup menu navigasi",
              },
              items: [
                { order: 0, title: "Layanan", icon: "#services" },
                { order: 1, title: "Proses SOP", icon: "#process" },
                { order: 2, title: "Estimator", icon: "#estimator" },
                { order: 3, title: "Galeri", icon: "#gallery" },
                { order: 4, title: "Keunggulan", icon: "#why-us" },
                { order: 5, title: "Testimoni", icon: "#testimonials" },
                { order: 6, title: "Workshop", icon: "#contact" },
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
              title: "PRESISI RANGKA",
              subtitle: "SEMPURNA DI SETIAP SUDUT",
              description:
                "Bengkel spesialis tata body CB, restorasi rangka center, dan custom kaki-kaki motor klasik/herex. Dikerjakan dengan alat ukur presisi dan standar pengerjaan rapi tanpa kompromi.",
              extra: {
                section_id: "top",
                badge_text: "SPESIALIS TATA BODY CB & HEREX",
                seal_top: "PRESISI",
                seal_bottom: "GARANSI",
                stat_bikes: "1.200+",
                stat_bikes_label: "Motor Ditata Center",
                stat_rating: "4.9 ★",
                stat_rating_label: "Kepuasan Komunitas",
                stat_warranty: "100%",
                stat_warranty_label: "Garansi Rangka Lurus",
                whatsapp_number: "6285159506662",
                primary_cta_label: "Hitung Estimasi Biaya",
                secondary_cta_label: "Konsultasi WhatsApp",
              },
              items: [
                {
                  order: 0,
                  title: "Honda CB Gelatik / 100",
                  description: "Aliran klasik orisinil atau kontes, tangki presisi nempel rapi dengan jok tipis.",
                  extra: {
                    badge: "Kategori Klasik",
                    base_price: 650000,
                  },
                },
                {
                  order: 1,
                  title: "Honda CB Dream / Twin",
                  description: "Proporsi tangki besar dengan subframe kokoh dan center roda depan-belakang segaris.",
                  extra: {
                    badge: "Kategori Touring",
                    base_price: 750000,
                  },
                },
                {
                  order: 2,
                  title: "Honda GL / Megapro Herex",
                  description: "Setting rangka racing harian/touring, sok depan tinggi, arm kokoh siap tarikan panjang.",
                  extra: {
                    badge: "Kategori Herex Racing",
                    base_price: 800000,
                  },
                },
                {
                  order: 3,
                  title: "Honda Tiger Reborn / Custom",
                  description: "Tata body modern klasik, sambungan rangka rapi, anti getar dan stabil kecepatan tinggi.",
                  extra: {
                    badge: "Kategori Custom Total",
                    base_price: 900000,
                  },
                },
              ],
            },
          ],
        },
        {
          type: "PrecisionProcess",
          order: 2,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "SOP 5 TAHAPAN TATA BODY PRESISI",
              subtitle: "STANDAR KERJA BSK CUSTOM",
              description:
                "Kami tidak sekadar memasang bodi. Setiap lekukan, dudukan baut, dan kelurusan rangka melewati pengukuran waterpass & laser center agar motor enak dilihat dan stabil dikendarai.",
              items: [
                {
                  order: 0,
                  title: "01. Cek Senter & Geometri Rangka",
                  description: "Pemeriksaan kemiringan rangka utama, komstir, dan titik simetris swingarm dengan mal presisi.",
                },
                {
                  order: 1,
                  title: "02. Setting Subframe & Dudukan Shock",
                  description: "Pemotongan atau penyambungan rangka belakang yang proporsional, sudut kemiringan shockbreaker simetris.",
                },
                {
                  order: 2,
                  title: "03. Fitting Tangki, Jok & Begel",
                  description: "Penataan tangki CB agar tidak mendongak, jok ngepres bodi tanpa renggang, dan begel sejajar lampu belakang.",
                },
                {
                  order: 3,
                  title: "04. Penataan Kaki-Kaki & Slebor",
                  description: "Penyelarasan as roda depan-belakang satu garis lurus, jarak ban ke slebor simetris tanpa gesekan.",
                },
                {
                  order: 4,
                  title: "05. Finishing Las Rapi & Quality Control",
                  description: "Pengelasan full matang, pembersihan sisa las, uji coba test jalan, dan jaminan rangka anti-mleyot.",
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
              title: "PAKET TATA BODY & JASA BENGKEL",
              subtitle: "PILIHAN TEPAT SESUAI KEBUTUHAN MOTOR ANDA",
              description: "Semua paket sudah termasuk konsultasi konsep, pengerjaan presisi, dan garansi kelurusan rangka.",
              extra: {
                whatsapp_number: "6285159506662",
                note: "Estimasi waktu pengerjaan 3 - 14 hari kerja tergantung antrian dan paket.",
              },
              items: [
                {
                  order: 0,
                  title: "Paket Tata Body Standar",
                  description: "Pemasangan set bodi lengkap: dudukan tangki, setting jok presisi, dudukan slebor depan/belakang, dan pasang begel samping.",
                  extra: {
                    price: 450000,
                    price_display: "Rp 450.000",
                    featured: false,
                    duration: "3 - 5 Hari",
                    features: [
                      "Fitting tangki anti mendongak",
                      "Dudukan jok presisi tanpa celah",
                      "Setting slebor depan & belakang",
                      "Dudukan begel & stoplamp",
                      "Garansi fitting rapi 1 bulan",
                    ],
                  },
                },
                {
                  order: 1,
                  title: "Paket Full Rangka & Senter Kaki",
                  description: "Paket paling diminati! Penyelarasan rangka total, bikin subframe baru, setting sudut shockbreaker belakang, dan as roda 100% center.",
                  extra: {
                    price: 850000,
                    price_display: "Rp 850.000",
                    featured: true,
                    duration: "5 - 7 Hari",
                    features: [
                      "Semua isi Paket Standar",
                      "Potong & sambung subframe pipa tebal",
                      "Setting dudukan sok belakang dobel",
                      "Penyelarasan as roda depan-belakang",
                      "Pengelasan matang anti patah",
                      "Garansi rangka center 6 bulan",
                    ],
                  },
                },
                {
                  order: 2,
                  title: "Paket Restorasi Komplit + Cat",
                  description: "Bangun motor dari nol atau peremajaan total: tata body presisi, repaint oven rangka & bodi, chrome part, dan rakit kelistrikan rapi.",
                  extra: {
                    price: 2200000,
                    price_display: "Mulai Rp 2.200.000",
                    featured: false,
                    duration: "10 - 14 Hari",
                    features: [
                      "Full tata body & rangka presisi",
                      "Repaint bodi & rangka oven 3 lapis",
                      "Finishing cat glossy / lembayung",
                      "Perakitan kabel bodi rapi tersembunyi",
                      "Setting kaki-kaki siap jalan",
                      "Garansi cat & rangka 1 tahun",
                    ],
                  },
                },
                {
                  order: 3,
                  title: "Paket Tune-Up & Setting Herex",
                  description: "Khusus performa mesin dan kelistrikan: servis karbu/injeksi, peremajaan kopling, setting klep, dan balancing getaran mesin.",
                  extra: {
                    price: 350000,
                    price_display: "Rp 350.000",
                    featured: false,
                    duration: "1 - 2 Hari",
                    features: [
                      "Servis karburator / throttle body",
                      "Setting celah klep presisi",
                      "Cek pengapian & kelistrikan",
                      "Ganti oli & filter mesin",
                      "Test ride responsif",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          type: "WhyUs",
          order: 4,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "MENGAPA HARUS TATA BODY DI BSK CUSTOM?",
              subtitle: "KOMITMEN KUALITAS & KEPUASAN",
              description: "Bodi motor yang rapi bukan hanya soal gaya, tapi juga kestabilan dan keselamatan saat melaju kencang di jalanan.",
              items: [
                {
                  order: 0,
                  title: "Pengukuran Presisi & Senter",
                  description: "Menggunakan mal ukur simetris dan pengujian kelurusan as roda agar motor tidak lari ke samping saat lepas stang.",
                  icon: "CheckCircle",
                },
                {
                  order: 1,
                  title: "Pengelasan Rapi & Matang",
                  description: "Penyambungan menggunakan las MIG/Argon berpenetrasi kuat, bukan sekadar tempel, aman untuk beban boncengan dan touring jauh.",
                  icon: "Flame",
                },
                {
                  order: 2,
                  title: "Proporsi Estetik Khas BSK",
                  description: "Garis lekukan antara tangki, jok, dan slebor mengalir natural tanpa celah renggang yang mengganggu pemandangan.",
                  icon: "Award",
                },
                {
                  order: 3,
                  title: "Garansi Rangka Nyaman",
                  description: "Jika posisi bodi kurang pas atau getar, Anda berhak klaim perbaikan gratis sampai bodi motor benar-benar sesuai impian.",
                  icon: "ShieldCheck",
                },
              ],
            },
          ],
        },
        {
          type: "ShowcaseGallery",
          order: 5,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "KARYA & HASIL GARAPAN",
              subtitle: "PORTOFOLIO BSK CUSTOM",
              description: "Beberapa motor konsumen yang telah selesai ditata bodi dan rangkanya di workshop kami.",
              items: [
                {
                  order: 0,
                  title: "CB Gelatik 100 - Black Crimson",
                  description: "Tangki CB Gelatik presisi, jok slim press jahit dobel, shock tirev, rangka center.",
                  image_url: "/logo.png",
                },
                {
                  order: 1,
                  title: "CB Dream 200 - Herex Style",
                  description: "Subframe ganti pipa seamless, dudukan dobel shock tiger, knalpot corbi presisi.",
                  image_url: "/logo.png",
                },
                {
                  order: 2,
                  title: "GL Pro Restomod Classic",
                  description: "Tata bodi model CB K2, repaint rangka hitam glossy oven, kabel bodi rapi sembunyi.",
                  image_url: "/logo.png",
                },
                {
                  order: 3,
                  title: "Tiger 2000 Reborn - Candy Orange",
                  description: "Restorasi rangka leher stang, kaki-kaki pelek jari-jari lebar, tangki CB 125.",
                  image_url: "/logo.png",
                },
              ],
            },
          ],
        },
        {
          type: "Testimonials",
          order: 6,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "KATA MEREKA TENTANG BSK CUSTOM",
              subtitle: "ULASAN KOMUNITAS & KONSUMEN",
              description: "Kepuasan sedulur bikers dan pecinta motor klasik adalah kebanggaan workshop kami.",
              items: [
                {
                  order: 0,
                  title: "Bagus Prasetyo",
                  description: "Tangki CB saya awalnya mendongak parah dan jok ada celah 3 cm. Masuk ke BSK Custom, hasilnya presisi banget nempel rapi. Lepas stang di 80 km/jam tetep lempeng!",
                  extra: {
                    motor: "Honda CB 100 (Kediri)",
                    rating: 5,
                  },
                },
                {
                  order: 1,
                  title: "Rian Hendrawan",
                  description: "Garapan las-lasan subframe-nya mulus, dudukan shock belakang presisi kiri-kanan. Pokoknya rekomendasi buat yang mau bangun CB herex atau harian.",
                  extra: {
                    motor: "Megapro Primus (Surabaya)",
                    rating: 5,
                  },
                },
                {
                  order: 2,
                  title: "Dimas Aditya",
                  description: "Pelayanan ramah, diajak konsultasi konsep bodi enak banget dan transparan soal biaya. Nggak ada istilah biaya bengkak tiba-tiba. Mantap BSK!",
                  extra: {
                    motor: "GL 100 Resto (Malang)",
                    rating: 5,
                  },
                },
              ],
            },
          ],
        },
        {
          type: "ConsultationCta",
          order: 7,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "PUNYA MOTOR CB ATAU RANGKA YANG INGIN DITATA?",
              subtitle: "KONSULTASIKAN KONSEP IMPIANMU SEKARANG",
              description: "Mulai dari sekadar pasang tangki, set rangka, hingga bangun full custom dari nol. Tim BSK Custom siap mewujudkannya dengan hasil rapi dan bergaransi.",
              extra: {
                whatsapp_number: "6285159506662",
                cta_label: "Chat WhatsApp Sekarang",
                sub_label: "Gratis Konsultasi Konsep & Perhitungan Biaya",
              },
            },
          ],
        },
        {
          type: "WorkshopInfo",
          order: 8,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "LOKASI & KONTAK WORKSHOP",
              subtitle: "MAMPIR KE WORKSHOP KAMI",
              description: "Silakan datang langsung untuk melihat proses pengerjaan atau konsultasi santai sambil ngopi.",
              extra: {
                address: "Jl. Otomotif Presisi No. 12, Workshop BSK Custom",
                city: "Jawa Timur, Indonesia",
                hours: "Senin - Sabtu: 08:30 - 17:30 WIB (Minggu Libur)",
                whatsapp: "0851-5950-6662",
                instagram: "@bsk.custom",
                maps_url: "https://maps.google.com",
              },
            },
          ],
        },
        {
          type: "Footer",
          order: 9,
          is_active: true,
          blocks: [
            {
              order: 0,
              title: "BSK Custom",
              description: "Bengkel Spesialis Tata Body CB, Rangka Presisi & Modifikasi Motor Klasik/Herex Nusantara.",
              extra: {
                copyright: "© 2026 BSK Custom. All Rights Reserved. Presisi Rangka & Jiwa Otomotif.",
                instagram_url: "https://instagram.com/bsk.custom",
                whatsapp_number: "6285159506662",
              },
            },
          ],
        },
      ],
    },
  ],
};
