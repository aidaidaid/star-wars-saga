import { spawn } from "@redux-saga/core/effects";
import { characterLinksWatcher, charactersWatcher, characterInfoWatcher } from "./characters";
import { filmInfoWatcher, filmsWatcher } from "./films";
import { planetInfoWatcher, planetsWatcher } from "./planets";
import { specieInfoWatcher, speciesWatcher } from "./species";
import { starshipInfoWatcher, starshipsWatcher } from "./starships";

export function* rootSaga () {
    yield spawn(charactersWatcher);
    yield spawn(characterInfoWatcher);
    yield spawn(planetsWatcher);
    yield spawn(planetInfoWatcher);
    yield spawn(filmsWatcher);
    yield spawn(filmInfoWatcher);
    yield spawn(starshipsWatcher);
    yield spawn(starshipInfoWatcher);
    yield spawn(speciesWatcher);
    yield spawn(specieInfoWatcher);
    // yield spawn(characterLinksWatcher)
    // yield spawn(todoWatcher)
};