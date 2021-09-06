import React, {useState, useEffect} from 'react';
import data from './data';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function App() {
  const [people, setPeople] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect( ()=>{
    if(currentIndex<0)
    {
      setCurrentIndex(people.length-1);
    }
    if(currentIndex>people.length-1)
    {
      setCurrentIndex(0);
    }

  },[currentIndex,people]);

  useEffect( ()=>{
    let slider = setInterval( ()=>{
      setCurrentIndex(currentIndex+1);
    }, 6000);
    return()=> clearInterval(slider);
  },[currentIndex]);

  return (
    <main>
      <h2>Our Team</h2>
      <section className='slide-container'> 

        {
          people.map((person, index) => {
            const{id, image, name, title, quote} = person;
            let position = 'rightSlide';
            if(index === currentIndex)
            {
              position = 'activeSlide';
            }
            else if(index === currentIndex-1 || (currentIndex === 0 && index === people.length-1))
            {
              position = 'leftSlide';
            }


            return <article className={position} key={index}>
              <img src={image} alt={name}/>
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
            </article>
          })
        }

        <button className='left' onClick={() => setCurrentIndex(currentIndex-1)}><FiChevronLeft/></button>
        <button className='right'onClick={() => setCurrentIndex(currentIndex+1)}><FiChevronRight/></button>

      </section>
    </main>
  );
}

export default App;
