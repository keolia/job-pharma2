import React, { useState } from 'react';
import { Calendar, ArrowLeft, Clock, User, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Le marché de l'emploi en 2025 : Prévisions dans le secteur de la pharmacie en France",
      excerpt: "Découvrez les tendances et opportunités qui façonneront le marché de l'emploi pharmaceutique en 2025. Une analyse approfondie des évolutions à venir.",
      content: `L'industrie pharmaceutique connaît une transformation profonde qui redéfinit les besoins en compétences et les opportunités d'emploi. Notre analyse prospective pour 2025 révèle plusieurs tendances majeures qui façonneront le secteur.

Les nouvelles technologies au cœur de l'évolution :

- Intelligence artificielle pour l'analyse des données de santé
- Automatisation des processus de production
- Téléconsultation et services pharmaceutiques à distance
- Solutions connectées pour le suivi des patients

Les compétences recherchées en 2025 :

- Expertise en données de santé et analyse prédictive
- Maîtrise des outils numériques et des nouvelles technologies
- Compétences en conseil et accompagnement patient
- Connaissances en biotechnologie et médecine personnalisée

Les nouveaux métiers émergents :

- Data Pharmacist : spécialiste de l'analyse des données de santé
- Pharmacien connecté : expert en téléconsultation
- Consultant en e-santé
- Spécialiste en pharmacie personnalisée

Les perspectives d'emploi :

- Croissance estimée de 15% des emplois dans le secteur
- Développement des postes en R&D et innovation
- Augmentation des besoins en formation continue
- Évolution vers des profils plus techniques

Les défis à relever :

- Adaptation aux nouvelles technologies
- Formation continue et mise à niveau des compétences
- Équilibre entre service humain et digital
- Réglementation des nouveaux services pharmaceutiques

Recommandations pour les professionnels :

- Investir dans la formation continue
- Développer des compétences numériques
- Rester à l'écoute des innovations du secteur
- Cultiver les soft skills essentielles

Conclusion :

Le secteur pharmaceutique de 2025 offrira de nombreuses opportunités pour les professionnels capables de s'adapter aux évolutions technologiques tout en maintenant l'aspect humain du métier. La formation continue et l'adaptabilité seront les clés du succès dans ce nouveau paysage professionnel.`,
      date: "1 Mai 2025",
      image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg",
      category: "Emploi",
      author: "Dr. Jean Martin",
      readTime: "10 min"
    },
    {
      id: 2,
      title: "Les pharmacies spécialisées : La nouvelle tendance de segmentation du marché",
      excerpt: "Dans un secteur pharmaceutique en constante évolution, une tendance de fond se dessine : la spécialisation des officines. Découvrez comment cette nouvelle approche transforme le marché.",
      content: `Le secteur de la santé et du bien-être connaît une évolution constante, et avec elle, une segmentation croissante du marché. Les pharmacies spécialisées émergent comme une réponse innovante aux besoins spécifiques des consommateurs.

Qu'est-ce qu'une pharmacie spécialisée ?

Une pharmacie spécialisée est une officine qui se concentre sur un segment particulier du marché de la santé. Ces établissements développent une expertise pointue dans des domaines spécifiques :

- Dermatologie et soins de la peau
- Nutrition et compléments alimentaires
- Orthopédie et matériel médical
- Aromathérapie et médecines douces
- Maintien à domicile
- Petite enfance et maternité

Les avantages de la spécialisation :

- Expertise approfondie dans un domaine
- Service client personnalisé
- Gamme de produits ciblée et complète
- Formation continue spécialisée
- Reconnaissance professionnelle
- Différenciation sur le marché

Impact sur le secteur :

- Amélioration de la qualité des conseils
- Innovation dans les services proposés
- Développement de nouvelles compétences
- Création de niches de marché
- Évolution des modèles économiques

Défis et opportunités :

- Investissement en formation continue
- Adaptation aux nouvelles technologies
- Gestion des stocks spécialisés
- Développement de partenariats stratégiques
- Communication ciblée

Perspectives d'avenir :

La spécialisation des pharmacies représente une évolution majeure du secteur, offrant de nouvelles opportunités de croissance et d'innovation. Cette tendance devrait se renforcer dans les années à venir, avec l'émergence de nouvelles spécialités et services.`,
      date: "2 Mai 2025",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
      category: "Tendances",
      author: "Marie Durand",
      readTime: "15 min"
    },
    {
      id: 3,
      title: "L'évolution du métier de pharmacien en 2024",
      excerpt: "Découvrez comment la profession de pharmacien se transforme avec les nouvelles technologies et les attentes des patients.",
      content: `Le métier de pharmacien connaît une transformation profonde en 2024, marquée par l'intégration des nouvelles technologies et l'évolution des attentes des patients.

Les nouveaux rôles du pharmacien :

- Conseil personnalisé et suivi thérapeutique
- Vaccination et dépistage
- Téléconsultation et services digitaux
- Éducation thérapeutique du patient
- Coordination avec les autres professionnels de santé

L'impact du numérique :

- Dossier pharmaceutique électronique
- Ordonnance numérique
- Applications de suivi patient
- Intelligence artificielle d'aide à la décision
- Robotisation de certaines tâches

Les compétences clés :

- Maîtrise des outils numériques
- Communication et pédagogie
- Gestion de projet
- Analyse de données
- Adaptation aux nouvelles technologies

Les enjeux actuels :

- Formation continue
- Équilibre entre technologie et relation humaine
- Sécurité des données
- Évolution du cadre réglementaire
- Rentabilité des investissements

Perspectives pour l'avenir :

Le pharmacien de demain sera un professionnel de santé polyvalent, alliant expertise pharmaceutique et maîtrise des outils numériques, tout en conservant son rôle essentiel de conseil et d'accompagnement des patients.`,
      date: "15 Mars 2024",
      image: "https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg",
      category: "Tendances",
      author: "Dr. Sophie Martin",
      readTime: "8 min"
    },
    {
      id: 4,
      title: "Intelligence artificielle en pharmacie",
      excerpt: "Comment l'IA révolutionne la gestion des stocks et le conseil en officine.",
      content: `L'intelligence artificielle transforme rapidement le secteur pharmaceutique, apportant des solutions innovantes pour optimiser la gestion des officines et améliorer le service aux patients.

Applications concrètes de l'IA :

- Prévision des stocks et commandes automatiques
- Analyse des tendances de consommation
- Détection des interactions médicamenteuses
- Personnalisation des conseils patients
- Optimisation des plannings

Avantages pour l'officine :

- Réduction des ruptures de stock
- Amélioration de la rentabilité
- Gain de temps pour l'équipe
- Meilleure satisfaction client
- Réduction des erreurs

Impact sur le conseil :

- Recommandations personnalisées
- Suivi patient optimisé
- Détection précoce des risques
- Support à la décision
- Formation continue adaptative

Défis et considérations :

- Protection des données
- Formation du personnel
- Coût d'implémentation
- Acceptation par les patients
- Intégration aux systèmes existants

Perspectives futures :

L'IA continuera d'évoluer et d'offrir de nouvelles opportunités pour améliorer la pratique pharmaceutique, tout en maintenant l'importance du facteur humain dans la relation patient-pharmacien.`,
      date: "10 Mars 2024",
      image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
      category: "Innovation",
      author: "Dr. Thomas Bernard",
      readTime: "6 min"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Blog - Job-Pharma</title>
        <meta name="description" content="Découvrez les dernières actualités et tendances du secteur pharmaceutique sur le blog de Job-Pharma." />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {selectedPost !== null ? (
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96">
              <img
                src={blogPosts[selectedPost].image}
                alt={blogPosts[selectedPost].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 hover:bg-black/30 transition-colors px-4 py-2 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                  {blogPosts[selectedPost].category}
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {blogPosts[selectedPost].date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {blogPosts[selectedPost].readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blogPosts[selectedPost].author}
                </div>
              </div>

              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-8">
                {blogPosts[selectedPost].title}
              </h1>

              <div className="prose max-w-none">
                {blogPosts[selectedPost].content.split('\n\n').map((section, index) => {
                  if (section.trim().startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-3 my-6 bg-green-50 p-6 rounded-lg">
                        {section.split('\n').map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (section.trim().endsWith(':')) {
                    return (
                      <h2 key={index} className="font-['Playfair_Display'] text-2xl font-bold text-green-800 mt-12 mb-6 border-l-4 border-green-500 pl-4">
                        {section}
                      </h2>
                    );
                  }

                  return (
                    <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
                      {section}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>
        ) : (
          <div>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-12 text-center">
              Actualités & Tendances
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-green-700 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <button
                        onClick={() => setSelectedPost(index)}
                        className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group"
                      >
                        Lire la suite
                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;