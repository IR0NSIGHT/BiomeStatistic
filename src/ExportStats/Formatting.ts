export const padEnd = (str: string, length: number, char: string = " ") => {
    return str + char.repeat(length - str.length)
}
export const formatOutput = (stats: { name: string, count: string, percent: string, id: number }[]): string => {
    const longestName = Math.max(...stats.map(a => a.name.length));

    return stats.map(a => formatStat(a, longestName)).join("\n")
}

export const formatStat = (stat:  { name: string, count: string, percent: string, id: number }, longestName: number): string => {
    return `${padEnd(stat.name+":", longestName+1," ")} ${stat.percent}`
}