function ItemCard({ data }) {
    return (
            <div className="mb-3 cursor-pointer rounded-md shadow-sm gap-3 p-3 border border-slate-800 flex h-60" id="main">
                <div className="overflow-hidden rounded-md w-1/3 h-full" id="image-container">
                    <img className="h-full w-full object-cover" src={data.src} alt="osama bin laden image" />
                </div>
                <div className="text-slate-300">
                    <h3 className="font-semibold text-2xl mb-3">{data.title}</h3>
                    <p className="">{data.description}</p>
                    <span className="text-xs font-semibold mr-2">{data.author}</span>
                    <span className="text-xs font-semibold">&bull; {data.date}</span>
                </div>
            </div>
    )
}

export default function Homepage() {

    const dataSet = [{
        src: "https://pbs.twimg.com/media/BPPlg6PCYAAwpHH.jpg",
        title: "Osama Bin Lantern",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
        author: "Author Name",
        date: '7 Oct, 2023'
    },{
        src: "https://pbs.twimg.com/media/BPPlg6PCYAAwpHH.jpg",
        title: "Osama Bin Lantern",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
        author: "Author Name",
        date: '7 Oct, 2023'
    },{
        src: "https://pbs.twimg.com/media/BPPlg6PCYAAwpHH.jpg",
        title: "Osama Bin Lantern",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
        author: "Author Name",
        date: '7 Oct, 2023'
    }]


    return (
        <section>
            {dataSet.map((data) => <ItemCard data={data}/>)}
        </section>
    )
}