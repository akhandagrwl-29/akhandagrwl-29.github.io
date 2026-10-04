import { ReactNode } from 'react';

const SiteSection = ({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
}) => {
  return (
    <section id={id} className="site-section reveal">
      <div className="site-wrap">
        <header className="section-head">
          <p className="section-label">{label}</p>
          <h2 className="section-title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
};

export default SiteSection;
