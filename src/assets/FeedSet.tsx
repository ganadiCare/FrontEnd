import Header from "./components/Header"
import Nav from "./components/Nav"
import './css/feed.css'

interface FeedSetProps {
  data?:string;
}

const FeedSet: React.FC = () => {

    const currentScreen = 'feed';

    return(<>
     <Header
        title='DISPENSER'
      />
    <div className="title">
        <span>ㅎㅇㅎㄹ</span>
    </div>


    <Nav currentScreen = {currentScreen}/>
    </>)
}

export default FeedSet