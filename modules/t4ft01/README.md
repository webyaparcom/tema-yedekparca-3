# tema-yedekparca-3 · t4ft01 — Footer 2

## Nedir

tema-yedekparca-3 sitesinin matrix modülü. `Footer 2` şablonu (footer kökü,
sınıf `footer`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (0 KB) |
| `index.html` | Modül şablonu (render hedefi) (3 KB) |
| `index.jpeg` | Önizleme görseli (14 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `showlang` | `True` |
| `color` | `#3586ff` |
| `logo` | `logo.png` |
| `copyright` | `{'tr': '© 2024 Tüm hakları saklıdır', 'en': '© 2024 All rights reserved', 'ar': '© 2024 جميع الحقوق محفوظة', 'de': '© 2024 Alle Rechte vorbehalten', 'ko': '© 2024 모든 권리 보유'}` |
| `wave_animation` | `True` |
| `social_icons` | `['facebook', 'twitter', 'instagram']` |
| `menu_items` | `[]` |
| `alternative_design` | `True` |

- `name`: `Footer 2`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `category`, `description`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **showlang**, **color**, **logo**, **copyright**, **wave_animation**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`footer`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-3 sitesinde `web/matrix/modules/t4ft01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Footer 2",
  "desing": {
    "showlang": true,
    "color": "#3586ff",
    "logo": "logo.png",
    "copyright": {
      "tr": "© 2024 Tüm hakları saklıdır",
      "en": "© 2024 All rights reserved",
      "ar": "© 2024 جميع الحقوق محفوظة",
      "de": "© 2024 Alle Rechte vorbehalten",
      "ko": "© 2024 모든 권리 보유"
    },
    "wave_animation": true,
    "social_icons": [
      "facebook",
      "twitter",
      "instagram"
    ],
    "menu_items": [],
    "alternative_design": true
  },
  "data": []
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
