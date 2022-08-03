import React from 'react'
import memes from "../memeData"

export default function Input(){
    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage: ''
    })

    const [allMemes, setAllMemes] = React.useState('http://i.imgflip.com/1bij.jpg')

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=> res.json())
        .then(data=> setAllMemes(data.data.memes))
        console.log('done', allMemes)
    }, [])

    function getMemeImage(e) {
        e.preventDefault()
        const index = Math.floor(Math.random() * allMemes.length)
        const memeCalled = allMemes[index].url
        setMeme(prev=> {
            return {
                ...prev,
                randomImage: memeCalled
            }
        })
        console.log(meme)
    }

    function handleChange(event){
        event.preventDefault;
        const {name, value} = event.target;
        console.log(name, value)
        setMeme(prev=> {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <section className='input-container'>
            <form  action="">
                <div className='input-fields'>
                    <input name="topText" value={meme.topText} onChange={handleChange} className='text-box' type="text" placeholder='Text for top'/>
                    <input name="bottomText" value={meme.bottomText} onChange={handleChange} className='text-box' type="text" placeholder='Text for bottom' />
                </div>
                <div className='btn-section'>
                <button onClick={getMemeImage} className='generate-meme-btn'>Get A New Image</button>
                </div>
            </form>
            <div className='photo-container'>
                <img className='memePhoto' src={meme.randomImage} alt="Photo goes here" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </section>
    )
}