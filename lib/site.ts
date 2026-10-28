/** Contact details and company facts, kept in one place so copy stays consistent. */
export const SITE = {
  name: "SUR Technology",
  url: "https://surtechno.com",
  phone: "(888) 783-9827",
  phoneHref: "tel:+18887839827",
  phoneDirect: "(949) 783-9827",
  email: "info@surtechno.com",
  hours: "Mon to Fri, 9 to 6 PT",
  address: {
    street: "13217 Jamboree Rd., Suite 108",
    city: "Tustin, CA 92782",
  },
  founded: 2011,
} as const;

/** Section anchors. `#estimate` opens the Value Check on Sell, `#source` opens it on Buy. */
export const ANCHORS = {
  estimate: "#estimate",
  source: "#source",
} as const;
