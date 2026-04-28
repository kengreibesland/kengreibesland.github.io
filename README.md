# kengreibesland.no

Personlig nettside og online visittkort for Ken Greibesland.
Bygd for hånd i ren HTML, CSS og JavaScript. Ingen frameworks, ingen byggesteg.

Live: [kengreibesland.no](https://kengreibesland.no)
Mirror: [kengreibesland.github.io](https://kengreibesland.github.io)

## Struktur

```
.
├── index.html                       # Forside (hero, hva jeg gjør, utvalgt arbeid, notater)
├── arbeid.html                      # Full liste over prosjekter med filter
├── om.html                          # Bakgrunn, akademia, andre interesser
├── notater.html                     # Liste over essays / notater
├── notater/
│   └── nordic-case-2026.html        # Essay: Nordic Case Challenge 2026
├── kontakt.html                     # Kontaktinfo
├── assets/                          # Logoer, favicon, bilder
│   └── nordic-case/                 # Bilder fra NCC 2026
├── css/
│   └── styles.css                   # All CSS (variabler, layout, komponenter)
├── js/
│   └── main.js                      # Sticky nav, reveal-on-scroll, filter
├── CNAME                            # Custom domain (GitHub Pages)
└── README.md
```

## Kjør lokalt

Trenger ikke noen build-kjede. Hvilken som helst statisk filserver duger.

```bash
# Python (innebygd)
python3 -m http.server 8000

# eller Node
npx serve
```

Åpne deretter [localhost:8000](http://localhost:8000).

## Designvalg

Editorial, tidløs og selvsikker uten å skrike. Inspirasjon fra
andersrodem.no, Stripe Press og The Browser Company.

- Farger og typografi følger Greibesland Consulting brand-guide
  (navy `#0A2540`, bone `#FAFAF8`, ink `#1A1A1A`, slate `#5B6B7E`).
- EB Garamond til serif-headlines, Inter til body, JetBrains Mono kun
  til metadata (dato, kategori, tags).
- Asymmetriske grids fremfor uniforme kort.
- Subtile animasjoner: scaleX-understreking på linker, fade-in via
  IntersectionObserver. Ingen parallax, partikler eller
  cursor-effekter.

CSS-en er kommentert der valg ikke er åpenbare. Mest mens jeg lærer.

## Custom domain

`CNAME` peker til `kengreibesland.no`. For at det skal virke må DNS
hos domeneleverandøren peke mot GitHub Pages:

```
A     185.199.108.153
A     185.199.109.153
A     185.199.110.153
A     185.199.111.153
AAAA  2606:50c0:8000::153
AAAA  2606:50c0:8001::153
AAAA  2606:50c0:8002::153
AAAA  2606:50c0:8003::153
CNAME (www) kengreibesland.github.io.
```

I GitHub-repoets Settings → Pages, sett custom domain til
`kengreibesland.no` og huk av "Enforce HTTPS" når sertifikatet er
provisjonert (kan ta noen minutter).

## Lisens

Innholdet (tekst, bilder) er ikke åpen lisens. Koden kan brukes som
referanse om man ønsker, men er skrevet for dette spesifikke prosjektet.
