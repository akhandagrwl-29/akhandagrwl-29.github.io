import React from 'react';
import { SanitizedEducation } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  time,
  degree,
  institution,
}: {
  time: React.ReactNode;
  degree?: React.ReactNode;
  institution?: React.ReactNode;
}) => (
  <li>
    <div className="when">{time}</div>
    <h3>{degree}</h3>
    <div className="text-[color:var(--text-2)]">{institution}</div>
  </li>
);

const EducationCard = ({
  loading,
  educations,
}: {
  loading: boolean;
  educations: SanitizedEducation[];
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
          degree={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          institution={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
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
              <span>Education</span>
            )}
          </h5>
        </div>
        <ol className="career-timeline">
          {loading ? (
            renderSkeleton()
          ) : (
            <>
              {educations.map((item, index) => (
                <ListItem
                  key={index}
                  time={`${item.from} - ${item.to}`}
                  degree={item.degree}
                  institution={item.institution}
                />
              ))}
            </>
          )}
        </ol>
      </div>
    </div>
  );
};

export default EducationCard;
