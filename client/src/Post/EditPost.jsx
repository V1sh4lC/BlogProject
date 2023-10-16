import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function EditPost() {
    const [cardInfo, setCardInfo] = useState({})
    const [imageFile, setImageFile] = useState('')
    const [content, setContent] = useState('')
    const { userInfo } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    const navigate = useNavigate();
    // if (redirect) {navigate('/')}

    async function getEditPost() {
        const path = window.location.pathname;
        const id = path.split('/')[2]
        await fetch(`http://192.168.0.104:4400/article/${id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            response.json().then(data => {
                setCardInfo(values => ({...values, ['title']: data.title}))
                setCardInfo(values => ({...values, ['description']: data.description}))
                setContent(data.content)
            })
        })
    }

    useEffect(() => {
        getEditPost();
    }, [])

    const modules = {
        toolbar: [
            [{font: []}],
            [{size: []}],
            [{align: []}],
            ['bold', 'italic', 'underline', 'strike'],
            [{color: []} , {background: []}],
            [{script: 'super'}, {script: 'sub'}],
            ['blockquote', 'code-block', 'code'],
            [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            ['link'],
            ['clean']
        ]
    }
    // image, video - disabled for now

    async function handleSubmission(ev) {
        ev.preventDefault();
        if (cardInfo?.title === null || cardInfo?.description === null || content === '') {
            alert("Invalid Post!")
        } else {
            const path = window.location.pathname;
            const id = path.split('/')[2]
            const data = new FormData();
            data.set('title', cardInfo.title);
            data.set('description', cardInfo.description);
            data.set('file', imageFile?.[0])
            data.set('content', content);
            data.set('_id', id);
            // data.set('author', userInfo?.username);

            await fetch('http://192.168.0.104:4400/api/post', {
                method: 'PUT',
                body: data,
                credentials: 'include'
            }).then(response => {
                response.json().then(info => {
                    if (info.postUpdateStatus === 'ok') {
                        // setRedirect(true)
                       navigate('/')
                    }
                })
            })
        }        
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setCardInfo(values => ({...values, [name]: value}))
    }

    return (
        <form encType='multipart/form-data' onSubmit={handleSubmission} className="p-2 pt-6 rounded-md">
            <input 
                type="text" 
                placeholder="Title"
                className="postInputs"
                name='title'
                value={cardInfo.title}
                onChange={handleChange}
            />
            <br />
            <input 
                type="text" 
                placeholder="Description" 
                className="postInputs"
                name='description'
                value={cardInfo.description}
                onChange={handleChange}
                maxLength="350"
            />
            <br />
            <input 
                type="file" 
                accept='image/*'
                className="mb-2 
                file:text-white file:border-none
                file:outline-none file:rounded-md 
                file:bg-slate-800
                hover:file:bg-slate-600 file:py-1
                text-white"
                name='file'
                value={cardInfo.file}
                onChange={(ev) => setImageFile(ev.target.files)}
                
            />
            <br />
            <ReactQuill
                // formats={formats}
                className='text-white'
                modules={modules}
                value={content}
                onChange={setContent}
            />  
            <input 
                className='w-full mt-2 bg-slate-700 text-white rounded-sm py-2 hover:bg-slate-600'
                type="submit" 
                value="Post"
            />    
            <p className='text-gray-600 text-xs mt-3'>Keep image button unhindered if you don't want to update article cover*</p>          
        </form>
    )
}