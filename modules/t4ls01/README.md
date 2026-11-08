# tema-yedekparca-3 · t4ls01 — Sayfa Listesi Kare

## Nedir

tema-yedekparca-3 sitesinin matrix modülü. `Sayfa Listesi Kare` şablonu (div kökü,
sınıf `modulex`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (0 KB) |
| `index.html` | Modül şablonu (render hedefi) (2 KB) |
| `index.jpeg` | Önizleme görseli (12 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `bgcolor` | `#fff` |
| `color` | `#000` |
| `page` | `page` |
| `size` | `4` |
| `category` | `` |
| `aspect-ratio` | `1 / 1` |

- `name`: `Sayfa Listesi Kare`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **bgcolor**, **color**, **page**, **size**, **category**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-3 sitesinde `web/matrix/modules/t4ls01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Sayfa Listesi Kare",
  "desing": {
    "bgcolor": "#fff",
    "color": "#000",
    "page": "page",
    "size": 4,
    "category": "",
    "aspect-ratio": "1 / 1"
  },
  "data": null
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
