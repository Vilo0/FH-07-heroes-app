import { heroes } from '../data/heroes';

export const getHeroesByName = (name = '') => {
    console.log('gerByHeroesByName called');

    name = name.toLowerCase();
    if(name === '') return [];
    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name));

}