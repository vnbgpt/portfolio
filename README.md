# Portfolio — Vitalii Yurina

Site statique (HTML / CSS / JS), sans installation : double-clique sur `index.html`.

## Structure

```
portfolio/
├── index.html        Accueil
├── apropos.html      À propos (profil, compétences, parcours)
├── ecole.html        École & Entreprise
├── missions.html     Épreuve E5 (tableau de synthèse + tous les projets)
├── projets.html      Épreuve E6 (cahier des charges + 2 réalisations StadiumCompany)
├── veille.html       Veille technologique (E4)
├── contact.html      Contact
├── assets/
│   ├── css/style.css Tout le style (sommaire en haut du fichier)
│   ├── js/script.js  Menu, footer, animations, formulaire
│   └── img/          Illustrations des cartes projets (SVG, remplaçables par des captures PNG/JPG)
└── docs/             Tous les PDF (CV, tableau de synthèse, dossiers E5)
```

## Où modifier quoi

| Je veux…                                   | Je modifie…                              |
|--------------------------------------------|------------------------------------------|
| Ajouter / renommer une page du menu        | `MENU` en haut de `assets/js/script.js`  |
| Changer l'email, le nom ou le footer       | `SITE` en haut de `assets/js/script.js`  |
| Changer les couleurs / polices             | `:root { ... }` dans `assets/css/style.css` |
| Ajouter un PDF à une carte de `missions.html` | Mettre le PDF dans `docs/`, puis remplacer `<span class="m-btn disabled">…</span>` par `<a href="docs/MON_FICHIER.pdf" target="_blank" rel="noopener" class="m-btn">📄 Voir la doc</a>` |
| Changer l'image d'un projet                | Mettre ta capture dans `assets/img/` et changer le `src` de `<img>` dans la carte de `missions.html` |
| Changer le PDF du tableau de synthèse      | Remplacer le fichier dans `docs/` (ou changer son nom dans `missions.html`, 3 endroits) |
| Passer un projet de « Prévu » à « Validé » | Dans `missions.html`, remplacer `<span class="m-badge soon">⏳ PRÉVU</span>` par `<span class="m-badge ok">✓ VALIDÉ</span>` |

## PDF attendus dans `docs/`

- Les documentations des « Projets d'école » (E5) sont déjà dans `docs/`. Pour en ajouter une : dans `missions.html`, copie une ligne `<div class="proj-row">…</div>` et change le titre et le `href`. Pour activer une ligne « bientôt disponible », remplace `href="#" class="doc-btn soon"` par `href="docs/MON_FICHIER.pdf" target="_blank" rel="noopener" class="doc-btn"`.

- `Cahier_des_Charges_StadiumCompany.pdf` (déjà présent)
- `E6_Realisation_1.pdf`, `E6_TP_1.pdf`, `E6_Realisation_2.pdf`, `E6_TP_2.pdf` — tes fiches E6 : les liens de `projets.html` pointent déjà dessus, il suffit de déposer les fichiers avec ces noms exacts

- `CV_Vitalii_Yurina.pdf`
- `Tableau_de_Synthese_Vitalii_Yurina.pdf`

## Notes

- Le formulaire de contact ouvre la messagerie de l'utilisateur avec le message pré-rempli (le site n'a pas de serveur).
- Les polices viennent de Google Fonts (connexion internet nécessaire pour les afficher).
