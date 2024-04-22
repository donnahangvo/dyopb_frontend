import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/AELogo.png';
import ExploreDropdown from './ExploreDropdown';
import CategoryDropdown from './CategoryDropdown';

interface NavbarProps {
    toggleBagVisibility: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleBagVisibility }) => {
    return (
        <nav className='flex items-center justify-between flex-wrap bg-primary-red p-3'>
            <div className='flex items-center flex-shrink-0 text-white mr-6'>
                <Link to='/'>
                    <img className="object-fit h-10" src={Logo} alt="Adorkable Emporium" />
                </Link>
            </div>

            <div className="flex flex-row items-center justify-between flex-wrap">
                <div>
                    <Link to='#' className='flex place-items-center mt-2 mr-10 lg:inline-block lg:mt-0 text-white font-bold hover:text-primary-purple'>Adorkable Emporium</Link>
                </div>
                <div>
                    <div className='flex place-items-center mt-2 lg:inline-block lg:mt-0 text-white font-semibold'><ExploreDropdown /></div>
                </div>
                <div>
                    <div className='flex place-items-center mt-2 mr-3 lg:inline-block lg:mt-0 text-white font-semibold'><CategoryDropdown /></div>
                </div>
                <div>
                    <Link to='#' className='flex place-items-center mt-2 lg:inline-block lg:mt-0 text-white font-semibold hover:text-primary-purple mr-5'><i className="fa-solid fa-magnifying-glass"></i></Link>
                </div>
                <div>
                    <Link to='#' className='flex place-items-center mt-2 lg:inline-block lg:mt-0 text-white font-semibold hover:text-primary-purple mr-5'><i className="fa-solid fa-user"></i></Link>
                </div>
                <div>
                    <Link to='#' onClick={toggleBagVisibility} className='flex place-items-center mt-2 lg:inline-block lg:mt-0 text-white hover:text-primary-purple'>
                        <i className="fa-solid fa-bag-shopping"></i>
                    </Link>
                </div>
            </div>
            {/* <div className='block'>
                <button className='flex items-center justify-between px-3 py-2 text-white border rounded border-secondary-red hover:text-primary-purple hover:border-primary-purple'>
                    <i className='fas fa-bars'></i>
                </button>
            </div> */}
        </nav>
    );
}

export default Navbar;


