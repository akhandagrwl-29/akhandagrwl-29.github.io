import { skeleton } from '../../utils';

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[];
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div key={index}>
          {skeleton({ widthCls: 'w-16', heightCls: 'h-4', className: 'm-1' })}
        </div>,
      );
    }

    return array;
  };

  return (
    <div className="panel h-full">
      <div className="p-7">
        <div className="mb-4">
          <h5 className="text-lg font-bold tracking-tight">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span>Tech stack</span>
            )}
          </h5>
        </div>
        <div className="flow-root">
          <div className="flex flex-wrap gap-2">
            {loading
              ? renderSkeleton()
              : skills.map((skill, index) => (
                  <div key={index} className="skill-chip">
                    {skill}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
