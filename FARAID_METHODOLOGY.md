# Faraid Calculation — Methodology & Sources

**App:** My Legacy — Islamic Estate Planner  
**Version:** BETA (build ml-v7)  
**Last reviewed:** March 2026  
**Author:** Amisatoshi

---

## Purpose of this Document

This document explains, in plain terms, how the Faraid (Islamic inheritance) calculator in My Legacy works — including its sources, its assumptions, and its known limitations. It is written to be honest rather than promotional. Anyone relying on this app for real inheritance planning should read this document in full.

> *"Give the farā'iḍ to those entitled to them, and whatever remains goes to the nearest male relative (aṣabah)."*
> — Ṣaḥīḥ al-Bukhārī, no. 6732; Ṣaḥīḥ Muslim, no. 1615

---

## 1. Primary Sources

Faraid is derived directly from the Quran, Sunnah, and the scholarly consensus (ijma') that developed around them. The calculation logic in this app is grounded in the following:

### 1.1 Quranic Verses

The three primary inheritance verses are:

**Surah al-Nisa (4:11)** — shares of children, parents  
**Surah al-Nisa (4:12)** — shares of spouses, and inheritance of a kalala (one who dies with no parents or children)  
**Surah al-Nisa (4:176)** — further rulings on the kalala case, shares of siblings

These verses establish the fixed fractional shares (farā'iḍ) directly. They are not interpreted differently across the four Sunni madhabs — the difference between schools arises in the *application* to edge cases not explicitly named in the text.

### 1.2 Hadith

The primary hadith governing the residual (aṣabah) distribution is:

> *"Give the farā'iḍ to those entitled to them; whatever remains belongs to the closest male relative."*  
> — Ṣaḥīḥ al-Bukhārī, Kitāb al-Farā'iḍ, no. 6732

This establishes the two-tier system: Quranic fixed shares are distributed first; whatever remains goes to the nearest agnatic (paternal line) relative as aṣabah.

### 1.3 Classical Fiqh Works Consulted

The following classical works were used as reference points when designing the calculation logic:

| Work | Author | Madhab | Notes |
|------|--------|--------|-------|
| *Al-Sirājiyyah fī al-Mīrāth* (السراجية) | Sirāj al-Dīn al-Sajāwandī (d. 1203) | Cross-madhab | The most widely taught classical Faraid primer; basis for much of the heir hierarchy and share assignment |
| *Al-Hidāya* | al-Marghīnānī (d. 1197) | Hanafi | Primary Hanafi reference for grandfather/sibling disputes and ʿawl |
| *Minhāj al-Ṭālibīn* | al-Nawawī (d. 1277) | Shafi'i | Shafi'i positions on radd and umariyyatan |
| *Al-Mughnī* | Ibn Qudāma (d. 1223) | Hanbali | Hanbali positions on grandfather with brothers |
| *Bidāyat al-Mujtahid* | Ibn Rushd (d. 1198) | Comparative | Comparative fiqh on points of disagreement between schools |
| *Al-Māwarith fī al-Sharīʿah al-Islāmiyyah* | Muḥammad ʿAlī al-Ṣābūnī | Contemporary | Modern comprehensive treatment across all four madhabs |

---

## 2. How the Calculation Works

### 2.1 Step 1 — Deductions from the Gross Estate

Before any Faraid distribution, the following are deducted from the gross estate in this order:

1. **Funeral and burial expenses** (tajhīz wa-takfīn) — obligatory, deducted first
2. **Outstanding debts** (duyūn) — all debts must be repaid before heirs receive anything
3. **Wasiyyah** (bequest) — up to one-third of the remaining estate, only to non-heirs

The amount remaining after these deductions is the **net distributable estate**.

> *Quranic basis: "...after any bequest he may have made or any debt..."* — Surah al-Nisa, 4:11–12 (repeated four times in the verses, emphasising priority)

### 2.2 Step 2 — Fixed Shares (Farā'iḍ)

Fixed shares are assigned to Quranic heirs (aṣḥāb al-furūḍ) first. The app calculates the following:

| Heir | Share with children | Share without children | Quranic source |
|------|--------------------|-----------------------|----------------|
| **Wife** | 1/8 | 1/4 | 4:12 |
| **Husband** | 1/4 | 1/2 | 4:12 |
| **Mother** | 1/6 | 1/3 (if no 2+ siblings) | 4:11 |
| **Father** | 1/6 (fixed) | Full residual (aṣabah) | 4:11 |
| **Paternal grandfather** | 1/6 (when father absent) | Full residual or muqāsama (see §2.4) | Scholarly consensus |
| **Paternal grandmother** | 1/6 (when mother absent) | 1/6 | Scholarly consensus |
| **Single daughter (no sons)** | 1/2 | — | 4:11 |
| **Multiple daughters (no sons)** | 2/3 combined | — | 4:11 |
| **Single sister (no brothers, no children, no father)** | 1/2 | — | 4:176 |
| **Multiple sisters (same conditions)** | 2/3 combined | — | 4:176 |

**Mother's share with two or more siblings:** The mother's share reduces from 1/3 to 1/6 when the deceased had two or more siblings. This is the explicit Quranic ruling (4:11) and is agreed upon by all four madhabs.

**Mother's share — Umariyyatan (Maliki and Shafi'i only):** When the heirs are spouse + mother + father with no children and fewer than two siblings, the Maliki and Shafi'i schools reduce the mother's share further. See §2.5.

### 2.3 Step 3 — Awl (Proportional Reduction When Shares Exceed the Estate)

Before calculating amounts, the app checks whether the sum of all fixed shares exceeds 1 (i.e., the total fractions exceed the estate). If so, **awl** (عول) is applied: every fixed-share fraction is divided by the total, proportionally reducing all shares so they sum to exactly 100% of the estate.

**Example:** Husband (1/2) + two full sisters (2/3) = 7/6. After awl: husband receives (1/2) ÷ (7/6) = 3/7 ≈ 42.9%; sisters receive (2/3) ÷ (7/6) = 4/7 ≈ 57.1%.

Awl is agreed upon by all four Sunni madhabs. When it is triggered, the app displays an explanatory notice in the Results step.

> *Implementation:* `if (fixedSharesTotal > 1) { for each fixed-share heir: fraction = fraction / fixedSharesTotal }`

### 2.4 Step 4 — Residual (Aṣabah) Distribution and Grandfather Muqāsama

After fixed shares are assigned (and awl applied if needed), the remainder goes to the nearest aṣabah (agnatic residuary heir). The app applies the following hierarchy:

1. **Sons** — take the residual. Daughters alongside sons take half a son's share each (2:1 male:female ratio, per 4:11)
2. **Father** — takes the residual when no children exist; takes his scaled 1/6 fixed share plus the residual when daughters but no sons exist
3. **Paternal grandfather** — steps into the father's role when the father is absent, with madhab-dependent treatment when siblings are also present (see below)
4. **Brothers and sisters** — take the residual collectively at 2:1, but only when there are no children, no father, and no grandfather (Hanafi), or no grandfather who outcompetes them (Maliki/Shafi'i/Hanbali)

#### Grandfather with Siblings — Madhab Differentiation

This is the most significant point of inter-madhab disagreement in classical Faraid, and it is now fully implemented.

| Madhab | Rule | Implementation |
|--------|------|----------------|
| **Hanafi** | Grandfather fully blocks (ḥijb) all brothers and sisters — they receive nothing | Grandfather takes all residual; siblings excluded |
| **Maliki** | Muqāsama: grandfather takes the **better** of (a) 1/3 of the whole estate, or (b) his proportional share treating him as one brother (2 units). Brothers and sisters share the remainder at 2:1 | `gfAmount = max(netEstate/3, residual × 2/totalUnits)` |
| **Shafi'i** | Same as Maliki | Same implementation |
| **Hanbali** | Same as Maliki/Shafi'i | Same implementation |

**Muqāsama worked examples:**

- Grandfather + 1 brother (Maliki): max(1/3, 2/4=1/2) → grandfather gets 1/2, brother gets 1/2
- Grandfather + 2 brothers (Maliki): max(1/3, 2/6=1/3) → grandfather gets 1/3, brothers share 2/3
- Grandfather + 3 brothers (Maliki): max(1/3, 2/8=1/4) → grandfather gets 1/3, brothers share 2/3

When muqāsama is applied, the app displays an explanatory notice in the Results step contrasting the Hanafi and majority positions.

### 2.5 Step 5 — Umariyyatan (The Two Cases of ʿUmar)

When the heirs are **spouse + mother + father** with no children and fewer than two siblings, there is a classical disagreement on the mother's share:

| Madhab | Mother's share | Example: husband + mother + father |
|--------|---------------|-------------------------------------|
| **Maliki, Shafi'i** | 1/3 of what remains *after* the spouse's share | Husband takes 1/2; mother takes 1/3 × (1 − 1/2) = **1/6**; father takes **1/3** |
| **Hanafi, Hanbali** | 1/3 of the full estate (unmodified Quranic share) | Husband takes 1/2; mother takes **1/3**; father takes **1/6** |

The two cases (umariyyatan) are: (1) husband + mother + father, and (2) wife + mother + father. They are named after Caliph ʿUmar ibn al-Khaṭṭāb, who is reported to have given this ruling.

When umariyyatan is applied (Maliki or Shafi'i selected), the app displays an explanatory notice in the Results step.

> *Implementation:* `if (isMalikiOrShafii && spouseExists && fatherAlive && !hasChildren && totalSiblings < 2) { motherShare = (1 − spouseShare) / 3 }`

### 2.6 Step 6 — Radd (Return of Surplus)

If, after distributing all fixed shares and the residual, there is still unclaimed estate (no aṣabah heir exists), the surplus is returned proportionally to all eligible heirs. This principle is called **radd** (رد).

**The spouse is excluded from radd** in this app. This follows the majority opinion (Maliki, Shafi'i, Hanbali). The Hanafi school has a more nuanced position but also generally excludes the spouse from radd in the presence of other heirs.

> *Implementation:* The remaining unclaimed amount is distributed proportionally to all heirs except the spouse, in proportion to their already-received shares.

---

## 3. Known Limitations and Honest Gaps

### 3.1 Madhab Selector — Current Scope

The madhab selector now produces genuinely different outputs for the following scenarios:

- **Grandfather + siblings** — Hanafi blocks siblings; Maliki/Shafi'i/Hanbali apply muqāsama (§2.4)
- **Umariyyatan** — Maliki/Shafi'i reduce the mother's share; Hanafi/Hanbali do not (§2.5)

For all other scenarios not listed below as unsupported, the four schools produce the same result (the core Quranic shares are not in dispute between them), so a single implementation is correct across all madhabs.

### 3.2 Unsupported Heir Types

The following relatives are not included in the heirs input form and therefore cannot be modelled:

- **Uterine (maternal half) siblings** — they have distinct Quranic shares (1/6 for one, 1/3 combined for two or more) and are not blocked by the same heirs as full or paternal siblings
- **Grandchildren** (sons' sons, sons' daughters) — relevant when a son predeceases the testator; the son's children step into his position
- **Paternal uncles and cousins** — relevant as remote aṣabah when all closer relatives are absent
- **Dhul-arham** (distant relatives) — inherit only when no Quranic heirs or aṣabah exist; there is significant madhab disagreement on whether they inherit at all
- **Multiple grandmothers** — both the paternal grandmother and maternal grandmother may qualify for 1/6, shared if both are present

### 3.3 Non-Muslim Heirs

The app does not ask about or model the religion of heirs. In classical fiqh, a non-Muslim does not inherit from a Muslim (and vice versa). The app assumes all listed heirs are Muslim. If a listed heir is non-Muslim, the user should not include them and should note this in their Will's "Other Instructions" section.

### 3.4 Radd and the Spouse

The radd implementation excludes the spouse. In rare Hanafi sub-opinions and in some contemporary applications, radd may be applied to the spouse in the complete absence of all other heirs. This edge case is not implemented.

### 3.5 Grandfather Muqāsama — Hanbali Nuance

The Hanbali school applies muqāsama in the same broad manner as Maliki and Shafi'i, but has additional sub-rules regarding the specific types of siblings (full vs paternal) who participate alongside the grandfather. The current implementation treats all brother/sister types uniformly in the muqāsama pool. This is a simplification that may not reflect every Hanbali sub-opinion precisely.

---

## 4. Available within the App

The following scenarios are correctly calculated across all four madhabs:

- ✅ Spouse with children (wife 1/8 or husband 1/4)
- ✅ Spouse without children (wife 1/4 or husband 1/2)
- ✅ Mother's reduction with children or 2+ siblings
- ✅ Mother's umariyyatan share (Maliki/Shafi'i) vs full 1/3 (Hanafi/Hanbali)
- ✅ Father as fixed-share holder and aṣabah depending on children
- ✅ Father taking 1/6 + residual when daughters but no sons are present
- ✅ Daughters' fixed shares (1/2 or 2/3) when no sons
- ✅ Sons + daughters as aṣabah at 2:1
- ✅ Grandfather blocking siblings (Hanafi)
- ✅ Grandfather sharing via muqāsama (Maliki/Shafi'i/Hanbali)
- ✅ Siblings inheriting as aṣabah in the correct conditions
- ✅ Awl applied when fixed shares exceed the estate (all madhabs)
- ✅ Radd to eligible heirs when no aṣabah (spouse excluded)
- ✅ Wasiyyah deducted before distribution
- ✅ Debts and funeral costs deducted first
- ✅ Explanatory notices in the UI when awl, muqāsama, or umariyyatan apply

---

## 5. Planned Improvements

| Feature | Priority | Notes |
|---------|----------|-------|
| Uterine (maternal half) siblings | Medium | Quranic shares differ from full/paternal siblings; not blocked by same heirs |
| Grandchildren | Medium | Step into a predeceased son's position |
| Paternal uncles and cousins | Low | Remote aṣabah; relevant only when all closer heirs absent |
| Dhul-arham | Low | Complex; significant madhab disagreement on eligibility |
| Hanbali muqāsama sub-rules | Low | Full/paternal sibling distinction alongside grandfather |
| Radd to spouse (no other heirs) | Low | Rare Hanafi edge case |

---

## 6. Changelog

| Version | Date | Changes |
|---------|------|---------|
| ml-v7 | March 2026 | Implemented awl (proportional reduction); implemented grandfather muqāsama for Maliki/Shafi'i/Hanbali; implemented umariyyatan for Maliki/Shafi'i; fixed father fraction bug under awl; added explanatory UI notices for all three |
| ml-v6 | March 2026 | IHT awareness panel added to Faraid Results; reliefs checklist; Islamic planning considerations; override thresholds |
| ml-v5 | March 2026 | Print via Blob URL (mobile fix); disclaimer modal; mandatory field validation on Will steps 1 and 3 |
| ml-v4 | March 2026 | AES-256-GCM encryption; PinGate auth; multi-profile management; export/import |

---

## 7. A Note on Using This App

My Legacy is a planning and awareness tool, offered freely in the hope that it benefits the Ummah. It is not a fatwa. It is not a substitute for consulting:

- A **qualified Islamic scholar or Mufti** — particularly for complex heir configurations, inter-madhab questions, or Wasiyyah legitimacy
- A **solicitor** specialising in estate planning — for the legal validity of your Will in your jurisdiction
- A **tax adviser** — for inheritance tax implications in the UK or elsewhere

The scholars of the past spent lifetimes on ʿilm al-farā'iḍ because it matters enormously — to the living and to those who have passed. Treat this app as a starting point, not an ending one.

> *"Learning the law of inheritance and teaching it to people, for it is half of knowledge and is the first thing that will be forgotten from my Ummah."*  
> — Ibn Mājah, Sunan, no. 2719 (attributed)

---

## 8. Disclaimer

The Faraid calculator in My Legacy produces estimates based on classical Sunni fiqh as implemented in software. The accuracy of results depends on:

- Correct input of heirs and their relationships
- The family configuration falling within the supported scenarios described in Section 4
- The selected madhab being accurately applied for your school

**My Legacy and its author accept no legal or religious liability for decisions made on the basis of these calculations.** Always verify with a qualified scholar and solicitor before making or enacting estate planning decisions.

---

*This document should be updated whenever the calculation logic changes. Version history is maintained in Section 6.*

*Feedback and corrections from scholars, students of fiqh, and developers are warmly welcomed at [github.com/amisatoshi/mylegacy/issues](https://github.com/amisatoshi/mylegacy/issues)*
