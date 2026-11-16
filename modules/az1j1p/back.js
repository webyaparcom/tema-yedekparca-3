/* ozellik-onay-kenar — Özellik Onay Kenar — vurgu zeminde onay işaretli iki sütun (15 Kas 2026 · mcp:webmaker/20261115-224259-bpa9 · D17).
   Vurgu zeminde başlık kenarda sabit, özellikler iki sütunda büyük onay işaretleriyle sıralanır; açıklamalar kısa, alt düğme isteğe bağlı.
   Üretici: scripts/modul-fabrika (aile ozellik) — elle düzenleme yerine tanımı değiştirip yeniden üret.
   Veri: data: [{ baslik, metin?, ikon?, img?, alt?, url?, linkMetin? }] — metinler dil sözlüğü; başlıksız satır atlanır. desing `img/imgAlt` ana görsel, `ctaLabel` + `ctaUrl` alt düğme. */
const P = "modulex-ozellik-onay-kenar";
const IMG_KOK = "/img/";
/* --- ortak ön ek (scripts/modul-fabrika/on-ek.js) — dil · güvenlik · sayı yardımcıları --- */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `${IMG_KOK}${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
/* ilk dolu alan: yeni ad önce, eski kuşak şablonun adı yedek (G6 yalnız path değiştirerek takas eder) */
const ilk = (o, ks) => {
  for (const k of ks) {
    const v = o == null ? undefined : o[k];
    if (v == null || v === "") continue;
    if (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length) continue;
    return v;
  }
  return "";
};
const metinAl = (o, ks) => pick(ilk(o, ks)).trim();
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];
const dil = String(json.lang || "");
const sayiBicim = (v, ondalik) => {
  try { return new Intl.NumberFormat(dil || undefined, { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }).format(v); } catch (e) { return String(v); }
};
const ikonH = (ad, sinif) => (ad ? `<span class="${sinif} material-symbols-outlined" aria-hidden="true">${ad}</span>` : "");
const no = (i) => String(i + 1).padStart(2, "0");
const ctaHtml = () => {
  const a1 = metinAl(des, ["cta_ad", "button"]); const u1 = href(ilk(des, ["cta_url", "buttonurl", "url"]));
  const a2 = metinAl(des, ["cta2_ad"]); const u2 = href(ilk(des, ["cta2_url"]));
  const d = (a, u, ek) => (a && u ? `<a class="${P}-dugme${ek}" href="${esc(u)}">${esc(a)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
  const ic = d(a1, u1, "") + d(a2, u2, ` ${P}-dugme--ikincil`);
  return ic ? `<div class="${P}-cta">${ic}</div>` : "";
};
const basHtml = (B, ek) => {
  if (!B.ust && !B.baslik && !B.metin && !ek) return "";
  return `<header class="${P}-bas">`
    + (B.ust ? `<p class="${P}-ust">${esc(B.ust)}</p>` : "")
    + (B.baslik ? `<h2 class="${P}-baslik" id="${P}-{{id}}-b">${esc(B.baslik)}</h2>` : "")
    + (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "")
    + (ek || "")
    + "</header>";
};
/* --- aile: ozellik --- */
const kaynak = veri.length ? veri : (Array.isArray(des.satirlar) ? des.satirlar : []);
const altUrl = href(ilk(des, ["ctaUrl"]));
const altAd = metinAl(des, ["ctaLabel"]);
const linkGenel = metinAl(des, ["linkMetin"]) || (altUrl ? "" : altAd);
const kayitlar = kaynak.map((o) => ({
  baslik: metinAl(o, ["baslik", "title", "name", "ad"]), metin: metinAl(o, ["metin", "text", "description", "aciklama", "ozet"]),
  ikon: ikonAd(ilk(o, ["ikon", "icon"])), img: medyaUrl(ilk(o, ["img", "image", "gorsel"])), alt: metinAl(o, ["alt", "imgAlt"]),
  url: href(ilk(o, ["url", "link"])), link: metinAl(o, ["linkMetin", "ctaLabel"]) || linkGenel,
})).filter((k) => k.baslik);
/* ana görsel: desing img (ozellik-zigzag-3), yoksa ilk görselli özellik */
const anaImg = medyaUrl(ilk(des, ["img", "gorsel"])) || (kayitlar.find((k) => k.img) || {}).img || "";
const anaAlt = medyaUrl(ilk(des, ["img", "gorsel"])) ? metinAl(des, ["imgAlt", "alt"]) : ((kayitlar.find((k) => k.img) || {}).alt || "");
const anaG = (s) => (anaImg ? `<img class="${P}-${s || "ana"}" src="${esc(anaImg)}" alt="${esc(anaAlt)}" width="900" height="1000" loading="lazy" decoding="async" />` : "");
const altCta = () => (altAd && altUrl ? `<div class="${P}-cta"><a class="${P}-dugme" href="${esc(altUrl)}">${esc(altAd)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a></div>` : "");
const bH = (k, s, t) => `<${t || "h3"} class="${P}-${s || "kbaslik"}">${esc(k.baslik)}</${t || "h3"}>`;
const mH = (k, s) => (k.metin ? `<p class="${P}-${s || "kmetin"}">${satirlar(k.metin)}</p>` : "");
const gH = (k, s) => (k.img ? `<img class="${P}-${s || "gorsel"}" src="${esc(k.img)}" alt="${esc(k.alt)}" width="900" height="640" loading="lazy" decoding="async" />` : "");
const lH = (k, s) => (k.url ? `<a class="${P}-${s || "git"}" href="${esc(k.url)}">${k.link ? esc(k.link) : "@read-more@"}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
/* --- modül: ozellik-onay-kenar --- */
const kart = (k) => `<li class="${P}-oge"><span class="${P}-onay" aria-hidden="true"><span class="material-symbols-outlined">${esc(k.ikon || "check")}</span></span><div class="${P}-yazi">${bH(k)}${mH(k)}${lH(k)}</div></li>`;
const sar = (ic) => `<ul class="${P}-liste">${ic}</ul>${altCta()}`;
const B = { ust: metinAl(des, ["ust","eyebrow","badge","kicker"]), baslik: metinAl(des, ["baslik","title"]), metin: metinAl(des, ["metin","description","aciklama"]) };
/* veri yoksa gövde hiç kurulmaz (sarmalayıcı boş listeye dokunmaz) */
const BOS = !kayitlar.length;
const govde = BOS ? "" : sar(kayitlar.map((k, i) => kart(k, i, kayitlar.length, kayitlar)).join(""), kayitlar, B);
const bas = basHtml(B, "");
const sinif = (bas || B.ust || B.baslik || B.metin ? "" : ` ${P}--bassiz`);
html = html
  .replaceAll("{{fbsinif}}", () => sinif)
  .replaceAll("{{fbetiket}}", () => (B.baslik ? `aria-labelledby="${P}-{{id}}-b"` : ""))
  .replaceAll("{{fbbas}}", () => bas)
  .replaceAll("{{fbgovde}}", () => govde);
if (BOS) html = "";
