import React, { useState, useEffect, useRef } from 'react';

function SpecificationDropdown() {
    const [isOpen, setIsOpen] = useState(false)

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
        ref = {iconRef}
        onClick={() => setIsOpen(prev => !prev)}
        className='bg-primary-red p-4 w-full flex items-center rounded-lg text-white hover:text-primary-purple active:text-primary-purple active:bg-secondary-red'>
        
        {!isOpen ? (
            <i className="fa-solid fa-moon mr-2"></i>
            ) : (
            <i className="fa-regular fa-moon mr-2"></i>
        )}
        Specification Options
      </button>

      {isOpen && (
        <div 
          ref = {menuRef}
          onClick={(() => setIsOpen(false))}
          className='bg-secondary-red absolute top-20 flex flex-col justify-between items-start rounded-lg p-2 w-full'>
          <p>Specification</p>
          <p>Specification</p>
        </div>
      )}
    </div>
  );
}

export default SpecificationDropdown


// https://www.youtube.com/watch?v=KMxX8yFeK5k  for scrolling dropdown menu

