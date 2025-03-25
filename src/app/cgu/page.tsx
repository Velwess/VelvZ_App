export default function CguPage() {
  return <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-gray-800 mb-8">Nos conditions générales d'utilisation</h1>

    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      {/* Disclaimer */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Disclaimer</h2>
        <p className="text-lg font-semibold text-red-600">
          ⚠️ Version de test : Ces CGU sont en cours d'élaboration et
          peuvent être modifiées.
        </p>
      </section>


      {/* Section: Introduction */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Introduction</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Velz est une plateforme en ligne qui propose des réductions et offres exclusives aux jeunes afin d’améliorer
          leur pouvoir d’achat dans les domaines du bien-être, de la nutrition et de la culture.
        </p>
      </section>

      {/* Section: Accès à la plateforme */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Accès à la plateforme</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Velz est accessible avec ou sans compte utilisateur. L’accès peut être restreint en cas de non-respect des
          règles ou de suspicion d’utilisation frauduleuse.
        </p>
      </section>

      {/* Section: Partage d'offres */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Partage d'offres</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Velz permet aux utilisateurs de partager et d’accéder à des bons plans et offres promotionnelles. Les
          utilisateurs peuvent suggérer des réductions trouvées sur des sites tiers pour faire profiter la communauté
          par mail, à condition de respecter les règles suivantes :
        </p>
        <ul className="list-disc pl-6 text-lg leading-relaxed text-gray-700">
          <li>L’offre doit être publiquement disponible et accessible à tous.</li>
          <li>Un lien direct vers le site d’origine doit être fourni.</li>
          <li>Aucune modification ou fausse information ne doit être ajoutée.</li>
        </ul>
        <p className="text-lg leading-relaxed text-gray-700">
          Velz ne garantit pas la validité ou la disponibilité des offres publiées par les utilisateurs. Toute tentative
          de fraude, de contournement du système ou d’usage abusif peut entraîner la suspension du compte.
        </p>
      </section>

      {/* Section: Disponibilité et fiabilité */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Disponibilité et fiabilité</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Velzapp met tout en œuvre pour assurer la disponibilité et la fiabilité de ses services, mais ne garantit pas
          l’absence d’éventuelles erreurs ou interruptions temporaires. Velzapp ne peut être tenu responsable des offres
          proposées par les partenaires ni des conditions spécifiques appliquées par ces derniers.
        </p>
      </section>

      {/* Section: Collecte de données personnelles */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Collecte de données personnelles</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Velz collecte et traite certaines données personnelles pour assurer le bon fonctionnement de la plateforme.
          L’utilisateur dispose d’un droit d’accès, de rectification et de suppression de ses données conformément à la
          réglementation en vigueur. La politique de confidentialité détaille ces aspects.
        </p>
      </section>

      {/* Section: Propriété intellectuelle */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Propriété intellectuelle</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Tous les contenus présents sur Velzapp (logos, textes, images, design, etc.) sont la propriété exclusive de
          Velzapp ou de ses partenaires ou des sites propriétaires des offres. Toute reproduction ou utilisation sans
          autorisation préalable est interdite.
        </p>
      </section>

      {/* Section: Modifications des CGU */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Modifications des CGU</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Velz se réserve le droit de modifier les CGU à tout moment. Toute modification sera notifiée aux utilisateurs
          et prendra effet dès sa mise en ligne. En cas de non-respect des CGU, Velzapp peut suspendre ou supprimer un
          compte utilisateur sans préavis.
        </p>
      </section>

      {/* Section: Droit applicable */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Droit applicable</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Les présentes CGU sont soumises au droit français. En cas de litige, une tentative de résolution à l’amiable
          sera privilégiée avant toute action en justice.
        </p>
      </section>

      {/* Section: Comportement des utilisateurs */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Comportement des utilisateurs</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Les utilisateurs s'engagent à respecter un comportement courtois et respectueux lors de l'utilisation de la
          plateforme. Les commentaires, avis et messages échangés sur la plateforme doivent être cordiaux, non injurieux
          et ne doivent pas inciter à la violence, à la haine ou à la discrimination. Toute violation de cette règle
          pourra entraîner la suppression du contenu concerné, voire la suspension ou la suppression du compte
          utilisateur.
        </p>
      </section>
    </div>
  </div>;
}
