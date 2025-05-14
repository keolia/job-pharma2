import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Privacy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>Politique de confidentialité - JOB-PHARMA</title>
        <meta name="description" content="Politique de confidentialité de JOB-PHARMA - Protection de vos données personnelles" />
      </Helmet>

      <h1 className="text-3xl font-bold text-green-800 mb-8">Politique de confidentialité</h1>

      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Informations que nous collectons</h2>
          <p>
            Nous collectons les informations que vous nous fournissez directement lorsque vous utilisez les services de JOB-PHARMA, notamment :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Informations de contact (nom, adresse e-mail)</li>
            <li>Informations de paiement (traitées de manière sécurisée par notre prestataire de paiement)</li>
            <li>Informations relatives à votre CV, votre profil professionnel et vos candidatures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">2. Comment nous utilisons vos informations</h2>
          <p>Nous utilisons les informations collectées pour :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fournir et améliorer nos services de recrutement pharmaceutique</li>
            <li>Traiter vos paiements</li>
            <li>Vous envoyer des communications relatives à nos services</li>
            <li>Analyser et améliorer notre assistance au recrutement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">3. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles. Vos données de CV et de profil professionnel sont cryptées et stockées de manière sécurisée.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Partage de données</h2>
          <p>Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos informations avec :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Des prestataires de services qui nous aident à exploiter notre service</li>
            <li>Les forces de l'ordre lorsque la loi l'exige</li>
            <li>Des entreprises pharmaceutiques partenaires (uniquement avec votre consentement explicite)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Vos droits</h2>
          <p>Vous avez le droit de :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accéder à vos informations personnelles</li>
            <li>Demander la correction de vos données</li>
            <li>Demander la suppression de vos données</li>
            <li>Refuser les communications marketing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Nous contacter</h2>
          <p>
            Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter.
          </p>
          <p className="mt-2">
            Email : info@job-pharma.fr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">8. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur notre site.
          </p>
          <p className="mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;