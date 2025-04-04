import PropTypes from "prop-types"
import "./components.css"

export default function Card({count, title, backgroundImage, backgroundColor}){
    return(

            <div className='counter-card' style={{backgroundColor: backgroundColor}}>
                <div className='card-content'>
                    <p>{count > 9 ? count : `0${count}`}</p>
                    <p className="title">{title}</p>
                </div>
                <img src={backgroundImage} alt="" />
            </div>

    )
}

Card.propTypes = {
    count: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
}