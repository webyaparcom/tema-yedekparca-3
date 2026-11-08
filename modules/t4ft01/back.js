// Find the page with `modulestatus.page` set to true
var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);
var backhtml = "";
backhtml = `<li class="menu__item"><a class="menu__link" href="${wxLangInternalHref('')}">@home@</a></li>`;
if (pagesettingjson) {
  // Iterate over the relevant data to create HTML content
  for (var page of webmakerdata[pagesettingjson.path].data) {
    if (page.status == "play") {
      backhtml += `<li class="menu__item"><a class="menu__link" href="/${
        json.lang
      }/${page.path}">${((page.name && (page.name[json.lang] != null ? page.name[json.lang] : page.name.tr)) || "")}</a></li>`;
    }
  }
  // Replace the placeholder {{html}} with the generated backhtml content
  html = html.replace(new RegExp("{{html}}", "g"), backhtml);
}
var color = json.desing.color;
color = color.replace(new RegExp("#", "g"), "");
html = html.replace(new RegExp("#color#", "g"), color);

/* Sosyal liste: yalnız dolu hesaplar, ikon satır içi svg; hesap yoksa kabuk hiç basılmaz (services/webmaker/sosyalBar.js). CF dinamik render'da wmSocialBar yok → boş. */
var f2Sosyal = typeof wmSocialBar === "function" ? wmSocialBar({ liste: "social-icon", oge: "social-icon__item", baglanti: "social-icon__link" }) : "";
html = html.replace(new RegExp("{{socialbar}}", "g"), function () { return f2Sosyal; });
