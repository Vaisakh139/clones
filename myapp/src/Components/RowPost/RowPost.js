import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { imageUrl, baseUrl ,API_KEY} from '../../Constants/constants'
import './RowPost.css'
import Youtube from 'react-youtube'

const RowPost = (props) => {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios.get(baseUrl+props.url).then(response => {
      console.log(response.data)
      setMovies(response.data.results)
    })
  }, [])
  // ---Youtube video fetching
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  // ---------------------------
  const handleMovie=(id) => {
    console.log(id)
    axios.get(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=ab432e17947097466cb5c843969f0bf1&append_to_response=videos`).then(response => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0])
        console.log(response.data.results[0])
      
      }
      else {
        console.log("array empty")
      }
    }).catch(error => {
      console.error('Error:', error);
    });
}

  return (
    <div className='row'>
      <h2> {props.title}</h2>
      <div className='posters'>
        {movies.map((obj) =>
          
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'small-poster' : 'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`} ></img>
        
        )}
      </div>
      { urlId &&   <Youtube videoId={urlId.key} opts={opts} /> }

    </div>
  )

}
export default RowPost

