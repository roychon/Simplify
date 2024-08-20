import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='container'>
      <FontAwesomeIcon icon={faAsterisk} className='icon' />
      <p className='title'><Link to="/">STEMplify</Link></p>
    </div>
  );
}
export default Nav;
