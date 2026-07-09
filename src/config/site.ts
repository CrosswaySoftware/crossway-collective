export const SITE = {
  name: "Crossway Collective",
  tagline: "Chennai's Home of Great Food Brands",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://collective.crosswayhotels.com",
  email: "collective@crosswayhotels.com",
  phone: "+91 97512 77770",
  phoneHref: "+919751277770",
  city: "Chennai",
  parentBrand: "Crossway Hotels and Resorts",
  parentUrl: "https://www.crosswayhotels.com",
  order: {
    swiggy: "https://www.swiggy.com",
    zomato: "https://www.zomato.com",
  },
} as const;
