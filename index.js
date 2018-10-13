const fetch = require('isomorphic-fetch');

run();

async function run() {
    const res = await fetch('http://localhost:8545/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBlockByNumber',
            params: ['latest', false]
        })
    });

    const json = await res.json();
    const { number, hash, parentHash } = json.result;

    console.log(`
        Block number: ${number}
        Block hash: ${hash}
        Parent hash: ${parentHash}
    `)
}
