import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Pharmacienne Titulaire",
      content: "Grâce à JOB-PHARMA, j'ai trouvé le candidat idéal pour mon officine en moins de deux semaines. La qualité des profils et la simplicité d'utilisation de la plateforme sont remarquables.",
      company: "Pharmacie du Centre, Lyon"
    },
    {
      id: 2,
      name: "Thomas Bernard",
      role: "Directeur RH",
      content: "Un outil indispensable pour notre groupe de pharmacies. Le processus de recrutement est fluide et efficace. Les candidats sont parfaitement ciblés et correspondent à nos attentes.",
      company: "Groupe PharmaSanté"
    },
    {
      id: 3,
      name: "Sophie Martin",
      role: "Pharmacienne Adjointe",
      content: "J'ai trouvé mon poste actuel sur JOB-PHARMA. La plateforme est intuitive et les offres sont pertinentes. Je recommande vivement à tous les professionnels du secteur.",
      company: "Grande Pharmacie de Paris"
    }
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
        Ils nous font confiance
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-md h-full"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            
            <p className="text-gray-700 mb-4 italic">
              "{testimonial.content}"
            </p>
            
            <div>
              <p className="font-semibold text-green-800">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
              <p className="text-sm text-gray-500">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;