## Authentification avec NextAuth Credentials Provider dans Next.js 15+

Description
Ce projet implémente une authentification par email/mot de passe avec NextAuth dans Next.js 15.4.4, en utilisant :

CredentialsProvider pour valider les utilisateurs dans MongoDB.

Gestion des sessions JWT.

Affichage des erreurs de connexion dans la page de login via query string ?error=.

Redirection automatique après connexion réussie vers la page /admin.

Protection de la page /admin avec getServerSession.

Une page d’administration protégée.

Un système de création d’articles tracé : chaque article est lié à l’utilisateur qui l’a créé.

Affichage des articles avec possibilité de filtrer ou gérer uniquement ceux de l’utilisateur connecté.