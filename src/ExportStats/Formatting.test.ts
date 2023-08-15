import {formatOutput, formatStat, padEnd} from "./Formatting";

describe('Formatting', () => {
    test('padEnd', () => {
        const s = "hello";
        expect(padEnd(s, 5)).toBe("hello");
        expect(padEnd(s, 10)).toBe("hello     ");
    })

    test("format single stat", () => {
        const stat = {
            "name": "Deep Ocean",
            "count": "2016288",
            "percent": "48.12%",
            "id": 24
        }
        expect(formatStat(stat, 10)).toBe("Deep Ocean: 48.12%");
        expect(formatStat(stat, 15)).toBe("Deep Ocean:      48.12%");
    })


test('formatOutput', () => {
    const biomes = [
        {
            "name": "Deep Ocean",
            "count": "2016288",
            "percent": "48.12%",
            "id": 24
        },
        {
            "name": "Plains",
            "count": "1088224",
            "percent": "25.97%",
            "id": 1
        },
        {
            "name": "Forest",
            "count": "544896",
            "percent": "13.00%",
            "id": 4
        },
        {
            "name": "Ocean",
            "count": "264016",
            "percent": "6.30%",
            "id": 0
        },
        {
            "name": "River",
            "count": "163440",
            "percent": "3.90%",
            "id": 7
        },
        {
            "name": "Windswept Hills",
            "count": "65072",
            "percent": "1.55%",
            "id": 3
        },
        {
            "name": "Beach",
            "count": "48976",
            "percent": "1.17%",
            "id": 16
        },
        {
            "name": "Snowy Plains",
            "count": "2816",
            "percent": "0.07%",
            "id": 12
        },
        {
            "name": "Snowy Taiga",
            "count": "416",
            "percent": "0.01%",
            "id": 30
        },
        {
            "name": "Frozen River",
            "count": "160",
            "percent": "0.00%",
            "id": 11
        }
    ];

    const formatted = formatOutput(biomes);

    expect(formatted).toBe(`Deep Ocean:      48.12%\nPlains:          25.97%\nForest:          13.00%\nOcean:           6.30%\nRiver:           3.90%\nWindswept Hills: 1.55%\nBeach:           1.17%\nSnowy Plains:    0.07%\nSnowy Taiga:     0.01%\nFrozen River:    0.00%`);

})
})