import fetch from 'node-fetch'

const session_cookie : string = '53616c7465645f5fe99c811bc77676dedec59381464227703495fb6bb55c92c05db63d749885b216b3c6026938eb48fdb976ac8357f0c8cd610c531bbd0a505e';

export async function fetchInput(year : number | string, day : number | string, session : string) : Promise<string>
{
    const url =`https://adventofcode.com/${year}/day/${day}/input`

    const res = await fetch(url, {
        headers: {
            "Cookie": `session=${session}`,
        }
    });

    console.log(res);
    if (!res.ok) throw new Error(`Could not fetch input: ${res.status}`);

    const text = await res.text();
    console.log(text);
    return text;
}

await fetchInput(2025, 2, session_cookie);