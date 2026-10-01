import type { Language } from "./scheme";

export type Dict = {
  nav: { services: string; scheme: string; catalogue: string; trust: string; contact: string };
  langToggle: string;
  menu: string;
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    call: string;
    whatsapp: string;
    view: string;
    scripture: string;
  };
  services: { eyebrow: string; title: string; sub: string; blurb: string };
  scheme: {
    eyebrow: string;
    title: string;
    sub: string;
    single: string;
    spouse: string;
    joining: string;
    perMonth: string;
    benefits: string;
    terms: string;
    joinToday: string;
  };
  catalogue: {
    eyebrow: string;
    title: string;
    sub: string;
    table: string;
    cards: string;
    search: string;
    allSizes: string;
    sortCode: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    code: string;
    size: string;
    head: string;
    full: string;
    slab: string;
    quote: string;
    addShortlist: string;
    remove: string;
    shortlist: string;
    print: string;
    priceOnRequest: string;
    sizeOnRequest: string;
    callQuote: string;
    photoSoon: string;
    premium: string;
    total: string;
    sendShortlist: string;
    empty: string;
    disclaimer: string;
    showing: string;
  };
  trust: { eyebrow: string; title: string; text: string; alt: string };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    name: string;
    phone: string;
    interest: string;
    message: string;
    send: string;
    address: string;
    email: string;
    mapTitle: string;
    interests: { funeral: string; scheme: string; tombstone: string };
  };
  footer: { scripture: string; rights: string };
  mobileBar: { call: string; whatsapp: string };
  confirmNote: string;
};

export const translations: Record<Language, Dict> = {
  en: {
    nav: {
      services: "Services",
      scheme: "Burial Scheme",
      catalogue: "Tombstones",
      trust: "Trust & Membership",
      contact: "Contact",
    },
    langToggle: "isiXhosa",
    menu: "Open menu",
    hero: {
      eyebrow: "Luloyiso Funeral Services · Matatiele",
      title: "Dignified farewells, with care you can trust.",
      sub: "Coffins, décor, tents, chairs, tombstones, video & P.A. system, and more — serving Matatiele and surrounding communities.",
      call: "Call now",
      whatsapp: "WhatsApp us",
      view: "View tombstone prices",
      scripture: "Psalm 34:18 — The Lord is close to the brokenhearted.",
    },
    services: {
      eyebrow: "Services",
      title: "Practical support, thoughtfully delivered.",
      sub: "From funeral essentials to ceremony support, we help families arrange a dignified farewell with care.",
      blurb: "Carefully coordinated funeral support.",
    },
    scheme: {
      eyebrow: "Burial Scheme",
      title: "Burial cover for the people who matter.",
      sub: "Choose a plan and compare the monthly premium with or without a spouse.",
      single: "Single",
      spouse: "With spouse",
      joining: "Joining fee",
      perMonth: "/ month",
      benefits: "What your family receives",
      terms: "Good to know",
      joinToday: "Join today — call or WhatsApp",
    },
    catalogue: {
      eyebrow: "Tombstones",
      title: "Tombstone price list & catalogue",
      sub: "Browse designs, compare package options and shortlist the pieces you want to discuss with Luloyiso.",
      table: "Table",
      cards: "Cards",
      search: "Search code…",
      allSizes: "All sizes",
      sortCode: "Sort: code",
      sortPriceAsc: "Sort: price low→high",
      sortPriceDesc: "Sort: price high→low",
      code: "Code",
      size: "Size",
      head: "Head & Base",
      full: "Full Set",
      slab: "Full Set + Slab",
      quote: "Get a quote",
      addShortlist: "Add to shortlist",
      remove: "Remove",
      shortlist: "Shortlist",
      print: "Print / Download",
      priceOnRequest: "Price on request",
      sizeOnRequest: "Size on request",
      callQuote: "Call for a quote",
      photoSoon: "Photo coming soon",
      premium: "Premium",
      total: "Total",
      sendShortlist: "Send shortlist on WhatsApp",
      empty: "No designs match your filters.",
      disclaimer:
        "Prices are a guide and may change. Please contact us to confirm current pricing, materials and installation.",
      showing: "designs shown",
    },
    trust: {
      eyebrow: "Trust & Membership",
      title: "Professional care, backed by membership.",
      text: "Luloyiso Burial Scheme is a member of the South African Funeral Practitioners Association (SAFPA). The certificate shown is valid until the end of May 2027.",
      alt: "SAFPA membership certificate issued to Luloyiso Burial Scheme",
    },
    contact: {
      eyebrow: "Contact",
      title: "We are here when you need us.",
      sub: "Call, WhatsApp or send an enquiry. Your message will open in WhatsApp with your details prepared.",
      name: "Your name",
      phone: "Phone number",
      interest: "I'm interested in…",
      message: "Message",
      send: "Send enquiry on WhatsApp",
      address: "Address",
      email: "Email",
      mapTitle: "Map showing Westgate 5C, Matatiele",
      interests: {
        funeral: "Funeral services",
        scheme: "Burial scheme",
        tombstone: "Tombstone quote",
      },
    },
    footer: {
      scripture: "Psalm 34:18 — The Lord is close to the brokenhearted.",
      rights: "Luloyiso Funeral Services. All rights reserved.",
    },
    mobileBar: { call: "Call", whatsapp: "WhatsApp" },
    confirmNote: "Please confirm with us",
  },
  xh: {
    nav: {
      services: "Iinkonzo",
      scheme: "Isikim sokuNgcwaba",
      catalogue: "Amatye engcwaba",
      trust: "Ukuthembeka nobulungu",
      contact: "Qhagamshelana",
    },
    langToggle: "English",
    menu: "Vula imenyu",
    hero: {
      eyebrow: "Luloyiso Funeral Services · Matatiele",
      title: "Imingcwabo enesidima, ngenkathalo onokuyithemba.",
      sub: "Iibhokisi, uhombiso, iintente, izitulo, amatye engcwaba, ividiyo ne-P.A. system, nokunye — sisebenzela iMatatiele noluntu olusingqongileyo.",
      call: "Fowunela ngoku",
      whatsapp: "WhatsApp nathi",
      view: "Jonga amaxabiso amatye",
      scripture: "Indumiso 34:18 — Uyehova usondele kwabaphukileyo ntliziyo zaphukileyo.",
    },
    services: {
      eyebrow: "Iinkonzo",
      title: "Uncedo olusebenzayo, olunikwa ngenkathalo.",
      sub: "Ukusuka kwizinto ezibalulekileyo zomngcwabo ukuya kuncedo kumsitho, sinceda iintsapho zilungiselele umngcwabo onesidima.",
      blurb: "Uncedo lomngcwabo olulungelelaniswe ngenkathalo.",
    },
    scheme: {
      eyebrow: "Isikim sokuNgcwaba",
      title: "Ukhuselo lomngcwabo lwabantu obathandayo.",
      sub: "Khetha isikimu uze uthelekise intlawulo yenyanga ngaphandle okanye neqabane.",
      single: "Umntu omnye",
      spouse: "Neqabane",
      joining: "Ukujoyina",
      perMonth: "/ ngenyanga",
      benefits: "Ukusetyenzelwa",
      terms: "Okubalulekileyo",
      joinToday: "Joyina namhlanje — fowuna okanye WhatsApp",
    },
    catalogue: {
      eyebrow: "Amatye engcwaba",
      title: "Uluhlu lwamaxabiso amatye engcwaba",
      sub: "Jonga iindlela, thelekisa amaxabiso uze ukhethe ezo ufuna ukuthetha ngazo noLuloyiso.",
      table: "Itafile",
      cards: "Amakhadi",
      search: "Khangela ikhowudi…",
      allSizes: "Bonke ubungakanani",
      sortCode: "Hlela: ikhowudi",
      sortPriceAsc: "Hlela: ixabiso linyuka",
      sortPriceDesc: "Hlela: ixabiso lehla",
      code: "Ikhowudi",
      size: "Ubungakanani",
      head: "Intloko neBase",
      full: "Iseti epheleleyo",
      slab: "Iseti epheleleyo + Slab",
      quote: "Cela ixabiso",
      addShortlist: "Yongeza kuluhlu",
      remove: "Susa",
      shortlist: "Uluhlu olukhethiweyo",
      print: "Shicilela / Khuphela",
      priceOnRequest: "Ixabiso xa uceliwe",
      sizeOnRequest: "Ubungakanani xa uceliwe",
      callQuote: "Fowunela ukuze ufumane ixabiso",
      photoSoon: "Ifoto iza kufakwa",
      premium: "Premium",
      total: "Ixabiso lilonke",
      sendShortlist: "Thumela uluhlu kuWhatsApp",
      empty: "Akukho zinto zihambelana nezihluzo zakho.",
      disclaimer:
        "Amaxabiso sisikhokelo kwaye anokutshintsha. Nceda uqhagamshelane nathi ukuqinisekisa ixabiso, izinto kunye nokufakwa.",
      showing: "iindlela ezibonisiweyo",
    },
    trust: {
      eyebrow: "Ukuthembeka nobulungu",
      title: "Inkonzo yobungcali, ixhaswe bubulungu.",
      text: "ILuloyiso Burial Scheme lilungu leSouth African Funeral Practitioners Association (SAFPA). Isatifikethi esibonisiweyo sisebenza kude kube sekupheleni kukaMeyi 2027.",
      alt: "Isatifikethi sobulungu be-SAFPA esakhutshelwa iLuloyiso Burial Scheme",
    },
    contact: {
      eyebrow: "Qhagamshelana",
      title: "Silapha xa usifuna.",
      sub: "Fowuna, WhatsApp okanye uthumele umbuzo. Umyalezo wakho uya kuvulwa kuWhatsApp sele uneenkcukacha zakho.",
      name: "Igama lakho",
      phone: "Inombolo yefowuni",
      interest: "Ndinomdla ku…",
      message: "Umyalezo",
      send: "Thumela umbuzo kuWhatsApp",
      address: "Idilesi",
      email: "I-imeyile",
      mapTitle: "Imephu ebonisa iWestgate 5C, Matatiele",
      interests: {
        funeral: "Iinkonzo zomngcwabo",
        scheme: "Isikim somngcwabo",
        tombstone: "Ixabiso lelitye lengcwaba",
      },
    },
    footer: {
      scripture: "Indumiso 34:18 — Uyehova usondele kwabaphukileyo ntliziyo zaphukileyo.",
      rights: "Luloyiso Funeral Services. Onke amalungelo agciniwe.",
    },
    mobileBar: { call: "Fowuna", whatsapp: "WhatsApp" },
    confirmNote: "Nceda uqinisekise nathi",
  },
};

/** Service cards — names are translated separately because they double as icon keys. */
export const serviceNames: Record<Language, string[]> = {
  en: [
    "Coffins / Caskets",
    "Décor",
    "Tents",
    "Chairs",
    "Tombstones",
    "Video",
    "P.A. System",
    "Transport services",
    "Lowering device",
    "Funeral programmes",
    "And more",
  ],
  xh: [
    "Iibhokisi zomngcwabo",
    "Uhombiso",
    "Iintente",
    "Izitulo",
    "Amatye engcwaba",
    "Ividiyo",
    "P.A. System",
    "Iinkonzo zothutho",
    "Isixhobo sokwehlisa",
    "Iinkqubo zomngcwabo",
    "Nokunye",
  ],
};
