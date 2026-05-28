# 📱 Envoyer WhatsApp — Étape personnalisée pour Google Workspace Studio


[🇫🇷 Version Française](#-version-française) | [🇬🇧 English Version](#-english-version)
<a href="https://developers.google.com/apps-script"><img src="https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google-apps-script&logoColor=white" alt="Google Apps Script"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-indigo?style=for-the-badge" alt="License: MIT"></a>
<a href="README.md"><img src="https://img.shields.io/badge/Status-Production-brightgreen?style=for-the-badge" alt="Status: Production"></a>


## 🇫🇷 Version Française

Ce projet définit une **étape personnalisée** (custom step) pour [Google Workspace Studio](https://studio.google.com), permettant d'envoyer un message WhatsApp depuis un flux d'automatisation.

## 📋 Fonctionnalités

- **Configuration visuelle** : carte de configuration dans le Flow Builder avec sélection de variables du flux
- **Envoi WhatsApp** : appel API vers un service de messagerie WhatsApp
- **Variables de sortie** : retourne le statut (`Success`/`Error`) et l'identifiant du message pour les étapes suivantes

## 📁 Structure du projet

| Fichier | Description |
|---|---|
| `Code.gs` | Fonctions de configuration (`onConfigSendWhatsApp`) et d'exécution (`onExecuteSendWhatsApp`) |
| `appsscript.json` | Manifeste déclarant l'étape, ses entrées/sorties et les fonctions associées |

## 🚀 Installation

1. Créer un nouveau projet sur [script.google.com](https://script.google.com)
2. Copier le contenu de `Code.gs` dans le fichier principal
3. Activer l'affichage du manifeste : ⚙️ **Paramètres** > *Afficher le fichier manifeste*
4. Remplacer le contenu de `appsscript.json` par celui de ce repo
5. Remplacer `VOTRE_CLE_API` et l'URL de l'API dans `Code.gs`
6. **Deploy** > **Test deployments** > **Install**
7. Ouvrir Google Workspace Studio et ajouter l'étape au flux

## ⚙️ Configuration requise

- Un compte Google Workspace avec accès à **Workspace Studio**
- Un service API WhatsApp (ex: Twilio, WhatsApp Business API, etc.)
- Le scope OAuth `script.external_request` (déjà déclaré dans le manifeste)

## 📖 Ressources

- [Guide de démarrage rapide — Workspace Studio](https://developers.google.com/workspace/add-ons/studio/quickstart)
- [Documentation AddOnsResponseService](https://developers.google.com/apps-script/reference/add-ons)

## 📄 Licence

MIT


---
## 🇬🇧 English Version

> English translation coming soon.

---
<p align="center"><a href="https://faucheux.bzh" target="_blank" style="color: inherit; text-decoration: none;">&lt;&gt; par Fabrice Faucheux</a></p>