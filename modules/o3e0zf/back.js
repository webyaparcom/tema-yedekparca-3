/* slider-kenburns — sıfır bağımlılıklı Ken Burns slider (31 Eki 2026, G8-A).
   Yer tutucular: kbstil kbsinif kbyk kbsure kbslaytlar kbnoktalar — koşulsuz. Etiketler desing {tr,en,ar} (moduleRender çözer).
   Slaytlar: json.data[] = [{img, alt{}, eyebrow{}, title{}, text{}, cta{}, url}]; ilk slayt sunucuda aktif (JS yoksa görünür).
   wmPickLang güvenli sarmal; yalnız var + klasik for. */
function kbDil(v) {
  if (v == null) { return ""; }
  if (typeof v !== "object") { return String(v); }
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function kbEsc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function kbUrl(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file):/i.test(s)) { return ""; }
  if (/^data:/i.test(s)) { return /^data:image\//i.test(s) ? s : ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function kbHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) { return s; }
  return wxLangInternalHref(s);
}
function kbDogru(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}

var kbDes = json.desing || {};
var kbStil = String(kbDes.stil || "tam").trim();
if (kbStil !== "tam" && kbStil !== "kart" && kbStil !== "bolunmus") { kbStil = "tam"; }
var kbYk = parseInt(kbDes.yukseklik, 10);
if (!isFinite(kbYk)) { kbYk = 72; }
kbYk = Math.min(100, Math.max(40, kbYk));
var kbSure = parseInt(kbDes.sure, 10);
if (!isFinite(kbSure)) { kbSure = 6000; }
kbSure = Math.min(20000, Math.max(3000, kbSure));

var kbListe = Array.isArray(json.data) ? json.data : [];
var kbSlaytTpl = kbDil(kbDes.slide_label) || "{i} / {n}";
var kbNoktaTpl = kbDil(kbDes.dot_label) || "{n}";
var kbSlaytlar = "", kbNoktalar = "", kbSay = 0;
for (var kbi = 0; kbi < kbListe.length; kbi++) {
  var s = kbListe[kbi] || {};
  var sBaslik = kbDil(s.title).trim();
  var sImg = kbUrl(s.img);
  if (!sBaslik && !sImg) { continue; }
  kbSay++;
  var sAlt = kbDil(s.alt) || sBaslik;
  var sEyebrow = kbDil(s.eyebrow).trim();
  var sMetin = kbDil(s.text).trim();
  var sCta = kbDil(s.cta).trim();
  var sUrl = kbHref(s.url);
  var sEtiket = kbSlaytTpl.replace(/\{i\}/g, String(kbSay)).replace(/\{n\}/g, "@@KBN@@");
  var ic = "";
  if (sEyebrow) { ic += '<p class="modulex-kb-eyebrow">' + kbEsc(sEyebrow) + "</p>"; }
  if (sBaslik) { ic += '<h2 class="modulex-kb-baslik">' + kbEsc(sBaslik) + "</h2>"; }
  if (sMetin) { ic += '<p class="modulex-kb-metin">' + kbEsc(sMetin) + "</p>"; }
  if (sCta && sUrl) { ic += '<a class="modulex-kb-cta" href="' + kbEsc(sUrl) + '">' + kbEsc(sCta) + '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>'; }
  kbSlaytlar += '<div class="modulex-kb-slayt' + (kbSay === 1 ? " modulex-kb-aktif" : "") + '" role="group" aria-roledescription="slide" aria-label="' + kbEsc(sEtiket) + '" aria-hidden="' + (kbSay === 1 ? "false" : "true") + '">' +
    '<div class="modulex-kb-medya">' +
    (sImg
      ? '<img src="' + kbEsc(sImg) + '" alt="' + kbEsc(sAlt) + '" width="1920" height="1080" loading="' + (kbSay === 1 ? "eager" : "lazy") + '" decoding="async"' + (kbSay === 1 ? ' fetchpriority="high"' : "") + " />"
      : '<div class="modulex-kb-ph" role="img" aria-label="' + kbEsc(sAlt) + '"></div>') +
    '</div><div class="modulex-kb-scrim" aria-hidden="true"></div>' +
    '<div class="modulex-kb-icerik"><div class="modulex-kb-ic">' + ic + "</div></div></div>";
  kbNoktalar += '<button class="modulex-kb-nokta" type="button" aria-label="' + kbEsc(kbNoktaTpl.replace(/\{n\}/g, String(kbSay))) + '"' + (kbSay === 1 ? ' aria-current="true"' : "") + "></button>";
}
kbSlaytlar = kbSlaytlar.replace(/@@KBN@@/g, String(kbSay));
var kbSinif = (kbSay < 2 ? " modulex-kb-tek" : "");
if (!kbDogru(kbDes.otomatik, true)) { html = html.replace('data-kb-sure="', 'data-kb-otomatik="0" data-kb-sure="'); }

html = html
  .replace(/\{\{kbstil\}\}/g, function () { return kbStil; })
  .replace(/\{\{kbsinif\}\}/g, function () { return kbSinif; })
  .replace(/\{\{kbyk\}\}/g, function () { return String(kbYk); })
  .replace(/\{\{kbsure\}\}/g, function () { return String(kbSure); })
  .replace(/\{\{kbslaytlar\}\}/g, function () { return kbSlaytlar; })
  .replace(/\{\{kbnoktalar\}\}/g, function () { return kbNoktalar; });
