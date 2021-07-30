import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../../App'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import './Admin.css'
const Admin = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/liked', {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })

                }
                console.log(data);
                setData(data)
            })
    }, [])

    const dislike = (id) => {
        fetch('/dislike', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id
            })
        }).then(() => {
            M.toast({ html: "Removed from fav", classes: "#c62828 green darken-3" })

        })
    }
    return (
        <div>

            <div className='containerr'>

                {data.map(item => (
                    <div class="card movie_card" style={{ maxWidth: "30%" }}>
                        <img src={item.Poster} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <i class="fas fa-thumbs-down play_button" onClick={() => { dislike(item.imdbID) }}>
                            </i>
                            <h5 class="card-title" style={{ color: 'black' }}>{item.Title}</h5>
                            <span class="movie_info">{item.Released}</span>
                            <span class="movie_info float-right"><i class="fas fa-star"></i> {item.imdbRating}</span>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Admin