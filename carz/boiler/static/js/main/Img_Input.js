var useState = React.useState;
var useEffect = React.useEffect;



function Img_Input() {
    //initializes a state
    //using dict is unncessesary but I can use lazy changer so 🙃
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
    async function uploadImage(img) {
        let b64 = img.replace(/^data:image\/[a-z]+;base64,/, "");
        let fdata = new FormData()
        fdata.append("image",b64)
        let data = await fetch("/api/image",{method:"post",body:fdata})
        let json = await data.json()
        if(json.status) {
            gimmeData(json.payload.license,json.payload.state)
        } else {
            setError(json.payload)
        }
    }
    
    async function gimmeData(license, state) {
        let data = new FormData()
        data.append("license", license)
        data.append("state",state)
        let req = await fetch("http://127.0.0.1:8000/api/license",{method:"post",body:data})
        let json = await req.json()
        console.log(json)
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
                </div>
                {error &&
                <div className = "input-head error">
                    {error}
                </div>
                }
                <div className = "flex-column">
                <div className = "flex-rower" style = {{width:"100%"}}>
                
                <Image changer = {uploadImage} />

                </div>
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
ReactDOM.render(<Img_Input />, uh);
