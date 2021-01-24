var useState = React.useState;
var useEffect = React.useEffect;



function License_Input() {
    //initializes a state
    //using dict is unncessesary but I can use lazy changer so 🙃
    const [properties, setProperties] = useState({license:"",state:""})
    const [error, setError] = useState(false)
    const [flip, setFlip] = useState(false)
    //initializes changer function
    function changer(proper) {
        function setinal(value) {
            setProperties(properties => ({...properties,[proper]:value}))
            setError(false)
        }
        return setinal
    }
    
    async function gimmeData() {
        let data = new FormData()
        data.append("license", properties.license)
        data.append("state",properties.state)
        let req = await fetch("/api/license",{method:"post",body:data})
        let json = await req.json()
        if (!json.status) {
            setError(json.payload)
        } else {
            setFlip(json.payload)
        }
    }
    if (!flip) {
        return (
            <div className = "main">
            <div className = "text flex-column">
            <div className = "header">
            Try It Yourself
            </div>
            <div className = "input">
                <div className = "input-head">
                    License Plate:
                </div>
                {error &&
                <div className = "input-head error">
                    {error}
                </div>
                }
                <div className = "flex-column">
                <div className = "flex-rower" style = {{width:"100%"}}>
                <Input value = {properties.license} changer = {changer("license")}/>
                <Select value = {properties.state} changer = {changer("state")} />
                </div>
                <button className = "button" onClick = {gimmeData}>Upload</button>
                </div>
            </div>
            <div className = "sub">
                Try Out The API By Uploading Your License Plate
            </div>
        </div>
    <img src = "/static/images/chicago.jpg" className = "back-img"/>
    </div>
        )
    } else {
        return (
            <Data {...flip} />  
        )
        
    }

}

const uh = document.querySelector('#epic');
ReactDOM.render(<License_Input />, uh);
