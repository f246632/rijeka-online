import { PrismaClient, UserRole, ArticleStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.article.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@rijeka.online",
      password: adminPassword,
      role: UserRole.ADMIN,
      bio: "Glavni administrator Rijeka Online portala",
    },
  });

  // Create editor user
  const editorPassword = await bcrypt.hash("editor123", 10);
  const editor = await prisma.user.create({
    data: {
      name: "Marko Horvat",
      email: "marko@rijeka.online",
      password: editorPassword,
      role: UserRole.EDITOR,
      bio: "Glavni urednik, odgovoran za politiku i ekonomiju",
    },
  });

  // Create author user
  const authorPassword = await bcrypt.hash("author123", 10);
  const author = await prisma.user.create({
    data: {
      name: "Ana Kovač",
      email: "ana@rijeka.online",
      password: authorPassword,
      role: UserRole.AUTHOR,
      bio: "Novinarka specijalizirana za kulturu i umjetnost",
    },
  });

  console.log("✅ Created users");

  // Create categories
  const politics = await prisma.category.create({
    data: {
      name: "Politika",
      slug: "politika",
      description: "Vijesti iz Hrvatske i svijeta",
      color: "#2563eb",
      icon: "Landmark",
      displayOrder: 1,
    },
  });

  const economy = await prisma.category.create({
    data: {
      name: "Ekonomija",
      slug: "ekonomija",
      description: "Poslovne vijesti i financije",
      color: "#16a34a",
      icon: "TrendingUp",
      displayOrder: 2,
    },
  });

  const culture = await prisma.category.create({
    data: {
      name: "Kultura",
      slug: "kultura",
      description: "Umjetnost, glazba, film i knjige",
      color: "#9333ea",
      icon: "Palette",
      displayOrder: 3,
    },
  });

  const sport = await prisma.category.create({
    data: {
      name: "Sport",
      slug: "sport",
      description: "Sportske vijesti i rezultati",
      color: "#dc2626",
      icon: "Trophy",
      displayOrder: 4,
    },
  });

  const opinion = await prisma.category.create({
    data: {
      name: "Mišljenja",
      slug: "misljenja",
      description: "Kolumne i komentari",
      color: "#ea580c",
      icon: "MessageSquare",
      displayOrder: 5,
    },
  });

  console.log("✅ Created categories");

  // Create tags
  const tagVlada = await prisma.tag.create({ data: { name: "Vlada", slug: "vlada" } });
  const tagEU = await prisma.tag.create({ data: { name: "EU", slug: "eu" } });
  const tagRijeka = await prisma.tag.create({ data: { name: "Rijeka", slug: "rijeka" } });
  const tagKulturniTurizam = await prisma.tag.create({
    data: { name: "Kulturni turizam", slug: "kulturni-turizam" },
  });
  const tagTehnologija = await prisma.tag.create({
    data: { name: "Tehnologija", slug: "tehnologija" },
  });

  console.log("✅ Created tags");

  // Create sample articles
  await prisma.article.create({
    data: {
      title: "Novi zakon o obnovi donosi važne promjene za vlasnike nekretnina",
      subtitle: "Vlada predstavila paket mjera za ubrzanje obnove",
      excerpt:
        "Vlada je danas predstavila dugoočekivani zakon o obnovi koji donosi niz promjena u procesu obnove zgrada oštećenih u potresu.",
      slug: "novi-zakon-obnovi-donosi-vazne-promjene",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Vlada Republike Hrvatske predstavila je danas novi Zakon o obnovi zgrada oštećenih potresom koji donosi niz važnih promjena za vlasnike nekretnina.",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Ključne novosti" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Novi zakon pojednostavljuje postupke te ubrzava proces izdavanja dozvola za obnovu. Vlasnici zgrada moći će aplicirati za sredstva kroz pojednostavljeni online sustav.",
              },
            ],
          },
        ],
      },
      contentHtml:
        "<p>Vlada Republike Hrvatske predstavila je danas novi Zakon o obnovi zgrada oštećenih potresom koji donosi niz važnih promjena za vlasnike nekretnina.</p><h2>Ključne novosti</h2><p>Novi zakon pojednostavljuje postupke te ubrzava proces izdavanja dozvola za obnovu. Vlasnici zgrada moći će aplicirati za sredstva kroz pojednostavljeni online sustav.</p>",
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(),
      metaTitle: "Novi zakon o obnovi - Što znači za vlasnike nekretnina",
      metaDescription:
        "Vlada predstavila novi zakon o obnovi s važnim promjenama za vlasnike. Saznajte sve detalje.",
      keywords: ["obnova", "potres", "zakon", "vlada", "nekretnine"],
      author: { connect: { id: editor.id } },
      category: { connect: { id: politics.id } },
      tags: { connect: [{ id: tagVlada.id }, { id: tagRijeka.id }] },
    },
  });

  await prisma.article.create({
    data: {
      title: "Rijeka postaje regionalni tehnološki hub",
      subtitle: "Novi startup centar otvara vrata inovatorima",
      excerpt:
        "U Rijeci je službeno otvoren najveći startup centar u regiji koji će biti dom za preko 50 tehnoloških tvrtki.",
      slug: "rijeka-postaje-regionalni-tehnoloski-hub",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Grad Rijeka nastavlja svoj put digitalne transformacije otvaranjem najvećeg startup centra u regiji.",
              },
            ],
          },
        ],
      },
      contentHtml:
        "<p>Grad Rijeka nastavlja svoj put digitalne transformacije otvaranjem najvećeg startup centra u regiji.</p>",
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(Date.now() - 86400000), // 1 day ago
      metaTitle: "Rijeka tehnološki hub - Novi startup centar",
      metaDescription:
        "Rijeka otvara najveći startup centar u regiji. Saznajte više o ovoj važnoj investiciji.",
      keywords: ["rijeka", "startup", "tehnologija", "hub", "inovacije"],
      author: { connect: { id: editor.id } },
      category: { connect: { id: economy.id } },
      tags: { connect: [{ id: tagRijeka.id }, { id: tagTehnologija.id }] },
    },
  });

  await prisma.article.create({
    data: {
      title: "Festival filma vraća se u Rijeku nakon tri godine",
      subtitle: "Očekuje se preko 10.000 posjetitelja",
      excerpt:
        "Međunarodni festival filma vraća se u Rijeku s bogatim programom domaćih i stranih produkcija.",
      slug: "festival-filma-vraca-se-u-rijeku",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Nakon trogodišnje pauze, Međunarodni festival filma vraća se u Rijeku s još bogatijim programom.",
              },
            ],
          },
        ],
      },
      contentHtml:
        "<p>Nakon trogodišnje pauze, Međunarodni festival filma vraća se u Rijeku s još bogatijim programom.</p>",
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(Date.now() - 172800000), // 2 days ago
      metaTitle: "Festival filma Rijeka 2026",
      metaDescription:
        "Međunarodni festival filma vraća se u Rijeku. Program, datumi i sve informacije.",
      keywords: ["film", "festival", "rijeka", "kultura", "umjetnost"],
      author: { connect: { id: author.id } },
      category: { connect: { id: culture.id } },
      tags: { connect: [{ id: tagRijeka.id }, { id: tagKulturniTurizam.id }] },
    },
  });

  await prisma.article.create({
    data: {
      title: "Hrvatska se pridružuje europskom energetskom projektu",
      subtitle: "Investicija od 500 milijuna eura",
      excerpt:
        "Hrvatska će sudjelovati u velikom EU projektu razvoja obnovljivih izvora energije.",
      slug: "hrvatska-pridružuje-europskom-energetskom-projektu",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Europska unija odobrila je financiranje za veliki energetski projekt u kojem će Hrvatska imati značajnu ulogu.",
              },
            ],
          },
        ],
      },
      contentHtml:
        "<p>Europska unija odobrila je financiranje za veliki energetski projekt u kojem će Hrvatska imati značajnu ulogu.</p>",
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(Date.now() - 259200000), // 3 days ago
      metaTitle: "Hrvatska u EU energetskom projektu",
      metaDescription:
        "Hrvatska dobiva 500 milijuna eura za razvoj obnovljivih izvora energije iz EU fondova.",
      keywords: ["eu", "energija", "obnovljivi-izvori", "hrvatska", "projekt"],
      author: { connect: { id: editor.id } },
      category: { connect: { id: economy.id } },
      tags: { connect: [{ id: tagEU.id }, { id: tagVlada.id }] },
    },
  });

  // Create a draft article
  await prisma.article.create({
    data: {
      title: "Novi sportski centar uskoro otvara vrata",
      subtitle: "Građani će imati pristup modernim sadržajima",
      excerpt: "Gradnja novog sportskog centra ulazi u završnu fazu.",
      slug: "novi-sportski-centar-uskoro-otvara-vrata",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Članak u pripremi..." }],
          },
        ],
      },
      contentHtml: "<p>Članak u pripremi...</p>",
      status: ArticleStatus.DRAFT,
      author: { connect: { id: author.id } },
      category: { connect: { id: sport.id } },
      tags: { connect: [{ id: tagRijeka.id }] },
    },
  });

  console.log("✅ Created articles");

  // Create site settings
  await prisma.siteSettings.create({
    data: {
      id: "singleton",
      siteName: "Rijeka Online",
      siteDescription: "Profesionalni news portal s vijestima iz Rijeke i šire",
      contactEmail: "kontakt@rijeka.online",
      enableComments: false,
      enableNewsletter: false,
    },
  });

  console.log("✅ Created site settings");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📝 Test credentials:");
  console.log("Admin: admin@rijeka.online / admin123");
  console.log("Editor: marko@rijeka.online / editor123");
  console.log("Author: ana@rijeka.online / author123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
