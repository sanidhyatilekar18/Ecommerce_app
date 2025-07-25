import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHouse,
  faCartShopping,
  faBoxes,
  faShirt,
  faPersonDress,
} from '@fortawesome/free-solid-svg-icons';



import { NavLink } from 'react-router-dom';
const getLinkClass = ({ isActive }) =>
  `flex items-center mt-3 gap-3 text-xl font-semibold px-3 py-2 rounded-md 
   ${isActive ? 'text-black bg-white' : 'text-white hover:bg-blue-400'}`;
function Sidebar() {
  return (
    <div className='w-[250px] min-h-screen  bg-blue-500 text-white text-start items-start px-4 py-20'>
     

      <div className='mt-4'>
        
       

      <NavLink to="/" className={getLinkClass}>
  <FontAwesomeIcon icon={faHouse} />
  Home
</NavLink>

<NavLink to="/products" className={getLinkClass}>
  <FontAwesomeIcon icon={faBoxes} />
  Products
</NavLink>

<NavLink to="/mens" className={getLinkClass}>
  <FontAwesomeIcon icon={faShirt} />
  Mens
</NavLink>

<NavLink to="/womens" className={getLinkClass}>
  <FontAwesomeIcon icon={faPersonDress} />
  Womens
</NavLink>

<NavLink to="/cart" className={getLinkClass}>
  <FontAwesomeIcon icon={faCartShopping} />
  Cart
</NavLink>



      </div>

      

      </div>

  );
}

export default Sidebar;