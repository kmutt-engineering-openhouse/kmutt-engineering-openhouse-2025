export const onRequest = async (ctx) => {
  const url = new URL(ctx.request.url);
  const { pathname } = url;

  if (pathname === "/" || pathname === "") {
    const cookie = ctx.request.headers.get("Cookie") || "";
    const saved = /(?:^|;\s*)lang=(th|en)(?:;|$)/.exec(cookie)?.[1];

    let lang = saved;
    if (!lang) {
      lang = "th";
    }

    return Response.redirect(`${url.origin}/${lang}/`, 302);
  }

  if (
    pathname === "/th" ||
    pathname.startsWith("/th/") ||
    pathname === "/en" ||
    pathname.startsWith("/en/")
  ) {
    const lang = pathname.startsWith("/en") ? "en" : "th";

    const res = await ctx.next();
    try {
      res.headers.append("Set-Cookie", `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`);
    } catch {}
    return res;
  }

  return ctx.next();
};
