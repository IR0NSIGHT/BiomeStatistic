export type biomeInfo = { name: string, count: string, percent: string, id: number }
export type information = { biomes: biomeInfo[], surface: number, width: number, height: number }


export const padEnd = (str: string, length: number, char: string = " ") => {
    return str + char.repeat(length - str.length)
}
export const formatOutput = (information: information): string => {
    const stats = [];


    stats.push({name: "surface", value: information.surface.toFixed(2) + " square km"})
    stats.push({name: "width", value: information.width.toFixed(2)  + " km"})
    stats.push({name: "height", value: information.height.toFixed(2)  + " km"})
    stats.push(...information.biomes.map(a => ({name: a.name, value: a.percent})))

    const longestName = Math.max(...stats.map(a => a.name.length));
    return stats.map(a => formatStat(a, longestName)).join("\n")
}

export const formatStat = (stat: { name: string, value: string }, padding: number): string => {
    return `${padEnd(stat.name + ":", padding + 1, " ")} ${stat.value}`
}