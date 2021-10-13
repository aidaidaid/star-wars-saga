import { spawn } from "@redux-saga/core/effects";
import { charactersWatcher, characterInfoWatcher } from "./characters";
import { filmInfoWatcher, filmsWatcher } from "./films";
import { planetInfoWatcher, planetsWatcher } from "./planets";
import { specieInfoWatcher, speciesWatcher } from "./species";
import { starshipInfoWatcher, starshipsWatcher } from "./starships";
import { vehicleInfoWatcher, vehiclesWatcher } from "./vehicles";

export function* rootSaga () {
    yield spawn(charactersWatcher);
    yield spawn(characterInfoWatcher);
    yield spawn(planetsWatcher);
    yield spawn(planetInfoWatcher);
    yield spawn(filmsWatcher);
    yield spawn(filmInfoWatcher);
    yield spawn(starshipsWatcher);
    yield spawn(starshipInfoWatcher);
    yield spawn(vehiclesWatcher);
    yield spawn(vehicleInfoWatcher);
    yield spawn(speciesWatcher);
    yield spawn(specieInfoWatcher);
};