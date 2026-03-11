# My Legacy — Quick Start Guide

> *"Write your Will — it is the duty of every Muslim who has something to bequeath."*
> — Sahih al-Bukhari & Muslim

My Legacy is a private, encrypted Islamic estate planner. It runs entirely in your browser — no account, no server, no data ever leaves your device.

---

## Table of Contents

1. [Setting Your Password](#1-setting-your-password)
2. [Creating a Profile](#2-creating-a-profile)
3. [Writing Your Will](#3-writing-your-will)
4. [Calculating Faraid](#4-calculating-faraid)
5. [Printing Your Documents](#5-printing-your-documents)
6. [Backing Up Your Data](#6-backing-up-your-data)
7. [Installing as an App (PWA)](#7-installing-as-an-app-pwa)
8. [Frequently Asked Questions](#8-frequently-asked-questions)

---

## 1. Setting Your Password

When you open My Legacy for the first time, you will be asked to create a password.

- Choose a **strong, memorable password** — a passphrase of 4–5 random words works well (e.g. `moon-river-book-clock`)
- Your password encrypts all your data using AES-256. **It cannot be recovered if forgotten**
- You will need this same password to import a backup on another device
- Tap **Create Password** to confirm

On future visits, enter your password and tap **Unlock My Legacy**.

> ⚠️ **There is no password reset.** If you lose your password, your data cannot be recovered. Write it down and store it somewhere safe — ideally in a physical location separate from your devices.

---

## 2. Creating a Profile

My Legacy supports multiple profiles — one for each family member whose Will or Faraid you want to plan.

1. On the home screen, tap **Add Profile**
2. Enter the person's **name**, their **relationship to you** (Self, Spouse, Parent, Child, Other), and optionally their **date of birth**
3. Tap **Save**

You can create profiles for yourself, your spouse, your parents, and your children. Each profile stores its own Will and Faraid data independently.

**To edit or delete a profile**, tap the pencil or bin icon on the profile card.

---

## 3. Writing Your Will

1. On the home screen, tap **Create Will** (or **Edit Will** if one already exists) on your profile card
2. Work through the **7 steps** using the Next and Previous buttons:

| Step | Contents |
|------|----------|
| 1 | **Personal Details** — full name, date of birth, address, marital status |
| 2 | **Islamic Declarations** — Shahada, Sharia compliance, funeral wishes, debts |
| 3 | **Executors & Guardians** — who will carry out your wishes; guardians for minor children |
| 4 | **Wasiyyah & Waqf** — optional charitable bequests (up to 1/3 of estate) |
| 5 | **Other Instructions** — any additional wishes not covered elsewhere |
| 6 | **Review** — summary of everything entered |
| 7 | **Signatures** — optional digital signature capture for testator and two witnesses |

3. Your progress is saved automatically as you fill in each field
4. On Step 7, tap **Print Complete Will** to generate the printable document

> 📜 **Mandatory fields** — Full Legal Name, Date of Birth, Address, and Postcode are required before you can proceed from Step 1. At least one Executor is required before leaving Step 3.

---

## 4. Calculating Faraid

Faraid is the Islamic system of inheritance distribution prescribed in the Quran and Sunnah.

1. On the home screen, tap **Calculate Estate** on a profile card
2. Work through the **4 steps**:

| Step | Contents |
|------|----------|
| 1 | **Assets** — add each asset with a category, description, and value |
| 2 | **Debts & Deductions** — funeral costs, outstanding debts, Wasiyyah amount |
| 3 | **Heirs** — select which relatives survive the deceased (spouse, children, parents, siblings, etc.) |
| 4 | **Results** — distribution breakdown by heir, with pie and bar charts |

3. Select your preferred **madhab** (Hanafi, Maliki, Shafi'i, or Hanbali) in Settings — this affects how shares are calculated in contested cases
4. On the Results step, tap **Print / Save PDF Report** to generate a printable report

> ⚖️ **Important:** Faraid calculations are based on classical fiqh. Complex cases involving estrangement, disputes, or non-Muslim heirs should always be reviewed by a qualified Islamic scholar or Mufti.

---

## 5. Printing Your Documents

### Will document
- Navigate to **Step 7** of the Will Creator
- Tap **Print Complete Will**
- Your browser's print dialog will open — choose **Save as PDF** or send to a printer
- The document is formatted for A4 with proper margins

**To make your Will legally valid in England and Wales:**
1. Print the document
2. Sign it **by hand** in the presence of two independent witnesses
3. Both witnesses must also sign, in your presence and each other's presence
4. Neither witness should be a beneficiary named in the Will

### Faraid report
- Navigate to **Step 4 (Results)** of the Faraid Calculator
- Tap **Print / Save PDF Report**
- The report includes the distribution breakdown and both charts

---

## 6. Backing Up Your Data

Your data is stored encrypted on your device only. If you clear your browser data or switch devices, you will lose everything unless you have a backup.

### To export a backup
1. Go to **Settings** (gear icon in the header)
2. Scroll to **Data**
3. Tap **Export Backup**
4. A `.json` file will download — store this somewhere safe (cloud storage, email to yourself, USB drive)

### To import a backup
1. Go to **Settings → Data**
2. Tap **Import Backup**
3. Select your `.json` backup file
4. Enter the **same password you used when the backup was created**

> 🔐 The backup file is encrypted. Without the correct password it cannot be read by anyone.

---

## 7. Installing as an App (PWA)

My Legacy is a Progressive Web App — you can install it on your phone's home screen and use it offline.

### On iPhone (Safari)
1. Open `mylegacywills.com/app` in **Safari**
2. Tap the **Share** button (box with arrow pointing up)
3. Tap **Add to Home Screen**
4. Tap **Add**

### On Android (Chrome or Brave)
1. Open `mylegacywills.com/app` in **Chrome** or **Brave**
2. Tap the **three-dot menu** (top right)
3. Tap **Add to Home Screen** or **Install App**
4. Tap **Install**

Once installed, the app loads from cache — no internet connection needed after the first visit.

---

## 8. Frequently Asked Questions

**Q: Is my data safe?**
All data is encrypted with AES-256-GCM using a key derived from your password via PBKDF2 (100,000 iterations). It is stored only in your browser's local storage. My Legacy has no server, no account system, and no analytics. The code is open source and auditable at [github.com/amisatoshi/mylegacy](https://github.com/amisatoshi/mylegacy).

**Q: What happens if I forget my password?**
Your data cannot be recovered. This is by design — the encryption would be meaningless if there were a backdoor. Always keep a note of your password in a secure physical location, and export regular backups.

**Q: Can I use this on multiple devices?**
Yes — export a backup from device A, transfer the `.json` file to device B, and import it using the same password.

**Q: Is the Will legally valid?**
My Legacy produces a planning document. For a Will to be legally valid in England and Wales it must be signed by you in the presence of two independent witnesses, who must also sign. We strongly recommend having your final Will reviewed by a qualified solicitor.

**Q: Which madhab does the Faraid calculator use?**
You can choose Hanafi, Maliki, Shafi'i, or Hanbali in Settings. The selected madhab is applied to all calculations. The differences between madhabs primarily affect contested cases such as the grandfather alongside brothers, or distant relatives.

**Q: Can I plan for my whole family?**
Yes — add a separate profile for each family member. Each profile stores its own Will and Faraid data independently.

**Q: What asset types are supported?**
Property, Land, Cash & Bank, Pension, ISA, Shares & Equities, Funds & ETFs, Bullion, Crypto & Digital Assets, Business Interest, Vehicle, Jewellery & Watches, Forex, Intellectual Property, Receivables, and Other.

**Q: Does the app work offline?**
After your first visit, all app files are cached by the service worker. The app will load and function fully offline. Your data never needs a network connection as it is stored locally.

---

*My Legacy is in active development (BETA). If you encounter an issue, please [open a GitHub issue](https://github.com/amisatoshi/mylegacy/issues).*

*Plan with purpose. Leave with peace.*
