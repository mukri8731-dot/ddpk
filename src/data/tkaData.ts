export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface QuestionItem {
  id: number;
  topic: string;
  indicator: string;
  skillMeasured: 'Pemahaman Konsep' | 'Penerapan' | 'Penalaran' | 'Analisis' | 'Pemecahan Masalah';
  cognitiveLevel: 'C1' | 'C2' | 'C3' | 'C4';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  stimulus?: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  optionsAnalysis: {
    [key in 'A' | 'B' | 'C' | 'D' | 'E']?: string;
  };
}

export const TKA_METADATA = {
  jenjang: 'SMK',
  kelas: 'X (Sepuluh)',
  programKeahlian: 'Teknik Komputer dan Jaringan (TKJ)',
  mataPelajaran: 'Perakitan Komputer',
  materiPokok: 'Pengujian dan Troubleshooting Komputer',
  totalSoal: 50,
  bentukSoal: 'Pilihan Ganda (A, B, C, D, E)',
  komposisi: {
    mudah: 15,
    sedang: 25,
    sulit: 10,
  },
  skorPerSoal: 2,
  skorMaksimal: 100,
};

export const TKA_QUESTIONS: QuestionItem[] = [
  // 1-10
  {
    id: 1,
    topic: 'Konsep dasar pengujian komputer setelah proses perakitan',
    indicator: 'Menjelaskan tujuan utama dilakukannya prosedur pengujian fungsionalitas unit komputer setelah proses perakitan selesai.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Setelah seorang teknisi siswa TKJ menyelesaikan perakitan unit CPU, sebelum dipasang penutup casing dan diserahkan kepada pengguna, perlu dilakukan serangkaian pengujian terencana.',
    question: 'Tujuan utama dilakukannya pengujian sistem secara bertahap setelah perakitan komputer selesai adalah...',
    options: [
      { key: 'A', text: 'Memastikan seluruh komponen terpasang dengan benar, berfungsi normal, dan tidak terjadi korsleting listrik' },
      { key: 'B', text: 'Menginstal seluruh aplikasi multimedia dan game berat secara bersamaan' },
      { key: 'C', text: 'Mempercepat kecepatan frekuensi clock prosesor melampaui batas pabrik' },
      { key: 'D', text: 'Mengurangi pemakaian daya listrik total dari unit Power Supply' },
      { key: 'E', text: 'Menghilangkan keharusan konfigurasi BIOS pada saat instalasi sistem operasi' },
    ],
    correctAnswer: 'A',
    explanation: 'Pengujian awal setelah perakitan bertujuan memastikan integritas koneksi fisik, mencegah hubungan arus pendek (short circuit) yang dapat merusak komponen bernilai tinggi, serta memverifikasi bahwa seluruh perangkat keras terdeteksi dan beroperasi dalam batas toleransi standar pabrik.',
    optionsAnalysis: {
      A: 'Tepat, pengujian verifikasi awal berfungsi mendeteksi kesalahan pasang, korsleting, dan memastikan fungsionalitas dasar sebelum pemakaian.',
      B: 'Kurang tepat, instalasi software dilakukan setelah verifikasi perangkat keras dan OS tuntas, bukan tujuan uji perangkat keras pasca-rakit.',
      C: 'Kurang tepat, overclocking bukan tujuan standar pengujian perakitan dasar siswa kelas X.',
      D: 'Kurang tepat, pengujian tidak dapat menurunkan konsumsi daya nominal bawaan komponen.',
      E: 'Kurang tepat, konfigurasi BIOS/UEFI tetap wajib dilakukan untuk mengatur tanggal, urutan boot, dan mode penyimpanan.'
    }
  },
  {
    id: 2,
    topic: 'Prosedur pemeriksaan awal sebelum komputer dinyalakan',
    indicator: 'Mengidentifikasi langkah pemeriksaan visual pra-daya (pre-power on check) untuk mencegah risiko kerusakan komponen.',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Riko telah selesai merakit komputer di laboratorium TKJ. Sebelum menghubungkan kabel power supply ke stopkontak listrik 220V, guru pembimbing meminta Riko melakukan Pre-Power On Checklist.',
    question: 'Langkah pemeriksaan fisik yang paling krusial dilakukan sebelum sakelar listrik pertama kali dihidupkan adalah...',
    options: [
      { key: 'A', text: 'Melakukan defragmentasi partisi SSD NVMe' },
      { key: 'B', text: 'Memeriksa kestabilan baut motherboard, kerapatan konektor daya 24-pin ATX & 4/8-pin CPU, serta ketiadaan sekrup logam liar di atas PCB' },
      { key: 'C', text: 'Mengganti pasta pendingin prosesor yang baru saja dioleskan' },
      { key: 'D', text: 'Memformat ulang flashdisk installer sistem operasi Windows/Linux' },
      { key: 'E', text: 'Mengubah setting resolusi monitor melalui tombol On-Screen Display' },
    ],
    correctAnswer: 'B',
    explanation: 'Pemeriksaan visual pra-daya sangat penting untuk mencegah bencana korsleting fatal. Sekrup logam yang tertinggal di permukaan motherboard atau konektor daya 24-pin / 8-pin CPU yang miring/longgar dapat menimbulkan percikan api atau kegagalan arus saat diberi tegangan tinggi.',
    optionsAnalysis: {
      A: 'Salah, komputer belum dinyalakan dan SSD tidak didefrag.',
      B: 'Benar, memastikan baut standoff pas, tidak ada logam asing yang menjembatani jalur PCB, dan soket daya terkunci kokoh adalah SOP utama.',
      C: 'Salah, pasta pendingin yang baru diaplikasikan tidak boleh dibongkar kembali tanpa alasan.',
      D: 'Salah, flashdisk installer tidak berkaitan dengan keselamatan fisik kelistrikan hardware.',
      E: 'Salah, tidak relevan dengan pencegahan korsleting hardware.'
    }
  },
  {
    id: 3,
    topic: 'Pengujian POST (Power-On Self-Test)',
    indicator: 'Menganalisis urutan tahapan yang dikerjakan BIOS saat menjalankan proses POST pertama kali.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Ketika tombol power pada casing ditekan, layar monitor tidak langsung menampilkan logo sistem operasi, melainkan menjalankan rutinitas firmware otomatis.',
    question: 'Fungsi utama dari proses POST (Power-On Self-Test) pada komputer adalah...',
    options: [
      { key: 'A', text: 'Menghapus file sementara (temporary files) yang tersimpan di dalam harddisk' },
      { key: 'B', text: 'Memperbaiki kerusakan fisik pada bad sector piringan magnetik harddisk' },
      { key: 'C', text: 'Mendiagnosis dan menguji ketersediaan serta kesiapan perangkat keras utama seperti CPU, RAM, dan kartu grafis sebelum booting' },
      { key: 'D', text: 'Menghubungkan komputer secara nirkabel ke access point jaringan lokal' },
      { key: 'E', text: 'Mengenkripsi data partisi sistem agar terhindar dari serangan malware' },
    ],
    correctAnswer: 'C',
    explanation: 'POST adalah rutinitas diagnostik yang dieksekusi oleh BIOS/UEFI saat sistem pertama kali dinyalakan. POST mengecek keberadaan prosesor, menguji register CPU, menginisialisasi bus, memeriksa memori RAM, dan kartu display sebelum menyerahkan kontrol ke boot loader.',
    optionsAnalysis: {
      A: 'Salah, penghapusan temporary file adalah tugas sistem operasi / disk cleanup.',
      B: 'Salah, POST tidak bisa memperbaiki bad sector fisik media simpan.',
      C: 'Benar, POST bertugas memeriksa fungsionalitas komponen vital penunjang sistem.',
      D: 'Salah, koneksi jaringan terjadi pada level OS/driver jaringan.',
      E: 'Salah, enkripsi partisi (seperti BitLocker) bekerja pada layer OS.'
    }
  },
  {
    id: 4,
    topic: 'Identifikasi gejala komputer gagal melakukan booting',
    indicator: 'Mendiagnosis penyebab kondisi "komputer hidup tanpa tampilan layar" (No Display / Black Screen).',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Sebuah komputer rakitan menunjukkan gejala: kipas CPU dan kipas casing berputar normal, lampu indikator power menyala, namun monitor menampilkan pesan "No Signal detected" dan lampu indikator HDD tidak berkedip.',
    question: 'Berdasarkan analisis urutan pengujian POST, kemungkinan penyebab paling logis dari gejala tersebut adalah...',
    options: [
      { key: 'A', text: 'Sistem operasi mengalami corrupt pada file bootmgr di SSD' },
      { key: 'B', text: 'Mouse USB terpasang pada port USB 2.0 bukan USB 3.0' },
      { key: 'C', text: 'Kabel speaker internal casing terbalik polaritas kutub positif dan negatifnya' },
      { key: 'D', text: 'Komputer gagal melewati tahapan inisialisasi RAM atau kartu display grafis pada proses POST' },
      { key: 'E', text: 'Kapasitas sisa partisi harddisk lokal drive C kurang dari 10 persen' },
    ],
    correctAnswer: 'D',
    explanation: 'Jika kipas berputar namun monitor tetap "No Signal" dan tidak ada aktivitas pembacaan storage (lampu HDD diam), berarti motherboard terhenti di fase awal POST sebelum display controller diinisialisasi. Masalah paling umum adalah modul RAM tidak terpasang rapat/kotor atau kartu VGA belum terpasang/terdayai dengan baik.',
    optionsAnalysis: {
      A: 'Kurang tepat, jika OS corrupt, layar monitor tetap menampilkan pesan error teks (seperti "Bootmgr is missing" atau masuk BIOS).',
      B: 'Kurang tepat, posisi port mouse tidak menghalangi inisialisasi video POST.',
      C: 'Kurang tepat, speaker casing pasif hanya tidak bersuara jika polaritas terbalik, tidak membuat monitor blank.',
      D: 'Tepat, kegagalan inisialisasi RAM/GPU menghentikan POST sebelum video out dapat dihidupkan.',
      E: 'Kurang tepat, sisa kapasitas storage hanya berpengaruh pada saat penulisan data OS, bukan pada fase awal POST.'
    }
  },
  {
    id: 5,
    topic: 'Pemeriksaan dan identifikasi masalah BIOS/UEFI',
    indicator: 'Menganalisis penyebab pengaturan tanggal dan waktu komputer selalu kembali ke tahun default pabrik setiap kabel listrik dicabut.',
    skillMeasured: 'Penalaran',
    cognitiveLevel: 'C3',
    difficulty: 'Mudah',
    stimulus: 'Setiap kali komputer di laboratorium dimatikan dan kabel power dari stopkontak dicabut pada sore hari, keesokan paginya saat dinyalakan muncul pesan peringatan "CMOS Date/Time Not Set - Press F1 to Run Setup", dan waktu selalu kembali ke tanggal rilis pabrik.',
    question: 'Penyebab utama dari masalah tersebut beserta tindakan perbaikan yang tepat adalah...',
    options: [
      { key: 'A', text: 'Suhu prosesor terlalu panas, solusinya mengganti thermal paste dan heatsink' },
      { key: 'B', text: 'Kabel data SATA harddisk kendor, solusinya memasang klip pengunci kabel SATA' },
      { key: 'C', text: 'Kipas pendingin casing macet, solusinya melumasi poros kipas dengan pelumas' },
      { key: 'D', text: 'Monitor tidak mendukung refresh rate 60 Hz, solusinya mengganti kabel VGA' },
      { key: 'E', text: 'Tegangan baterai CMOS (CR2032) telah habis atau di bawah batas toleransi, solusinya mengganti baterai CMOS dengan yang baru' },
    ],
    correctAnswer: 'E',
    explanation: 'Chip CMOS (Complementary Metal-Oxide-Semiconductor) yang menyimpan parameter firmware, tanggal, jam real-time clock (RTC), dan setting boot urutan membutuhkan suplai tegangan konstan dari baterai koin tipe CR2032 (3V). Jika tegangan baterai drop, data volatil di CMOS terhapus saat listrik AC terputus.',
    optionsAnalysis: {
      A: 'Salah, overheat tidak menyebabkan reset tanggal CMOS saat komputer mati.',
      B: 'Salah, kabel SATA tidak berkaitan dengan penyimpanan waktu RTC.',
      C: 'Salah, kipas casing tidak mempengaruhi memori RTC.',
      D: 'Salah, display refresh rate tidak berkaitan dengan konfigurasi CMOS.',
      E: 'Benar, baterai CR2032 yang drop di bawah toleransi (<2.8V) menyebabkan hilangnya memori volatil CMOS.'
    }
  },
  {
    id: 6,
    topic: 'Pengujian fungsi perangkat keras (hardware)',
    indicator: 'Menentukan urutan prosedur pengujian komponen minimal (barebone bench-test) untuk mengisolasi kerusakan perakitan.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Setelah dirakit ke dalam casing, komputer sama sekali tidak mau menyala saat tombol power ditekan. Teknisi memutuskan mengeluarkan motherboard untuk melakukan uji komponen minimal (bench-testing).',
    question: 'Kombinasi komponen minimal (barebone system) yang wajib dipasang di luar casing untuk menguji apakah sistem dapat melakukan POST dasar adalah...',
    options: [
      { key: 'A', text: 'Motherboard, CPU beserta pendingin, 1 keping RAM, Power Supply, dan display output (kartu grafis/iGPU)' },
      { key: 'B', text: 'Motherboard, Harddisk, DVD-ROM, Soundcard eksternal, dan printer' },
      { key: 'C', text: 'Power Supply, Casing, Keyboard USB, Mouse USB, dan Flashdisk' },
      { key: 'D', text: 'Motherboard, SSD NVMe, Wi-Fi Card, Bluetooth dongle, dan speaker stereo' },
      { key: 'E', text: 'Power Supply, Kabel LAN RJ-45, Monitor, dan Webcam eksternal' },
    ],
    correctAnswer: 'A',
    explanation: 'Pengujian barebone/bench-test bertujuan mengeliminasi faktor korsleting bodi casing dan perangkat perifer sekunder. Komponen minimal absolut agar komputer dapat POST adalah: motherboard, processor + cooler, memori RAM (cukup 1 keping), PSU yang terhubung dengan benar, dan display out (GPU diskret atau terintegrasi).',
    optionsAnalysis: {
      A: 'Benar, ini adalah konfigurasi inti POST hardware minimal untuk pengujian awal.',
      B: 'Salah, media simpan dan DVD-ROM bukan komponen wajib untuk memicu POST.',
      C: 'Salah, tidak ada CPU dan motherboard pada pilihan ini.',
      D: 'Salah, tidak memiliki CPU dan RAM yang mutlak diperlukan untuk POST.',
      E: 'Salah, komponen internal inti sistem tidak ada.'
    }
  },
  {
    id: 7,
    topic: 'Identifikasi kerusakan RAM dan slot RAM',
    indicator: 'Menganalisis prosedur pembersihan dan pengujian modul RAM yang mengalami kontak buruk (bad contact) akibat oksidasi.',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Sebuah komputer mengeluarkan bunyi beep berulang-ulang dengan jeda teratur saat dinyalakan. Teknisi mencurigai adanya masalah pada modul RAM yang kotor atau teroksidasi di laboratorium yang lembap.',
    question: 'Tindakan teknis yang benar dan aman untuk membersihkan pin konektor emas (gold finger) RAM yang teroksidasi adalah...',
    options: [
      { key: 'A', text: 'Mengamplas pin konektor RAM dengan kertas amplas besi nomor 100 agar lapisannya mengkilap' },
      { key: 'B', text: 'Menggosok pin emas secara perlahan menggunakan penghapus pensil bersih berbahan karet lembut, lalu membersihkan serpihannya dengan kuas halus antistatis' },
      { key: 'C', text: 'Mencuci modul RAM menggunakan air sabun hangat lalu langsung mengeringkannya di bawah sinar matahari' },
      { key: 'D', text: 'Menyemprotkan oli pelumas mesin ke dalam slot RAM pada motherboard' },
      { key: 'E', text: 'Mengikis permukaan pin konektor menggunakan obeng minus berbahan logam runcing' },
    ],
    correctAnswer: 'B',
    explanation: 'Penghapus karet pensil yang bersih dan kering memiliki sifat abrasif sangat ringan yang efektif mengangkat lapisan oksida dan kotoran tanpa mengikis lapisan emas tipis konduktif pada pin RAM. Setelah digosok, sisa residu penghapus wajib dibersihkan dengan kuas antistatis atau contact cleaner cepat kering.',
    optionsAnalysis: {
      A: 'Salah fatal, amplas besi akan merusak dan mengelupas lapisan jalur tembaga berlapis emas.',
      B: 'Benar, ini metode standar bengkel komputer yang terbukti aman dan efektif bagi teknisi TKJ.',
      C: 'Salah fatal, mencuci dengan air sabun memicu korosi dan korsleting.',
      D: 'Salah fatal, oli pelumas bersifat konduktif/lengket dan akan mengumpulkan debu serta merusak isolasi slot.',
      E: 'Salah fatal, logam obeng akan menggores dan merusak jalur PCB modul RAM.'
    }
  },
  {
    id: 8,
    topic: 'Pengujian prosesor dan sistem pendingin',
    indicator: 'Menganalisis dampak kesalahan pemasangan sistem pendingin prosesor (heatsink/fan) terhadap kestabilan sistem.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sedang',
    stimulus: 'Siswa TKJ baru selesai merakit komputer dengan prosesor Core i5. Saat komputer dihidupkan, sistem berhasil masuk ke tampilan BIOS, namun tepat pada detik ke-45 komputer mendadak mati total tanpa peringatan apa pun.',
    question: 'Faktor yang paling mungkin menjadi penyebab utama gejala komputer mati mendadak dalam waktu kurang dari satu menit tersebut adalah...',
    options: [
      { key: 'A', text: 'Kapasitas SSD NVMe terlalu besar sehingga membutuhkan daya melebihi kapasitas motherboard' },
      { key: 'B', text: 'Kabel speaker casing belum disambungkan ke front panel header' },
      { key: 'C', text: 'Lupa melepas stiker plastik pelindung pada dasar tembaga heatsink CPU atau pasta pendingin tidak menempel sempurna sehingga terjadi thermal shutdown' },
      { key: 'D', text: 'Monitor yang digunakan tidak mendukung resolusi Full HD 1080p' },
      { key: 'E', text: 'Keyboard USB belum diinstal driver bawaan dari sistem operasi' },
    ],
    correctAnswer: 'C',
    explanation: 'Plastik transparan pelindung heatsink yang lupa dilepas berfungsi sebagai isolator panas ekstrem. Akibatnya, panas dari die prosesor tidak dapat dihantarkan ke sirip heatsink, suhu melonjak melampaui TjMax (>100°C) dalam hitungan puluhan detik, memicu proteksi perangkat keras otomatis (Thermal Cut-off / Thermal Shutdown) demi mencegah kerusakan fisik prosesor.',
    optionsAnalysis: {
      A: 'Salah, konsumsi daya SSD sangat kecil (rata-rata 3-7W) dan tidak memicu mati mendadak dalam 45 detik di BIOS.',
      B: 'Salah, speaker casing tidak mempengaruhi siklus termal CPU.',
      C: 'Benar, stiker plastik pelindung yang lupa dilepas adalah kesalahan umum perakitan pemula yang menyebabkan thermal shutdown instan.',
      D: 'Salah, resolusi monitor tidak menyebabkan sistem mati mendadak.',
      E: 'Salah, driver keyboard tidak berkaitan dengan proteksi suhu BIOS.'
    }
  },
  {
    id: 9,
    topic: 'Pemeriksaan motherboard dan konektor',
    indicator: 'Mendiagnosis kesalahan pemasangan konektor tombol Front Panel (Power SW) pada motherboard.',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Mudah',
    stimulus: 'Kabel front panel dari casing komputer memiliki beberapa header kecil bertuliskan: POWER SW, RESET SW, HDD LED, dan POWER LED.',
    question: 'Jika saat tombol power pada casing ditekan komputer sama sekali tidak bereaksi, namun lampu LED standby pada motherboard menyala, tindakan pemeriksaan konektor pertama yang harus dilakukan adalah...',
    options: [
      { key: 'A', text: 'Membalik konektor kabel SATA yang terpasang pada port storage nomor 0' },
      { key: 'B', text: 'Mengganti kabel HDMI display yang menuju ke monitor' },
      { key: 'C', text: 'Memutar baut pengunci heatsink prosesor berlawanan arah jarum jam' },
      { key: 'D', text: 'Memastikan konektor POWER SW terpasang pada sepasang pin yang tepat di header front panel motherboard dan tidak terpasang longgar' },
      { key: 'E', text: 'Mencabut baterai CMOS lalu membuangnya ke tempat sampah' },
    ],
    correctAnswer: 'D',
    explanation: 'Lampu LED motherboard yang menyala menandakan tegangan siaga +5VSB (standby) dari PSU masuk normal. Bila tombol ditekan tidak ada reaksi, kemungkinan besar header tombol sakelar mekanik (POWER SW) salah colok ke pin lain (misalnya tertukar dengan RESET SW atau HDD LED) atau kabelnya terlepas.',
    optionsAnalysis: {
      A: 'Salah, kabel SATA tidak berkaitan dengan mekanisme penyalaan power switch.',
      B: 'Salah, kabel HDMI tidak mempengaruhi sakelar daya listrik komputer.',
      C: 'Salah, mengendorkan baut heatsink justru memicu risiko overheat.',
      D: 'Benar, POWER SW adalah sakelar tombol kontak sesaat (momentary switch) yang bertugas menghubungkan pin PWR_BTN ke Ground.',
      E: 'Salah, baterai CMOS tidak boleh dibuang sembarangan dan tidak menyelesaikan masalah tombol power.'
    }
  },
  {
    id: 10,
    topic: 'Pemeriksaan power supply unit (PSU)',
    indicator: 'Menganalisis metode pengujian mandiri (Paperclip Test / Jumper Test) untuk memeriksa fungsionalitas dasar Power Supply tanpa motherboard.',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Sebelum memasang Power Supply Unit (PSU) baru ke dalam casing, seorang teknisi ingin melakukan uji hidup sederhana untuk memastikan unit PSU dapat menyuplai daya saat menerima sinyal Power-On.',
    question: 'Pada konektor utama 24-pin ATX, dua kabel warna manakah yang dijumper (dihubungkan singkat sementara) untuk mengaktifkan PSU secara mandiri?',
    options: [
      { key: 'A', text: 'Kabel warna Merah (+5V) dengan kabel warna Kuning (+12V)' },
      { key: 'B', text: 'Kabel warna Oranye (+3.3V) dengan kabel warna Biru (-12V)' },
      { key: 'C', text: 'Kabel warna Ungu (+5VSB) dengan kabel warna Putih (-5V)' },
      { key: 'D', text: 'Kabel warna Kuning (+12V) dengan kabel warna Abu-abu (Power Good)' },
      { key: 'E', text: 'Kabel warna Hijau (PS-ON#) dengan salah satu kabel warna Hitam (Ground/COM)' },
    ],
    correctAnswer: 'E',
    explanation: 'Sesuai standar spesifikasi ATX12V, pin nomor 16 (kabel warna hijau) adalah sinyal PS_ON# (Power Supply On, active low). Ketika dihubungkan ke ground (kabel hitam), sirkuit PWM di dalam PSU akan mendeteksi sinyal logika LOW dan mulai mengaktifkan seluruh rel tegangan utama (+12V, +5V, +3.3V) sehingga kipas PSU mulai berputar.',
    optionsAnalysis: {
      A: 'Salah fatal, menghubungkan rel +5V ke +12V akan menyebabkan korsleting parah dan merusak PSU.',
      B: 'Salah, menghubungkan rel positif ke rel negatif menimbulkan beda potensial berbahaya dan korslet.',
      C: 'Salah, kabel ungu adalah rel standby, bukan pemicu sinyal on.',
      D: 'Salah, menghubungkan rel daya ke pin Power Good dapat merusak sirkuit logika pengawas tegangan.',
      E: 'Benar, jumper pin Hijau (PS-ON#) ke Hitam (Ground) adalah prosedur standar uji mandiri PSU ATX.'
    }
  },

  // 11-20
  {
    id: 11,
    topic: 'Identifikasi masalah VGA atau kartu grafis',
    indicator: 'Mendiagnosis gejala artefak visual (garis-garis pecah/bintik warna) pada tampilan layar monitor.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Saat komputer digunakan untuk menjalankan aplikasi pengujian grafis 3D (benchmark), tampilan layar mendadak memunculkan garis-garis kotak acak berwarna merah muda/hijau (artefak visual), kemudian layar berkedip hitam dan aplikasi berhenti merespons.',
    question: 'Berdasarkan gejala klinis tersebut, komponen yang mengalami indikasi kerusakan atau panas berlebih adalah...',
    options: [
      { key: 'A', text: 'Memori grafis (VRAM) atau chip GPU pada kartu grafis diskret' },
      { key: 'B', text: 'Kabel daya SATA yang terhubung ke media harddisk sekunder' },
      { key: 'C', text: 'Sensor mouse optik yang mengalami penurunan sensitivitas' },
      { key: 'D', text: 'Baterai CMOS yang mengalami penurunan voltase di bawah 2.5V' },
      { key: 'E', text: 'Konektor tombol Reset pada panel depan casing korsleting' },
    ],
    correctAnswer: 'A',
    explanation: 'Kemunculan artifak visual (garis-garis aneh, kotak catur, atau corak warna acak) terutama saat beban kerja 3D tinggi merupakan tanda khas kegagalan VRAM (Video RAM), retak mikro pada bola solder BGA chip GPU akibat thermal cycling, atau suhu GPU yang melebihi batas aman.',
    optionsAnalysis: {
      A: 'Benar, artifak visual geometri dan tekstur adalah tanda spesifik degradasi VRAM atau prosesor grafis (GPU).',
      B: 'Salah, kabel data/daya storage tidak menimbulkan distorsi rendering poligon grafis.',
      C: 'Salah, sensor mouse hanya mengendalikan koordinat kursor, bukan rendering piksel display.',
      D: 'Salah, baterai CMOS tidak mempengaruhi pengolahan grafis 3D.',
      E: 'Salah, tombol reset korsleting akan me-restart PC seketika, bukan menghasilkan artifak gambar.'
    }
  },
  {
    id: 12,
    topic: 'Pemeriksaan media penyimpanan HDD dan SSD',
    indicator: 'Menganalisis pesan galat "Disk Boot Failure / No Bootable Device Found" pada komputer baru.',
    skillMeasured: 'Penalaran',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Setelah teknisi selesai menginstal sistem operasi Windows 11 pada SSD NVMe M.2 dan mencabut flashdisk instalasi, saat komputer direstart muncul layar hitam bertuliskan: "Reboot and Select proper Boot device or Insert Boot Media in selected Boot device and press a key".',
    question: 'Langkah penelusuran troubleshooting yang paling tepat untuk mengatasi masalah tersebut adalah...',
    options: [
      { key: 'A', text: 'Mengganti prosesor dengan tipe prosesor yang memiliki jumlah core lebih banyak' },
      { key: 'B', text: 'Masuk ke menu BIOS/UEFI untuk memeriksa apakah SSD terdeteksi dan mengatur urutan Boot Priority agar SSD berada di urutan pertama (UEFI Boot)' },
      { key: 'C', text: 'Menambah jumlah kipas casing agar sirkulasi udara lebih dingin' },
      { key: 'D', text: 'Memindahkan kabel monitor dari port HDMI ke port DisplayPort' },
      { key: 'E', text: 'Mencabut kabel power 24-pin motherboard saat komputer masih menyala' },
    ],
    correctAnswer: 'B',
    explanation: 'Pesan "Reboot and Select proper Boot device" menandakan firmware motherboard tidak menemukan media penyimpanan yang memiliki sektor boot aktif sesuai prioritas. Teknisi harus mengecek di BIOS apakah SSD M.2 terdeteksi secara fisik dan memastikan "Windows Boot Manager" pada SSD tersebut berada pada urutan boot pertama.',
    optionsAnalysis: {
      A: 'Salah, jumlah core prosesor tidak ada kaitannya dengan deteksi urutan partisi boot.',
      B: 'Benar, memverifikasi deteksi hardware di BIOS dan memperbaiki urutan boot priority adalah solusi tepat.',
      C: 'Salah, kipas casing tidak mempengaruhi pembacaan boot record storage.',
      D: 'Salah, pesan galat sudah tampil di monitor, membuktikan koneksi kabel monitor sudah normal.',
      E: 'Salah fatal, mencabut kabel daya saat menyala berpotensi merusak hardware.'
    }
  },
  {
    id: 13,
    topic: 'Identifikasi masalah monitor dan kabel display',
    indicator: 'Menganalisis kesalahan umum pemasangan kabel monitor pada komputer yang memiliki kartu grafis diskret.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sedang',
    stimulus: 'Siswa merakit PC dengan spesifikasi: Prosesor Intel Core i5-12400F (tanpa iGPU terintegrasi), Motherboard B660, dan Kartu Grafis NVIDIA GeForce GTX 1660 Super. Saat dihidupkan, kipas PC menyala, namun monitor menampilkan pesan "Check Signal Cable". Siswa memasang kabel HDMI dari monitor ke port HDMI pada panel belakang motherboard.',
    question: 'Mengapa monitor tidak menampilkan gambar apa pun dan apa langkah perbaikan yang tepat?',
    options: [
      { key: 'A', text: 'Port HDMI motherboard rusak, solusinya mengganti motherboard baru' },
      { key: 'B', text: 'Kabel HDMI tidak kompatibel, solusinya harus memakai kabel analog VGA DB15' },
      { key: 'C', text: 'Prosesor seri F tidak memiliki kartu grafis internal (iGPU), sehingga kabel HDMI monitor wajib dipindahkan ke port HDMI pada kartu grafis diskret (VGA card)' },
      { key: 'D', text: 'RAM komputer kurang dari 16 GB sehingga port HDMI motherboard otomatis dimatikan' },
      { key: 'E', text: 'Monitor terkunci oleh password BIOS sehingga menolak menerima sinyal digital' },
    ],
    correctAnswer: 'C',
    explanation: 'Prosesor dengan akhiran "F" pada Intel (atau prosesor AMD tanpa grafis Radeon terintegrasi) tidak memiliki iGPU (Integrated Graphics Processing Unit). Akibatnya, port video pada motherboard mati/tidak aktif. Sinyal display hanya diproduksi oleh kartu grafis diskret (add-on card), sehingga kabel monitor harus dicolokkan ke port output GPU diskret.',
    optionsAnalysis: {
      A: 'Salah, port motherboard tidak rusak, melainkan memang tidak dialiri sinyal karena ketiadaan grafis terintegrasi pada CPU seri F.',
      B: 'Salah, GTX 1660 Super mendukung HDMI/DisplayPort modern, bukan VGA analog.',
      C: 'Benar, ini adalah salah satu kesalahan paling klasik dalam praktik perakitan komputer SMK TKJ.',
      D: 'Salah, kapasitas RAM tidak menentukan fungsi port video motherboard.',
      E: 'Salah, tidak ada fitur kunci password BIOS yang mematikan sinyal display mentah.'
    }
  },
  {
    id: 14,
    topic: 'Penggunaan bunyi beep dan indikator diagnostik',
    indicator: 'Menginterpretasikan arti bunyi beep kode pada motherboard dengan AMI BIOS.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Pada saat komputer dengan AMI (American Megatrends) BIOS dinyalakan, terdengar pola bunyi: 1 beep panjang diikuti 3 beep pendek, dan di layar monitor tidak muncul tampilan sama sekali.',
    question: 'Berdasarkan standar tabel kode beep AMI BIOS, pola bunyi 1 beep panjang dan 3 beep pendek mengindikasikan adanya masalah pada...',
    options: [
      { key: 'A', text: 'Sistem tata suara (Audio Sound Card)' },
      { key: 'B', text: 'Media penyimpanan harddisk atau SSD' },
      { key: 'C', text: 'Keyboard USB tidak terdeteksi' },
      { key: 'D', text: 'Bagian konversi kartu grafis/video (VGA / Video Memory)' },
      { key: 'E', text: 'Kipas pendingin prosesor berputar terlalu cepat' },
    ],
    correctAnswer: 'D',
    explanation: 'Pada standar AMI BIOS klasik dan UEFI kontemporer, kode 1 Beep Panjang + 3 Beep Pendek secara konsisten merepresentasikan "Conventional/Extended Memory Failure in Video Display" atau kegagalan inisialisasi Video Adapter (VGA Card).',
    optionsAnalysis: {
      A: 'Salah, sound card tidak memiliki alokasi kode beep 1 panjang 3 pendek.',
      B: 'Salah, masalah storage umumnya tidak memicu beep video, melainkan pesan teks boot failure.',
      C: 'Salah, kegagalan keyboard pada AMI BIOS umumnya 3 atau 5 beep pendek atau peringatan teks.',
      D: 'Benar, 1 long + 3 short beep pada AMI BIOS adalah indikator resmi kesalahan sistem kartu grafis/display.',
      E: 'Salah, kecepatan kipas tidak dilaporkan dengan kode beep video.'
    }
  },
  {
    id: 15,
    topic: 'Penggunaan BIOS/UEFI dan perangkat diagnostik sederhana',
    indicator: 'Mengidentifikasi fungsi lampu indikator LED Debug (EZ Debug LED) yang ada pada motherboard modern.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Banyak motherboard generasi sekarang tidak lagi menyertakan buzzer speaker, melainkan menyediakan fitur 4 buah lampu kecil yang bertuliskan: CPU, DRAM, VGA, dan BOOT.',
    question: 'Jika saat komputer dihidupkan lampu LED bertuliskan "DRAM" menyala terus-menerus berwarna jingga/merah dan proses booting berhenti, hal ini menandakan bahwa...',
    options: [
      { key: 'A', text: 'Kabel mouse tidak terpasang dengan kencang' },
      { key: 'B', text: 'Suhu prosesor berada di bawah 20 derajat Celsius' },
      { key: 'C', text: 'Harddisk sedang melakukan proses update sistem operasi' },
      { key: 'D', text: 'Power Supply kelebihan kapasitas daya' },
      { key: 'E', text: 'Komputer mendeteksi kegagalan atau ketiadaan memori RAM saat proses POST' },
    ],
    correctAnswer: 'E',
    explanation: 'EZ Debug LED dirancang untuk memudahkan teknisi mengisolasi sumber kegagalan POST secara visual. Lampu yang menyala dan tidak kunjung padam (hang) menunjukkan komponen yang gagal lolos uji inisialisasi. Jika LED DRAM yang menyala, artinya motherboard gagal mendeteksi atau berkomunikasi dengan modul memori RAM.',
    optionsAnalysis: {
      A: 'Salah, mouse tidak dicek oleh EZ Debug LED tahap DRAM.',
      B: 'Salah, lampu debug tidak mengindikasikan suhu rendah.',
      C: 'Salah, proses OS terjadi setelah POST selesai pada fase BOOT.',
      D: 'Salah, kelebihan kapasitas daya PSU tidak memicu lampu peringatan DRAM.',
      E: 'Benar, LED DRAM menunjukkan kegagalan pada subsistem memori utama (RAM).'
    }
  },
  {
    id: 16,
    topic: 'Troubleshooting komputer yang mengalami restart atau mati mendadak',
    indicator: 'Menganalisis hubungan antara penurunan tegangan rel +12V PSU dengan gejala restart saat komputer diberi beban grafis berat.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Sebuah komputer kantor yang baru ditambahkan kartu grafis eksternal berperforma tinggi sering mengalami restart seketika (reboot tanpa Blue Screen) tepat saat membuka aplikasi rendering video. Namun jika hanya digunakan untuk mengetik dokumen Word, komputer berjalan normal berjam-jam.',
    question: 'Penyebab paling mendasar yang menjelaskan fenomena tersebut adalah...',
    options: [
      { key: 'A', text: 'Kapasitas daya total (Watt) atau kestabilan arus rel +12V Power Supply tidak mencukupi saat kartu grafis bekerja pada beban puncak (Power Spike)' },
      { key: 'B', text: 'Resolusi layar monitor terlalu rendah untuk menampilkan aplikasi rendering' },
      { key: 'C', text: 'Kabel LAN internet mengalami gangguan interferensi elektromagnetik' },
      { key: 'D', text: 'Ukuran font pada aplikasi pengetikan dokumen terlalu kecil' },
      { key: 'E', text: 'Slot ekspansi PCI-Express mengalami kelebihan pin ground' },
    ],
    correctAnswer: 'A',
    explanation: 'Kartu grafis modern mengambil arus utama dari rel +12V PSU. Saat menjalankan aplikasi berat, konsumsi daya melonjak tajam (transient power spike). Jika PSU berkualitas rendah atau kapasitas watt murninya kurang, proteksi OCP (Over Current Protection) / UVP (Under Voltage Protection) pada PSU akan langsung memutus arus untuk mencegah kebakaran, menyebabkan PC langsung mati/restart.',
    optionsAnalysis: {
      A: 'Benar, ketidakmampuan rel +12V menyuplai daya puncak kartu grafis adalah pemicu klasik shutdown mendadak di bawah beban kerja berat.',
      B: 'Salah, resolusi monitor tidak menyebabkan sistem restart.',
      C: 'Salah, kabel LAN tidak berhubungan dengan kestabilan daya kartu grafis.',
      D: 'Salah, ukuran font tidak berpengaruh pada kelistrikan.',
      E: 'Salah, slot PCIe dirancang dengan konfigurasi pin ground standar.'
    }
  },
  {
    id: 17,
    topic: 'Identifikasi penyebab komputer mengalami overheat',
    indicator: 'Menjelaskan mekanisme penurunan performa (Thermal Throttling) pada prosesor yang mengalami kenaikan suhu abnormal.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Sedang',
    stimulus: 'Saat seorang siswa melakukan stress-test menggunakan software AIDA64, teramati frekuensi clock prosesor yang awalnya 4.2 GHz secara otomatis turun drastis ke 1.8 GHz saat suhu CPU menyentuh angka 98°C.',
    question: 'Mekanisme pengamanan otomatis prosesor tersebut dikenal dengan istilah...',
    options: [
      { key: 'A', text: 'Overclocking Extreme' },
      { key: 'B', text: 'Thermal Throttling' },
      { key: 'C', text: 'Memory Leakage' },
      { key: 'D', text: 'Disk Defragmentation' },
      { key: 'E', text: 'Buffer Overflow' },
    ],
    correctAnswer: 'B',
    explanation: 'Thermal Throttling adalah fitur proteksi internal pada CPU dan GPU modern. Ketika sensor suhu mendeteksi panas mendekati batas toleransi kritis (Tjunction Max), unit manajemen daya internal secara agresif menurunkan frekuensi clock dan voltase kerja agar produksi panas berkurang sehingga chip terhindar dari kerusakan permanen.',
    optionsAnalysis: {
      A: 'Salah, overclocking adalah menaikkan kecepatan di atas standar, bukan menurunkan.',
      B: 'Benar, thermal throttling adalah istilah teknis resmi untuk penurunan performa otomatis akibat panas berlebih.',
      C: 'Salah, memory leakage adalah bug software pada alokasi RAM.',
      D: 'Salah, defragmentation adalah penataan sektor harddisk.',
      E: 'Salah, buffer overflow adalah celah keamanan perangkat lunak.'
    }
  },
  {
    id: 18,
    topic: 'Troubleshooting perangkat input dan output',
    indicator: 'Mendiagnosis permasalahan port USB depan casing yang tidak mampu mendeteksi flashdisk berdaya tinggi.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Harddisk eksternal 2.5 inci berkapasitas 2 TB saat dihubungkan ke port USB panel depan casing hanya berbunyi klik-klik pelan dan tidak terdeteksi di Windows Explorer. Namun saat dipindahkan ke port USB langsung di bagian belakang motherboard (rear I/O panel), harddisk langsung terbaca lancar.',
    question: 'Penjelasan teknis yang paling tepat mengenai penyebab perbedaan kondisi tersebut adalah...',
    options: [
      { key: 'A', text: 'Windows Explorer hanya mengizinkan pembacaan harddisk eksternal lewat port USB belakang' },
      { key: 'B', text: 'Port USB depan hanya dirancang khusus untuk kabel pengisi daya ponsel' },
      { key: 'C', text: 'Kabel ekstensi header USB panel depan terlalu panjang atau kualitas kabel kurang baik sehingga terjadi penurunan tegangan (voltage drop) yang membuat arus tidak cukup untuk memutar motor harddisk' },
      { key: 'D', text: 'Harddisk eksternal tersebut telah terinfeksi virus yang menolak port depan' },
      { key: 'E', text: 'Kabel SATA harddisk internal otomatis mematikan port USB depan saat menyala' },
    ],
    correctAnswer: 'C',
    explanation: 'Harddisk eksternal mekanik 2.5 inci membutuhkan arus stabil minimal 500-900 mA pada tegangan 5V untuk memutar spindle motor dan menggerakkan head. Kabel header USB front panel yang panjang dan tipis dapat memicu hambatan listrik (voltage drop), menyebabkan motor piringan kekurangan tenaga (under-voltage clicking). Port belakang tersolder langsung ke motherboard dengan pasokan arus lebih bersih dan minim hambatan kabel.',
    optionsAnalysis: {
      A: 'Salah, Windows Explorer tidak membatasi letak fisik port USB.',
      B: 'Salah, port USB depan adalah port data standar yang mendukung transfer data.',
      C: 'Benar, hambatan kabel front panel casing sering menyebabkan voltage drop pada perangkat yang rakus daya seperti HDD mekanik.',
      D: 'Salah, infeksi virus tidak memiliki preferensi port fisik depan vs belakang.',
      E: 'Salah, jalur SATA dan jalur USB dikelola oleh pengontrol yang berbeda.'
    }
  },
  {
    id: 19,
    topic: 'Langkah sistematis dalam menemukan sumber kerusakan',
    indicator: 'Menentukan urutan langkah troubleshooting yang logis berdasarkan metode eliminasi dari yang termudah ke yang paling rumit.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Seorang teknisi profesional selalu mengikuti prinsip: "Mulai dari hal yang paling sederhana, murah, dan tidak merusak (simplest and least invasive first)".',
    question: 'Urutan langkah investigasi yang paling sistematis saat menangani komputer yang mati total (tidak ada tanda kehidupan sama sekali) adalah...',
    options: [
      { key: 'A', text: 'Mengganti motherboard -> mengganti prosesor -> memeriksa kabel power di stopkontak -> menginstal ulang Windows' },
      { key: 'B', text: 'Membongkar heatsink CPU -> membersihkan debu kipas -> menginstal ulang antivirus -> mengganti kabel HDMI' },
      { key: 'C', text: 'Mengganti modul RAM -> membeli kartu grafis baru -> memeriksa voltase stopkontak -> membersihkan layar monitor' },
      { key: 'D', text: 'Memeriksa stopkontak dan kabel power listrik -> memastikan sakelar I/O pada PSU dalam posisi ON -> memeriksa kabel konektor 24-pin ATX & Front Panel -> menguji PSU dengan jumper test' },
      { key: 'E', text: 'Melakukan flashing chip BIOS -> mengganti harddisk SSD -> memeriksa sekring rumah -> memasang kabel LAN' },
    ],
    correctAnswer: 'D',
    explanation: 'Troubleshooting profesional selalu dimulai dari sumber pasokan energi eksternal (stopkontak listrik, sakelar fisik PSU), lalu ke kabel internal primer (konektor 24-pin dan sakelar front panel), dilanjutkan dengan pengujian mandiri catu daya (jumper test), sebelum akhirnya mencurigai kerusakan komponen inti berbiaya tinggi.',
    optionsAnalysis: {
      A: 'Salah fatal, mengganti motherboard dan CPU di langkah awal membuang waktu dan biaya besar tanpa verifikasi dasar kelistrikan.',
      B: 'Salah, membongkar CPU tidak relevan untuk komputer yang belum terverifikasi pasokan daya listriknya.',
      C: 'Salah, membeli kartu grafis baru sebelum cek colokan listrik melanggar metodologi dasar troubleshooting.',
      D: 'Benar, ini adalah alur logis eliminasi mulai dari sumber daya terluar hingga pengujian komponen internal secara bertahap.',
      E: 'Salah fatal, flashing BIOS pada unit mati total tanpa daya adalah tindakan keliru.'
    }
  },
  {
    id: 20,
    topic: 'Prosedur keselamatan kerja saat pengujian dan perbaikan',
    indicator: 'Mengidentifikasi prosedur keselamatan kerja kelistrikan (K3LH) untuk mencegah sengatan listrik dan kerusakan komponen akibat ESD.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Peralatan elektronik komputer sangat rentan terhadap fenomena pelepasan muatan listrik statis dari tubuh manusia yang dikenal sebagai ESD (Electrostatic Discharge).',
    question: 'Alat pelindung diri utama yang wajib digunakan oleh teknisi saat merakit dan menyentuh papan sirkuit komputer untuk mencegah kerusakan akibat ESD adalah...',
    options: [
      { key: 'A', text: 'Kacamata pelindung sinar UV (safety sunglasses)' },
      { key: 'B', text: 'Masker respirator penyaring gas beracun' },
      { key: 'C', text: 'Sepatu lars berbahan sol pelat besi tebal' },
      { key: 'D', text: 'Sarung tangan kain tebal berbulu wol' },
      { key: 'E', text: 'Gelang antistatis (anti-static wrist strap) yang terhubung ke grounding sasis logam tanpa cat' },
    ],
    correctAnswer: 'E',
    explanation: 'Gelang antistatis (anti-static wrist strap) memiliki kabel dengan resistor 1 Megaohm yang dihubungkan ke titik arde (grounding). Alat ini secara kontinu menyalurkan akumulasi muatan listrik statis dari tubuh manusia ke bumi secara aman, mencegah lonjakan voltase ribuan volt yang dapat merusak sirkuit mikrochip semikonduktor.',
    optionsAnalysis: {
      A: 'Salah, kacamata UV untuk radiasi cahaya, tidak mencegah muatan listrik statis.',
      B: 'Salah, masker gas tidak berhubungan dengan pelepasan muatan statis.',
      C: 'Salah, sepatu pelat besi tidak diperuntukkan bagi penanganan chip elektronik sensitif.',
      D: 'Salah fatal, bahan wol adalah salah satu pembangkit listrik statis terbesar melalui gesekan triboelektrik.',
      E: 'Benar, gelang antistatis adalah standar mutlak K3 bengkel perakitan komputer.'
    }
  },

  // 21-30
  {
    id: 21,
    topic: 'Konsep dasar pengujian komputer setelah proses perakitan',
    indicator: 'Menjelaskan perbedaan mendasar antara pengujian fungsional hardware (POST/BIOS) dan pengujian ketahanan beban (stress testing).',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Sedang',
    stimulus: 'Setelah komputer berhasil menyala dan masuk ke lingkungan sistem operasi, teknisi senior meminta siswa melakukan stress test selama minimal 30 menit.',
    question: 'Tujuan utama dilakukannya pengujian ketahanan beban (stress test/burn-in test) pada komputer yang baru dirakit adalah...',
    options: [
      { key: 'A', text: 'Memverifikasi kestabilan sistem, keandalan suplai daya, dan efektivitas pendinginan ketika seluruh komponen bekerja pada beban kerja maksimum 100%' },
      { key: 'B', text: 'Mengosongkan cache memori SSD agar kapasitas penyimpanannya bertambah besar' },
      { key: 'C', text: 'Menguji ketahanan fisik layar kaca monitor terhadap benturan mekanis' },
      { key: 'D', text: 'Memastikan suara kipas pendingin dapat terdengar sampai ke luar ruangan laboratorium' },
      { key: 'E', text: 'Menghapus lisensi sistem operasi lama agar dapat dipasang lisensi baru' },
    ],
    correctAnswer: 'A',
    explanation: 'Komputer yang lolos POST belum tentu stabil saat digunakan kerja berat. Stress test memacu CPU, GPU, dan RAM pada kapasitas puncak untuk mengungkap cacat tersembunyi seperti panas berlebih (overheat), fluktuasi voltase PSU yang drop, atau ketidakstabilan timing memori.',
    optionsAnalysis: {
      A: 'Benar, stress testing memvalidasi ketahanan termal dan kelistrikan di bawah skenario beban maksimal.',
      B: 'Salah, stress test tidak menambah kapasitas fisik media penyimpanan.',
      C: 'Salah, benturan fisik monitor bukan bagian dari stress testing perangkat lunak/komponen.',
      D: 'Salah, kebisingan kipas bukan sasaran pengujian ketahanan sistem.',
      E: 'Salah, stress test tidak menghapus registri lisensi sistem operasi.'
    }
  },
  {
    id: 22,
    topic: 'Prosedur pemeriksaan awal sebelum komputer dinyalakan',
    indicator: 'Menganalisis bahaya pemasangan standoff (baut pengganjal motherboard) yang tidak sesuai dengan lubang baut motherboard.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sedang',
    stimulus: 'Seorang siswa memasang motherboard berukuran Micro-ATX ke dalam casing berukuran Mid-Tower. Di bagian pelat casing terdapat standoff kuningan sisa pemasangan motherboard ATX lama yang posisinya tidak bertepatan dengan lubang baut motherboard baru.',
    question: 'Jika standoff logam ekstra tersebut dibiarkan terpasang di balik motherboard tanpa lubang sekrup pelindung, risiko fatal yang dapat terjadi saat komputer dinyalakan adalah...',
    options: [
      { key: 'A', text: 'Layar monitor akan otomatis berubah warna menjadi hitam-putih' },
      { key: 'B', text: 'Ujung logam standoff menyentuh jalur tembaga di balik PCB motherboard sehingga memicu korsleting listrik (short circuit) yang dapat mematikan motherboard' },
      { key: 'C', text: 'Kecepatan putaran kipas pendingin prosesor akan melambat secara drastis' },
      { key: 'D', text: 'Kapasitas RAM yang terbaca di BIOS berkurang setengahnya' },
      { key: 'E', text: 'Kabel front panel audio akan memancarkan gelombang frekuensi radio FM' },
    ],
    correctAnswer: 'B',
    explanation: 'Standoff kuningan/besi berfungsi meninggikan PCB motherboard agar tidak menempel pada rangka logam casing. Jika ada standoff ekstra yang posisinya salah, ujungnya akan langsung menekan solderan pin komponen atau jalur daya di punggung PCB, memicu short circuit fatal saat diberi arus listrik.',
    optionsAnalysis: {
      A: 'Salah, warna monitor tidak dipengaruhi kontak standoff di balik board.',
      B: 'Benar, standoff liar yang menyentuh bagian belakang PCB adalah penyebab paling umum kerusakan motherboard akibat korsleting ke ground casing.',
      C: 'Salah, korsleting biasanya menyebabkan proteksi PSU mati total, bukan sekadar menurunkan kecepatan kipas.',
      D: 'Salah, fenomena ini menyebabkan sistem gagal menyala atau rusak permanen, bukan memotong kapasitas RAM secara spesifik.',
      E: 'Salah, kabel audio tidak berubah menjadi pemancar radio FM.'
    }
  },
  {
    id: 23,
    topic: 'Pengujian POST (Power-On Self-Test)',
    indicator: 'Mengidentifikasi arti dari bunyi 1 beep pendek pada komputer dengan BIOS Award/AMI.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C1',
    difficulty: 'Mudah',
    stimulus: 'Setelah merakit komputer dan menekan tombol power, terdengar bunyi "beep" pendek sebanyak 1 kali dari speaker internal, disusul munculnya logo vendor di layar.',
    question: 'Arti dari bunyi 1 kali beep pendek normal pada sebagian besar motherboard adalah...',
    options: [
      { key: 'A', text: 'Sistem mengalami kerusakan pada keyboard' },
      { key: 'B', text: 'Prosesor mengalami overheat dan akan segera dimatikan' },
      { key: 'C', text: 'Komputer telah berhasil melewati pengujian POST dengan normal dan seluruh perangkat keras inti siap bekerja' },
      { key: 'D', text: 'Baterai CMOS dalam kondisi kosong' },
      { key: 'E', text: 'Koneksi jaringan internet terputus' },
    ],
    correctAnswer: 'C',
    explanation: 'Bunyi 1 kali beep pendek (single short beep) adalah indikasi universal paling melegakan bagi teknisi perakitan, yang menandakan rutinitas POST sukses (POST passed) dan kontrol dialihkan ke proses booting media simpan.',
    optionsAnalysis: {
      A: 'Salah, keyboard error biasanya memicu bunyi beep panjang atau jamak atau pesan peringatan.',
      B: 'Salah, overheat tidak ditandai dengan 1 beep pendek normal.',
      C: 'Benar, 1 beep pendek adalah sinyal universal keberhasilan inisialisasi POST.',
      D: 'Salah, baterai CMOS kosong tidak memicu beep normal, melainkan pesan setup error.',
      E: 'Salah, koneksi internet berada di luar cakupan pemeriksaan awal POST BIOS.'
    }
  },
  {
    id: 24,
    topic: 'Identifikasi gejala komputer gagal melakukan booting',
    indicator: 'Mendiagnosis siklus restart berulang tanpa henti sebelum masuk OS (Boot Loop).',
    skillMeasured: 'Penalaran',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Sebuah PC dinyalakan: kipas menyala selama 3 detik, mati selama 2 detik, lalu menyala lagi dengan sendirinya, mati lagi, dan berulang terus menerus (boot loop) tanpa menampilkan gambar apa pun di monitor.',
    question: 'Langkah pengujian diagnosis yang paling akurat untuk mengidentifikasi akar masalah siklus boot loop tersebut adalah...',
    options: [
      { key: 'A', text: 'Mengganti kabel monitor HDMI dengan kabel DisplayPort' },
      { key: 'B', text: 'Membersihkan layar monitor dari debu yang menempel menggunakan kain microfiber' },
      { key: 'C', text: 'Menambah volume speaker aktif eksternal hingga maksimal' },
      { key: 'D', text: 'Melakukan Clear CMOS (reset BIOS ke default pabrik), menguji RAM satu per satu pada slot berbeda, dan memeriksa apakah ada pin soket CPU yang bengkok' },
      { key: 'E', text: 'Membalik orientasi kabel kipas pendingin casing' },
    ],
    correctAnswer: 'D',
    explanation: 'Boot loop cepat (power cycling) sebelum POST selesai umumnya disebabkan oleh: (1) Setting memori/timing BIOS yang korup atau tidak kompatibel (diselesaikan dengan Clear CMOS), (2) Modul RAM bermasalah di slot tertentu (uji single stick), atau (3) Pin soket CPU (misalnya LGA) ada yang bengkok/patah sehingga jalur komunikasi memori dual-channel terputus.',
    optionsAnalysis: {
      A: 'Salah, kabel monitor tidak dapat menyebabkan siklus reset daya motherboard berulang.',
      B: 'Salah, kebersihan layar tidak berhubungan dengan kelistrikan motherboard.',
      C: 'Salah, volume speaker tidak ada relevansinya.',
      D: 'Benar, Clear CMOS, isolasi RAM keping per keping, dan inspeksi pin soket prosesor adalah prosedur diagnostik standar boot loop.',
      E: 'Salah, konektor kipas berkunci notch sehingga tidak dapat dibalik sembarangan dan bukan pemicu utama boot loop.'
    }
  },
  {
    id: 25,
    topic: 'Pemeriksaan dan identifikasi masalah BIOS/UEFI',
    indicator: 'Menganalisis perbedaan mode UEFI Boot dan Legacy/CSM Boot saat sistem gagal mendeteksi partisi sistem operasi.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Seorang teknisi memindahkan SSD yang berisi instalasi Windows 10 lama dengan skema partisi MBR (Master Boot Record) ke komputer baru yang secara default mengaktifkan mode Pure UEFI (CSM Disabled). Saat dinyalakan, SSD tersebut terdeteksi di daftar SATA/NVMe, namun tidak muncul sama sekali di menu Boot Priority.',
    question: 'Mengapa SSD tersebut tidak dapat di-booting pada komputer baru dan apa solusi konfigurasi BIOS yang harus dilakukan?',
    options: [
      { key: 'A', text: 'SSD tersebut telah rusak total akibat medan magnet casing baru dan harus dibuang' },
      { key: 'B', text: 'Port SATA pada motherboard baru menolak kecepatan transfer data SSD generasi lama' },
      { key: 'C', text: 'Kapasitas memori RAM pada komputer baru terlalu besar untuk membaca partisi lama' },
      { key: 'D', text: 'Baterai CMOS harus dicopot secara permanen agar partisi MBR dapat terbaca' },
      { key: 'E', text: 'Mode Pure UEFI hanya mengenali skema partisi GPT; solusinya mengaktifkan fitur CSM (Compatibility Support Module) di BIOS atau mengonversi partisi SSD ke GPT' },
    ],
    correctAnswer: 'E',
    explanation: 'UEFI murni (Pure UEFI) membutuhkan skema partisi GPT (GUID Partition Table) yang memuat partisi khusus EFI System Partition (ESP) berformat FAT32. Jika sistem operasi di SSD lama dibuat menggunakan skema partisi MBR/Legacy, UEFI tidak akan mendeteksi bootloader-nya kecuali fitur CSM (Compatibility Support Module) diaktifkan, atau partisi dikonversi ke GPT menggunakan utilitas mbr2gpt.',
    optionsAnalysis: {
      A: 'Salah, SSD tidak menggunakan piringan magnetik dan tidak rusak hanya karena dipindahkan.',
      B: 'Salah, antarmuka SATA bersifat backwards compatible secara penuh.',
      C: 'Salah, ukuran RAM tidak membatasi pembacaan skema partisi MBR.',
      D: 'Salah, mencabut baterai CMOS justru mengembalikan setting ke default (CSM disabled).',
      E: 'Benar, ketidakcocokan antara partisi MBR dan firmware UEFI murni mewajibkan pengaktifan CSM atau konversi struktur partisi ke GPT.'
    }
  },
  {
    id: 26,
    topic: 'Pengujian fungsi perangkat keras (hardware)',
    indicator: 'Mengidentifikasi parameter pemantauan hardware (Hardware Monitor) yang tersedia di dalam menu BIOS/UEFI.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Pada menu antarmuka BIOS/UEFI modern, terdapat tab khusus bernama "H/W Monitor" atau "PC Health Status".',
    question: 'Informasi vital yang dapat dipantau langsung oleh teknisi pada halaman Hardware Monitor tersebut adalah...',
    options: [
      { key: 'A', text: 'Suhu prosesor (CPU Temp), kecepatan putaran kipas (RPM Fan), serta kestabilan voltase rel catu daya (+12V, +5V, +3.3V, VCore)' },
      { key: 'B', text: 'Daftar riwayat penelusuran situs web yang pernah dibuka pengguna' },
      { key: 'C', text: 'Jumlah file virus dan trojan yang tersimpan di dalam folder download' },
      { key: 'D', text: 'Estimasi tagihan rekening listrik bulanan laboratorium komputer' },
      { key: 'E', text: 'Kekuatan sinyal radio pemancar radio amatir di lingkungan sekitar' },
    ],
    correctAnswer: 'A',
    explanation: 'Menu H/W Monitor (Hardware Monitor) membaca data langsung dari chip Super I/O pada motherboard, menampilkan parameter fisik esensial: temperatur CPU/Motherboard, kecepatan rotasi kipas pendingin (RPM), dan pembacaan sensor voltase pada berbagai rel daya (Vcore, +3.3V, +5V, +12V).',
    optionsAnalysis: {
      A: 'Benar, temperatur, putaran kipas, dan voltase rel daya adalah data utama pada Hardware Monitor BIOS.',
      B: 'Salah, riwayat penelusuran web disimpan di browser sistem operasi, bukan di BIOS.',
      C: 'Salah, BIOS tidak bertindak sebagai pemindai file antivirus.',
      D: 'Salah, BIOS tidak menghitung tagihan listrik finansial.',
      E: 'Salah, tidak ada sensor penerima frekuensi radio umum di chip motherboard standar.'
    }
  },
  {
    id: 27,
    topic: 'Identifikasi kerusakan RAM dan slot RAM',
    indicator: 'Menganalisis konfigurasi penempatan dua keping modul RAM untuk mengaktifkan fitur Dual-Channel Memory.',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Sebuah motherboard memiliki 4 slot memori RAM yang diberi kode: DIMM_A1, DIMM_A2, DIMM_B1, dan DIMM_B2. Teknisi memiliki 2 keping modul RAM DDR4 identik masing-masing 8 GB.',
    question: 'Berdasarkan buku manual motherboard pada umumnya, konfigurasi slot manakah yang direkomendasikan agar kedua RAM bekerja secara optimal pada mode Dual-Channel?',
    options: [
      { key: 'A', text: 'Dipasang berjejeran pada slot DIMM_A1 dan DIMM_A2 saja' },
      { key: 'B', text: 'Dipasang pada slot yang berselang, yaitu DIMM_A2 dan DIMM_B2 (Slot 2 dan Slot 4)' },
      { key: 'C', text: 'Dipasang satu keping di motherboard dan satu keping lagi disimpan di lemari' },
      { key: 'D', text: 'Dipasang menumpuk pada satu slot DIMM_A1 secara paksa' },
      { key: 'E', text: 'Dipasang pada slot DIMM_B1 dan DIMM_B2 saja' },
    ],
    correctAnswer: 'B',
    explanation: 'Pada topologi motherboard modern dengan 4 slot (daisy-chain topology), slot kedua (A2) dan keempat (B2) merupakan ujung jalur sinyal memori dari prosesor. Menempatkan RAM pada slot A2 dan B2 meminimalkan pantulan sinyal (signal reflection), memastikan interleave data 128-bit (Dual Channel) berjalan stabil pada kecepatan penuh.',
    optionsAnalysis: {
      A: 'Kurang tepat, memasang di A1 dan A2 menempatkan kedua RAM pada Channel A yang sama (Single Channel mode).',
      B: 'Benar, kombinasi A2 dan B2 adalah rekomendasi standar sebagian besar vendor motherboard untuk aktivasi dual channel 2 keping.',
      C: 'Salah, tidak mengaktifkan potensi dual channel dan menyia-nyiakan modul yang ada.',
      D: 'Salah fatal, slot RAM tidak dapat ditumpuk secara fisik.',
      E: 'Kurang tepat, B1 dan B2 berada pada Channel B yang sama (Single Channel).'
    }
  },
  {
    id: 28,
    topic: 'Pengujian prosesor dan sistem pendingin',
    indicator: 'Menilai teknik pengaplikasian thermal paste (pasta pendingin) yang benar pada permukaan prosesor (Integrated Heat Spreader).',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Pada saat memasang prosesor desktop, siswa sering bingung menentukan takaran dan metode pemberian thermal paste di atas permukaan IHS (Integrated Heat Spreader).',
    question: 'Metode dan takaran pengolesan thermal paste yang paling direkomendasikan untuk prosesor standar adalah...',
    options: [
      { key: 'A', text: 'Mengoleskan seluruh isi satu tabung suntik besar hingga meluber keluar pinggiran soket motherboard' },
      { key: 'B', text: 'Mencampur pasta dengan lem kayu agar heatsink tidak mudah lepas' },
      { key: 'C', text: 'Meneteskan pasta seukuran sebutir biji jagung / kacang polong di titik tengah IHS, yang nantinya akan merata secara alami saat heatsink ditekan dan dibaut kencang' },
      { key: 'D', text: 'Tidak perlu menggunakan pasta sama sekali karena udara adalah konduktor panas terbaik' },
      { key: 'E', text: 'Mengoleskan pasta pada pin emas di bagian bawah soket prosesor' },
    ],
    correctAnswer: 'C',
    explanation: 'Thermal paste berfungsi mengisi celah mikroskopis udara antara permukaan logam IHS prosesor dan dasar heatsink. Porsi sebesar biji kacang polong/jagung (pea-sized dot) di bagian tengah adalah takaran ideal; tekanan pengencangan heatsink secara diagonal akan meratakannya membentuk lapisan tipis tanpa meluap ke sirkuit PCB motherboard.',
    optionsAnalysis: {
      A: 'Salah, pasta berlebih yang meluber berisiko mengotori komponen soket dan beberapa pasta konduktif dapat memicu korsleting.',
      B: 'Salah fatal, lem kayu adalah isolator panas yang akan merusak prosesor.',
      C: 'Benar, metode titik tengah (pea dot) adalah teknik standar paling aman dan efisien bagi teknisi pemula maupun profesional.',
      D: 'Salah fatal, udara adalah konduktor panas yang sangat buruk (isolator termal).',
      E: 'Salah fatal, mengoleskan pasta ke pin soket akan merusak koneksi elektrik pin prosesor.'
    }
  },
  {
    id: 29,
    topic: 'Pemeriksaan motherboard dan konektor',
    indicator: 'Mengidentifikasi fungsi kabel daya tambahan 4-pin atau 8-pin ATX12V / EPS12V pada motherboard.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Selain konektor utama 24-pin ATX, pada sudut kiri atas dekat soket prosesor selalu terdapat konektor daya tambahan berukuran 4-pin atau 8-pin.',
    question: 'Fungsi utama dari konektor daya 4-pin / 8-pin (ATX12V/EPS) tersebut adalah...',
    options: [
      { key: 'A', text: 'Mengalirkan daya ke lampu LED RGB pada kipas casing belakang' },
      { key: 'B', text: 'Memberikan cadangan daya untuk kartu suara (sound card)' },
      { key: 'C', text: 'Menghubungkan sinyal antena Wi-Fi internal' },
      { key: 'D', text: 'Menyuplai daya listrik +12V khusus ke modul pengatur tegangan (VRM) untuk konsumsi daya prosesor (CPU)' },
      { key: 'E', text: 'Mengisi ulang daya baterai CMOS secara otomatis' },
    ],
    correctAnswer: 'D',
    explanation: 'Konektor 24-pin utama motherboard tidak mampu membawa seluruh arus amper tinggi yang dibutuhkan prosesor modern secara aman. Konektor 4-pin atau 8-pin ATX12V/EPS12V memasok tegangan murni +12V langsung ke sirkuit VRM (Voltage Regulator Module) yang kemudian diturunkan menjadi Vcore untuk prosesor.',
    optionsAnalysis: {
      A: 'Salah, LED RGB menggunakan header ARGB 5V/RGB 12V tersendiri.',
      B: 'Salah, sound card onboard mengambil daya dari jalur bus motherboard.',
      C: 'Salah, kabel antena Wi-Fi adalah kabel koaksial kecil ke kartu M.2 Wi-Fi.',
      D: 'Benar, konektor 4/8-pin didedikasikan untuk mensuplai daya VRM prosesor.',
      E: 'Salah, baterai CMOS CR2032 adalah baterai primer (non-rechargeable) lithium koin.'
    }
  },
  {
    id: 30,
    topic: 'Pemeriksaan power supply unit (PSU)',
    indicator: 'Menganalisis hasil pengukuran tegangan keluaran rel PSU menggunakan Multimeter Digital.',
    skillMeasured: 'Penalaran',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Seorang teknisi mengukur tegangan keluaran konektor Molex dan SATA pada PSU menggunakan multimeter digital posisi DC Volt saat PSU diberi beban jumper: Kabel Kuning terukur 10.4 Volt, Kabel Merah terukur 5.05 Volt, dan Kabel Oranye terukur 3.32 Volt.',
    question: 'Berdasarkan standar toleransi regulasi ATX (toleransi normal ±5%), bagaimanakah status kondisi kelistrikan PSU tersebut?',
    options: [
      { key: 'A', text: 'PSU dalam kondisi sempurna dan sangat layak digunakan untuk jangka panjang' },
      { key: 'B', text: 'Rel tegangan +5V (kabel merah) terlalu tinggi sehingga harus dibuang resistornya' },
      { key: 'C', text: 'Rel tegangan +3.3V (kabel oranye) tidak stabil' },
      { key: 'D', text: 'Multimeter digital teknisi tersebut pasti mengalami kerusakan baterai' },
      { key: 'E', text: 'Rel tegangan +12V (kabel kuning) mengalami drop tegangan parah melampaui batas toleransi minimum (11.4V), sehingga PSU berbahaya dan berpotensi merusak harddisk serta kartu grafis' },
    ],
    correctAnswer: 'E',
    explanation: 'Standar spesifikasi Intel ATX menetapkan batas toleransi rel tegangan adalah ±5%. Untuk rel +12V, nilai tegangan aman terendah adalah 11.40V dan tertinggi 12.60V. Tegangan 10.4V adalah undervoltage ekstrim (-13.3%), yang akan mengakibatkan motor spindle harddisk gagal berputar stabil, VRM GPU overheating karena kompensasi arus tinggi, dan komputer restart mendadak.',
    optionsAnalysis: {
      A: 'Salah fatal, tegangan 10.4V pada rel 12V sangat cacat.',
      B: 'Salah, 5.05V berada tepat dalam toleransi 5V (4.75V - 5.25V).',
      C: 'Salah, 3.32V berada sangat ideal dalam toleransi 3.3V (3.135V - 3.465V).',
      D: 'Salah, pembacaan rel lain normal membuktikan instrumen multimeter bekerja dengan baik.',
      E: 'Benar, rel 12V di bawah 11.4V berada di luar ambang batas toleransi aman ATX dan berbahaya bagi komponen bermotor serta VRM.'
    }
  },

  // 31-40
  {
    id: 31,
    topic: 'Identifikasi masalah VGA atau kartu grafis',
    indicator: 'Mendiagnosis masalah instalasi driver grafis yang salah sehingga layar hanya mampu menampilkan resolusi rendah (800x600).',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Setelah komputer selesai diinstal ulang dengan sistem operasi baru, tampilan desktop terlihat sangat besar, buram, resolusi terkunci pada 1024x768, dan pada Device Manager terdapat tanda seru warna kuning pada bagian "Display Adapters: Microsoft Basic Display Adapter".',
    question: 'Tindakan perbaikan yang harus dilakukan teknisi untuk mengatasi masalah tampilan tersebut adalah...',
    options: [
      { key: 'A', text: 'Mengunduh dan menginstal driver kartu grafis resmi yang sesuai dengan merek dan tipe GPU dari situs web produsen resminya' },
      { key: 'B', text: 'Mengganti layar monitor dengan monitor tabung CRT lama' },
      { key: 'C', text: 'Memotong kabel VGA monitor yang terlalu panjang' },
      { key: 'D', text: 'Mencabut kartu grafis dan tidak menggunakannya lagi' },
      { key: 'E', text: 'Menghapus seluruh file pada direktori Windows/System32' },
    ],
    correctAnswer: 'A',
    explanation: 'Keterangan "Microsoft Basic Display Adapter" dengan tanda seru mengindikasikan bahwa sistem operasi hanya menjalankan driver generik darurat tanpa akselerasi 2D/3D hardware. Teknisi harus menginstal driver spesifik (NVIDIA, AMD, atau Intel) agar resolusi native monitor (seperti 1920x1080) dan fitur akselerasi grafis aktif.',
    optionsAnalysis: {
      A: 'Benar, menginstal driver OEM resmi adalah prosedur mutlak agar chip grafis dapat mengontrol resolusi dan refresh rate secara penuh.',
      B: 'Salah, monitor CRT bukan solusi untuk resolusi rendah pada panel LCD modern.',
      C: 'Salah fatal, memotong kabel akan merusak perangkat display.',
      D: 'Salah, kartu grafis tidak perlu dicabut jika hanya terkendala instalasi driver.',
      E: 'Salah fatal, menghapus System32 akan merusak sistem operasi seketika.'
    }
  },
  {
    id: 32,
    topic: 'Pemeriksaan media penyimpanan HDD dan SSD',
    indicator: 'Menganalisis parameter kesehatan S.M.A.R.T pada media penyimpanan menggunakan software CrystalDiskInfo.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sedang',
    stimulus: 'Seorang teknisi memeriksa harddisk pelanggan menggunakan aplikasi CrystalDiskInfo. Status kesehatan harddisk menampilkan status "Caution / Waspada" berwarna kuning dengan atribut "Reallocated Sectors Count" dan "Current Pending Sector Count" yang nilainya meningkat.',
    question: 'Berdasarkan interpretasi data S.M.A.R.T tersebut, kesimpulan teknis dan saran yang paling tepat untuk diberikan kepada pemilik komputer adalah...',
    options: [
      { key: 'A', text: 'Harddisk dalam kondisi prima dan kecepatan transfer datanya meningkat dua kali lipat' },
      { key: 'B', text: 'Harddisk mengalami kerusakan sektor fisik (bad sector) yang terus berkembang; segera lakukan pencadangan (backup) data penting dan persiapkan penggantian harddisk baru' },
      { key: 'C', text: 'Kabel power supply ke harddisk kelebihan pasokan voltase sebesar 50 volt' },
      { key: 'D', text: 'Cukup bersihkan piringan magnetik harddisk dengan cairan pembersih kaca' },
      { key: 'E', text: 'Harddisk hanya membutuhkan penggantian stiker segel garansi' },
    ],
    correctAnswer: 'B',
    explanation: 'Atribut S.M.A.R.T "Reallocated Sector Count" menunjukkan sektor piringan yang rusak fisik telah dinonaktifkan dan dialihkan ke area cadangan. Adanya "Pending Sector" menandakan kerusakan sektor sedang bertambah. Kondisi "Caution" adalah sinyal bahaya kegagalan total yang mendesak pengguna segera mem-backup data ke media lain.',
    optionsAnalysis: {
      A: 'Salah, status Caution warna kuning menandakan degradasi media, bukan kondisi prima.',
      B: 'Benar, segera mencadangkan data sebelum terjadi crash total adalah SOP mitigasi resiko teknisi TKJ.',
      C: 'Salah, S.M.A.R.T membaca integritas sektor magnetik, bukan tegangan lebih 50V.',
      D: 'Salah fatal, membuka penutup harddisk di luar cleanroom akan menghancurkan permukaan piringan akibat partikel debu.',
      E: 'Salah, stiker tidak mempengaruhi kesehatan sektor penyimpanan.'
    }
  },
  {
    id: 33,
    topic: 'Identifikasi masalah monitor dan kabel display',
    indicator: 'Mendiagnosis fenomena "layar monitor berkedip (flickering)" akibat pengaturan refresh rate atau interferensi kabel.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Layar monitor LCD di laboratorium komputer mengalami kedipan halus (flicker) terus-menerus yang membuat mata siswa cepat lelah saat membaca teks, padahal kabel display VGA sudah terpasang dengan baut terkunci rapat.',
    question: 'Langkah pemecahan masalah pertama pada sisi konfigurasi sistem operasi yang tepat untuk mengeliminasi kedipan tersebut adalah...',
    options: [
      { key: 'A', text: 'Mengganti mouse dengan model nirkabel (wireless)' },
      { key: 'B', text: 'Menghapus seluruh file font di direktori Windows' },
      { key: 'C', text: 'Menaikkan pengaturan Refresh Rate monitor di Display Settings Windows dari 59/60 Hz ke angka refresh rate tertinggi yang didukung monitor (misal 75 Hz atau 144 Hz)' },
      { key: 'D', text: 'Menurunkan kecerahan monitor hingga 0 persen sehingga layar gelap total' },
      { key: 'E', text: 'Mengganti papan tombol keyboard dengan keyboard mekanik' },
    ],
    correctAnswer: 'C',
    explanation: 'Flickering pada monitor sering disebabkan oleh ketidakcocokan refresh rate antara kartu display dan panel monitor (misal berjalan pada frekuensi default rendah 59Hz/interlaced). Mengatur refresh rate ke frekuensi vertikal optimal native monitor menghilangkan kedipan visual panel.',
    optionsAnalysis: {
      A: 'Salah, tipe mouse tidak mempengaruhi frekuensi penyegaran layar monitor.',
      B: 'Salah, menghapus font merusak antarmuka teks sistem operasi.',
      C: 'Benar, memeriksa dan menyesuaikan refresh rate ke nilai native monitor adalah solusi utama kedipan display.',
      D: 'Salah, layar gelap total tidak dapat digunakan sama sekali.',
      E: 'Salah, keyboard mekanik tidak meredakan kedipan panel monitor.'
    }
  },
  {
    id: 34,
    topic: 'Penggunaan bunyi beep dan indikator diagnostik',
    indicator: 'Mengidentifikasi kode beep khas motherboard saat modul RAM tidak terpasang sama sekali.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Seorang teknisi sengaja menghidupkan komputer tanpa memasang RAM untuk menguji apakah sirkuit deteksi POST pada motherboard dan speaker internal berfungsi normal.',
    question: 'Bunyi beep yang lazim dihasilkan oleh motherboard (Award BIOS) ketika mendeteksi ketiadaan RAM adalah...',
    options: [
      { key: 'A', text: 'Tidak ada bunyi sama sekali dan sistem langsung masuk ke sistem operasi' },
      { key: 'B', text: 'Bunyi lagu mars kebangsaan secara terus menerus' },
      { key: 'C', text: 'Satu kali beep pendek lalu komputer meledak' },
      { key: 'D', text: 'Bunyi beep panjang yang berulang-ulang tanpa henti dengan jeda teratur (Beep... Beep... Beep...)' },
      { key: 'E', text: 'Tiga kali beep pendek lalu masuk ke browser internet' },
    ],
    correctAnswer: 'D',
    explanation: 'Pada Award/Phoenix BIOS dan banyak firmware standar, deteksi ketiadaan RAM (No DRAM detected) ditandai dengan bunyi beep panjang terus menerus dengan jeda teratur (Continuous long beeps) untuk memberi tahu teknisi bahwa memori utama tidak terdeteksi sebelum proses video sempat dimulai.',
    optionsAnalysis: {
      A: 'Salah, komputer tidak dapat memuat OS tanpa memori RAM.',
      B: 'Salah, BIOS hanya memiliki nada buzzer frekuensi kotak sederhana.',
      C: 'Salah, komputer tidak meledak saat RAM dicabut.',
      D: 'Benar, bunyi beep panjang berulang teratur adalah kode standar ketiadaan RAM pada Award BIOS.',
      E: 'Salah, komputer tanpa RAM tidak dapat menjalankan perangkat lunak aplikasi.'
    }
  },
  {
    id: 35,
    topic: 'Penggunaan BIOS/UEFI dan perangkat diagnostik sederhana',
    indicator: 'Menganalisis prosedur reset BIOS menggunakan jumper CLR_CMOS pada motherboard.',
    skillMeasured: 'Penerapan',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Komputer laboratorium dikunci dengan password BIOS oleh siswa iseng sehingga guru tidak dapat mengubah urutan booting untuk ujian. Guru meminta teknisi mereset pengaturan BIOS melalui jumper perangkat keras.',
    question: 'Prosedur yang benar dan aman untuk mereset BIOS menggunakan jumper CLRTC / CLR_CMOS pada motherboard adalah...',
    options: [
      { key: 'A', text: 'Menghubungkan pin jumper dengan kabel listrik PLN 220 Volt saat komputer sedang menyala' },
      { key: 'B', text: 'Menghidupkan komputer lalu mencabut paksa kabel jumper menggunakan tang besi' },
      { key: 'C', text: 'Menyiram motherboard dengan air mineral dingin untuk mendinginkan chip CMOS' },
      { key: 'D', text: 'Mengikis permukaan chip BIOS dengan pisau cutter hingga lapisan luarnya terkelupas' },
      { key: 'E', text: 'Mematikan komputer dan mencabut kabel daya AC dari stopkontak, lalu memindahkan posisi tutup jumper dari pin normal ke pin reset selama 5-10 detik, kemudian mengembalikannya ke posisi semula sebelum menyalakan PC' },
    ],
    correctAnswer: 'E',
    explanation: 'SOP Clear CMOS via jumper: (1) Pastikan aliran daya AC terputus demi keamanan, (2) Pindahkan jumper dari pin normal (1-2) ke pin reset (2-3) selama 5–10 detik untuk menghubungkan sirkuit ground memori CMOS volatil sehingga kapasitornya terbuang, (3) Kembalikan ke posisi pin semula (1-2), lalu hubungkan daya kembali.',
    optionsAnalysis: {
      A: 'Salah fatal, memasukkan arus 220V ke jumper 3.3V akan meledakkan motherboard seketika.',
      B: 'Salah, mencabut saat menyala dapat merusak sirkuit logika CMOS.',
      C: 'Salah fatal, cairan menyebabkan korsleting total.',
      D: 'Salah fatal, merusak fisik chip EEPROM BIOS menyebabkan motherboard mati permanen (bricked).',
      E: 'Benar, ini adalah prosedur baku teknisi perakitan untuk mereset password dan pengaturan BIOS ke default.'
    }
  },
  {
    id: 36,
    topic: 'Troubleshooting komputer yang mengalami restart atau mati mendadak',
    indicator: 'Mendiagnosis kerusakan fisik kapasitor gembung/bocor (blown capacitors) pada motherboard lama yang sering restart sendiri.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sedang',
    stimulus: 'Sebuah komputer lawas di laboratorium TKJ sering mengalami restart mendadak dan layar biru (BSOD) secara acak. Ketika teknisi melakukan inspeksi visual pada permukaan motherboard di sekitar soket prosesor, terlihat beberapa komponen silinder kecil bagian atasnya menggembung dan mengeluarkan kerak kecokelatan.',
    question: 'Komponen apakah yang mengalami kerusakan fisik tersebut dan apa dampaknya terhadap kestabilan sistem?',
    options: [
      { key: 'A', text: 'Kapasitor elektrolit (Electrolytic Capacitor); rusaknya kapasitor membuat penyaringan riak tegangan listrik (filtering) ke CPU menjadi kotor dan tidak stabil sehingga sistem sering crash' },
      { key: 'B', text: 'Baterai CMOS; rusaknya baterai membuat prosesor kekurangan kapasitas memori cache L3' },
      { key: 'C', text: 'Resistor SMD; kerusakannya menyebabkan kecepatan internet menjadi lambat' },
      { key: 'D', text: 'Kabel front panel audio; kerusakannya menyebabkan warna monitor bergeser ke kuning' },
      { key: 'E', text: 'Pendingin chipset southbridge; kerusakannya membuat keyboard USB tidak dapat ditekan' },
    ],
    correctAnswer: 'A',
    explanation: 'Kapasitor elektrolit berfungsi menstabilkan dan menyaring riak arus (ripple filtering) dari catu daya sebelum masuk ke CPU. Kapasitor yang menggembung (bulging/leaking capacitor) kehilangan nilai kapasitansi, menyebabkan fluktuasi voltase liar yang memicu eksekusi instruksi CPU korup, menghasilkan BSOD dan restart mendadak.',
    optionsAnalysis: {
      A: 'Benar, kapasitor elektrolit gembung di sekitar VRM CPU adalah biang keladi klasik instabilitas sistem dan restart acak.',
      B: 'Salah, baterai CMOS berbentuk koin pipih, bukan silinder elektrolit penyaring arus VRM.',
      C: 'Salah, resistor SMD berukuran mikro kotak pipih, bukan tabung silinder dan tidak mengatur internet.',
      D: 'Salah, kabel audio tidak berbentuk silinder elektrolit.',
      E: 'Salah, pendingin chipset berbentuk blok heatsink aluminium.'
    }
  },
  {
    id: 37,
    topic: 'Identifikasi penyebab komputer mengalami overheat',
    indicator: 'Menganalisis arah aliran udara (Airflow Push-Pull) di dalam casing komputer untuk mencegah penumpukan udara panas.',
    skillMeasured: 'Penalaran',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Seorang siswa memasang tiga kipas tambahan pada casing PC. Siswa tersebut memasang seluruh kipas (depan, belakang, dan atas) dalam posisi meniupkan udara masuk ke dalam casing (semuanya intake). Akibatnya, suhu di dalam casing justru menjadi semakin panas.',
    question: 'Konfigurasi aliran udara (airflow) yang benar dan efisien di dalam casing komputer standar adalah...',
    options: [
      { key: 'A', text: 'Seluruh kipas harus dimatikan agar udara di dalam casing tidak bergolak' },
      { key: 'B', text: 'Kipas bagian depan berfungsi sebagai Intake (menghisap udara dingin dari luar), sedangkan kipas bagian belakang dan atas berfungsi sebagai Exhaust (membuang udara panas ke luar)' },
      { key: 'C', text: 'Kipas belakang menghisap udara masuk dan kipas depan meniup ke arah monitor' },
      { key: 'D', text: 'Memasang kipas menghadap ke arah dalam harddisk tanpa celah udara keluar' },
      { key: 'E', text: 'Semua kipas dipasang pada dinding luar casing tanpa dihubungkan ke kabel daya' },
    ],
    correctAnswer: 'B',
    explanation: 'Udara panas memiliki massa jenis lebih ringan dan bergerak naik ke atas (efek konveksi termal). Konfigurasi optimal aliran udara (front-to-back, bottom-to-top) adalah: panel depan/bawah menghisap udara segar bersuhu ruang (Intake), lalu udara yang menyerap panas dari komponen dibuang ke arah luar lewat panel belakang dan atas (Exhaust).',
    optionsAnalysis: {
      A: 'Salah, mematikan kipas menyebabkan udara terperangkap dan suhu melonjak drastis.',
      B: 'Benar, skema Intake Depan dan Exhaust Belakang/Atas menciptakan lintasan aliran teratur yang mendinginkan semua komponen.',
      C: 'Salah, membalik arah dari belakang ke depan melawan orientasi pendingin heatsink tower prosesor.',
      D: 'Salah, tidak menciptakan sirkulasi udara kontinu.',
      E: 'Salah, kipas tanpa daya tidak akan berputar.'
    }
  },
  {
    id: 38,
    topic: 'Troubleshooting perangkat input dan output',
    indicator: 'Mendiagnosis keyboard USB yang tidak dapat merespons saat berada di menu BIOS padahal normal di Windows.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Siswa hendak menekan tombol "DEL" atau "F2" untuk masuk ke BIOS saat komputer dinyalakan, namun keyboard USB sama sekali tidak merespons dan lampu NumLock tidak menyala. Namun anehnya, setelah masuk ke desktop Windows, keyboard tersebut dapat digunakan mengetik dengan normal.',
    question: 'Pengaturan pada firmware BIOS yang kemungkinan besar dalam kondisi dinonaktifkan (Disabled) adalah...',
    options: [
      { key: 'A', text: 'Fitur "CPU Virtualization Technology (VT-x)"' },
      { key: 'B', text: 'Fitur "SATA Controller AHCI Mode"' },
      { key: 'C', text: 'Fitur "Legacy USB Support" atau "USB Keyboard Support"' },
      { key: 'D', text: 'Fitur "Onboard Audio High Definition"' },
      { key: 'E', text: 'Fitur "Wake on LAN (WoL)"' },
    ],
    correctAnswer: 'C',
    explanation: 'Sistem operasi modern memiliki driver USB tumpukan perangkat lunak sendiri, sehingga keyboard berfungsi di OS. Namun pada fase pra-boot (POST/BIOS), motherboard mengandalkan emulasi USB BIOS. Jika opsi "Legacy USB Support" dimatikan, firmware tidak akan memproses input dari perangkat USB sebelum sistem operasi dimuat.',
    optionsAnalysis: {
      A: 'Salah, Virtualization Technology untuk menjalankan mesin virtual (seperti VirtualBox), tidak ada kaitannya dengan keyboard USB.',
      B: 'Salah, AHCI adalah protokol kontroler media penyimpanan SATA.',
      C: 'Benar, Legacy USB Support mengaktifkan pengenalan input keyboard/mouse USB pada tingkatan firmware BIOS sebelum OS aktif.',
      D: 'Salah, Onboard Audio mengatur tata suara motherboard.',
      E: 'Salah, Wake on LAN mengizinkan komputer dinyalakan lewat sinyal paket jaringan.'
    }
  },
  {
    id: 39,
    topic: 'Langkah sistematis dalam menemukan sumber kerusakan',
    indicator: 'Menerapkan metode eliminasi komponen (swap test) untuk membuktikan letak kerusakan hardware.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Mudah',
    stimulus: 'Teknisi mencurigai sebuah modul RAM DDR4 mengalami kerusakan karena komputer klien sering mengalami blue screen memory management.',
    question: 'Langkah pengujian paling meyakinkan (metode swap test) yang harus dilakukan teknisi untuk membuktikan apakah RAM tersebut memang benar rusak adalah...',
    options: [
      { key: 'A', text: 'Menghapus seluruh file dokumen pada partisi harddisk' },
      { key: 'B', text: 'Mengganti kabel monitor dengan kabel baru' },
      { key: 'C', text: 'Mempercepat kecepatan kipas pendingin casing hingga 100%' },
      { key: 'D', text: 'Memasang modul RAM yang dicurigai ke unit komputer lain yang diketahui bekerja normal (known-good PC), lalu menjalankan software pengujian memori seperti MemTest86' },
      { key: 'E', text: 'Mengubah resolusi layar monitor menjadi 4K Ultra HD' },
    ],
    correctAnswer: 'D',
    explanation: 'Metode penukaran komponen (Swap Test / Known-Good Component Testing) dipadukan dengan alat uji diagnostik mandiri (seperti MemTest86 bootable) merupakan standar emas untuk mengonfirmasi kerusakan hardware. Jika modul RAM yang sama tetap menghasilkan error di sistem pembanding yang normal, maka dapat dipastikan modul RAM tersebut rusak.',
    optionsAnalysis: {
      A: 'Salah, menghapus dokumen tidak menguji keandalan sel memori RAM fisik.',
      B: 'Salah, kabel monitor tidak berpengaruh pada error memori di sistem.',
      C: 'Salah, kecepatan kipas casing tidak memverifikasi integritas bit RAM.',
      D: 'Benar, menguji modul pada PC normal pembanding menggunakan tool diagnostik memori adalah prosedur baku swap test.',
      E: 'Salah, resolusi monitor tidak menguji register memori RAM.'
    }
  },
  {
    id: 40,
    topic: 'Prosedur keselamatan kerja saat pengujian dan perbaikan',
    indicator: 'Menganalisis bahaya membuka casing internal Power Supply (PSU) yang masih menyimpan muatan tegangan tinggi.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Sedang',
    stimulus: 'Seorang siswa ingin membersihkan debu di dalam kotak Power Supply dengan cara membuka sekrup penutup casing PSU menggunakan obeng, meskipun kabel power sudah dicabut dari tembok.',
    question: 'Bahaya keselamatan kerja kelistrikan paling fatal yang mengancam siswa tersebut jika menyentuh bagian dalam sirkuit PSU adalah...',
    options: [
      { key: 'A', text: 'Kotak PSU akan memancarkan sinar laser yang membakar mata' },
      { key: 'B', text: 'Kabel casing akan mengeluarkan cairan asam yang merusak lantai lab' },
      { key: 'C', text: 'Kipas PSU akan berputar ke arah sebaliknya dan menyedot tangan' },
      { key: 'D', text: 'Suhu casing PSU akan langsung turun membeku di bawah nol derajat' },
      { key: 'E', text: 'Kapasitor primer bertegangan tinggi di dalam PSU masih mampu menyimpan muatan listrik hingga 400 Volt dalam waktu cukup lama, yang dapat menyebabkan sengatan listrik fatal (fatal electric shock)' },
    ],
    correctAnswer: 'E',
    explanation: 'Kapasitor elektrolit primer pada sirkuit input PSU menampung tegangan DC tinggi (300V - 400V). Meskipun kabel AC telah dicabut, kapasitor dapat menyimpan muatan mematikan selama berjam-jam atau berhari-hari jika sirkuit bleeder resistor rusak. Teknisi dilarang keras membuka sasis internal PSU tanpa peralatan pelepasan muatan khusus.',
    optionsAnalysis: {
      A: 'Salah, PSU tidak memiliki pemancar sinar laser.',
      B: 'Salah, kabel PSU tidak mengeluarkan cairan asam ke lantai.',
      C: 'Salah, kipas yang tidak teraliri arus listrik tidak akan berputar sendiri menyedot tangan.',
      D: 'Salah, tidak ada fenomena pembekuan es pada PSU yang dimatikan.',
      E: 'Benar, muatan listrik 400V yang tersimpan pada kapasitor primer PSU sangat mematikan dan merupakan larangan K3 mutlak di lab TKJ.'
    }
  },

  // 41-50
  {
    id: 41,
    topic: 'Konsep dasar pengujian komputer setelah proses perakitan',
    indicator: 'Mengidentifikasi jenis software diagnostik bootable independen yang digunakan untuk menguji integritas hardware tanpa tergantung OS.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Mudah',
    stimulus: 'Untuk menguji keandalan perangkat keras secara murni tanpa dipengaruhi oleh potensi crash driver atau virus sistem operasi bawaan harddisk, teknisi memanfaatkan media bootable USB.',
    question: 'Contoh perangkat lunak utilitas diagnostik bootable yang sangat populer digunakan oleh teknisi untuk menguji RAM, Harddisk, dan hardware secara independen adalah...',
    options: [
      { key: 'A', text: 'MemTest86 dan Hiren\'s BootCD PE' },
      { key: 'B', text: 'Adobe Photoshop' },
      { key: 'C', text: 'Microsoft PowerPoint' },
      { key: 'D', text: 'VLC Media Player' },
      { key: 'E', text: 'Spotify Music Player' },
    ],
    correctAnswer: 'A',
    explanation: 'MemTest86 dan tool kompilasi seperti Hiren\'s BootCD PE berjalan langsung pada lingkungan UEFI/DOS pra-OS melalui flashdisk bootable. Tool ini menguji hardware (RAM, drive S.M.A.R.T, CPU bench) secara murni dan steril dari gangguan driver atau malware yang bercokol di sistem operasi utama.',
    optionsAnalysis: {
      A: 'Benar, MemTest86 dan Hiren\'s BootCD adalah toolkit diagnostik bootable standar industri perbaikan PC.',
      B: 'Salah, Photoshop adalah perangkat lunak editor grafis berbasis OS.',
      C: 'Salah, PowerPoint adalah aplikasi presentasi dokumen.',
      D: 'Salah, VLC adalah pemutar berkas audio video.',
      E: 'Salah, Spotify adalah aplikasi streaming musik komersial.'
    }
  },
  {
    id: 42,
    topic: 'Prosedur pemeriksaan awal sebelum komputer dinyalakan',
    indicator: 'Menganalisis dampak sakelar pemilih voltase (115V / 230V Red Selector Switch) pada PSU model lama.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Pada beberapa unit Power Supply model lama, terdapat sakelar geser kecil berwarna merah di bagian belakang dengan pilihan angka "115V" dan "230V". Standar tegangan jala-jala listrik PLN di Indonesia adalah 220V AC.',
    question: 'Jika sakelar merah tersebut secara keliru digeser ke posisi "115V" kemudian dicolokkan ke stopkontak PLN 220V dan dinyalakan, peristiwa fatal yang akan terjadi adalah...',
    options: [
      { key: 'A', text: 'Komputer akan bekerja dua kali lebih cepat dari biasanya' },
      { key: 'B', text: 'Terjadi kelebihan tegangan (overvoltage) drastis pada sirkuit penyearah primer yang menyebabkan kapasitor meledak, sekring putus, dan PSU terbakar' },
      { key: 'C', text: 'Kapasitas daya PSU otomatis bertambah menjadi 1000 Watt' },
      { key: 'D', text: 'Komputer tetap menyala normal karena sakelar tersebut hanya hiasan dekoratif' },
      { key: 'E', text: 'Layar monitor akan menampilkan tulisan dalam bahasa Inggris kuno' },
    ],
    correctAnswer: 'B',
    explanation: 'Ketika sakelar disetel pada 115V, rangkaian voltage doubler di dalam PSU aktif untuk melipatgandakan voltase agar mencapai tegangan bus DC internal (~300V). Jika diberi input 220V, tegangan sirkuit primer akan melonjak hingga lebih dari 600V, melampaui rating komponen sehingga sekring putus, varistor MOV hangus, dan kapasitor primer meledak.',
    optionsAnalysis: {
      A: 'Salah fatal, kecepatan komputer ditentukan clock prosesor, bukan tegangan jala PLN.',
      B: 'Benar, memasukkan tegangan 220V pada posisi switch 115V adalah salah satu penyebab paling sering meledaknya PSU di lab sekolah.',
      C: 'Salah, tegangan berlebih menghancurkan sirkuit, bukan menambah daya watt.',
      D: 'Salah fatal, sakelar selektor voltase adalah komponen fisik aktif yang krusial.',
      E: 'Salah, tidak ada hubungan dengan bahasa tampilan monitor.'
    }
  },
  {
    id: 43,
    topic: 'Pengujian POST (Power-On Self-Test)',
    indicator: 'Mengidentifikasi kode angka heksadesimal pada POST Diagnostic Card (Debug Card).',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Sedang',
    stimulus: 'Seorang teknisi memasang kartu diagnostik (POST Debug Card) pada slot motherboard. Pada layar penampil digital 7-segmen di kartu tersebut muncul kode angka heksadesimal saat sistem dinyalakan.',
    question: 'Fungsi utama dari pembacaan kode heksadesimal pada kartu diagnostik POST tersebut adalah...',
    options: [
      { key: 'A', text: 'Menghitung sisa saldo rekening bank teknisi' },
      { key: 'B', text: 'Menampilkan nomor seri dari sistem operasi Windows' },
      { key: 'C', text: 'Menunjukkan checkpoint tahapan perangkat keras spesifik yang sedang diuji atau tempat di mana proses inisialisasi POST mengalami kegagalan (hang code)' },
      { key: 'D', text: 'Mengukur suhu ruangan di sekitar laboratorium secara nirkabel' },
      { key: 'E', text: 'Menghitung jumlah karakter kata yang diketik pada keyboard' },
    ],
    correctAnswer: 'C',
    explanation: 'Selama rutinitas POST berjalan, BIOS memancarkan kode kemajuan (checkpoint progress codes) ke port I/O 80h. POST Debug Card membaca bus ini dan menampilkannya dalam format heksadesimal 2 digit (misalnya code 00, C1, 55, dsb.). Jika proses terhenti pada kode tertentu, teknisi dapat mencocokkannya dengan tabel kode BIOS untuk mengetahui komponen mana yang macet.',
    optionsAnalysis: {
      A: 'Salah, tidak ada koneksi dengan transaksi perbankan.',
      B: 'Salah, kartu POST membaca instruksi motherboard, bukan registri serial Windows.',
      C: 'Benar, kode Port 80h pada POST card mengidentifikasi tahapan uji hardware yang sedang berlangsung atau macet.',
      D: 'Salah, kartu POST tidak dilengkapi sensor termal ruangan nirkabel.',
      E: 'Salah, tidak ada kaitannya dengan penghitungan ketukan keyboard.'
    }
  },
  {
    id: 44,
    topic: 'Identifikasi gejala komputer gagal melakukan booting',
    indicator: 'Menganalisis penyebab munculnya pesan kesalahan "SMART Status BAD, Backup and Replace" pada layar POST.',
    skillMeasured: 'Penalaran',
    cognitiveLevel: 'C3',
    difficulty: 'Mudah',
    stimulus: 'Saat komputer pertama kali dihidupkan, di layar monitor langsung muncul peringatan teks tebal: "Pri Master Hard Disk: S.M.A.R.T. Status BAD, Backup and Replace. Press F1 to Resume...".',
    question: 'Makna paling tepat dari peringatan sistem tersebut adalah...',
    options: [
      { key: 'A', text: 'Kabel speaker casing belum dicolokkan ke konektor front panel' },
      { key: 'B', text: 'Keyboard komputer terpasang pada port USB yang salah' },
      { key: 'C', text: 'Monitor tidak dapat menampilkan gambar berwarna' },
      { key: 'D', text: 'Sistem pengawas internal media penyimpanan (SMART) mendeteksi bahwa harddisk telah mengalami kerusakan kritis dan ambang batas kegagalan mekanik telah terlampaui sehingga wajib segera diganti' },
      { key: 'E', text: 'Baterai CMOS kelebihan kapasitas muatan listrik' },
    ],
    correctAnswer: 'D',
    explanation: 'S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) adalah sistem diagnostik internal pada drive penyimpanan. Jika BIOS memunculkan "SMART Status BAD", artinya satu atau lebih parameter keandalan fisik (seperti threshold bad sector atau head health) telah tembus batas toleransi pabrik, menandakan media simpan di ambang kerusakan permanen.',
    optionsAnalysis: {
      A: 'Salah, tidak ada hubungan dengan speaker casing.',
      B: 'Salah, keyboard error tidak dilaporkan sebagai SMART error.',
      C: 'Salah, pesan teks sudah tampil jelas membuktikan monitor normal.',
      D: 'Benar, pesan ini adalah peringatan resmi firmware bahwa harddisk/SSD berada di ambang kematian mekanis/elektris.',
      E: 'Salah, baterai CMOS tidak menimbulkan error SMART pada storage.'
    }
  },
  {
    id: 45,
    topic: 'Pemeriksaan dan identifikasi masalah BIOS/UEFI',
    indicator: 'Menganalisis risiko kegagalan pembaruan BIOS (flashing BIOS) akibat mati lampu di tengah proses.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Seorang teknisi sedang melakukan pembaruan firmware (Update/Flash BIOS) pada motherboard. Tepat saat progres bilah instalasi mencapai 60%, aliran listrik PLN mendadak padam dan komputer mati seketika tanpa backup UPS.',
    question: 'Dampak kerusakan yang paling fatal terhadap motherboard tersebut saat dinyalakan kembali adalah...',
    options: [
      { key: 'A', text: 'Harddisk otomatis terformat dan seluruh data di partisi D terhapus' },
      { key: 'B', text: 'Kapasitas RAM berkurang secara permanen sebesar 4 GB' },
      { key: 'C', text: 'Kabel power supply otomatis putus akibat medan magnet' },
      { key: 'D', text: 'Komputer akan otomatis menginstal sistem operasi Linux' },
      { key: 'E', text: 'Motherboard mengalami kondisi mati suri/rusak firmware (Bricked/Corrupt BIOS) sehingga komputer tidak bisa POST sama sekali, kecuali motherboard memiliki fitur BIOS Flashback atau chip BIOS diprogram ulang menggunakan alat EEPROM Programmer eksternal' },
    ],
    correctAnswer: 'E',
    explanation: 'Proses flashing BIOS menulis ulang kode instruksi dasar mesin ke chip memori flash SPI EEPROM. Jika proses terputus di tengah jalan, kode firmware menjadi tidak lengkap/rusak (corrupt). Motherboard tidak lagi memiliki instruksi untuk memicu CPU dan POST (kondisi "bricked"). Pemulihan membutuhkan fitur BIOS Flashback tombol belakang atau pencabutan chip untuk di-flash via programmer CH341A.',
    optionsAnalysis: {
      A: 'Salah, data di partisi storage internal tidak terpengaruh oleh firmware EEPROM yang korup.',
      B: 'Salah, modul RAM tidak kehilangan kapasitas fisik akibat terputusnya flash BIOS.',
      C: 'Salah, kabel PSU tidak terpengaruh secara fisik.',
      D: 'Salah, komputer tanpa BIOS yang utuh bahkan tidak mampu mengeksekusi kernel sistem operasi apapun.',
      E: 'Benar, kegagalan pasokan listrik saat flash BIOS adalah penyebab utama kerusakan fatal motherboard (bricked BIOS).'
    }
  },
  {
    id: 46,
    topic: 'Pengujian fungsi perangkat keras (hardware)',
    indicator: 'Menjelaskan fungsi penggunaan software benchmarking seperti Cinebench atau 3DMark dalam pengujian komputer pasca-rakit.',
    skillMeasured: 'Pemahaman Konsep',
    cognitiveLevel: 'C2',
    difficulty: 'Sedang',
    stimulus: 'Setelah komputer selesai dirakit dan diinstal sistem operasi, teknisi menjalankan software Cinebench R23 dan membandingkan skor poin yang diperoleh dengan skor referensi tipe prosesor sejenis di internet.',
    question: 'Manfaat utama dari langkah pengujian skor benchmark tersebut adalah...',
    options: [
      { key: 'A', text: 'Memverifikasi bahwa prosesor bekerja pada kapasitas performa optimal yang seharusnya dan tidak mengalami penurunan performa akibat throttling atau kesalahan konfigurasi daya' },
      { key: 'B', text: 'Menambah kapasitas memori penyimpanan SSD secara gratis' },
      { key: 'C', text: 'Mempercepat kecepatan koneksi download internet dari ISP' },
      { key: 'D', text: 'Mengubah warna lampu casing tanpa menggunakan software RGB' },
      { key: 'E', text: 'Menonaktifkan proteksi firewall pada sistem operasi' },
    ],
    correctAnswer: 'A',
    explanation: 'Software benchmark seperti Cinebench menghitung kalkulasi render murni berbasis CPU. Membandingkan skor riil dengan nilai standar referensi memastikan prosesor berjalan pada daya pengenal penuh (TDP normal), turbo boost aktif semestinya, dan tidak mengalami penurunan performa tersembunyi (seperti akibat throttling termal atau limit daya VRM).',
    optionsAnalysis: {
      A: 'Benar, benchmarking memvalidasi apakah kinerja aktual prosesor setara dengan standar spesifikasi pabrik.',
      B: 'Salah, benchmark tidak menambah kapasitas fisik penyimpanan.',
      C: 'Salah, benchmark komputasi CPU offline tidak berkaitan dengan bandwidth internet.',
      D: 'Salah, benchmark tidak mengontrol kontroler LED fisik.',
      E: 'Salah, benchmark tidak ada kaitannya dengan mematikan firewall.'
    }
  },
  {
    id: 47,
    topic: 'Identifikasi kerusakan RAM dan slot RAM',
    indicator: 'Menganalisis penyebab komputer membaca kapasitas RAM lebih kecil dari yang terpasang fisik (misal: "Installed 16 GB, Usable 7.9 GB").',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sulit',
    stimulus: 'Siswa memasang 2 keping RAM masing-masing 8 GB (total 16 GB). Di menu BIOS kedua keping RAM terdeteksi, namun saat masuk ke System Information Windows 10 tertera: "Installed RAM: 16.0 GB (7.95 GB usable)" dan pada Task Manager memori sebesar 8.1 GB masuk ke kategori "Hardware Reserved".',
    question: 'Faktor teknis yang paling berpeluang menjadi penyebab fenomena Hardware Reserved yang sangat besar tersebut adalah...',
    options: [
      { key: 'A', text: 'Kabel data harddisk SATA terpasang terbalik' },
      { key: 'B', text: 'Salah satu keping RAM terpasang tidak rapat, salah satu channel memori tidak aktif akibat pin soket CPU bengkok/kotor, atau alokasi memori grafis iGPU disetel terlalu besar di BIOS' },
      { key: 'C', text: 'Kapasitas daya Power Supply terlalu besar sehingga menelan sisa memori' },
      { key: 'D', text: 'Layar monitor hanya mendukung kedalaman warna 8-bit' },
      { key: 'E', text: 'Kipas pendingin prosesor dipasang menghadap ke kiri' },
    ],
    correctAnswer: 'B',
    explanation: 'Hardware Reserved yang menelan separuh total RAM terjadi ketika motherboard/Windows mendeteksi keberadaan modul RAM secara SPD (Serial Presence Detect), namun gagal menginisialisasi jalur transfer datanya. Penyebab paling sering: pin soket CPU (yang memuat pengontrol memori terintegrasi / IMC) kotor atau bengkok, modul RAM di channel B tidak terkunci sempurna, atau alokasi memori VRAM shared pada iGPU disetel berlebihan.',
    optionsAnalysis: {
      A: 'Salah, kabel data SATA tidak mempengaruhi tabel alokasi memori fisik RAM di OS.',
      B: 'Benar, kegagalan inisialisasi kanal memori akibat kontak pin CPU/RAM yang buruk atau alokasi shared iGPU adalah penyebab klasik hardware reserved.',
      C: 'Salah, kapasitas daya PSU tidak mengonsumsi memori virtual atau fisik.',
      D: 'Salah, bit depth warna monitor tidak mengubah besaran memori fisik yang dapat dialokasikan CPU.',
      E: 'Salah, orientasi heatsink tidak mempengaruhi konfigurasi hardware reserved.'
    }
  },
  {
    id: 48,
    topic: 'Pengujian prosesor dan sistem pendingin',
    indicator: 'Menganalisis efektivitas sistem pendingin cair (AIO Liquid Cooler) saat pompa air (pump) mengalami kegagalan fungsi.',
    skillMeasured: 'Analisis',
    cognitiveLevel: 'C4',
    difficulty: 'Sedang',
    stimulus: 'Sebuah PC gaming menggunakan pendingin AIO (All-in-One) Liquid Cooler 240mm. Saat komputer dinyalakan, kedua kipas pada radiator berputar kencang dengan kecepatan penuh dan bersuara bising, namun suhu prosesor di BIOS tetap merangkak naik hingga 95°C dalam waktu 1 menit kemudian shutdown.',
    question: 'Berdasarkan prinsip kerja sistem pendingin cair, kerusakan yang sedang terjadi pada sistem AIO tersebut adalah...',
    options: [
      { key: 'A', text: 'Kabel display HDMI kekurangan aliran listrik dari stopkontak' },
      { key: 'B', text: 'Ukuran casing komputer terlalu besar sehingga pendingin tidak bekerja' },
      { key: 'C', text: 'Pompa cairan (water pump) di dalam blok CPU mati/rusak atau kabel daya pompa (header AIO_PUMP/W_PUMP) tidak tercolok, sehingga cairan pendingin tidak bersirkulasi ke radiator' },
      { key: 'D', text: 'Kapasitas SSD NVMe terisi penuh oleh file video game' },
      { key: 'E', text: 'Mouse optik tidak diletakkan di atas mousepad kain' },
    ],
    correctAnswer: 'C',
    explanation: 'Sistem AIO mengandalkan pompa motor mini untuk mensirkulasikan cairan panas dari copper baseplate CPU ke sirip radiator. Jika pompa mati atau kabel dayanya tidak terhubung, cairan di dalam waterblock CPU akan mendidih di tempat tanpa bisa melepas panas ke radiator, meskipun kipas radiator berputar kencang.',
    optionsAnalysis: {
      A: 'Salah, kabel HDMI tidak ada hubungannya dengan sirkulasi pendingin cair CPU.',
      B: 'Salah, ukuran casing besar justru memberikan ruang sirkulasi udara lebih luas.',
      C: 'Benar, kegagalan pompa (pump failure) adalah penyebab utama kenaikan suhu mendadak pada AIO cooler meskipun kipas radiator bekerja normal.',
      D: 'Salah, kapasitas penyimpanan tidak menyebabkan prosesor overheat di dalam menu BIOS.',
      E: 'Salah, mousepad tidak mempengaruhi transfer panas termal prosesor.'
    }
  },
  {
    id: 49,
    topic: 'Langkah sistematis dalam menemukan sumber kerusakan',
    indicator: 'Menjelaskan teknik isolasi masalah menggunakan metode penggantian komponen satu per satu (Isolasi Bertahap).',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Sedang',
    stimulus: 'Saat memperbaiki komputer yang mengalami masalah sporadis/tidak menentu, guru mengingatkan: "Jangan pernah mengganti lebih dari satu komponen secara bersamaan dalam satu kali pengujian!".',
    question: 'Alasan teknis mengapa dalam troubleshooting kita hanya boleh mengubah atau mengganti SATU variabel/komponen dalam satu waktu adalah...',
    options: [
      { key: 'A', text: 'Karena toko komputer hanya mengizinkan pembelian satu komponen per hari' },
      { key: 'B', text: 'Untuk mencegah berkurangnya tegangan listrik PLN di rumah' },
      { key: 'C', text: 'Agar kapasitas RAM tidak bertambah terlalu cepat' },
      { key: 'D', text: 'Agar teknisi dapat mengetahui secara pasti komponen mana yang menjadi sumber akar permasalahan sebenarnya' },
      { key: 'E', text: 'Supaya baut casing tidak cepat aus dan patah' },
    ],
    correctAnswer: 'D',
    explanation: 'Prinsip metode ilmiah isolasi variabel tunggal (Single Variable Isolation): jika dua atau lebih komponen diubah sekaligus dan sistem kembali normal, teknisi tidak akan pernah tahu komponen mana yang sebenarnya rusak atau apakah tindakan pertama yang menyelesaikan masalah. Hal ini menyebabkan diagnosis menjadi rancu dan tidak akurat.',
    optionsAnalysis: {
      A: 'Salah, aturan investigasi teknik tidak didasarkan pada kebijakan toko komersial.',
      B: 'Salah, tidak ada hubungan dengan tegangan jala PLN.',
      C: 'Salah, kapasitas RAM tidak bertambah otomatis tanpa instalasi modul fisik.',
      D: 'Benar, mengisolasi satu variabel per uji coba adalah kaidah pokok troubleshooting sistematis untuk memastikan akar penyebab kegagalan secara pasti.',
      E: 'Salah, ausnya baut bukan dasar ilmiah metodologi troubleshooting.'
    }
  },
  {
    id: 50,
    topic: 'Prosedur keselamatan kerja saat pengujian dan perbaikan',
    indicator: 'Mengidentifikasi tindakan darurat pertama saat mencium bau hangus menyengat atau melihat asap keluar dari dalam casing komputer saat pertama kali dinyalakan.',
    skillMeasured: 'Pemecahan Masalah',
    cognitiveLevel: 'C3',
    difficulty: 'Mudah',
    stimulus: 'Tepat saat siswa menekan tombol power komputer yang baru dirakit, tiba-tiba terdengar suara letupan kecil "pletuk!", tercium bau sangit hangus menyengat, dan terlihat kepulan asap tipis dari arah konektor motherboard.',
    question: 'Tindakan tanggap darurat pertama dan paling utama yang harus dilakukan oleh siswa secara spontan adalah...',
    options: [
      { key: 'A', text: 'Mengambil smartphone untuk merekam video dan mempostingnya ke media sosial' },
      { key: 'B', text: 'Menekan tombol keyboard F1 berulang-ulang untuk masuk ke BIOS' },
      { key: 'C', text: 'Meniup kepulan asap menggunakan mulut sambil terus membiarkan komputer menyala' },
      { key: 'D', text: 'Menyiram motherboard dengan secangkir air teh manis dingin' },
      { key: 'E', text: 'Segera mencabut kabel power listrik utama dari stopkontak atau mematikan sakelar PSU (Cut-off Power) seketika demi mencegah kebakaran dan menjalarnya kerusakan' },
    ],
    correctAnswer: 'E',
    explanation: 'SOP tanggap darurat kelistrikan laboratorium: jika terjadi korsleting, timbul percikan api, atau asap, langkah pertama dan mutlak adalah segera memutus sumber aliran listrik (Emergency Power Cut-off). Membiarkan aliran listrik tetap masuk akan membakar jalur tembaga PCB dan memicu kebakaran laboratorium yang membahayakan jiwa.',
    optionsAnalysis: {
      A: 'Salah fatal, membahayakan keselamatan jiwa dan menunda penanganan bahaya kebakaran.',
      B: 'Salah, keyboard tidak berfungsi pada sistem yang mengalami korslet daya.',
      C: 'Salah fatal, asap korsleting mengandung uap timbal dan pembakaran plastik beracun yang berbahaya jika dihirup dan tindakan meniup tidak mematikan arus listrik.',
      D: 'Salah fatal, menyiram cairan ke perangkat beraliran listrik dapat memicu ledakan dan sengatan maut.',
      E: 'Benar, pemutusan arus listrik secara instan adalah respons keselamatan darurat nomor satu saat terjadi korslet atau kepulan asap.'
    }
  }
];

export const SCORING_RUBRIC = {
  formula: 'Nilai Akhir = (Jumlah Jawaban Benar / 50) × 100',
  categories: [
    {
      range: '86 - 100',
      predikat: 'Sangat Baik (A)',
      deskripsi: 'Peserta didik menguasai secara menyeluruh konsep pengujian, prosedur pra-daya, pengujian POST, dan metodologi troubleshooting tingkat lanjut pada perakitan komputer.',
      rekomendasi: 'Dapat diberikan materi pengayaan analisis osiloskop kelistrikan motherboard atau persiapan sertifikasi kompetensi keahlian TKJ.'
    },
    {
      range: '71 - 85',
      predikat: 'Baik (B)',
      deskripsi: 'Peserta didik memahami dengan baik alur pengujian komputer dan mampu mendiagnosis sebagian besar masalah hardware umum di laboratorium.',
      rekomendasi: 'Diberikan latihan studi kasus tambahan pada permasalahan spesifik sinyal video out, timing RAM, dan manajemen aliran udara casing.'
    },
    {
      range: '56 - 70',
      predikat: 'Cukup (C)',
      deskripsi: 'Peserta didik memahami konsep dasar dan keselamatan kerja, namun masih mengalami kesulitan pada analisis penalaran gejala dan hubungan sebab-akibat kegagalan booting.',
      rekomendasi: 'Perlu bimbingan terarah pada pembacaan kode beep, penggunaan jumper motherboard, dan prosedur bench-test komponen minimal.'
    },
    {
      range: '0 - 55',
      predikat: 'Kurang (D)',
      deskripsi: 'Peserta didik belum menguasai prosedur dasar pengujian dan troubleshooting hardware komputer SMK kelas X.',
      rekomendasi: 'Wajib mengikuti bimbingan remedial komprehensif mulai dari pemahaman K3LH, pengenalan konektor daya ATX, hingga simulasi POST dasar.'
    }
  ]
};
