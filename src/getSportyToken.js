const client_id = '4e26cacefd34439e9adc631bdb591eb5';
const client_secret = '3fad3eebe0ce495bb06e6bb556f67e85';

const baseURL = (id, secret) => `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`

async function token() {
    try {
        const response = await fetch(baseURL(client_id, client_secret), {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        const { access_token, token_type } = await response.json();
        return `${token_type} ${access_token} `;
    } catch (error) {
        return error;
    }
}

export default token;