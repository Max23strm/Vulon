'use client'
import EntityCard from '@/app/components/entityComponents/EntityCard';
import { EntityAssigned } from '@/interfaces/requests/entities';
import { Carousel, CarouselSlide } from '@mantine/carousel';

const EntityCarrousel = ({entities}:{entities:EntityAssigned[]}) => {
    return (
        <Carousel
            withIndicators
            height={500}
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg:'25%' }}
            slideGap={{ base: 0, sm: 'md' }}
            emblaOptions={{ loop: true, align: 'center' }}
        >
            {
                entities.map( e => (
                    <CarouselSlide  key={`${e.entity_uid}`}>
                        <EntityCard entity={e}/>
                    </CarouselSlide>

                ))
            }
        </Carousel>
    )
}

export default EntityCarrousel