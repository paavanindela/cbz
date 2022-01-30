import { useNavigate,useParams,useLocation } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    return (
      <Component
        navigate={useNavigate()}
        params={useParams()}
        location={useLocation()}
        {...props}
        />
    );
  };

  return Wrapper;
};
