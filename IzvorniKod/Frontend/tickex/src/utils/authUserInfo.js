import axios from 'axios';


export function authUserInfo() {
    const access_token = localStorage.getItem("access_token");
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {return res.data.email;})
            .catch((err) => console.log(err));
}