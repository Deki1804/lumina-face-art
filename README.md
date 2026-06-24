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

Galerija je podijeljena u tri kategorije (folder-based, bez admin panela):

| Folder | Kategorija |
|---|---|
| `public/images/gallery/rodjendani/` | Rođendani |
| `public/images/gallery/eventi/` | Eventi |
| `public/images/gallery/motivi/` | Motivi |

### Za dodavanje slika

1. Kopiraj slike u odgovarajući folder:
   - `public/images/gallery/rodjendani/`
   - `public/images/gallery/eventi/`
   - `public/images/gallery/motivi/`

2. Nazovi ih redoslijedom kojim želiš:
   - `001.jpg`
   - `002.jpg`
   - `003.jpg`

3. Pokreni:

```bash
npm run gallery
```

4. Provjeri:

```bash
npm run dev
```

5. Commit + push:

```bash
git add public/images/gallery/ lib/gallery.ts
git commit -m "Add gallery images"
git push
```

Podržani formati: `.jpg`, `.jpeg`, `.png`, `.webp`

Skripta `npm run gallery` generira `lib/gallery.ts` s kategorijama i sortira slike po imenu unutar svake kategorije. Prazne kategorije se preskaču na stranici.

Ako nema slika ni u jednoj kategoriji, galerija prikazuje elegantan empty state — stranica se ne ruši.

---

## Online privola za fotografije

Za početak se koristi **Google Forms** — nema vlastite baze, backenda ni spremanja osobnih podataka u aplikaciji. Stranica samo vodi korisnika na Google obrazac vlasnice.

Link se postavlja u **`lib/profile.ts`**:

```ts
consentEnabled: true,
consentFormUrl: "https://docs.google.com/forms/d/e/.../viewform",
```

`consentFormUrl` mora biti **javni link za ispunjavanje** (public/share link), ne privatni edit link.

Dok link nije postavljen (`TODO_GOOGLE_FORM_URL`), stranica `/privola` prikazuje poruku da je privola u pripremi.

### Kako napraviti Google Form

1. Otvori [forms.google.com](https://forms.google.com) na Google računu vlasnice.
2. Napravi novi obrazac.
3. Naziv obrasca: **Privola za objavu fotografija — LUMINA Face Art**

4. Predložena pitanja:

- Ime i prezime roditelja/skrbnika
- Ime i prezime djeteta
- Kontakt roditelja/skrbnika (mobitel ili e-mail)
- Datum događaja
- Naziv događaja / rođendana
- Dopuštam fotografiranje oslikavanja lica — Odgovori: Da / Ne
- Dopuštam objavu fotografija na Lumina web stranici — Odgovori: Da / Ne
- Dopuštam objavu fotografija na Instagram/Facebook profilu Lumina Face Art — Odgovori: Da / Ne
- Dopuštam objavu fotografija na kojima je lice djeteta prepoznatljivo — Odgovori: Da / Ne
- Dopuštam samo objavu detalja oslikavanja bez prepoznatljivog lica — Odgovori: Da / Ne
- Napomena roditelja/skrbnika
- Potvrđujem da sam roditelj/skrbnik navedenog djeteta — Checkbox: Da, potvrđujem

Za odrasle osobe može se koristiti isti obrazac ili kasnije napraviti poseban obrazac.

5. U Google Formsu otvori tab **Responses / Odgovori** i poveži ga s Google Sheets tablicom.
6. Kopiraj **public/share link** forme.
7. Zalijepi taj link u `lib/profile.ts` kao `consentFormUrl`.
8. Commit + push.
9. Vercel će automatski redeployati stranicu.

**Napomena:** Nemoj spremati odgovore u ovaj Next.js projekt. Odgovori i osobni podaci moraju ostati u Google Formsu/Sheetsu vlasnice.

### Automatsko kreiranje forme (Google Apps Script)

U repou postoji gotova skripta: **`scripts/create-lumina-consent-form.gs`**

**Ne treba** tražiti "Google Forms API" u Services (+) meniju — na mnogim računima ga nema.

Umjesto toga **jednom** uključi API u Google Cloudu:

1. Apps Script → ⚙️ **Project settings** → kopiraj **Project number**
2. Otvori: [Google Forms API — Enable](https://console.cloud.google.com/apis/library/forms.googleapis.com) (odaberi isti GCP projekt)
3. Klikni **ENABLE** / **OMOGUĆI**

Zatim:

1. Otvori [script.google.com](https://script.google.com) (Google račun vlasnice)
2. **New project** → zalijepi kod iz `scripts/create-lumina-consent-form.gs`
3. **Run** → `createLuminaConsentForm` → odobri dozvole
4. **View → Logs** → kopiraj **Published URL**
5. Zalijepi u `lib/profile.ts` → `consentFormUrl` → commit + push

Ako API i dalje ne radi, pokreni `luminaConsentFormManualGuide` — ispisuje korake za ručno kreiranje forme na forms.google.com (~10 min).

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
| `public/images/favicon-source.png` | Izvorna favicon slika (L monogram) |
| `public/images/card-front.png` | Referenca — prednja vizitka |
| `public/images/card-back.png` | Referenca — stražnja vizitka |
| `public/images/gallery/rodjendani/` | Rođendani — slike galerije |
| `public/images/gallery/eventi/` | Eventi — slike galerije |
| `public/images/gallery/motivi/` | Motivi — slike galerije |
| `public/images/qr-code.png` | QR kod za print (vizitka) |
| `public/images/qr-code.svg` | QR kod vector |

---

## Struktura projekta

```
app/
  page.tsx              — glavna landing stranica
  gallery/page.tsx      — galerija radova
  privola/page.tsx      — online privola za fotografije
  layout.tsx            — metadata i layout
  globals.css           — brand stilovi i ambient pozadina
components/
  Hero.tsx              — logo i uvod
  ContactButton.tsx     — kontakt gumbi
  ConsentSection.tsx    — privola za fotografije (početna)
  GalleryPreview.tsx    — preview na početnoj
  GalleryGrid.tsx       — grid + lightbox
  EmptyGalleryState.tsx — empty state galerije
  SectionCard.tsx       — kartice usluga
  Footer.tsx
  LogoEmblem.tsx        — kružni logo emblem
lib/
  profile.ts            — svi kontakt podaci + consentFormUrl
  consent.ts            — provjera je li Google Form link aktivan
  gallery.ts            — kategorije i slike (generira npm run gallery)
public/
  images/
  contact/lumina.vcf    — vCard za spremanje kontakta
scripts/
  generate-gallery.mjs  — generira lib/gallery.ts iz foldera slika
  generate-qr.mjs       — generira QR kod za vizitku
  create-lumina-consent-form.gs — Google Apps Script za kreiranje forme privole
```

---

## Placeholderi (za zamjenu nakon deploya)

| Što | Gdje | Status |
|---|---|---|
| Website URL | `lib/profile.ts` → `websiteUrl` | TODO nakon deploya |
| Website URL | `public/contact/lumina.vcf` → `URL:` | TODO nakon deploya |
| Galerija slike | `public/images/gallery/*/` | Prazno — empty state |
| QR kod | Fizička vizitka | `public/images/qr-code.png` |
