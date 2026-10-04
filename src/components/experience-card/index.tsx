import React, { Fragment } from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  time,
  position,
  company,
  companyLink,
}: {
  time: React.ReactNode;
  position?: React.ReactNode;
  company?: React.ReactNode;
  companyLink?: string;
}) => (
  <li>
    <div className="when">{time}</div>
    <h3>{position}</h3>
    <div className="text-[color:var(--text-2)]">
      <a href={companyLink} target="_blank" rel="noreferrer">
        {company}
      </a>
    </div>
  </li>
);

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}
          position={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          company={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }

    return array;
  };
  return (
    <div className="panel">
      <div className="p-8">
        <ol className="career-timeline">
          {loading ? (
            renderSkeleton()
          ) : (
            <Fragment>
              {experiences.map((experience, index) => (
                <ListItem
                  key={index}
                  time={`${experience.from} - ${experience.to}`}
                  position={experience.position}
                  company={experience.company}
                  companyLink={
                    experience.companyLink ? experience.companyLink : undefined
                  }
                />
              ))}
            </Fragment>
          )}
        </ol>
      </div>
    </div>
  );
};

export default ExperienceCard;
