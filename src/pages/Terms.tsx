import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>Conditions d'utilisation - JOB-PHARMA</title>
        <meta name="description" content="Conditions d'utilisation de JOB-PHARMA - Règles et modalités d'utilisation de notre plateforme" />
      </Helmet>

      <h1 className="text-3xl font-bold text-green-800 mb-8">Conditions d'utilisation</h1>

      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant les services de JOB-PHARMA, vous acceptez d'être lié par les présentes Conditions d'Utilisation ainsi que par toutes les lois et réglementations applicables.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">2. Description du service</h2>
          <p>
            JOB-PHARMA fournit des services de recrutement spécialisés dans le secteur pharmaceutique. Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect de nos services à tout moment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">3. Responsabilités de l'utilisateur</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vous êtes responsable de la confidentialité de votre compte</li>
            <li>Vous vous engagez à ne pas utiliser le service à des fins illégales ou non autorisées</li>
            <li>Vous ne devez pas transmettre de code malveillant ni tenter de nuire au service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Propriété intellectuelle</h2>
          <p>
            Vous conservez tous les droits sur vos informations personnelles et professionnelles. En utilisant notre service, vous nous accordez une licence pour analyser et traiter vos informations dans le but de fournir nos services de recrutement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Conditions de paiement</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Les paiements sont traités de manière sécurisée par notre prestataire de paiement</li>
            <li>Les abonnements seront automatiquement renouvelés sauf annulation</li>
            <li>Les remboursements sont effectués conformément à notre politique de remboursement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Limitation de responsabilité</h2>
          <p>
            Les services de JOB-PHARMA sont fournis "tels quels" sans garantie d'aucune sorte. Nous ne sommes pas responsables des dommages résultant de l'utilisation de nos services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">7. Modifications des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du service après les modifications constitue l'acceptation des nouvelles conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">8. Résiliation</h2>
          <p>
            Nous pouvons résilier ou suspendre votre compte et votre accès au service à notre seule discrétion, sans préavis, pour tout comportement que nous estimons contraire aux présentes Conditions d'Utilisation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">9. Informations légales</h2>
          <p>
            JOB-PHARMA est une marque commerciale de KEOLIA IT, SAS au capital de 10 000€, immatriculée au RCS de Paris sous le numéro B 842 705 618. Toute référence à JOB-PHARMA dans les présentes conditions d'utilisation désigne légalement la société KEOLIA IT.
          </p>
          <p className="mt-4">
            Pour toute question concernant ces conditions d'utilisation, vous pouvez contacter KEOLIA IT aux coordonnées suivantes :
          </p>
          <ul className="list-none pl-0 space-y-1 mt-2">
            <li>KEOLIA IT</li>
            <li>10 rue de Penthièvre</li>
            <li>75008 Paris, France</li>
            <li>Email : info@job-pharma.fr</li>
          </ul>
        </section>

        <section>
          <p className="mt-8 text-sm text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;