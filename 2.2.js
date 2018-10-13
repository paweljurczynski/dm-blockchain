const fetch = require('isomorphic-fetch');


async function getLastTransactionHash() {
    const res = await fetch('http://localhost:8545/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBlockByHash',
            params: ['0x9cb93389710a04070b86dbfd8a1e7dbe6e14a3ed2c6a2b7468d8a9d00cc94b5f', false]
        })
    });

    const json = await res.json();
    return json.result.transactions;
}

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
            method: 'eth_getTransactionByHash',
            params: await getLastTransactionHash()
        })
    });

    const json = await res.json();
    const { gas, gasPrice } = json.result;

    console.log(`
        Gas: ${gas}
        Gas price: ${gasPrice}
    `)
}

