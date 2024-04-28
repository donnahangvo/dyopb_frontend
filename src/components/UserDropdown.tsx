import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    // const [isVisible, setIsVisible] = useState(false);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const signOutOnClick = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    const signInOnClick = () => {
        loginWithRedirect();
    };
    const menuRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && iconRef.current && !menuRef.current.contains(e.target as Node) && !iconRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative flex flex-col items-center w-[150px] rounded'>
            <button
                ref={iconRef}
                onClick={() => setIsOpen(prev => !prev)}
                className='bg-primary-red p-4 w-full flex items-center rounded-lg text-white hover:text-primary-purple active:text-primary-purple active:bg-secondary-red'>
                {!isOpen ? (
                    <i className="fa-solid fa-moon mr-2"></i>
                ) : (
                    <i className="fa-regular fa-moon mr-2"></i>
                )}
                <i className="fa-solid fa-user"></i>
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    onClick={() => setIsOpen(false)}
                    className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full hover:bg-secondary-red'>
                    {/* <Link to='/signup' className='text-white hover:text-primary-purple'>Sign Up</Link> */}
                    
                    {
                            !isAuthenticated ? 
                                <div>
                                    <Link to='/signin' onClick={signInOnClick} className='text-white hover:text-primary-purple'>
                                        Sign In
                                    </Link>
                                </div>
                            :
                                <div>
                                    <div>
                                        <Link to='/myaccount' className='text-white hover:text-primary-purple'>My Account</Link>
                                    </div>
                                    <div>
                                        <Link to="/" onClick={signOutOnClick} className='text-white hover:text-primary-purple'>
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>

                        }
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
