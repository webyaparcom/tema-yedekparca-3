# tema-yedekparca-3 · t4ct01 — contact-4

## Nedir

tema-yedekparca-3 sitesinin matrix modülü. `contact-4` şablonu (div kökü,
sınıf `modulex`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (5 KB) |
| `index.jpeg` | Önizleme görseli (18 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `color` | `#1e3046` |
| `bgcolor` | `#ffffff` |
| `height` | `250px` |
| `name` | `{'tr': 'Bize Ulaşın'}` |
| `margin` | `30px 0px 30px 0px` |

- `name`: `contact-4`
- `data`: 1 kayıt. Örnek: `{"data": [{"icon": "location_on", "name": {"tr": "ADRES"}, "text": "Şahinbey / GAZİANTEP", "externalUrl": ""}, {"icon": "call", "name": {"t…`
- Diğer anahtarlar: `category`, `description`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **color**, **bgcolor**, **height**, **name**, **margin**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-3 sitesinde `web/matrix/modules/t4ct01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "contact-4",
  "desing": {
    "color": "#1e3046",
    "bgcolor": "#ffffff",
    "height": "250px",
    "name": {
      "tr": "Bize Ulaşın"
    },
    "margin": "30px 0px 30px 0px"
  },
  "data": [
    {
      "data": [
        {
          "icon": "location_on",
          "name": {
            "tr": "ADRES"
          },
          "text": "Şahinbey / GAZİANTEP",
          "externalUrl": ""
        },
        {
          "icon": "call",
          "name": {
            "tr": "TELEFON"
          },
          "text": "+90 542 000 00 00",
          "url": "tel:05420000000"
        },
        {
          "icon": "mail",
          "name": {
            "tr": "MAİL"
          },
         
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
