import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/AELogo.png';
import Newsletter from './Newsletter';

const Footer = () => {
    return (
  
        <footer>
            <div className="footer-wrapper bg-secondary-yellow sticky bottom-0">


                <div className="footer-social-media flex flex-col items-center">
                        <div className="footer-icons p-5">
                            <Link to='#' className='p-3'><i className="fab fa-instagram"></i></Link>
                            <Link to='#' className='p-3'><i className="fab fa-youtube"></i></Link>
                            <Link to='#' className='p-3'><i className="fab fa-facebook"></i></Link>
                            <Link to='#' className='p-3'><i className="fa-brands fa-tiktok"></i></Link>
                        </div>
                    </div>

                    <div className='flex justify-evenly'>

                    <div className='footer-section-one'>
                        <Link to='/'><img className="object-fit h-20" src={Logo} alt="Adorkable Emporium" /></Link>
                        {/* <Newsletter /> */}
                    </div>

            
                    <div className="footer-section-two flex">
                        <div className="footer-section-columns">
                            <Link to='./About'><p className='p-3'>About</p></Link>
                            <Link to='./Contact'><p className='p-3'>Contact</p></Link>
                            <Link to='./Shop'><p className='p-3'>Shop</p></Link>
                        </div>
                    </div>
        
                    <div className="footer-section-three flex-col">
                        <div className="footer-section-columns">
                            <Link to='./SignIn'><p className='p-3'><i className="fa-solid fa-right-to-bracket"></i> Sign In</p></Link>
                            <Link to='./SignUp'><p className='p-3'><i className="fa-solid fa-user-plus"></i> Sign Up</p></Link>
                        </div>
                    </div>
                </div>
                <div className="bg-primary-yellow p-6 text-center">
                    <span>© 2024 Copyright: </span>
                    <a className="font-semibold" href="https://adorkableemporium.com/">Adorkable Emporium</a>
                </div>
            </div>
        </footer>
    );
  };

export default Footer;