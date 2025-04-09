import {Header} from "@velz/common/components/header.tsx";

export default function EngagementPage() {
  return <section className="mx-auto max-w-2xl">
    <Header title="Nos Engagements"/>

    <article className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <p>
        Chez Velz, nous croyons que bien consommer ne doit pas être un compromis entre prix, qualité et expérience.
        C’est pourquoi nous sélectionnons avec soin les prestataires présents sur notre plateforme, afin de vous
        garantir des offres avantageuses dans des lieux qui en valent la peine.
      </p>

      <p>
        Nous collaborons uniquement avec des établissements bien notés, ayant une note Google d’au moins 4 étoiles et un
        nombre minimum d’avis clients. Cette sélection garantit des prestations de qualité et un service fiable.
      </p>

      <p>
        L’esthétique et l’ambiance des lieux comptent autant que la qualité des services. Nous privilégions des
        partenaires qui offrent un cadre soigné et une atmosphère agréable, pour que chaque visite soit une vraie
        expérience.
      </p>

      <p>
        Velz, c’est avant tout vous ! Vos avis et recommandations nous aident à sélectionner les meilleurs prestataires
        et à négocier les meilleures offres. Ensemble, faisons de Velzapp une plateforme qui vous ressemble.
      </p>

      <p>
        <strong>Profitez du meilleur, au meilleur prix.</strong>
      </p>
    </article>
  </section>;
}
