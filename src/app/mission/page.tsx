import {Header} from "@velz/common/components/header.tsx";

export default function MissionPage() {
  return <section className="mx-auto max-w-2xl">
    <Header title="Notre Mission"/>

    <article className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <p>
        Parce que chaque jeune mérite de profiter pleinement de son quotidien sans se soucier constamment de son budget,
        nous avons imaginé une plateforme qui allège les petits tracas et ouvre les portes à plus de bien-être et de
        plaisir.
      </p>

      <p>
        Nous croyons aux instants simples qui font du bien : un café partagé, une sortie qui inspire, un moment rien que
        pour soi. Grâce à nos offres exclusives,
        nous aidons les jeunes à accéder plus facilement à leurs envies, qu’il s’agisse de bien-être, de culture ou de
        plaisirs du quotidien.
      </p>

      <p>
        Ici, pas de frustration ni de compromis entre se faire plaisir et gérer son budget.
        Juste un espace chaleureux, pensé pour celles et ceux qui veulent vivre pleinement, sans renoncer à ce qui les
        fait vibrer.
      </p>
    </article>
  </section>;
}
