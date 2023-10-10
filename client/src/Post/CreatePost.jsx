import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'
import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'

export default function CreatePost() {
    const [cardInfo, setCardInfo] = useState({})
    const [imageFile, setImageFile] = useState('')
    const [content, setContent] = useState('')
    const { userInfo } = useContext(UserContext)

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
        if (cardInfo?.title === null || cardInfo?.description === null || imageFile === '' || content === '') {
            alert("Invalid Post!")
        } else {
            const data = new FormData();
            data.set('title', cardInfo.title);
            data.set('description', cardInfo.description);
            data.set('file', imageFile[0]);
            data.set('content', content);
            data.set('author', userInfo?.username);

            await fetch('http://localhost:4400/api/post', {
                method: 'POST',
                body: data,
                credentials: 'include'
            }).then(response => {
                response.json().then(info => {
                    console.log(info)
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
        </form>
    )
}