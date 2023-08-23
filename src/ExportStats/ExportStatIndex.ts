import {getBiomeAt, getBiomeName, getMapping} from "./BiomeInterface";
import {log, mapDimensions} from "./MapUtility";
import {formatOutput} from "./Formatting";


const {start, end} = mapDimensions()
const {mcVersion} = params

const biomes: number[] = [];
for (let i = 0; i < 256; i++)
    biomes.push(0)

const incrementBiome = (id: number) => biomes[id] += 16


for (let x = start.x; x < end.x; x += 4) {
    for (let y = start.y; y < end.y; y += 4) {
        const biome = getBiomeAt(x, y)
        incrementBiome(biome)
    }
}

const totalSurface = (end.x - start.x) * (end.y - start.y)

const mapping = getMapping(mcVersion)

const biomesMap = biomes
    .map((a, i) => (
        {
            id: i,
            count: a,
            name: getBiomeName(i, mapping)
        }
    ))
    .filter((a) => a.count > 0)
    .sort((a, b) => b.count - a.count)
    .map(a => ({
        name: a.name,
        count: a.count.toLocaleString(),
        percent: (a.count / totalSurface * 100).toFixed(2) + "%",
        id: a.id
    }))

const {x, y} = {x: (end.x - start.x) / 1000, y: (end.y - start.y) / 1000}

const information= { biomes: biomesMap, surface: x*y, width: x, height: y }

if (params.pretty) {
    log(formatOutput(information))
} else {
    log("biomes: " + JSON.stringify(information, undefined, 2))
}
