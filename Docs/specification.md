# **Spécifications de Eventify IMSET Sousse**

## **Description du projet**  
**Eventify IMSET Sousse** est une application web dynamique conçue pour aider la communauté de l'IMSET à rester informée des derniers événements se déroulant à Sousse et ses environs, en Tunisie.  
Que vous soyez à la recherche d'activités culturelles, d'événements universitaires ou d'animations locales, **Eventify** est votre plateforme idéale.

---

## **Objectifs**  
- Fournir une plateforme conviviale pour afficher et gérer des événements.  
- Permettre à la communauté IMSET de rester informée des dernières activités dans et autour de Sousse.  
- Offrir une expérience utilisateur fluide et efficace sur tous les appareils.  

---

## **Équipe de développement**  
- **Mohamed Amine FRAD**  
- **Sarra Zaag**  

---

## **Besoins fonctionnels**

### **1. Gestion des événements**  
- **Ajouter des événements** :  
  Permettre à l'utilisateur de créer un événement en renseignant :  
  - Titre  
  - Description  
  - Date et heure  
  - Lieu  
  - Catégorie (facultatif).  

- **Afficher les événements** :  
  - Lister tous les événements disponibles.  
  - Trier et filtrer les événements par catégorie, date ou popularité.  

- **Modifier ou supprimer un événement** :  
  - Modifier les informations d’un événement existant.  
  - Supprimer un événement obsolète ou annulé.  

---

### **2. Notifications (optionnel)**  
- Envoyer des rappels ou des notifications pour les événements à venir.  

---

## **Besoins non fonctionnels**

### **1. UI/UX**  
- Interface utilisateur simple et intuitive.  
- Design responsive adapté aux mobiles, tablettes et ordinateurs.  
- Utilisation d'une charte graphique harmonieuse et agréable.  

### **2. Performance**  
- Temps de chargement rapide pour afficher les événements.  
- Optimisation de la base de données pour un accès rapide aux données.  

### **3. Sécurité**  
- Sécurisation des données stockées sur le serveur pour protéger l'intégrité des événements.  

### **4. Scalabilité**  
- Conception extensible pour ajouter des fonctionnalités futures, comme un système de commentaires ou un calendrier intégré.  

---

## **Problématiques et solutions**

### **Problématique 1 : Gestion des données événementielles volumineuses**  
Avec une augmentation constante du nombre d'événements, le système peut rencontrer des ralentissements dans l'affichage ou la gestion des données.  

**Solution :**  
- Mettre en place un système de pagination et de chargement dynamique (lazy loading) pour optimiser les performances.  
- Indexer les colonnes fréquemment utilisées dans la base de données pour accélérer les requêtes.  

---

### **Problématique 2 : Notifications pertinentes pour les utilisateurs**  
Les notifications excessives ou mal ciblées peuvent perturber les utilisateurs et réduire leur engagement.  

**Solution :**  
- Permettre aux utilisateurs de personnaliser leurs préférences de notification.   

---

### **Problématique 3 : Accessibilité multiplateforme**  
L'application doit être accessible et fonctionnelle sur différents types d'appareils (ordinateurs, tablettes, smartphones).  

**Solution :**  
- Adopter un design responsive.

---

### **Problématique 4 : Gestion collaborative des événements**  
L'absence de rôles ou de permissions peut entraîner une mauvaise gestion des événements par plusieurs utilisateurs.  

**Solution :**  
- Ajouter une fonctionnalité permettant à plusieurs utilisateurs de collaborer sur la gestion des événements sans nécessiter d'authentification. Par exemple : partager un lien sécurisé pour gérer un événement.  
- Ajouter des logs d’activité pour suivre les modifications effectuées sur les événements.  

---

## **Spécifications techniques**

### **Backend**  
- **Framework** : Python Flask  
- **Architecture** : API RESTful  
- **Base de données** : PostgreSQL  

### **Frontend**  
- **Framework** : React  


## **Diagrammes**

### **1. Diagramme des cas d'utilisation**  
- Ajouter un événement.  
- Afficher la liste des événements.  
- Modifier/Supprimer un événement.  
 <img align="center" src="./Docs/Diagrammes/Diagramme des cas d'utilisation.png" width="100%">  

### **2. Diagramme d'activité**  
1. L'utilisateur accède à la liste des événements.  
2. Il ajoute/modifie/supprime un événement.  
![Diagramme d'activité](Docs/Diagrammes/Diagramme%20d'activité.png)
### **3. Diagramme de séquence**  
1. L'utilisateur soumet une requête pour ajouter un événement.  
2. Le backend traite la requête et met à jour la base de données.  
3. Le frontend affiche les événements mis à jour.  
![Diagramme de séquence](Docs/Diagrammes/Diagramme%20de%20séquence.png)

---

## **Conclusion**  
**Eventify IMSET Sousse** vise à centraliser les informations sur les événements pour simplifier l'accès à ces derniers et favoriser l'engagement de la communauté IMSET avec les activités locales. Avec son interface intuitive et ses fonctionnalités pratiques, Eventify est la solution idéale pour ne rien manquer des opportunités à Sousse.
