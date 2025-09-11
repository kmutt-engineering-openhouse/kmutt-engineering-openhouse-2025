export const onRequest = async (ctx) => {
  const url = new URL(ctx.request.url);
  const { pathname } = url;

  // Root path: detect language and redirect
  if (pathname === "/" || pathname === "") {
    // First check cookie
    const cookie = ctx.request.headers.get("Cookie") || "";
    const saved = /(?:^|;\s*)lang=(th|en)(?:;|$)/.exec(cookie)?.[1];

    let lang = saved;
    if (!lang) {
      // Otherwise detect from Accept-Language
      const al = (
        ctx.request.headers.get("Accept-Language") || ""
      ).toLowerCase();
      const primary = al.split(",")[0]?.split("-")[0] || "";
      lang = primary === "en" ? "en" : "th"; // default is TH
    }

    return Response.redirect(`${url.origin}/${lang}/`, 302);
  }

  // Language path: set cookie
  if (
    pathname === "/th" ||
    pathname.startsWith("/th/") ||
    pathname === "/en" ||
    pathname.startsWith("/en/")
  ) {
    const lang = pathname.startsWith("/en") ? "en" : "th";

    const res = await ctx.next();
    try {
      res.headers.append(
        "Set-Cookie",
        `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`
      );
    } catch {}
    return res;
  }

  // Other paths: do nothing
  return ctx.next();
};
