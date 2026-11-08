try {
    // HTML attribute için güvenli escape fonksiyonu
    var escapeHtmlAttr = function(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    var backhtml = ``;

    for (var list of json.data) {
        var locationHtml = ``;
        var locationTitle = '';
        
        for (var iter of list.data) {
            var url = iter.url || iter.externalUrl || '';
            var hasUrl = url && url !== '#' && url.trim() !== '';
            var target = iter.url ? '_blank' : '_self';
            var hrefAttr = hasUrl ? `href="${escapeHtmlAttr(url)}" target="${target}"` : '';
            
            // İlk eleman lokasyon başlığı olarak kullan (name eksikse patlamasın)
            if (iter.icon === 'location_on') {
                locationTitle = (iter.name && typeof iter.name === 'object')
                    ? (iter.name[json.lang] || iter.name.tr || '')
                    : (iter.name || '');
            }
            
            // Kopyalanacak metni belirle (adres, telefon veya email için)
            var isCopyable = iter.icon === 'location_on' || iter.icon === 'call' || iter.icon === 'mail';
            var copyText = iter.text || '';
            
            // Telefon numarası için tel: kısmını temizle
            if (iter.icon === 'call' && iter.url && iter.url.startsWith('tel:')) {
                copyText = iter.url.replace('tel:', '').trim();
            }
            
            // Kopyalama butonu (adres, telefon ve email için)
            var copyButton = isCopyable && copyText ? `<button class="copy-btn" data-copy="${escapeHtmlAttr(copyText)}" onclick="copyToClipboard(this)" title="Kopyala">
                                               <span class="material-symbols-outlined">content_copy</span>
                                             </button>` : '';
            
            // Text kısmı - sadece URL varsa link, yoksa normal div
            var textElement = hasUrl ? `<a ${hrefAttr} class="text-link">${iter.text}</a>` : `<div>${iter.text}</div>`;
            
            locationHtml += `<div class="modulexcontainerlist">
                              <span class="material-symbols-outlined">
                               ${iter.icon}
                              </span>
                              ${textElement}
                              ${copyButton}
                            </div>`;
        }
        
        // Her lokasyon için ayrı grup
        backhtml += `<div class="location-group">
                      <h3 class="location-title">${locationTitle}</h3>
                     
                     <div class="location-container">
                      <div class="location-image">
                      ${list.map != undefined && list.map != "" ? `<iframe src="${list.map}"   style="border:0;" allowfullscreen="" loading="lazy"  width="100%" height="${json.desing.height} " style="border:0;" referrerpolicy="no-referrer-when-downgrade"></iframe>` : ""}
                        </div>
                      <div class="location-content">
                        ${locationHtml}
                      </div>
                    </div>
                    </div>`;
    }


    html = html.replace(new RegExp("{{html}}", "g"), backhtml);
} catch (error) {
    console.error('Contact-4 modül hatası:', error);
}
html;