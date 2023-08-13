
function log(mssg: string) {
    //@ts-ignore
    print(mssg);
}


type point = { x: number; y: number };
const mapDimensions = (): { start: point; end: point } => {
    return {
        start: {x: 128 * dimension.getLowestX(), y: 128 * dimension.getLowestY()},
        end: {
            x: 128 * (dimension.getHighestX() + 1) - 1,
            y: 128 * (dimension.getHighestY() + 1) - 1,
        },
    };
}
const {start, end} = mapDimensions()
const {mcVersion} = params

const biomes: number[] = [];
for (let i = 0; i < 256; i++)
    biomes.push(0)

const incrementBiome = (id: number) => {
        biomes[id] += 16
    }

;

const getBiomeAt = (x: number, y: number): number => {
    return dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y)
}

for (let x = start.x; x < end.x; x += 4) {
    for (let y = start.y; y < end.y; y += 4) {
        const biome = getBiomeAt(x, y)
        incrementBiome(biome)
    }
}

const totalSurface = (end.x - start.x) * (end.y - start.y)

const getMapping = (mcVersion: number): string[] => {
    if (mcVersion >= 19)
        return org.pepsoft.worldpainter.biomeschemes.Minecraft1_19Biomes.BIOME_NAMES as string[]
    if (mcVersion >= 17)
        return org.pepsoft.worldpainter.biomeschemes.Minecraft1_17Biomes.BIOME_NAMES as string[]
    if (mcVersion >= 7)
        return org.pepsoft.worldpainter.biomeschemes.Minecraft1_7Biomes.BIOME_NAMES as string[]
    else
        throw new Error("unsupported mc version")
}

const mapping = getMapping(mcVersion)
const getBiomeName = (id: number): string => {
    if (id < 0 || id >= mapping.length)
        return "invalid biome"
    if (mapping[id] == null && id == 255)
        return "autobiome"
    if (mapping[id] == null)
        return "unknown"
    return mapping[id]
}

const biomesMap = biomes
    .map((a, i) => (
        {
            id: i,
            count: a,
            name: getBiomeName(i)
        }
    ))
    .filter((a) => a.count > 0)
    .sort((a, b) => b.count - a.count)
    .map(a => ({
        name: a.name,
        count: a.count.toLocaleString(),
        percent: (a.count / totalSurface * 100).toFixed(2)+"%",
        id: a.id
    }))

log("biomes: " + JSON.stringify(biomesMap,undefined,2))