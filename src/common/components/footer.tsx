import {useEffect, useState} from "react";
import {Mail, Phone} from "lucide-react";
import Link from "next/link";
import {z} from "zod";
import {Header} from "@velz/common/components/header.tsx";

export function Footer({className}: { className?: string }) {
  const [newsLetterEmail, setNewsLetterEmail] = useState('');
  const [invalidNewsLetterEmail, setInvalidNewsLetterEmail] = useState(true);

  useEffect(() =>
    setInvalidNewsLetterEmail(!!z.string().email().safeParse(newsLetterEmail).error), [newsLetterEmail]);

  return <div className={`py-8 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ${className}`}>
    <div>
      <Header level={3} title="Velz"/>
      <ul className="space-y-2">
        <li>
          <Link href="/engagement" className="transition-colors focus:text-secondary hover:text-secondary">
            Engagement
          </Link>
        </li>
        <li>
          <Link href="/histoire" className="transition-colors focus:text-secondary hover:text-secondary">
            Histoire
          </Link>
        </li>
        <li>
          <Link href="/mission" className="transition-colors focus:text-secondary hover:text-secondary">
            Mission
          </Link>
        </li>
        <li>
          <Link href="/vision" className="transition-colors focus:text-secondary hover:text-secondary">
            Vision
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <Header level={3} title="Contact"/>
      <ul className="space-y-2">
        <li className="flex items-center">
          <Phone size={18} className="mr-2 text-secondary"/>
          <a className="text-nowrap transition-colors whitespace-nowrap focus:text-secondary hover:text-secondary"
             href="tel:+33752081934">
            +33 (0)7 52 08 19 34
          </a>
        </li>
        <li className="flex items-center">
          <Mail size={18} className="mr-2 text-secondary"/>
          <a className="text-nowrap focus:text-secondary hover:text-secondary transition-colors"
             href="mailto:contact@velzapp.com">
            contact@velzapp.com
          </a>
        </li>
      </ul>
      {/*<div className="mt-4 flex space-x-4">*/}
      {/*  <a target="_blank"*/}
      {/*     href="https://instagram.com"*/}
      {/*     rel="noopener noreferrer"*/}
      {/*     className="text-secondary hover:text-primary transition-colors">*/}
      {/*    <Instagram size={24}/>*/}
      {/*  </a>*/}
      {/*  <a target="_blank"*/}
      {/*     href="https://facebook.com"*/}
      {/*     rel="noopener noreferrer"*/}
      {/*     className="text-secondary hover:text-primary transition-colors">*/}
      {/*    <Facebook size={24}/>*/}
      {/*  </a>*/}
      {/*  <a target="_blank"*/}
      {/*     href="https://twitter.com"*/}
      {/*     rel="noopener noreferrer"*/}
      {/*     className="text-secondary hover:text-primary transition-colors">*/}
      {/*    <Twitter size={24}/>*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
    <div>
      <Header level={3} title="Aide"/>
      <ul className="space-y-2">
        <li>
          <Link href="/cgu" className="transition-colors focus:text-secondary hover:text-secondary">
            Conditions Générales
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <Header level={3} title="Newsletter" subtitle="Restez informés des meilleures offres"/>

      <div className="flex">
        <input type="email"
               value={newsLetterEmail}
               placeholder="Votre email"
               onChange={e => setNewsLetterEmail(e.target.value)}
               className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:border-secondary"/>
        <button
          disabled={invalidNewsLetterEmail}
          onClick={e => {
            setInvalidNewsLetterEmail(true);
            fetch(`/api/newsletter/subscribers`, {
              method: 'PATCH',
              body: JSON.stringify({email: newsLetterEmail}),
            }).then(res => res.json())
              .then(({error}) => {
                if (error) return;
                setNewsLetterEmail('');
                const target = e.target as HTMLButtonElement;
                target.innerText = 'Voila qui est fait!';
                setTimeout(() => target.innerText = 'OK', 1_500)
              })
          }}
          className="px-6 py-2 bg-secondary text-white rounded-r-full hover:bg-secondary
                     transition-colors disabled:bg-gray-600 whitespace-nowrap">
          OK
        </button>
      </div>
    </div>
  </div>;
}
