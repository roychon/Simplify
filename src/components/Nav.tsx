import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  return (
    <div className='container'>
      <FontAwesomeIcon icon={faAsterisk} className='icon' />
      <p className='title'>STEMplify</p>
    </div>
  );
}
export default Nav;
