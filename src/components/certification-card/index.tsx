import React from 'react';
import { SanitizedCertification } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  year,
  name,
  body,
  link,
}: {
  year?: React.ReactNode;
  name?: React.ReactNode;
  body?: React.ReactNode;
  link?: string;
}) => (
  <li>
    <div className="when">{year}</div>
    <div className="font-medium">
      <a href={link} target="_blank" rel="noreferrer">
        {name}
      </a>
    </div>
    <h3 className="text-[color:var(--text-2)] font-normal">{body}</h3>
  </li>
);

const CertificationCard = ({
  certifications,
  loading,
}: {
  certifications: SanitizedCertification[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          year={skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}
          name={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          body={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }

    return array;
  };

  return (
    <div className="panel">
      <div className="p-7">
        <div className="mb-4">
          <h5 className="text-lg font-bold tracking-tight">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span>Certifications</span>
            )}
          </h5>
        </div>
        <ol className="career-timeline">
          {loading ? (
            renderSkeleton()
          ) : (
            <>
              {certifications.map((certification, index) => (
                <ListItem
                  key={index}
                  year={certification.year}
                  name={certification.name}
                  body={certification.body}
                  link={certification.link}
                />
              ))}
            </>
          )}
        </ol>
      </div>
    </div>
  );
};

export default CertificationCard;
