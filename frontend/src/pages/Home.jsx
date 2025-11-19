import {useState, useEffect} from 'react'
import api from '../api'

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get('/api/notes/')
        .then((res) => res.data)
        .then((data) => setNotes(data))
        .catch((err) => alert(err));
    };

    // call getNotes() again to display notes 
    // rather than more optimal way (deleting from list in JS)
    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert('Note deleted.')
            else alert('Failed to delete note.')
        }).catch((error) => alert(error));
        getNotes();
    };

    // e will come from a form, so must prevent default submission process
    // call getNotes() again to display notes 
    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/notes/', {content, title})
        .then((res) => {
            if (res.status === 201) alert('Note created!')
            else alert('Failed to make note.')
        }).catch((err) => alert(err));
        getNotes();
    }

    return <div>Home</div>
}

export default Home