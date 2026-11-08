/* page-desing-4 — metin + gorsel + kategori sayfa listesi.
   Kritik: dil fallback'i (lang → tr → ilk anahtar) olmadan page.text[lang]
   erisimi tum akisi atlatiyordu ve {{pagelist}}/{{imgdata}} ciktiya siziyordu. */

function pd4Lang(val) {
  if (val == null) {
    return "";
  }
  if (typeof val === "object") {
    if (val[json.lang] != null) {
      return val[json.lang];
    }
    if (val.tr != null) {
      return val.tr;
    }
    var pd4Keys = Object.keys(val);
    return pd4Keys.length ? (val[pd4Keys[0]] || "") : "";
  }
  return String(val);
}

/* Metin: satirlar <p> olarak */
var pd4Text = pd4Lang(page["text"]);
var finalHtml = "";
if (pd4Text) {
  var lines = String(pd4Text).split("\n");
  var htmlContent = [];
  lines.forEach(function (line) {
    htmlContent.push("<p>" + line + "</p>");
  });
  var ulIndex = htmlContent.lastIndexOf("</li>");
  if (ulIndex !== -1) {
    htmlContent.splice(ulIndex + 1, 0, "</ul>");
  }
  finalHtml = htmlContent.join("\n");
}
html = html.replace(new RegExp("{{text}}", "g"), finalHtml);

/* Gorsel */
if (page["img"] == undefined || page["img"] === "") {
  html = html.replace(new RegExp("{{img}}", "g"), "");
  html = html.replace(new RegExp("{{imgdata}}", "g"), "");
} else {
  html = html.replace(
    new RegExp("{{img}}", "g"),
    "/page/" + page["id"] + "/" + page["img"],
  );
  var imgAlt = pd4Lang(page["name"]);
  var imgdata = ' <div class="modulex-img">' +
    '<img src="/page/' + page["id"] + '/' + page["img"] + '?v={{random}}" width="100%" alt="' + imgAlt + '" loading="lazy" />' +
    "</div>";
  html = html.replace(new RegExp("{{imgdata}}", "g"), imgdata);
}

/* Kategori sayfa listesi */
var pagelist = "";
if (json.desing && json.desing.category && webmakerdata[json.desing.category] && Array.isArray(webmakerdata[json.desing.category].data)) {
  for (var iterator of webmakerdata[json.desing.category].data) {
    var menuactive = "";
    if (iterator.path == page.path) {
      menuactive = 'class="active"';
    }
    // İç sayfa: wxLangInternalHref — sonda /; ? veya dış URL ise kural uygulanmaz
    pagelist += "<a " + menuactive + ' href="' + wxLangInternalHref(iterator.pathnext || iterator.path) + '" >' + pd4Lang(iterator.name) + "</a>";
  }
}
html = html.replace(new RegExp("{{pagelist}}", "g"), pagelist);
