import TotalCost from "./TotalCost/TotalCost";
import {useHistory} from 'react-router-dom';


function Header(){
    const history = useHistory();

    function movePage() {
        history.push('/');
    }

    return(
    <header className='App-header'>
        <h1 className='App-title' onClick={() => movePage()}>Prime Pizza</h1>
        <TotalCost />
    </header>
    )

}

export default Header;
    