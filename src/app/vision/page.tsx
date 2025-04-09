import {Header} from "@velz/common/components/header.tsx";

export default function VisionPage() {
  return <section className="mx-auto max-w-2xl">
    <Header title="Notre Vision"/>

    <article className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <p>
        La vision de <span className="font-bold text-secondary">Velz</span> est de devenir la plateforme de référence
        qui offre aux jeunes un accès facile à des offres exclusives et des réductions sur des produits et services qui
        enrichissent leur quotidien. Nous cherchons à favoriser l'inclusion sociale, l'épanouissement personnel et à
        soutenir les jeunes dans leurs passions et leurs ambitions.
      </p>

      <p>
        En réunissant les meilleures offres dans des catégories comme la beauté, le bien-être, la nutrition, le sport,
        et plus encore, <span className="font-bold text-secondary">VelZ</span> veut rendre ces opportunités
        accessibles
        à tous, quel que soit le budget. Nous souhaitons offrir un espace où les jeunes peuvent se sentir soutenus dans
        leurs choix, tout en leur permettant d'optimiser leur pouvoir d'achat et de s'épanouir pleinement.
      </p>

      <p>
        Notre plateforme vise à simplifier la recherche et l'accès à des réductions et des produits qui améliorent leur
        quotidien, tout en créant une communauté dynamique autour de l'échange et du soutien.
      </p>
    </article>
  </section>;
}
