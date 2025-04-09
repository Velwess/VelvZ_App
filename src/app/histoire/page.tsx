import velwess from "@velz/assets/velwess.jpeg";
import {Header} from "@velz/common/components/header.tsx";

export default function HistoirePage() {
  return <section className="mx-auto max-w-2xl">
    <Header title="Notre Histoire"/>
    <article className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <img
          className="max-h-auto sm:mr-4 sm:mt-4 sm:float-left md:float-left sm:max-h-[200px] md:max-h-[200px] -translate-y-2 shadow-lg rounded-md overflow-hidden"
          alt="Velwess, fondatrice de Velz."
          src={velwess.src}/>
      </div>
      <div className="space-y-6" style={{marginTop: "0"}}>
        <p>
          Notre fondatrice Velwess a eu un burn out suite à differents
          facteurs profesionnels et personnels. Cette periode s'est suivie de
          plusieurs mois difficiles de depression.
        </p>
        <p>
          Elle a su rebondir grâce au à des activités telle que le Flying
          Yoga, manger de maniere equilibrée, prendre soin de sa santé
          physique avec des vitamines, de la skin care, hair care etc...
        </p>
        <p>
          Au fur à mesure des mois, elle a refleuri de cette episode. Ne
          voulant pas garder pour elle ce qui lui a permis d'aller mieux dans
          une société ou la santé mentale des jeunes s'affaiblit et la
          multiplication d'enseigne de fast food bon marché se multiplie.
        </p>
        <p>
          VelZ est né afin de promouvoir un nouveau modéle de vie ou on ne vit
          pas pour travailler quitte à alterer sa sante on travail pour bien
          vivre.
        </p>
        <p>
          La raison d'etre est trouvée neanmoins entre l'inflation et le prix
          de bien vivre ce n'est pas accessible à tous. Notre but est de
          convaincre le maximum d'enseigne à nous suivre vers un healthy
          lifestyle pour les budgets serrés.
        </p>
      </div>
    </article>
  </section>;
}
