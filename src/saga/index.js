import { spawn } from "@redux-saga/core/effects";
import { characterLinksWatcher, charactersWatcher, characterInfoWatcher } from "./characters";
import { planetInfoWatcher, planetsWatcher } from "./planets";

export function* rootSaga () {
    yield spawn(charactersWatcher)
    yield spawn(characterInfoWatcher)
    yield spawn(planetsWatcher)
    yield spawn(planetInfoWatcher)
    // yield spawn(characterLinksWatcher)
    // yield spawn(todoWatcher)
};