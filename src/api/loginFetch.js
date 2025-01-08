export const loginFetch = async (data) => {
    try{
        const url = 'http://localhost:3977/api/v1/auth/login';
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        
        if (response.status !== 200) throw result;
        return result

    } catch (error) {
        throw error;
    }
};