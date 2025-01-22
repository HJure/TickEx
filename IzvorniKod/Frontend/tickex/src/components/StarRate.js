import React from 'react';
import '../style/StarRate.css';

function StarRate({ocjena}) {
    const liststars = [];

    for (let i = 0; i < ocjena; i++) {
        liststars.push( <img key={i} src="../images/star.png" alt='star' className='starrate' />);
    }

    return (
        <ul className='rate'>
            {liststars}
        </ul>
    );
}

export default StarRate;
