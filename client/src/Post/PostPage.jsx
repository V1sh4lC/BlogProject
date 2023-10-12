import { useEffect, useState } from "react"
import * as dayjs from 'dayjs'
import Footer from '../Home/Footer'

export default function PostPage() {
    const [postData, setPostData] = useState({})
    const date = dayjs(postData.datePublished).format('MMM D, YYYY')

    useEffect(() => {
        const id = window.location.pathname;
        fetch(`http://192.168.0.104:4400${id}`, {
            method: 'GET',
        }).then(response => {
            response.json().then(data => {
                setPostData(data)
                console.log(postData)
            })
        })
    }, [])

    return (
        <>
        <div className="main">
            <div className=" w-full flex justify-center mb-24">
                <img src={`http://192.168.0.104:4400/uploads/`+postData.imageName} alt="main image"
                    className="w-1/2 sm:w-full" 
                />
            </div>
            <div className="heading">
                <h1 className="mb-12 text-white font-extrabold text-4xl text-center">{postData.title}</h1>
            </div>
            
            <div className="main-content px-28 sm:px-0 leading-7 text-lg">
                <main>
                    <div className="author&date text-white italic">
                        <span className="uppercase text-xs font-bold text-slate-500 ">{postData.author} </span>
                        <span className="text-slate-500 font-semibold text-sm">&bull; {date}</span>
                    </div>
                    <div 
                        dangerouslySetInnerHTML={{__html: postData.content}}
                        className="text-white text-justify mt-8"    
                    ></div>
                </main>
            </div>
        </div>
        <Footer />
        </>
    )
}