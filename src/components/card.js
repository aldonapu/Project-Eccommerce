import '../assets/Cards.scss'
const Cards = (props) => {
    return (
        <div className={`card ${props.className} `} style={props.styling}>
            <img src={props.img}  />
            <div className='textarea'>
                <span style={{fontSize : "2rem"}}>{props.title}</span>
                <span className='deskripsi'>{props.desc}</span>
            </div>
        </div>
    )
}
export default Cards