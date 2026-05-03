import './../css/main.css'

import Home from './../image_folder/Home.png'
import Gallery from './../image_folder/Gallery.png'
import Livecam from './../image_folder/Video.png'
import Feedset from './../image_folder/Feed.png'
import Aireport from './../image_folder/Report.png'


const Bottom: React.FC = () => {

    let array = [
        {name:'Home',icon:Home},
        {name:'Gallery',icon:Gallery},
        {name:'Live cam',icon:Livecam},
        {name:'Feed set',icon:Feedset},
        {name:'Ai report',icon:Aireport},
    ]

    return(
        <div className='bottom-nav'>
            {array.map(function(a,i){
                return(
                <div className='nav-item'>
                <img src={array[i].icon} className='nav-icon'></img>
                    <p>{array[i].name}</p>
                </div>
            )
            }
            )
        }
        </div>
    )
}

export default Bottom;