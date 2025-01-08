export const getMeFetch = async (token) => {
    try{
        const url = 'http://localhost:3977/api/v1/user/me';
        const params = {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        
        if (response.status !== 200) throw result;
        return result

    } catch (error) {
        throw error;
    }
};