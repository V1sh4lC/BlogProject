import { useEffect, useState } from 'react'
import * as dayjs from 'dayjs'
import { Link, Outlet } from 'react-router-dom'
import Footer from "./Footer"

function ItemCard({ data }) {

    const date = dayjs(data.datePublished).format('MMM D, YYYY')
    // const image = '.' + "" + data.imagePath + data.imageName;
    // console.log(image)

    return (
            <div className="mb-3 cursor-pointer rounded-md shadow-sm gap-3 p-3 border border-slate-800 flex h-60" id="main">
                    <div className="overflow-hidden rounded-md w-1/4 h-full" id="image-container">
                        <Link to={`article/${data._id}`}>
                            <img id='cardImage' className="h-full w-full object-cover" src={'http://192.168.0.104:4400/uploads/' + data.imageName} alt="osama bin laden image" />
                        </Link> 
                    </div>
                    <div className="text-slate-300 w-3/4" id="content-container">
                        <Link to={`article/${data._id}`}>
                        <h3 className="font-semibold text-2xl mb-3">{data.title}</h3>
                        </Link>
                        <p id='description'>{data.description}</p>
                        <span className="text-xs font-semibold mr-2 uppercase">{data.author.username}</span>
                        <span className="text-xs font-semibold">&bull; {date}</span>
                    </div>
            </div>
    )
}

export default function Homepage() {
    const [posts, setPosts] = useState([])
    async function getPosts() {
        await fetch('http://192.168.0.104:4400/api/posts', {
            method: 'GET'
        }).then(response => {
            response.json().then(info => {
                setPosts(info)
            })
        })
    }
    // title, description, imagePath, imageName, content, author, datePublished.
    useEffect(() => {
        getPosts()
    },[])

    return (
        <>
            <section>
                {posts.map(data => <ItemCard data={data} />)}
            </section>
            <footer>
                <Footer />
            </footer>
        </>
    )
    
}