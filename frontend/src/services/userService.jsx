const url = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Gagal ambil user');
        }
        const data = await response.json();
        return data;
    } catch (err){
        console.log("Error message" + err);
    }
}

export const createUser = async (nama) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            name: nama
        })
    });
    return res.json();
}

export const deleteUser = async (id) => {
    const res = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    return res.json();
};

export const updateUser = async (id,nama) => {
    const res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify({ name: nama })
    })
}

