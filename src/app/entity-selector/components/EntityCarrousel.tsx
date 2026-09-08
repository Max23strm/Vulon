'use client'
import EntityCard from '@/app/components/entityComponents/EntityCard';
import { Carousel, CarouselSlide } from '@mantine/carousel';

const EntityCarrousel = () => {
    return (
        <Carousel
            withIndicators
            height={500}
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
            slideGap={{ base: 0, sm: 'md' }}
            emblaOptions={{ loop: true, align: 'center' }}
        >
            <CarouselSlide>
                <EntityCard/>
            </CarouselSlide>
             <CarouselSlide>
                <EntityCard/>
            </CarouselSlide>
            {/* <CarouselSlide>
                <EntityCard/>
            </CarouselSlide>
            <CarouselSlide>
                <EntityCard/>
            </CarouselSlide>
            <CarouselSlide>
                <EntityCard/>
            </CarouselSlide>
            <CarouselSlide>
                <EntityCard/>
            </CarouselSlide> */}
        </Carousel>
    )
}

export default EntityCarrousel