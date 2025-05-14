import React, { useState } from 'react';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Les pharmacies spécialisées : La nouvelle tendance de segmentation du marché",
      excerpt: "Dans un secteur pharmaceutique en constante évolution, une tendance de fond se dessine : la spécialisation des officines. Découvrez comment cette nouvelle approche transforme le marché.",
      content: `Le secteur de la santé et du bien-être connaît une évolution constante, et avec elle, une segmentation croissante du marché. Parmi les tendances récentes, l'émergence des pharmacies spécialisées se distingue comme une réponse aux besoins spécifiques des consommateurs.

Qu'est-ce qu'une pharmacie spécialisée ?

Une pharmacie spécialisée est une officine qui se concentre sur un segment particulier du marché de la santé, offrant des produits et des services spécialisés. Ces pharmacies peuvent se spécialiser dans des domaines tels que :

- Les médicaments orphelins et les maladies rares
- La dermatologie et les soins de la peau
- La nutrition et les compléments alimentaires
- La santé mentale et le bien-être émotionnel
- Les soins pour les personnes âgées et la gériatrie
- Les produits naturels et bio

Pourquoi cette tendance ?

Plusieurs facteurs expliquent cette évolution :

- La demande croissante de personnalisation dans les soins de santé
- L'augmentation des maladies chroniques et des besoins spécifiques associés
- La recherche de solutions alternatives et complémentaires à la médecine traditionnelle
- La volonté des consommateurs d'avoir accès à des produits de qualité et à des conseils experts

Les avantages des pharmacies spécialisées

Les pharmacies spécialisées offrent plusieurs avantages :

- Expertise : Un personnel formé et expérimenté dans un domaine spécifique
- Gamme de produits : Une sélection de produits adaptés aux besoins particuliers des clients
- Conseils personnalisés : Des recommandations et des solutions sur mesure
- Qualité de service : Un accompagnement et un suivi renforcés

Les défis à relever

Malgré leurs avantages, les pharmacies spécialisées doivent faire face à certains défis :

- La concurrence des pharmacies traditionnelles et des grandes surfaces
- La réglementation stricte en matière de vente de médicaments et de produits de santé
- La nécessité de se différencier et de communiquer efficacement sur leur valeur ajoutée
- L'adaptation aux changements rapides du marché et des attentes des consommateurs

Conclusion

Les pharmacies spécialisées représentent une réponse innovante aux besoins de plus en plus spécifiques des consommateurs en matière de santé et de bien-être. En se concentrant sur des segments de marché précis, ces pharmacies peuvent offrir une expertise et des services de qualité supérieure, tout en se démarquant de la concurrence. Toutefois, elles doivent relever plusieurs défis pour pérenniser leur activité et se développer dans un environnement en constante évolution.`,
      date: "2 Mai 2025",
      image: "/images/blogpharma5.jpg",
      category: "Tendances",
      author: "Marie Durand",
      readTime: "15 min"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {selectedPost !== null ? (
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
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
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
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

            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {blogPosts[selectedPost].title}
            </h1>

            <div className="prose max-w-none">
              {blogPosts[selectedPost].content.split('\n\n').map((section, index) => {
                if (section.trim().startsWith('- ')) {
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-3 my-6">
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
                    <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Actualités & Tendances</h1>
          <div className="grid gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
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

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <button
                        onClick={() => setSelectedPost(index)}
                        className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                      >
                        Lire la suite →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;