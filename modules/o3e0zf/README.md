# tema-yedekparca-3 · o3e0zf — Slider Ken Burns

## Nedir

tema-yedekparca-3 sitesinin matrix modülü. `Slider Ken Burns` şablonu (section kökü,
sınıf `modulex-kb`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (4 KB) |
| `index.html` | Modül şablonu (render hedefi) (16 KB) |
| `index.jpeg` | Önizleme görseli (37 KB) |
| `index.json` | Veri + tema token'ları (6 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `tam` |
| `yukseklik` | `72` |
| `sure` | `6000` |
| `otomatik` | `True` |
| `max` | `1200px` |
| `overlay` | `color-mix(in srgb, var(--mx-site-primary, #2563eb) 25%, #0b1220)` |
| `overlayText` | `#ffffff` |
| `bg` | `var(--mx-site-bg, #ffffff)` |

- `name`: `Slider Ken Burns`
- `data`: 3 kayıt. Örnek: `{"img": "", "alt": {"tr": "Üretim hattı", "en": "Production line", "ar": "خط الإنتاج"}, "eyebrow": {"tr": "Üretim", "en": "Production", "ar…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **yukseklik**, **sure**, **otomatik**, **max**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-kb`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-3 sitesinde `web/matrix/modules/o3e0zf/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Slider Ken Burns",
    "en": "Ken Burns Slider",
    "ar": "سلايدر كين بيرنز"
  },
  "desing": {
    "stil": "tam",
    "yukseklik": 72,
    "sure": 6000,
    "otomatik": true,
    "max": "1200px",
    "overlay": "color-mix(in srgb, var(--mx-site-primary, #2563eb) 25%, #0b1220)",
    "overlayText": "#ffffff",
    "bg": "var(--mx-site-bg, #ffffff)",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "text": "var(--mx-site-text, #1b1b1b)",
    "muted": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "radius": "16px",

```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
