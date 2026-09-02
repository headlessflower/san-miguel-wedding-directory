// app/data/listings/venues.seed.ts
import type { VenueListing } from "../listings/types";

export const SEED_VENUES: VenueListing[] = [
  {
    id: "venue_rosewood_sma",
    type: "venue",
    slug: "rosewood-san-miguel-de-allende",
    featured: true,
    featuredTier: "sponsored",
    isVerified: false,
    isClaimed: false,
    name: { en: "Rosewood San Miguel de Allende", es: "Rosewood San Miguel de Allende" },
    description: {
      en: "Luxury hotel in San Miguel's historic center with more than 40,000 square feet of indoor and outdoor event space. Nine settings range from the 14-person La Cava to Jardín Rosewood, which hosts receptions and banquets for up to 1,000 guests with views of La Parroquia.",
      es: "Hotel de lujo en el centro histórico de San Miguel con más de 3,700 m² de espacios interiores y exteriores para eventos. Sus nueve ambientes van desde La Cava para 14 personas hasta Jardín Rosewood, con recepciones y banquetes para hasta 1,000 invitados y vistas a La Parroquia.",
    },
    venueType: "hotel_luxury",
    website: "https://www.rosewoodhotels.com/en/san-miguel-de-allende/events/weddings",
    instagram: "https://www.instagram.com/rosewoodsanmiguel/",
    phone: "+52 415 152 9700",
    email: "sanmiguel@rosewoodhotels.com",
    capacitySeated: 1000,
    capacityStanding: 1000,
    luxuryTier: "luxury",
    logistics: {
      indoorBackup: true,
      lodgingOnSite: true,
    },
    location: {
      area: "Nemesio Diez 11, Colonia Centro, San Miguel de Allende",
      withinCentro: true,
    },
    highlights: {
      en: [
        "More than 40,000 square feet of indoor and outdoor event space across nine settings",
        "Jardín Rosewood accommodates receptions and banquets for up to 1,000 guests",
        "Luna Rooftop hosts receptions for up to 470 guests and banquets for up to 430",
        "Rosewood Ballroom provides an indoor option for receptions of 200 or banquets of 150",
        "67 rooms and suites plus private residences for on-site accommodations",
        "Wedding offering includes a three-course plated menu, six-hour corkage, service staff, white linens, and a menu tasting for two",
      ],
      es: [
        "Más de 3,700 m² de espacios interiores y exteriores distribuidos en nueve ambientes",
        "Jardín Rosewood recibe hasta 1,000 invitados en formato de recepción o banquete",
        "Luna Rooftop recibe hasta 470 invitados en recepción y 430 en banquete",
        "Rosewood Ballroom ofrece una opción interior para recepciones de 200 o banquetes de 150 personas",
        "67 habitaciones y suites, además de residencias privadas para hospedaje en el hotel",
        "La propuesta de bodas incluye menú servido de tres tiempos, descorche por seis horas, personal de servicio, mantelería blanca y degustación para dos",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/rosewood-san-miguel-de-allende/rosewood-4.png",
        alt: {
          en: "Evening garden wedding reception overlooking La Parroquia at Rosewood San Miguel de Allende",
          es: "Recepción nocturna de boda en el jardín con vista a La Parroquia en Rosewood San Miguel de Allende",
        },
      },
      {
        type: "ceremony",
        src: "/images/venues/rosewood-san-miguel-de-allende/rosewood-5.png",
        alt: {
          en: "Garden wedding ceremony framed by cypress trees at Rosewood San Miguel de Allende",
          es: "Ceremonia de boda en el jardín enmarcada por cipreses en Rosewood San Miguel de Allende",
        },
      },
      {
        type: "reception",
        src: "/images/venues/rosewood-san-miguel-de-allende/rosewood-3.png",
        alt: {
          en: "Floral garden wedding reception with La Parroquia in the background at Rosewood",
          es: "Recepción de boda con flores en el jardín y La Parroquia al fondo en Rosewood",
        },
      },
      {
        type: "reception",
        src: "/images/venues/rosewood-san-miguel-de-allende/rosewood-2.png",
        alt: {
          en: "Candlelit wedding table beneath a transparent tent at Rosewood San Miguel de Allende",
          es: "Mesa de boda iluminada con velas bajo una carpa transparente en Rosewood San Miguel de Allende",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/rosewood-san-miguel-de-allende/rosewood-1.png",
        alt: {
          en: "Aerial view of Rosewood San Miguel de Allende and the historic city skyline",
          es: "Vista aérea de Rosewood San Miguel de Allende y del perfil del centro histórico",
        },
      },
      {
        type: "ceremony",
        src: "/images/venues/rosewood-san-miguel-de-allende/rosewood-6.png",
        alt: {
          en: "Rosewood amphitheater arranged for a wedding ceremony",
          es: "Anfiteatro de Rosewood preparado para una ceremonia de boda",
        },
      },
    ],
  },

  {
    id: "venue_live_aqua_sma",
    type: "venue",
    slug: "live-aqua-san-miguel-de-allende",
    featured: true,
    featuredTier: "featured",
    name: { en: "Live Aqua San Miguel de Allende", es: "Live Aqua San Miguel de Allende" },
    description: {
      en: "Luxury resort beside Presa del Obraje with lodging for more than 300 wedding guests, two outdoor celebration spaces for up to 400 people, and an indoor ballroom for weddings of up to 700.",
      es: "Resort de lujo junto a la Presa del Obraje con hospedaje para más de 300 invitados, dos espacios exteriores para celebraciones de hasta 400 personas y un salón interior para bodas de hasta 700.",
    },
    venueType: "hotel_luxury",
    website: "https://www.fiestamericanatravelty.com/en/live-aqua/hotels/live-aqua-san-miguel-de-allende/explore/wedding",
    instagram: "https://www.instagram.com/liveaquasanmiguel/",
    phone: "+52 443 310 8137",
    capacitySeated: 700,
    capacityStanding: 700,
    luxuryTier: "luxury",
    logistics: {
      indoorBackup: true,
      wheelchairAccessible: true,
      lodgingOnSite: true,
    },
    location: {
      area: "Calzada de la Presa 85, Zona Centro, San Miguel de Allende",
      withinCentro: true,
    },
    highlights: {
      en: [
        "Two outdoor wedding settings for celebrations of up to 400 guests",
        "Indoor ballroom accommodating weddings of up to 700 guests",
        "On-site accommodations for more than 300 wedding guests",
        "ABC-certified wedding specialists",
        "Only one wedding is hosted per day",
        "Views across Presa del Obraje",
      ],
      es: [
        "Dos espacios exteriores para bodas de hasta 400 invitados",
        "Salón interior para bodas de hasta 700 invitados",
        "Hospedaje en el hotel para más de 300 invitados de boda",
        "Especialistas en bodas certificados por la ABC",
        "Solo se celebra una boda por día",
        "Vistas hacia la Presa del Obraje",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/live-aqua-san-miguel-de-allende/live-aqua-6.png",
        alt: {
          en: "Outdoor wedding ceremony with white florals at Live Aqua San Miguel de Allende",
          es: "Ceremonia de boda al aire libre con flores blancas en Live Aqua San Miguel de Allende",
        },
      },
      {
        type: "reception",
        src: "/images/venues/live-aqua-san-miguel-de-allende/live-aqua-4.png",
        alt: {
          en: "Terrace wedding reception with suspended decor and teal seating at Live Aqua",
          es: "Recepción de boda en terraza con decoración suspendida y sillas color turquesa en Live Aqua",
        },
      },
      {
        type: "reception",
        src: "/images/venues/live-aqua-san-miguel-de-allende/live-aqua-2.png",
        alt: {
          en: "Evening garden reception beneath a dramatic floral canopy at Live Aqua",
          es: "Recepción nocturna en el jardín bajo un dosel floral en Live Aqua",
        },
      },
      {
        type: "reception",
        src: "/images/venues/live-aqua-san-miguel-de-allende/aqua-1.png",
        alt: {
          en: "Cocktail tables arranged in the arched Matatena courtyard at Live Aqua",
          es: "Mesas de cóctel instaladas en el patio Matatena con arcos de Live Aqua",
        },
      },
      {
        type: "reception",
        src: "/images/venues/live-aqua-san-miguel-de-allende/live-aqua-3.png",
        alt: {
          en: "Outdoor reception tables shaded by white parasols at Live Aqua",
          es: "Mesas de recepción al aire libre bajo sombrillas blancas en Live Aqua",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/live-aqua-san-miguel-de-allende/live-aqua-5.png",
        alt: {
          en: "Garden dining setup overlooking the historic Presa del Obraje",
          es: "Montaje de comedor en el jardín con vista a la histórica Presa del Obraje",
        },
      },
    ],
  },

  {
    id: "venue_casa_de_sierra_nevada_belmond",
    type: "venue",
    slug: "casa-de-sierra-nevada-belmond",
    featured: true,
    featuredTier: "featured",
    name: { en: "Casa de Sierra Nevada (Belmond)", es: "Casa de Sierra Nevada (Belmond)" },
    description: {
      en: "Historic luxury property in San Miguel de Allende—ideal for intimate celebrations and curated guest experiences.",
      es: "Propiedad histórica de lujo en San Miguel de Allende—ideal para celebraciones íntimas y experiencias cuidadas para invitados.",
    },
    venueType: "hotel_luxury",
    website: "",
    images: [
      {
        type: "hero",
        src: "/images/venues/casa-de-sierra-nevada-belmond/belmond-front.png",
        alt: {
          en: "Courtyard-style venue ambiance in San Miguel de Allende",
          es: "Ambiente de patio estilo colonial en San Miguel de Allende",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/casa-de-sierra-nevada-belmond/belmond-cactus-patio.png",
        alt: {
          en: "Cactus patio at Casa de Sierra Nevada",
          es: "Patio de cactus en Casa de Sierra Nevada",
        },
      },
      {
        type: "detail",
        src: "/images/venues/casa-de-sierra-nevada-belmond/belmond-green-lounge.png",
        alt: {
          en: "Green lounge at Casa de Sierra Nevada",
          es: "Salón verde en Casa de Sierra Nevada",
        },
      },
      {
        type: "ceremony",
        src: "/images/venues/casa-de-sierra-nevada-belmond/belmond-jardin-casa-palma.png",
        alt: {
          en: "Casa Palma garden at Casa de Sierra Nevada",
          es: "Jardín Casa Palma en Casa de Sierra Nevada",
        },
      },
      {
        type: "reception",
        src: "/images/venues/casa-de-sierra-nevada-belmond/belmond-jardin-del-parque.png",
        alt: {
          en: "Jardín del Parque at Casa de Sierra Nevada",
          es: "Jardín del Parque en Casa de Sierra Nevada",
        },
      },
      {
        type: "detail",
        src: "/images/venues/casa-de-sierra-nevada-belmond/belmond-patio-santa-elena.png",
        alt: {
          en: "Santa Elena patio at Casa de Sierra Nevada",
          es: "Patio Santa Elena en Casa de Sierra Nevada",
        },
      },
    ],
  },

  {
    id: "venue_hotel_matilda",
    type: "venue",
    slug: "hotel-matilda",
    featured: true,
    featuredTier: "featured",
    name: { en: "Hotel Matilda", es: "Hotel Matilda" },
    description: {
      en: "Art-filled 32-room luxury hotel in Centro offering one 42 m² meeting venue, Salón Aldama, for up to 40 theater-style guests or 30 guests for receptions and banquets. The hotel currently does not provide wedding services.",
      es: "Hotel de lujo con 32 habitaciones y arte contemporáneo en el Centro. Ofrece un espacio de reuniones de 42 m², Salón Aldama, para hasta 40 personas en auditorio o 30 en recepciones y banquetes. Actualmente el hotel no ofrece servicios para bodas.",
    },
    venueType: "hotel_luxury",
    website: "https://www.marriott.com/en-us/hotels/bjxhm-hotel-matilda-a-member-of-design-hotels/events/",
    instagram: "https://www.instagram.com/hotelmatilda/",
    phone: "+52 415 152 1015",
    capacitySeated: 30,
    capacityStanding: 30,
    luxuryTier: "luxury",
    logistics: {
      parkingOnSite: true,
      wheelchairAccessible: true,
      lodgingOnSite: true,
    },
    location: {
      area: "Aldama 53, Centro, San Miguel de Allende",
      withinCentro: true,
    },
    highlights: {
      en: [
        "Salón Aldama: one 42 m² indoor meeting and event room",
        "Capacity for 40 theater-style or 30 reception and banquet guests",
        "32 art-focused rooms and suites",
        "On-site Moxi restaurant, two bars, spa, fitness center, and outdoor pool",
        "Marriott currently lists wedding services as unavailable",
      ],
      es: [
        "Salón Aldama: un espacio interior de 42 m² para reuniones y eventos",
        "Capacidad para 40 personas en auditorio o 30 en recepción y banquete",
        "32 habitaciones y suites con enfoque artístico",
        "Restaurante Moxi, dos bares, spa, gimnasio y alberca exterior en el hotel",
        "Marriott indica actualmente que no hay servicios para bodas",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/hotel-matilda/matilda-1.png",
        alt: {
          en: "Hotel Matilda entrance on Aldama Street with the Parroquia visible in the distance",
          es: "Entrada de Hotel Matilda sobre la calle Aldama con la Parroquia visible a lo lejos",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hotel-matilda/matilda-2.png",
        alt: {
          en: "Open-air entrance courtyard and contemporary lobby at Hotel Matilda",
          es: "Patio de entrada al aire libre y lobby contemporáneo de Hotel Matilda",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hotel-matilda/matilda-4.png",
        alt: {
          en: "Hotel Matilda reception desk, art wall, and lobby lounge",
          es: "Recepción, muro artístico y sala del lobby de Hotel Matilda",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hotel-matilda/matilda-5.png",
        alt: {
          en: "Sunlit guest-room courtyard with bougainvillea at Hotel Matilda",
          es: "Patio de habitaciones iluminado por el sol y con bugambilias en Hotel Matilda",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hotel-matilda/matilda-6.png",
        alt: {
          en: "Private terrace lounge with fire pit and cactus garden at Hotel Matilda",
          es: "Terraza privada con sala, fogatero y jardín de cactus en Hotel Matilda",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hotel-matilda/matilda-7.png",
        alt: {
          en: "Hotel Matilda terrace seating framed by cactus shadows",
          es: "Mobiliario de terraza en Hotel Matilda enmarcado por sombras de cactus",
        },
      },
    ],
  },

  {
    id: "venue_casa_1810",
    type: "venue",
    slug: "casa-1810",
    featured: true,
    featuredTier: "standard",
    name: { en: "Casa 1810 (Terrace / Rooftop)", es: "Casa 1810 (Terraza / Rooftop)" },
    description: {
      en: "Terrace venue option designed for stylish, intimate weddings. Confirm guest count ranges and noise rules.",
      es: "Opción de terraza pensada para bodas íntimas con estilo. Confirma rangos de invitados y reglas de ruido.",
    },
    venueType: "rooftop",
    website: "https://casa1810.com/",
    images: [
      {
        type: "hero",
        src: "/images/venues/casa-1810/casa-1810-1.png",
        alt: {
          en: "Floral ceremony arch on the Casa 1810 rooftop overlooking San Miguel de Allende",
          es: "Arco floral para ceremonia en la terraza de Casa 1810 con vista a San Miguel de Allende",
        },
      },
      {
        type: "reception",
        src: "/images/venues/casa-1810/casa-1810-2.png",
        alt: {
          en: "Long reception table prepared for dinner on the Casa 1810 rooftop",
          es: "Mesa larga preparada para una cena de recepción en la terraza de Casa 1810",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/casa-1810/casa-1810-3.png",
        alt: {
          en: "Illuminated exterior of Casa 1810 at night",
          es: "Exterior iluminado de Casa 1810 por la noche",
        },
      },
      {
        type: "reception",
        src: "/images/venues/casa-1810/casa-1810-4.png",
        alt: {
          en: "Evening rooftop celebration under string lights at Casa 1810",
          es: "Celebración nocturna en la terraza de Casa 1810 bajo luces colgantes",
        },
      },
      {
        type: "ceremony",
        src: "/images/venues/casa-1810/casa-1810-5.png",
        alt: {
          en: "Holiday floral arch framing the San Miguel skyline from Casa 1810",
          es: "Arco floral navideño enmarcando el horizonte de San Miguel desde Casa 1810",
        },
      },
      {
        type: "reception",
        src: "/images/venues/casa-1810/casa-1810-6.png",
        alt: {
          en: "Courtyard reception tables set for an event at Casa 1810",
          es: "Mesas de recepción preparadas para un evento en el patio de Casa 1810",
        },
      },
    ],
  },

  {
    id: "venue_hotel_nena",
    type: "venue",
    slug: "hotel-nena",
    featured: true,
    featuredTier: "standard",
    name: { en: "Hotel Nena", es: "Hotel Nena" },
    description: {
      en: "Boutique hotel in San Miguel's historic center for weddings and celebrations of 50 to 200 guests. Its rooftop terrace offers views toward La Parroquia, while on-site accommodations, a heated pool and valet parking support intimate destination-wedding stays.",
      es: "Hotel boutique en el centro histórico de San Miguel para bodas y celebraciones de 50 a 200 invitados. Su terraza tiene vistas hacia La Parroquia, mientras que el hospedaje, la alberca climatizada y el valet parking facilitan estancias para bodas destino íntimas.",
    },
    venueType: "hotel_boutique",
    website: "https://www.hotelnenasanmigueldeallende.mx/",
    phone: "+52 415 188 1890",
    email: "hola.centro@hotelnena.mx",
    capacitySeated: 200,
    capacityStanding: 200,
    luxuryTier: "upper",
    rules: {
      allowsOutsideCatering: true,
    },
    logistics: {
      parkingOnSite: true,
      lodgingOnSite: true,
    },
    location: {
      area: "San Francisco 32, Centro, San Miguel de Allende",
      withinCentro: true,
    },
    highlights: {
      en: [
        "Central wedding venue for celebrations of 50 to 200 guests",
        "Rooftop terrace with views toward La Parroquia",
        "Located less than 300 meters from San Miguel's main parish church",
        "On-site boutique accommodations with breakfast included",
        "Heated pool, rooftop bar and valet parking",
        "Events may use the hotel's catering or an external caterer",
      ],
      es: [
        "Recinto céntrico para bodas de 50 a 200 invitados",
        "Terraza con vistas hacia La Parroquia",
        "Ubicado a menos de 300 metros de la parroquia principal de San Miguel",
        "Hospedaje boutique en el hotel con desayuno incluido",
        "Alberca climatizada, bar en la terraza y valet parking",
        "Los eventos pueden contratar el banquete del hotel o un proveedor externo",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/hotel-nena/nena-3.png",
        alt: {
          en: "Covered rooftop lounge and bar at Hotel Nena in San Miguel de Allende",
          es: "Terraza techada con sala y bar en Hotel Nena, San Miguel de Allende",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hotel-nena/nena-4.png",
        alt: {
          en: "Open-air rooftop terrace arranged with dining tables at Hotel Nena",
          es: "Terraza al aire libre con mesas preparadas para servicio en Hotel Nena",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hotel-nena/nena-5.png",
        alt: {
          en: "Hotel Nena rooftop terrace overlooking La Parroquia",
          es: "Terraza de Hotel Nena con vista hacia La Parroquia",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hotel-nena/nena-2.png",
        alt: {
          en: "Stone-walled restaurant courtyard and bar at Hotel Nena",
          es: "Patio restaurante con muros de piedra y bar en Hotel Nena",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hotel-nena/nena-1.png",
        alt: {
          en: "Heated pool in Hotel Nena's historic courtyard",
          es: "Alberca climatizada en el patio histórico de Hotel Nena",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hotel-nena/nena-6.png",
        alt: {
          en: "Historic stone arcade overlooking the restaurant courtyard at Hotel Nena",
          es: "Corredor histórico de cantera con vista al patio restaurante de Hotel Nena",
        },
      },
    ],
  },

  {
    id: "venue_hacienda_santa_ana",
    type: "venue",
    slug: "hacienda-santa-ana",
    featured: true,
    featuredTier: "featured",
    name: { en: "Hacienda Santa Ana", es: "Hacienda Santa Ana" },
    description: {
      en: "Private 10-bedroom countryside estate in historic Atotonilco, about 15 minutes from San Miguel de Allende, with an event lawn and chapel designed for weddings of up to 150 guests.",
      es: "Propiedad campestre privada de 10 habitaciones en el histórico Atotonilco, a unos 15 minutos de San Miguel de Allende, con jardín para eventos y capilla diseñados para bodas de hasta 150 invitados.",
    },
    venueType: "hacienda",
    website: "https://hsasanmiguel.com/",
    instagram: "https://www.instagram.com/hsasanmiguel/",
    email: "hsasanmiguel9090@gmail.com",
    capacitySeated: 150,
    capacityStanding: 150,
    luxuryTier: "luxury",
    logistics: {
      parkingOnSite: false,
      lodgingOnSite: true,
    },
    location: {
      area: "San Miguelito 8, Atotonilco, San Miguel de Allende",
      withinCentro: false,
      approximateDriveMinsFromCentro: 15,
    },
    highlights: {
      en: [
        "Private estate rental with 10 bedrooms sleeping up to 21 guests",
        "Event lawn and chapel designed to host up to 150 people",
        "Pool, 20-person hot tub, pickleball and bocce courts, and private nightclub",
        "In-house chef team with custom menus for events and celebrations",
        "No on-site guest parking; third-party event transportation is required",
      ],
      es: [
        "Renta privada de la propiedad con 10 habitaciones para hasta 21 huéspedes",
        "Jardín para eventos y capilla diseñados para recibir hasta 150 personas",
        "Alberca, jacuzzi para 20 personas, canchas de pickleball y bochas, y club nocturno privado",
        "Equipo de chefs en sitio con menús personalizados para eventos y celebraciones",
        "No hay estacionamiento para invitados; se requiere transporte de terceros para el evento",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/hacienda-santa-ana/santa-ana-3.png",
        alt: {
          en: "Outdoor wedding ceremony arranged on the event lawn at Hacienda Santa Ana",
          es: "Ceremonia de boda al aire libre preparada en el jardín de eventos de Hacienda Santa Ana",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hacienda-santa-ana/santa-ana-2.png",
        alt: {
          en: "Ivy-covered courtyard decorated with colorful papel picado at Hacienda Santa Ana",
          es: "Patio cubierto de hiedra y decorado con papel picado de colores en Hacienda Santa Ana",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-santa-ana/santa-ana-6.png",
        alt: {
          en: "Floral reception tables beneath a fabric canopy on the garden terrace",
          es: "Mesas de recepción con flores bajo un dosel de tela en la terraza del jardín",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hacienda-santa-ana/santa-ana-4.png",
        alt: {
          en: "Hacienda fountain surrounded by flowers and outdoor lounge seating",
          es: "Fuente de la hacienda rodeada de flores y mobiliario de sala al aire libre",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hacienda-santa-ana/santa-ana-1.png",
        alt: {
          en: "Colorful Mexican market display arranged on the event lawn",
          es: "Puesto de mercado mexicano lleno de color instalado en el jardín de eventos",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-santa-ana/santa-ana-5.png",
        alt: {
          en: "Rustic wedding table set with white place settings and greenery",
          es: "Mesa rústica de boda preparada con vajilla blanca y follaje",
        },
      },
    ],
  },

  {
    id: "venue_hacienda_los_arcangeles",
    type: "venue",
    slug: "hacienda-los-arcangeles",
    featured: true,
    featuredTier: "featured",
    name: { en: "Hacienda Los Arcángeles", es: "Hacienda Los Arcángeles" },
    description: {
      en: "Private destination-wedding hacienda in San Miguel de Allende with a chapel, gardens, terraces, elegant courtyards, and 13 on-site guest rooms available with a full-property buyout.",
      es: "Hacienda privada para bodas destino en San Miguel de Allende, con capilla, jardines, terrazas, patios elegantes y 13 habitaciones disponibles al reservar la propiedad completa.",
    },
    venueType: "hacienda",
    website: "https://www.haciendalosarcangeles.com/bodas",
    phone: "+52 415 140 0656",
    email: "info_hla@fhb.com.mx",
    luxuryTier: "luxury",
    logistics: {
      parkingOnSite: true,
      lodgingOnSite: true,
    },
    location: {
      area: "Real del Conde 20, Arcos de San Miguel, San Miguel de Allende",
      withinCentro: false,
    },
    highlights: {
      en: [
        "Exclusive use of the hacienda for private destination weddings",
        "Private chapel for wedding ceremonies",
        "Gardens, terraces, courtyards, and indoor event spaces",
        "Full-property option including all 13 guest rooms",
        "On-site team offers personalized event planning",
      ],
      es: [
        "Uso exclusivo de la hacienda para bodas destino privadas",
        "Capilla privada para ceremonias de boda",
        "Jardines, terrazas, patios y espacios interiores para eventos",
        "Opción de reservar la propiedad completa con sus 13 habitaciones",
        "Equipo en sitio con planeación personalizada de eventos",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-1.png",
        alt: {
          en: "Vaulted event hall and waterfront lawn at Hacienda Los Arcángeles",
          es: "Salón abovedado y jardín junto al estanque de Hacienda Los Arcángeles",
        },
      },
      {
        type: "ceremony",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-2.png",
        alt: {
          en: "Aerial view of an outdoor wedding ceremony beside the water gardens",
          es: "Vista aérea de una ceremonia de boda al aire libre junto a los jardines acuáticos",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-3.png",
        alt: {
          en: "Indoor wedding reception with dramatic draping and a central dance floor",
          es: "Recepción de boda interior con telas decorativas y pista de baile central",
        },
      },
      {
        type: "ceremony",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-4.png",
        alt: {
          en: "Newlyweds beneath a floral arch in front of the private chapel",
          es: "Recién casados bajo un arco floral frente a la capilla privada",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-5.png",
        alt: {
          en: "Colonial courtyard with stone arches and covered terraces",
          es: "Patio colonial con arcos de piedra y terrazas techadas",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-6.png",
        alt: {
          en: "Wedding guests raising a toast around a floral reception table",
          es: "Invitados brindando alrededor de una mesa de recepción con flores",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hacienda-los-arcangeles/arcangeles-7.png",
        alt: {
          en: "Bride posing between the hacienda's textured stone arches",
          es: "Novia posando entre los arcos de piedra de la hacienda",
        },
      },
    ],
  },

  {
    id: "venue_hacienda_el_santuario",
    type: "venue",
    slug: "hacienda-el-santuario",
    featured: true,
    featuredTier: "featured",
    name: { en: "Hacienda El Santuario", es: "Hacienda El Santuario" },
    description: {
      en: "Historic boutique hotel in the heart of San Miguel de Allende for intimate weddings of up to 70 guests, with a central courtyard, terrace, 30 suites, and on-site planning support.",
      es: "Hotel boutique histórico en el corazón de San Miguel de Allende para bodas íntimas de hasta 70 invitados, con patio central, terraza, 30 suites y apoyo de planeación en el hotel.",
    },
    venueType: "hotel_boutique",
    website: "https://www.haciendaelsantuario.com/en/events/",
    phone: "+52 415 158 0752",
    email: "gerente.ventas@haciendaelsantuario.com",
    capacitySeated: 70,
    luxuryTier: "luxury",
    logistics: {
      parkingOnSite: true,
      lodgingOnSite: true,
    },
    location: {
      area: "Aldama 41, Zona Centro, San Miguel de Allende",
      withinCentro: true,
    },
    highlights: {
      en: [
        "Central courtyard and terrace for weddings and private celebrations",
        "30 suites decorated with Mexican folk art",
        "On-site team available to support event logistics",
        "La Sanmiguelada restaurant and bar on the property",
      ],
      es: [
        "Patio central y terraza para bodas y celebraciones privadas",
        "30 suites decoradas con arte popular mexicano",
        "Equipo del hotel disponible para apoyar la logística del evento",
        "Restaurante y bar La Sanmiguelada dentro de la propiedad",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/hacienda-el-santuario/el-santuario-6.png",
        alt: {
          en: "Hacienda El Santuario central courtyard illuminated for an evening celebration",
          es: "Patio central de Hacienda El Santuario iluminado para una celebración nocturna",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hacienda-el-santuario/el-santuario-4.png",
        alt: {
          en: "Bougainvillea-filled courtyard and historic architecture at Hacienda El Santuario",
          es: "Patio con bugambilias y arquitectura histórica de Hacienda El Santuario",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-el-santuario/el-santuario-2.png",
        alt: {
          en: "Courtyard tables arranged for an intimate celebration at Hacienda El Santuario",
          es: "Mesas en el patio preparadas para una celebración íntima en Hacienda El Santuario",
        },
      },
      {
        type: "exterior",
        src: "/images/venues/hacienda-el-santuario/el-santuario-3.png",
        alt: {
          en: "Colorful historic facade of Hacienda El Santuario on Aldama Street",
          es: "Fachada histórica y colorida de Hacienda El Santuario sobre la calle Aldama",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hacienda-el-santuario/el-santuario-5.png",
        alt: {
          en: "Rooftop terrace with lounge seating and views toward the Parroquia",
          es: "Terraza con sala exterior y vistas hacia la Parroquia",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hacienda-el-santuario/el-santuario-1.png",
        alt: {
          en: "Meeting and dining room decorated with Mexican folk art at Hacienda El Santuario",
          es: "Salón de reuniones y comedor decorado con arte popular mexicano en Hacienda El Santuario",
        },
      },
    ],
  },

  {
    id: "venue_hacienda_agualuna",
    type: "venue",
    slug: "hacienda-agualuna",
    featured: true,
    featuredTier: "standard",
    name: { en: "Hacienda Agualuna", es: "Hacienda Agualuna" },
    description: {
      en: "Destination-wedding hacienda outside San Miguel de Allende with stone arches, landscaped gardens and an open-air event esplanade for celebrations of up to 400 guests. Thirteen on-site rooms accommodate up to 48 people for a private wedding weekend.",
      es: "Hacienda para bodas destino a las afueras de San Miguel de Allende, con arcos de piedra, jardines y una gran explanada al aire libre para celebraciones de hasta 400 invitados. Sus 13 habitaciones hospedan hasta 48 personas para vivir un fin de semana de boda privado.",
    },
    venueType: "hacienda",
    website: "https://agualuna.mx/",
    phone: "+52 415 126 8139",
    capacitySeated: 400,
    capacityStanding: 400,
    luxuryTier: "luxury",
    ceremonyTypes: ["civil", "religious", "symbolic"],
    rules: {
      noiseCurfewTime: "03:00",
      allowsOutsideCatering: true,
      allowsLiveMusic: true,
      alcoholAllowed: true,
    },
    logistics: {
      parkingOnSite: true,
      lodgingOnSite: true,
    },
    location: {
      area: "Entronque Carretero a Jalpa km 2.5, San Miguel de Allende",
      withinCentro: false,
    },
    highlights: {
      en: [
        "Outdoor mega esplanade framed by five stone arches for large receptions",
        "Natural auditorium garden designed for open-air ceremonies",
        "Elevated garden for cocktails plus a cactus garden with a reflecting pond",
        "13 on-site rooms accommodating up to 48 overnight guests",
        "Pool, terrace, beauty-preparation area, catering kitchen, bar and lounge",
        "Available as a venue rental or with optional planning, catering, decor and entertainment services",
        "Only one event is hosted per day",
      ],
      es: [
        "Mega explanada al aire libre enmarcada por cinco arcos de piedra para grandes recepciones",
        "Jardín con auditorio natural diseñado para ceremonias al aire libre",
        "Jardín elevado para cocteles y jardín de cactáceas con estanque",
        "13 habitaciones para hospedar hasta 48 personas",
        "Alberca, terraza, área de arreglo, cocina para catering, bar y sala de descanso",
        "Disponible como renta de recinto o con servicios opcionales de planeación, banquete, decoración y entretenimiento",
        "Solo se celebra un evento por día",
      ],
    },
    images: [
      {
        type: "hero",
        src: "/images/venues/hacienda-agualuna/agualuna-6.png",
        alt: {
          en: "Outdoor wedding reception beneath bougainvillea-covered stone arches at Hacienda Agualuna",
          es: "Recepción de boda al aire libre bajo arcos de piedra cubiertos de buganvilias en Hacienda Agualuna",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-agualuna/agualuna-1.png",
        alt: {
          en: "Newlyweds celebrating beneath string lights at Hacienda Agualuna",
          es: "Pareja de recién casados celebrando bajo luces colgantes en Hacienda Agualuna",
        },
      },
      {
        type: "detail",
        src: "/images/venues/hacienda-agualuna/agualuna-3.png",
        alt: {
          en: "Newlyweds walking through Hacienda Agualuna's landscaped garden",
          es: "Pareja de recién casados caminando por los jardines de Hacienda Agualuna",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-agualuna/agualuan-2.png",
        alt: {
          en: "Colorful sweetheart table framed by stone arches and bougainvillea at Hacienda Agualuna",
          es: "Mesa de novios con flores coloridas enmarcada por arcos de piedra y buganvilias en Hacienda Agualuna",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-agualuna/agualuna-5.png",
        alt: {
          en: "Colorful wedding tablescape beside a bougainvillea-covered arch at Hacienda Agualuna",
          es: "Mesa de boda colorida junto a un arco cubierto de buganvilias en Hacienda Agualuna",
        },
      },
      {
        type: "reception",
        src: "/images/venues/hacienda-agualuna/agualuna-4.png",
        alt: {
          en: "White-and-green outdoor reception setup in Hacienda Agualuna's stone-arch courtyard",
          es: "Montaje de recepción al aire libre en blanco y verde en el patio de arcos de piedra de Hacienda Agualuna",
        },
      },
    ],
  },
];
