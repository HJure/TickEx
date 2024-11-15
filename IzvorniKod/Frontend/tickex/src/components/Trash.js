import { Link } from "react-router-dom";


const Trash = ({ trashes, title }) => {

    return (  
        <div className="trash-list">
            <h2>{ title }</h2>
            <div className="trashes">
                {trashes.map((trash) => (
                    <div className="trash-preview" key={trash.id}>   
                        <Link to={ `/trashes/${trash.id}` }>
                            <h2>{ trash.nazDog }</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Trash;