# Baztami - Gerer Votre Compte 

Baztamiest une application web simple et légère conçue pour vous aider à suivre et gérer vos transactions financières personnelles (revenus et dépenses) directement dans votre navigateur. 

## Fonctionnalités

* **Gestion des Transactions:** Ajoutez, modifiez et supprimez vos revenus (`Revenu`) et dépenses (`Dépense`).
* **Calcul du Solde:** Affiche automatiquement votre solde net, le total des revenus et le total des dépenses.
* **Stockage Local:** Toutes les données sont sauvegardées dans le **Local Storage** de votre navigateur .
* **Filtrage:** Filtrez les transactions pour afficher uniquement les revenus, les dépenses, ou tous les éléments.
* **Mode Sombre/Clair:** Basculez entre un thème clair et un thème sombre pour une meilleure expérience visuelle.
* **Interface Utilisateur Responsive:** Construit avec **Bootstrap 5** pour une bonne expérience sur tous les appareils.

---

## Comment Utiliser (Installation)
1.  **Ouvrez le fichier `index.html`** directement dans votre navigateur.

### Dépendances Front-end

L'application utilise les bibliothèques suivantes, incluses via CDN :
* **Bootstrap 5.3** (pour le style et la mise en page).
* **Bootstrap Icons 1.13.1** (pour les icônes).

---

## Structure des Fichiers Clés

| Fichier/Dossier | Rôle | Description |
| :--- | :--- | :--- |
| `index.html` | **Structure HTML** | La page principale de l'application |
| `js/script.js` | **Logique JavaScript** | Contient toute la logique de l'application : gestion du DOM, calculs, lecture/écriture dans le Local Storage, et gestion des événements. |
| `css/style.css` | **Style CSS** | Fichier de style personnalisé, y compris la définition du mode sombre (`.darkmode`). |
| `images/` | **Ressources Visuelles** | Contient les logos et les icônes utilisées (modes clair/sombre, filtres, etc.). |

---

## 💾 Stockage des Données

L'application utilise **Local Storage** pour la persistance des données.

* **Clé de Stockage Principale:** `"Baztami"` (défini par `let my_key = "Baztami"` dans `script.js`). C'est là que toutes les transactions sont stockées sous forme de chaîne JSON.
* **ID Automatique:** `autoID` est utilisé pour générer un identifiant unique pour chaque nouvelle transaction.
* **Mode d'Affichage:** `mode` pour sauvegarder la préférence de thème (`darkmode` ou `ligthmode`).
* **Filtrage:** `filtrer` pour sauvegarder la sélection de filtre en cours (`Tous`, `Revenu`, ou `Dépense`).
```