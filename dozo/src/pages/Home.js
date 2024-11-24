import React from 'react';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/Carousel';
import NewsSectionComponent from '../components/NewsSectionComponent';
import PickUpSectionComponent from '../components/PickUpSectionComponent';
import HowToUseSectionComponent from '../components/HowToUseSectionComponent'; // Importa la sección How to Use
import Ranking from '../components/rankin';
import CategoryComponent from '../components/CategoryComponent';
import FooterComponent from '../components/FooterComponent';
import FloatingButton from '../components/FloatingButton'; // Importa el botón flotante

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <CarouselComponent />
            <NewsSectionComponent />
            <PickUpSectionComponent />
            <HowToUseSectionComponent />
            <Ranking /> {/* Ranking agregado */}
            <CategoryComponent />
            <FooterComponent />
            <FloatingButton /> {/* Botón flotante agregado */}
        </div>
    );
};

export default HomePage;
