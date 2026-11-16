/* stats-3 — bölünmüş anahtar rakamlar. data[] = { deger, birim, etiket:{tr,en}, not:{tr,en} }
   Yer tutucular: st3label st3head st3link st3items. Statik: ağ isteği yok. */
var st3D = json && json.desing && typeof json.desing === "object" ? json.desing : {};
var st3L = json && json.lang ? String(json.lang) : "tr";
/* dil seçimi: motorun wmPickLang'i (aktif dil → tr → en → ilk anahtar) */
function st3T(v) {
  return String(wmPickLang(v, st3L) || "").trim();
}
/* HTML kaçışı — HTML'e giren HER değer buradan geçer */
function st3E(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* çok satırlı metin: kaçış + satır sonu → <br> */
function st3Br(s) {
  return st3E(s).replace(/\r?\n/g, "<br>");
}
/* bağlantı: yalın slug → aktif dil önekli iç yol; javascript:/data: reddedilir */
function st3U(raw) {
  var s = String(raw == null ? "" : raw).trim();
  if (!s || /^(javascript|vbscript|data|file):/i.test(s)) {
    return "";
  }
  if (s.charAt(0) === "#" || /^(https?:)?\/\//i.test(s) || /^(mailto:|tel:)/i.test(s)) {
    return s;
  }
  s = s.replace(/^\/[a-z]{2}(\/|$)/i, "/");
  return wxLangInternalHref(s);
}
/* görsel: yalın ad → /img/<modül id>/<ad>; kök yol / tam URL olduğu gibi */
function st3Img(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s || /^(javascript|vbscript|file):/i.test(s)) {
    return "";
  }
  if (/^data:/i.test(s)) {
    return /^data:image\//i.test(s) ? s : "";
  }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) {
    return s;
  }
  return "/img/" + json.id + "/" + s;
}
/* Material Symbols ikon adı: yalnız [a-z0-9_] */
function st3Ic(v) {
  return String(v == null ? "" : v).toLowerCase().replace(/[^a-z0-9_]/g, "");
}
function st3Bool(v, d) {
  if (v === undefined || v === null || v === "") {
    return d;
  }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
/* yer tutucu değişimi (split/join: değerdeki $ desenleri yorumlanmaz) */
function st3R(k, v) {
  html = html.split("{{" + k + "}}").join(v);
}
/* bölüm başlığı: eyebrow + h2 + açıklama; boşsa hiç basılmaz */
function st3Head(cls, tid) {
  var eb = st3T(st3D.eyebrow);
  var ti = st3T(st3D.title);
  var de = st3T(st3D.description);
  if (!eb && !ti && !de) {
    return "";
  }
  return '<header class="' + cls + '__head">' +
    (eb ? '<p class="' + cls + '__eyebrow">' + st3E(eb) + "</p>" : "") +
    (ti ? '<h2 class="' + cls + '__h2" id="' + tid + '">' + st3E(ti) + "</h2>" : "") +
    (de ? '<p class="' + cls + '__desc">' + st3Br(de) + "</p>" : "") +
    "</header>";
}
/* section erişilebilir adı: başlık varsa aria-labelledby, yoksa aria-label */
function st3Label(tid, yedek) {
  if (st3T(st3D.title)) {
    return 'aria-labelledby="' + tid + '"';
  }
  return 'aria-label="' + st3E(yedek) + '"';
}

var st3Tid = "st3-" + json.id + "-t";
var st3Rows = Array.isArray(json.data) ? json.data : [];
var st3Items = "";
for (var st3i = 0; st3i < st3Rows.length; st3i++) {
  var st3It = st3Rows[st3i] || {};
  var st3Deger = st3T(st3It.deger);
  var st3Etiket = st3T(st3It.etiket);
  if (!st3Deger && !st3Etiket) {
    continue;
  }
  var st3Birim = st3T(st3It.birim);
  var st3Not = st3T(st3It.not);
  /* dt (etiket) DOM'da önce — ekran okuyucu "etiket: değer" okur; görselde rakam üstte (CSS order) */
  st3Items += '<div class="modulex-st3__cell">' +
    '<dt class="modulex-st3__label">' + st3E(st3Etiket) + "</dt>" +
    '<dd class="modulex-st3__num">' + st3E(st3Deger || "\u2014") + (st3Birim ? '<span class="modulex-st3__unit">' + st3E(st3Birim) + "</span>" : "") + "</dd>" +
    (st3Not ? '<dd class="modulex-st3__note">' + st3E(st3Not) + "</dd>" : "") +
    "</div>";
}
var st3LinkUrl = st3U(st3D.linkUrl);
var st3LinkText = st3T(st3D.linkText);
var st3Link = st3LinkUrl && st3LinkText
  ? '<a class="modulex-st3__link" href="' + st3E(st3LinkUrl) + '">' + st3E(st3LinkText) + ' <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>'
  : "";
st3R("st3label", st3Label(st3Tid, "İstatistikler"));
st3R("st3head", st3Head("modulex-st3", st3Tid));
st3R("st3link", st3Link);
st3R("st3items", st3Items);
