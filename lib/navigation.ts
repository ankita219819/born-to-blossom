/** Shared in-app hrefs for navbar + footer quick links. */
export function siteHref(item: string) {
  switch (item) {
    case "Home":
      return "/#home";
    case "About":
      return "/about";
    case "Services":
      return "/services";
    case "Assessment":
    case "Soul Assessment":
      return "/soul-assessment";
    case "Corporate":
      return "/corporate";
    case "Workshops":
      return "/workshops";
    case "Blog":
      return "/blog";
    case "FAQ":
      return "/faq";
    case "Book":
      return "/#book-session";
    case "RESTORE":
      return "/restore";
    case "Contact":
      return "/#contact";
    default:
      return `/#${item.toLowerCase().replaceAll(" ", "-")}`;
  }
}
