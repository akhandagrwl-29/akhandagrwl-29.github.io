import { FaLinkedin } from 'react-icons/fa';
import { SanitizedAward } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

const AwardCard = ({
  awards,
  loading,
}: {
  awards: SanitizedAward[];
  loading: boolean;
}) => {
  if (!loading && awards.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {loading
        ? awards.map((_, index) => (
            <div className="panel" key={index}>
              <div className="p-6">
                {skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-40',
                  className: 'mb-4',
                })}
                {skeleton({ widthCls: 'w-48', heightCls: 'h-6' })}
              </div>
            </div>
          ))
        : awards.map((award) => (
            <a
              key={award.title}
              className="panel panel-link"
              href={
                award.link ||
                'https://www.linkedin.com/in/akhandagarwal/details/honors/'
              }
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-6 h-full flex flex-col">
                {award.imageUrl && (
                  <div className="award-media mb-5">
                    <LazyImage
                      src={award.imageUrl}
                      alt={award.title}
                      placeholder={skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-full',
                        shape: '',
                      })}
                    />
                  </div>
                )}
                <p className="font-mono-ibm text-xs uppercase tracking-[0.12em] text-[color:var(--text-3)]">
                  {award.issuer}
                  {award.issuer && award.year ? ' · ' : ''}
                  {award.year}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-[color:var(--text-0)]">
                  {award.title}
                </h3>
                {award.description && (
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-2)]">
                    {award.description}
                  </p>
                )}
                <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)]">
                  <FaLinkedin />
                  View on LinkedIn
                </span>
              </div>
            </a>
          ))}
    </div>
  );
};

export default AwardCard;
