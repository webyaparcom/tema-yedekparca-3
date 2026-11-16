/* kayan-kucuk-resim — Kayan Küçük Resim — sahne ve küçük resim şeridi (16 Kas 2026 · mcp:webmaker/20261116-031127-jyn8 · D17).
   Geniş sahnede etkin slayt (görsel + altında bilgi şeridi: başlık, açıklama, düğme); sahnenin altında her slaytın küçük resmi seçilebilir şerit olarak durur, etkin olan çerçevelenir.
   Üretici: scripts/modul-fabrika (aile slider) — elle düzenleme yerine tanımı değiştirip yeniden üret.
   Veri: data: [{ img, alt?, ust|eyebrow?, baslik|title, metin|text?, cta?, url? }] — metinler dil sözlüğü; başlıksız ve görselsiz slayt atlanır. desing: yukseklik (vh, 40–100) · sure (ms, 3000–20000) · otomatik · etiketler (aria_label, prev_label, next_label, dot_label {n}, pause_label, play_label, slide_label {i}/{n}; yoksa dil sözlüğü). */
const P = "modulex-kayan-kucuk-resim";
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
/* --- aile: slider --- */
const kayitlar = veri.map((o) => ({
  ust: metinAl(o, ["ust", "eyebrow", "badge", "kicker"]), baslik: metinAl(o, ["baslik", "title", "name"]),
  metin: metinAl(o, ["metin", "text", "description"]), cta: metinAl(o, ["cta", "ctaText", "button", "btnText"]),
  url: href(ilk(o, ["url", "link", "ctaUrl", "btnUrl"])), img: medyaUrl(ilk(o, ["img", "image", "src"])), alt: metinAl(o, ["alt"]),
})).filter((k) => k.baslik || k.img);
let yk = parseInt(des.yukseklik, 10);
if (!Number.isFinite(yk)) yk = 72;
yk = Math.min(100, Math.max(40, yk));
let sure = parseInt(des.sure, 10);
if (!Number.isFinite(sure)) sure = 6000;
sure = Math.min(20000, Math.max(3000, sure));
const oto = dogru(des.otomatik, true);
const E = {
  bolge: metinAl(des, ["aria_label"]) || "@slider-label@", geri: metinAl(des, ["prev_label"]) || "@previous@", ileri: metinAl(des, ["next_label"]) || "@next@",
  dur: metinAl(des, ["pause_label"]) || "@slider-pause@", oyna: metinAl(des, ["play_label"]) || "@slider-play@",
};
const noktaTpl = metinAl(des, ["dot_label"]);
const slaytTpl = metinAl(des, ["slide_label"]) || "{i} / {n}";
const noktaAd = (i) => (noktaTpl ? noktaTpl.replace(/\{n\}/g, String(i + 1)) : `@slider-go@ ${i + 1}`);
const slaytAd = (i, n) => slaytTpl.replace(/\{i\}/g, String(i + 1)).replace(/\{n\}/g, String(n));
/* --- parça üreticileri --- */
const slaytH = (k, i, n, ic, ek) => `<div class="${P}-slayt${i === 0 ? ` ${P}-slayt--aktif` : ""}${ek ? ` ${ek}` : ""}" role="group" aria-roledescription="slide" aria-label="${esc(slaytAd(i, n))}">${ic}</div>`;
const gorselH = (k, i, s) => (k.img
  ? `<img class="${P}-${s || "gorsel"}" src="${esc(k.img)}" alt="${esc(k.alt || k.baslik)}" width="1920" height="1080" loading="${i ? "lazy" : "eager"}" decoding="async"${i ? "" : ' fetchpriority="high"'} />`
  : `<div class="${P}-${s || "gorsel"} ${P}-yer" aria-hidden="true"></div>`);
const ustH = (k) => (k.ust ? `<p class="${P}-sust">${esc(k.ust)}</p>` : "");
const baslikH = (k) => (k.baslik ? `<h2 class="${P}-sbaslik">${esc(k.baslik)}</h2>` : "");
const metinH = (k) => (k.metin ? `<p class="${P}-smetin">${satirlar(k.metin)}</p>` : "");
const ctaH = (k) => (k.cta && k.url ? `<a class="${P}-scta" href="${esc(k.url)}">${esc(k.cta)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
const icerikH = (k) => ustH(k) + baslikH(k) + metinH(k) + ctaH(k);
const okH = (yon) => `<button type="button" class="${P}-ok ${P}-ok--${yon}" data-kayan="${yon}" aria-label="${esc(yon === "geri" ? E.geri : E.ileri)}"><span class="material-symbols-outlined mx-flip" aria-hidden="true">${yon === "geri" ? "arrow_back" : "arrow_forward"}</span></button>`;
const oynatH = () => `<button type="button" class="${P}-oynat" aria-label="${esc(oto ? E.dur : E.oyna)}"><span class="material-symbols-outlined" aria-hidden="true">${oto ? "pause" : "play_arrow"}</span></button>`;
/* nokta: ic verilirse düğmenin görünen içeriği (başlık, küçük resim); erişilebilir ad her zaman noktaAd */
const noktaH = (i, ic, ek) => `<button type="button" class="${P}-nokta${i === 0 ? ` ${P}-nokta--aktif` : ""}${ek ? ` ${ek}` : ""}" aria-label="${esc(noktaAd(i))}"${i === 0 ? ' aria-current="true"' : ""}>${ic || ""}</button>`;
/* kök: carousel bölgesi; tek slaytta denetimler basılmaz */
const kokH = (ic, A, ek) => `<div class="${P}-karusel${A.length < 2 ? ` ${P}-karusel--tek` : ""}${ek ? ` ${ek}` : ""}" role="region" aria-roledescription="carousel" aria-label="${esc(E.bolge)}" tabindex="0" data-sure="${sure}" data-oto="${oto ? 1 : 0}" data-dur="${esc(E.dur)}" data-oyna="${esc(E.oyna)}" style="--kayan-yk: ${yk}vh; --kayan-sure: ${sure}ms;">${ic}<p class="${P}-durum" aria-live="polite" aria-atomic="true"></p></div>`;
/* --- modül: kayan-kucuk-resim --- */
const kart = function () { return ""; };
const sar = (ic, A) => kokH(`<div class="${P}-kap"><div class="${P}-sahne">${A.map((k, i) => slaytH(k, i, A.length, `<div class="${P}-cerceve">${gorselH(k, i)}</div><div class="${P}-bilgi"><div class="${P}-byazi">${icerikH(k, i)}</div></div>`)).join("")}${okH("geri")}${okH("ileri")}</div><div class="${P}-kucukler">${A.map((k, i) => noktaH(i, k.img ? `<img src="${esc(k.img)}" alt="" width="240" height="160" loading="lazy" decoding="async" />` : `<span class="${P}-kno">${no(i)}</span>`)).join("")}${oynatH()}</div></div>`, A);
const B = { ust: metinAl(des, ["ust"]), baslik: metinAl(des, ["baslik"]), metin: metinAl(des, ["metin"]) };
/* veri yoksa gövde hiç kurulmaz (sarmalayıcı boş listeye dokunmaz) */
const BOS = !kayitlar.length;
const govde = BOS ? "" : sar(kayitlar.map((k, i) => kart(k, i, kayitlar.length, kayitlar)).join(""), kayitlar, B);
const bas = "";
const sinif = (bas || B.ust || B.baslik || B.metin ? "" : ` ${P}--bassiz`);
html = html
  .replaceAll("{{fbsinif}}", () => sinif)
  .replaceAll("{{fbetiket}}", () => (B.baslik && bas ? `aria-labelledby="${P}-{{id}}-b"` : ""))
  .replaceAll("{{fbbas}}", () => bas)
  .replaceAll("{{fbgovde}}", () => govde);
if (BOS) html = "";
