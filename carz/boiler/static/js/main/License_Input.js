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
        let req = await fetch("http://127.0.0.1:8000/api/license",{method:"post",body:data})
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
            
                
<div>
    <div className = "main short flex-column">
        <div className = "text flex-column texter">
        <div className = "header">
        Your Emmissions
        </div>
        <div className = "flex-rower" style = {{"width":"100%"}}>
            <div className ="dumbcss">
                Plate No.
            </div>
            <div className = "dumbcss">
                {flip.license}
            </div>
        </div>
        <div className = "grams">
            {flip.co2}
            <div className ="scale">
                Grams CO2 per Mile
            </div>
        </div>
        
    </div>
<img src = "/static/images/chicago.jpg" className = "back-img noice"/>
</div>
{flip.co2 &&
<div className = "sub-subj flex-row">
    <div className = "smh">
        <div className = "co2">
            CO2
            <div className = "data-value">
                {flip.co2}
                <div className = "javadasub">
                    g/m
                </div>
            </div>
        </div>
    </div>
    <img src = {flip["co2-slider"]}  className = "not-epic" />
</div>
    }
{flip.no2 &&
<div className = "sub-subj flex-row">
    <img src = {flip["no2-slider"]}  className = "not-epic" />
    <div className = "smh">
        <div className = "co2">
            NO2
            <div className = "data-value">
                {flip.no2}
                <div className = "javadasub">
                    g/m
                </div>
            </div>
        </div>
    </div>
    
</div>
    }
    {flip.co &&
<div className = "sub-subj flex-row">
    <div className = "smh">
        <div className = "co2">
            CO
            <div className = "data-value">
                {flip.co}
                <div className = "javadasub">
                    g/m
                </div>
            </div>
        </div>
    </div>
    <img src = {flip['co-slider']}  className = "not-epic" />
</div>
    }
</div>
        )
    }

}

const uh = document.querySelector('#epic');
ReactDOM.render(<License_Input />, uh);
