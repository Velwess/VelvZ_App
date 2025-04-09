import {Header} from "@velz/common/components/header.tsx";

export default function CguPage() {
  return <section className="mx-auto max-w-2xl">
    <Header subtitle="Ce document est en cours d'élaboration et donc, sujet &agrave; modifications."
            title="Conditions Générales d'Utilisation"/>

    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      {/* Section: Introduction */}
      <article>
        <Header level={2} title="Introduction"/>
        <p>
          Velz est une plateforme en ligne qui propose des réductions et offres exclusives aux jeunes afin d’améliorer
          leur pouvoir d’achat dans les domaines du bien-être, de la nutrition et de la culture.
        </p>
      </article>

      {/* Section: Accès à la plateforme */}
      <article>
        <Header level={2} title="Accès à la plateforme"/>
        <p>
          Velz est accessible avec ou sans compte utilisateur. L’accès peut être restreint en cas de non-respect des
          règles ou de suspicion d’utilisation frauduleuse.
        </p>
      </article>

      {/* Section: Partage d'offres */}
      <article>
        <Header level={2} title="Partage d'offres"/>
        <p>
          Velz permet aux utilisateurs de partager et d’accéder à des bons plans et offres promotionnelles. Les
          utilisateurs peuvent suggérer des réductions trouvées sur des sites tiers pour faire profiter la communauté
          par mail, à condition de respecter les règles suivantes :
        </p>
        <ul className="list-disc pl-6">
          <li>L’offre doit être publiquement disponible et accessible à tous.</li>
          <li>Un lien direct vers le site d’origine doit être fourni.</li>
          <li>Aucune modification ou fausse information ne doit être ajoutée.</li>
        </ul>
        <p>
          Velz ne garantit pas la validité ou la disponibilité des offres publiées par les utilisateurs. Toute tentative
          de fraude, de contournement du système ou d’usage abusif peut entraîner la suspension du compte.
        </p>
      </article>

      {/* Section: Disponibilité et fiabilité */}
      <article>
        <Header level={2} title="Disponibilité et fiabilité"/>
        <p>
          Velzapp met tout en œuvre pour assurer la disponibilité et la fiabilité de ses services, mais ne garantit pas
          l’absence d’éventuelles erreurs ou interruptions temporaires. Velzapp ne peut être tenu responsable des offres
          proposées par les partenaires ni des conditions spécifiques appliquées par ces derniers.
        </p>
      </article>

      {/* Section: Collecte de données personnelles */}
      <article>
        <Header level={2} title="Collecte de données personnelles"/>
        <p>
          Velz collecte et traite certaines données personnelles pour assurer le bon fonctionnement de la plateforme.
          L’utilisateur dispose d’un droit d’accès, de rectification et de suppression de ses données conformément à la
          réglementation en vigueur. La politique de confidentialité détaille ces aspects.
        </p>
      </article>

      {/* Section: Propriété intellectuelle */}
      <article>
        <Header level={2} title="Propriété intellectuelle"/>
        <p>
          Tous les contenus présents sur Velzapp (logos, textes, images, design, etc.) sont la propriété exclusive de
          Velzapp ou de ses partenaires ou des sites propriétaires des offres. Toute reproduction ou utilisation sans
          autorisation préalable est interdite.
        </p>
      </article>

      {/* Section: Modifications des CGU */}
      <article>
        <Header level={2} title="Modifications des CGU"/>
        <p>
          Velz se réserve le droit de modifier les CGU à tout moment. Toute modification sera notifiée aux utilisateurs
          et prendra effet dès sa mise en ligne. En cas de non-respect des CGU, Velzapp peut suspendre ou supprimer un
          compte utilisateur sans préavis.
        </p>
      </article>

      {/* Section: Droit applicable */}
      <article>
        <Header level={2} title="Droit applicable"/>
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige, une tentative de résolution à l’amiable
          sera privilégiée avant toute action en justice.
        </p>
      </article>

      {/* Section: Comportement des utilisateurs */}
      <article>
        <Header level={2} title="Comportement des utilisateurs"/>
        <p>
          Les utilisateurs s'engagent à respecter un comportement courtois et respectueux lors de l'utilisation de la
          plateforme. Les commentaires, avis et messages échangés sur la plateforme doivent être cordiaux, non injurieux
          et ne doivent pas inciter à la violence, à la haine ou à la discrimination. Toute violation de cette règle
          pourra entraîner la suppression du contenu concerné, voire la suspension ou la suppression du compte
          utilisateur.
        </p>
      </article>
    </div>
  </section>;
}
