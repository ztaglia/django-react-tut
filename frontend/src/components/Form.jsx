import {useState} from 'react'
import api from '../api'
import {useNavigate} from 'react-router-dom'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants'
import '../styles/Form.css'

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register';

    // prevents us from actually submitting the form
    // will remove default "submitting" behavior
    // if the method is login then we must get the access token and refresh token from the response and set them
    // if method is not login it must be register 
    // since there are no tokens we receive after registering a user 
    // we must send the user back to the login page 
    const handleSubmit = async (e) => {
        console.log('submit');
        setLoading(true);
        e.preventDefault();

        try {
            console.log("DATA SENT:", { username, password });
            const res = await api.post(route, {username, password});
            console.log('Login response:', res.data);
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log("ERROR:", error.response ? error.response.data : error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    // name for title of the form 
    // takes input and sets it (setUsername) where e is input
    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>{name}</h1>
            <input 
                className="form-input" 
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />
            <input 
                className="form-input" 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button className='form-button' type='submit'>
                {name}
            </button>
        </form>
    )
}

export default Form