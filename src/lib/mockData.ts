// Mock data for development - replace with Prisma queries later

export const mockArticles = [
  {
    id: '1',
    title: 'Grad Rijeka najavljuje nove infrastrukturne projekte za 2026. godinu',
    subtitle: 'Ukupna vrijednost investicija premašuje 50 milijuna eura',
    excerpt: 'Gradska uprava predstavila je ambiciozan plan infrastrukturnih projekata koji će se realizirati tijekom 2026. godine. Plan uključuje obnovu javnih površina, modernizaciju prometa i razvoj zelenih zona.',
    slug: 'grad-rijeka-najavljuje-nove-infrastrukturne-projekte',
    category: {
      name: 'Politika',
      slug: 'politika',
    },
    author: {
      name: 'Ana Marić'
    },
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-11T08:00:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '2',
    title: 'Rijeka Tech Summit okuplja stotine IT stručnjaka',
    subtitle: 'Trodnevna konferencija posvećena budućnosti tehnologije',
    excerpt: 'U Rijeci je počeo Tech Summit, najveće tehnološko okupljanje u regiji. Konferencija donosi predavanja vodećih stručnjaka iz područja umjetne inteligencije, cloud computinga i cybersecuritya.',
    slug: 'rijeka-tech-summit-okuplja-stotine-it-strucnjaka',
    category: {
      name: 'Ekonomija',
      slug: 'ekonomija',
    },
    author: {
      name: 'Marko Horvat'
    },
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-11T07:30:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '3',
    title: 'HNK Rijeka objavio planove za rekonstrukciju stadiona Rujevica',
    subtitle: 'Modernizacija će koštati 30 milijuna eura',
    excerpt: 'Nogometni klub Rijeka predstavio je projekt potpune rekonstrukcije stadiona Rujevica. Nova arena imat će kapacitet od 15.000 sjedećih mjesta i pridržavat će se svih UEFA standarda.',
    slug: 'hnk-rijeka-objavio-planove-za-rekonstrukciju-stadiona',
    category: {
      name: 'Sport',
      slug: 'sport',
    },
    author: {
      name: 'Ivan Novak'
    },
    featuredImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-11T06:45:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '4',
    title: 'Otvorena izložba "Rijeka kroz stoljeća" u Pomorskom muzeju',
    subtitle: 'Izložba prikazuje bogatu povijest riječke luke',
    excerpt: 'Pomorski i povijesni muzej Hrvatskog primorja predstavio je novu stalnu postavku koja dokumentira razvoj Rijeke od antike do današnjih dana, s posebnim naglaskom na lučku djelatnost.',
    slug: 'otvorena-izlozba-rijeka-kroz-stoljeca',
    category: {
      name: 'Kultura',
      slug: 'kultura',
    },
    author: {
      name: 'Petra Jurić'
    },
    featuredImage: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-10T18:00:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '5',
    title: 'Lokalni proizvođači zahtijevaju veću podršku grada',
    subtitle: 'Predstavnici OPG-ova traže smanjenje administrativnih prepreka',
    excerpt: 'Udruga lokalnih proizvođača organizirala je sastanak s gradskim dužnosnicima kako bi razgovarali o potrebama malih poljoprivrednih gospodarstava i mogućnostima boljeg plasmana domaćih proizvoda.',
    slug: 'lokalni-proizvodaci-zahtijevaju-vecu-podrsku',
    category: {
      name: 'Ekonomija',
      slug: 'ekonomija',
    },
    author: {
      name: 'Marko Horvat'
    },
    featuredImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-10T16:30:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '6',
    title: 'Gradsko vijeće raspravljalo o novom proračunu',
    subtitle: 'Oporbeni vijećnici kritizirali prioritete gradske uprave',
    excerpt: 'Na jučerašnjoj sjednici Gradskog vijeća Rijeke predstavljen je nacrt proračuna za 2026. godinu. Rasprava je bila burna, s oštrim prijeporima oko prioriteta i planiranih investicija.',
    slug: 'gradsko-vijece-raspravljalo-o-novom-proracunu',
    category: {
      name: 'Politika',
      slug: 'politika',
    },
    author: {
      name: 'Ana Marić'
    },
    featuredImage: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-10T14:00:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '7',
    title: 'Zašto je Rijeci potrebna zelena strategija?',
    subtitle: 'Kolumna: O važnosti održivog razvoja naših gradova',
    excerpt: 'U vremenu klimatskih promjena i urbane ekspanzije, gradovi moraju preuzeti vodstvo u zaštiti okoliša. Rijeka ima jedinstvenu priliku postati primjer dobre prakse u regiji.',
    slug: 'zasto-je-rijeci-potrebna-zelena-strategija',
    category: {
      name: 'Mišljenja',
      slug: 'misljenja',
    },
    author: {
      name: 'Dr. Luka Kovačević'
    },
    featuredImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-10T12:00:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '8',
    title: 'Košarkaši Rijeke slavili uvjerljivu pobjedu',
    subtitle: 'Domaćin nadigrao protivnika rezultatom 95:78',
    excerpt: 'Košarkaški klub Rijeka ostvario je uvjerljivu pobjedu nad gostujućom ekipom u subotnjoj utakmici. Najefikasniji igrač domaće momčadi postigao je 28 koševa uz 12 skokova.',
    slug: 'kosarkasi-rijeke-slavili-uvjerljivu-pobjedu',
    category: {
      name: 'Sport',
      slug: 'sport',
    },
    author: {
      name: 'Ivan Novak'
    },
    featuredImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-10T10:30:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '9',
    title: 'Riječko kazalište izvodi klasik "Hamleta"',
    subtitle: 'Moderna adaptacija Shakespeareovog remek-djela',
    excerpt: 'HNK Ivana pl. Zajca predstavilo je suvremen pristup interpretaciji najpoznatije Shakespeareove tragedije. Predstava kombinira klasičan tekst s modernom scenografijom i koreografijom.',
    slug: 'rijecko-kazaliste-izvodi-klasik-hamleta',
    category: {
      name: 'Kultura',
      slug: 'kultura',
    },
    author: {
      name: 'Petra Jurić'
    },
    featuredImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-09T20:00:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
  {
    id: '10',
    title: 'Luka Rijeka bilježi rekordne rezultate u 2025.',
    subtitle: 'Promet robe premašio očekivanja za 15 posto',
    excerpt: 'Uprava Luke Rijeka objavila je godišnje rezultate poslovanja koji pokazuju značajan rast u svim segmentima. Posebno je izražen porast kontejnerskog prometa i RO-RO segmenta.',
    slug: 'luka-rijeka-bilježi-rekordne-rezultate',
    category: {
      name: 'Ekonomija',
      slug: 'ekonomija',
    },
    author: {
      name: 'Marko Horvat'
    },
    featuredImage: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=800&fit=crop',
    publishedAt: new Date('2026-01-09T15:00:00'),
    content: '<p>Detaljni sadržaj članka...</p>'
  },
];

export const breakingNews = [
  {
    id: 'b1',
    title: 'HITNO: Gradonačelnik sazvao izvanrednu konferenciju za medije',
    slug: 'gradonacelnik-sazvao-izvanrednu-konferenciju',
    category: {
      name: 'Politika',
      slug: 'politika',
    },
    publishedAt: new Date('2026-01-11T10:30:00'),
  },
  {
    id: 'b2',
    title: 'Velike gužve na autocesti zbog snježnih padavina',
    slug: 'velike-guzve-na-autocesti',
    category: {
      name: 'Politika',
      slug: 'politika',
    },
    publishedAt: new Date('2026-01-11T09:15:00'),
  },
  {
    id: 'b3',
    title: 'Riječka tvrtka potpisala ugovor vrijedan 20 milijuna eura',
    slug: 'rijecka-tvrtka-potpisala-ugovor',
    category: {
      name: 'Ekonomija',
      slug: 'ekonomija',
    },
    publishedAt: new Date('2026-01-11T08:45:00'),
  },
];

export function getMockArticleBySlug(slug: string) {
  return mockArticles.find(article => article.slug === slug);
}

export function getMockArticlesByCategory(categorySlug: string) {
  return mockArticles.filter(article => article.category.slug === categorySlug);
}

export function getMockLatestArticles(limit = 10) {
  return mockArticles
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export function getMockFeaturedArticle() {
  return mockArticles[0];
}
