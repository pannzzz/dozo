import React from 'react';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/Carousel';
import NewsSectionComponent from '../components/NewsSectionComponent';
import PickUpSectionComponent from '../components/PickUpSectionComponent';
import HowToUseSectionComponent from '../components/HowToUseSectionComponent'; // Importa la sección How to Use
import CategoryComponent from '../components/CategoryComponent';
import FooterComponent from '../components/FooterComponent';



const HomePage = () => {
    return (
        <div>
                <Navbar />
            <CarouselComponent />
            <NewsSectionComponent />
            <PickUpSectionComponent />
            <HowToUseSectionComponent />
            <CategoryComponent /> 
            <FooterComponent />
        </div>
    );
};

export default HomePage;
