var useState = React.useState;
var useEffect = React.useEffect;

function License_Input() {
    //initializes a state
    //using dict is unncessesary but I can use lazy changer so 🙃
    [properties, setProperties] = useState({license:"",state:""})
    //initializes changer function
    function changer(proper) {
        function setinal(value) {
            setProperties(properties => ({...properties,[proper]:value}))
        }
    }
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
            <div className = "input-head error">
                Error
            </div>
            <div className = "flex-column">
            <div className = "flex-rower" style = {{width:"100%"}}>
            <Input value = {properties.license} changer = {changer("license")}/>
            <select className = "select-field input-place">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            </div>
            <button className = "button">Upload</button>
            </div>
        </div>
        <div className = "sub">
            Try Out The API By Uploading Your License Plate
        </div>
    </div>
<img src = "/static/images/chicago.jpg" className = "back-img"/>
</div>
    )
}

const uh = document.querySelector('#epic');
ReactDOM.render(<License_Input />, uh);
