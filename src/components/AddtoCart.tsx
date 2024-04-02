import React, { useState, useEffect } from 'react';

const [amount, setAmount] = useState<number>(1);

const AddtoCart = () => {
  return (
    <div>
        {/* <div className="summary">Need to make a component to display the variation options and price</div> */}

     <h6 className='text-2xl font-semibold'>$ Product Price</h6>
                        
          <div className='flex flex-row items-center gap-12'>
              <div className='flex flex-row items-center'>
                    <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
                          <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                </div>
                          <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15'>Add to Cart</button>
              </div>
          </div>
  )
}

export default AddtoCart
