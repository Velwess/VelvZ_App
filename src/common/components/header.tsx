import {ReactNode} from "react";

export interface HeaderProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
  centered?: boolean;
  subtitle?: string;
  title: string;
}

export function Header({level = 1, title, subtitle, children, centered}: HeaderProps) {
  return <header className={[
    'mb-8 font-bold [&_:nth-child(2)]:leading-6',
    {
      1: '[&_h1]:text-4xl',
      2: '[&_h2]:text-3xl',
      3: '[&_h3]:text-2xl',
      4: '[&_h4]:text-lg',
      5: '[&_h5]:text-base',
      6: '[&_h6]:text-sm',
    }[level],
    centered && 'text-center',
  ].filter(Boolean).join(' ')}>
    {children}
    {1 === level ? <h1>{title}</h1>
      : 2 === level ? <h2>{title}</h2>
        : 3 === level ? <h3>{title}</h3>
          : 4 === level ? <h4>{title}</h4>
            : 5 === level ? <h5>{title}</h5>
              : <h6>{title}</h6>}
    {subtitle ? <small className="mt-2 italic">{subtitle}</small> : null}
  </header>;

}
