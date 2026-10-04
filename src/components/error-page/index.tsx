import { CustomError } from '../../constants/errors';

const ErrorPage: React.FC<CustomError> = (props) => {
  return (
    <div className="min-h-screen flex items-center p-5 lg:p-20 relative">
      <div className="site-wrap panel p-10 lg:p-20">
        <p className="section-label">{props.status}</p>
        <h1 className="display" style={{ fontSize: '3rem' }}>
          {props.title}
        </h1>
        <div className="lede">{props.subTitle}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
