

class Image extends React.Component {
    constructor(props) {
        super(props)
        this.reader = new FileReader()
        this.reader.onload = function() {
            console.log(this.result)
            props.changer(this.result)
        }
    }
    changer(e) {
        this.reader.readAsDataURL(e.target.files[0])
    }
    render() {
        return (
            <div className = "box">
                <img src = "/static/images/upload.png" />
                <div className = "upload-me">
                Click to Upload
                </div>
                <input type = "file" className = "display-file" onChange = {this.changer.bind(this)}/>
            </div>
        )
    }
}