import { useContext, useEffect, useState } from "react"
import * as dayjs from 'dayjs'
import Footer from '../Home/Footer'
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"

function EditButton() {
    const path = window.location.pathname;
    const id = path.split('/')[2]
    return (
        <div className="py-5 flex justify-center items-center">
            <Link to={`/edit/${id}`}>
                <button className="border border-white px-4 py-2 rounded-xl text-white text-sm hover:bg-white hover:text-black transition flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit Post
                </button>
            </Link>
        </div>
    )
}

function Post({ data, author, isAuthor }) {
    const date = dayjs(data.datePublished).format('MMM D, YYYY')

    return (
        <div className="main mb-20">
            <div className=" w-full flex justify-center mb-24">
                <img src={`http://192.168.0.104:4400/uploads/`+data.imageName} alt="main image"
                    className="w-1/2 sm:w-full" loading="lazy"
                />
            </div>
            {isAuthor && <EditButton />}
            <div className="heading">
                <h1 className="mb-12 text-white font-extrabold text-4xl text-center">{data.title}</h1>
            </div>
            
            <div className="main-content px-28 sm:px-0 leading-7 text-lg">
                <main>
                    <div className="author&date text-white italic">
                        <span className="uppercase text-xs font-bold text-slate-500 ">{author} </span>
                        <span className="text-slate-500 font-semibold text-sm">&bull; {date}</span>
                    </div>
                    <div 
                        dangerouslySetInnerHTML={{__html: data.content}}
                        className="text-white text-justify mt-8"    
                    ></div>
                </main>
            </div>
        </div>
    )
}

export default function PostPage() {
    const { userInfo } = useContext(UserContext)
    const [postData, setPostData] = useState({})
    const [authorName, setAuthorName] = useState('')
    const [isAuthor, setAuthor] = useState(false)


    async function getPostPageData() {
        const id = window.location.pathname;
        await fetch(`http://192.168.0.104:4400${id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            response.json().then(data => {
                setPostData(data)
                setAuthorName(data.author.username)
                console.log(userInfo)
                if (data.author._id === userInfo?.id) {
                    setAuthor(true)
                }
            })
        })
    }

    useEffect(() => {
        getPostPageData()
    }, [])
    console.log(userInfo)
    if (postData !== null) {
        return (
            <>
                <Post data={postData} author={authorName} isAuthor={isAuthor}/>                
                <Footer />
            </>
        )
    }
}