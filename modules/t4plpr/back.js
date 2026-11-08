var backhtml = "";




for (var iterator of webmakerdata[json.desing.page].data) {
  try {
    if (
      iterator["status"] == "play" &&
      iterator["category"] == json.desing.category
    ) {
      backhtml += `<a href="${wxLangInternalHref(iterator["path"])}">
        <div class="modulexbodyitem">
          <div class="modulexbodyitemimg">
            <img src="/page/${iterator["id"]}/${iterator["img"]}" alt="${
              iterator["name"][json.lang]
            }">
          </div>
          <div class="modulexbodyitemtitle">${iterator["name"][json.lang]}</div>
        </div>
      </a>`;
    }
  } catch (error) {}
}
html = html.replace(new RegExp("{{html}}", "g"), backhtml);
