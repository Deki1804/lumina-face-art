# LUMINA Face Art — Digitalna vizitka

Mobilno-first landing page za **LUMINA Face Art** (Melita Zakinja Vižintin). Namijenjena QR kodu na fizičkoj vizitki i NFC tagu.

## Tehnologija

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Statički deploy na Vercel (bez baze i backend troška)

---

## Kako pokrenuti projekt

```bash
npm install
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

Za produkcijski build:

```bash
npm run build
npm start
```

---

## Kako promijeniti podatke

Svi kontakt i brand podaci su u **`lib/profile.ts`**.

Tu mijenjaš:

- ime, brand, slogan, opis
- telefon (`phone`, `phoneLink`)
- e-mail
- Instagram / Facebook linkove
- lokaciju
- `websiteUrl` (nakon deploya)

Nakon promjene kontakta, ručno ažuriraj i **`public/contact/lumina.vcf`**.

---

## Kako dodati slike u galeriju

1. Kopiraj slike u `public/images/gallery/`
2. Nazovi ih npr. `rodjendan-001.jpg`, `leptir-001.jpg`, `vila-001.jpg`
3. Pokreni:

```bash
npm run gallery
```

4. Commit i deploy

Podržani formati: `.jpg`, `.jpeg`, `.png`, `.webp`

Ako nema slika, galerija prikazuje elegantan empty state — stranica se ne ruši.

---

## Kako deployati na Vercel

1. Pushaj repo na GitHub
2. Ulogiraj se na [vercel.com](https://vercel.com) i klikni **Add New Project**
3. Poveži GitHub repo — Vercel automatski prepoznaje Next.js
4. Klikni **Deploy** (nema potrebe za bazom, env varijablama ni backendom)
5. Nakon deploya kopiraj finalni URL (npr. `https://lumina-face-art.vercel.app`)

---

## Nakon Vercel deploya — obavezno promijeni URL

### 1. `lib/profile.ts`

Pronađi liniju s TODO komentarom i zamijeni placeholder:

```ts
// TODO: replace after Vercel deploy — stavi pravi production URL
websiteUrl: "https://tvoj-pravi-url.vercel.app",
```

Ovo utječe na Open Graph metadata i SEO.

### 2. `public/contact/lumina.vcf`

Zamijeni placeholder URL u `URL:` polju i ukloni TODO iz `NOTE:`:

```
URL:https://tvoj-pravi-url.vercel.app
```

### 3. Redeploy

Nakon promjene napravi novi commit i push — Vercel će automatski redeployati.

---

## QR kod (vizitka / NFC)

**Production URL:** `https://luminafaceart.vercel.app`

Generirani QR kodovi (Lumina boje — forest green na cream):

```bash
npm run qr
```

Datoteke:

| Datoteka | Namjena |
|---|---|
| `public/images/qr-code.png` | **1200px — za print na vizitku** |
| `public/images/qr-code-sm.png` | 400px preview |
| `public/images/qr-code.svg` | Vector (Canva / Illustrator) |

### Kako staviti na vizitku

1. Otvori `qr-code.png` ili `qr-code.svg` u Canva/Photoshop
2. Stavi na **stražnju stranu** vizitke (umjesto starog okvira)
3. Preporuka: min. **15–20 mm** širine na printu, s bijelim marginom oko koda
4. Testiraj skeniranje prije masovnog printa

### NFC tag

Upiši isti URL u NFC tag writer app: `https://luminafaceart.vercel.app`

---

## vCard (Spremi kontakt)

Datoteka: `public/contact/lumina.vcf`

Sadrži:

- Melita Zakinja Vižintin
- LUMINA Face Art
- broj telefona
- e-mail
- Instagram i Facebook (Apple `item.X-ABLabel` format)
- website URL (placeholder do deploya)

Format je optimiziran za iPhone i Android (UTF-8, vCard 3.0).

---

## Assets

| Datoteka | Namjena |
|---|---|
| `public/images/logo.png` | Glavni brand logo (hero, favicon, OG) |
| `public/images/card-front.png` | Referenca — prednja vizitka |
| `public/images/card-back.png` | Referenca — stražnja vizitka |
| `public/images/gallery/` | Folder za slike galerije |
| `public/images/qr-code.png` | QR kod za print (vizitka) |
| `public/images/qr-code.svg` | QR kod vector |

---

## Struktura projekta

```
app/
  page.tsx              — glavna landing stranica
  gallery/page.tsx      — galerija radova
  layout.tsx            — metadata i layout
  globals.css           — brand stilovi i ambient pozadina
components/
  Hero.tsx              — logo i uvod
  ContactButton.tsx     — kontakt gumbi
  GalleryPreview.tsx    — preview na početnoj
  GalleryGrid.tsx       — grid + lightbox
  EmptyGalleryState.tsx — empty state galerije
  SectionCard.tsx       — kartice usluga
  Footer.tsx
  LogoEmblem.tsx        — kružni logo emblem
lib/
  profile.ts            — svi kontakt podaci
  gallery.ts            — popis slika (generira npm run gallery)
public/
  images/
  contact/lumina.vcf    — vCard za spremanje kontakta
scripts/
  generate-gallery.mjs  — generira lib/gallery.ts iz foldera slika
  generate-qr.mjs       — generira QR kod za vizitku
```

---

## Placeholderi (za zamjenu nakon deploya)

| Što | Gdje | Status |
|---|---|---|
| Website URL | `lib/profile.ts` → `websiteUrl` | TODO nakon deploya |
| Website URL | `public/contact/lumina.vcf` → `URL:` | TODO nakon deploya |
| Galerija slike | `public/images/gallery/` | Prazno — empty state |
| QR kod | Fizička vizitka | `public/images/qr-code.png` |
