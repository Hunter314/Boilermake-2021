class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value:props.value,changer:props.changer}
    }
    //changer function that calls passed in changer
    changer(e) {
        let value = e.target.value
        this.state.changer(value)

    }
    componentDidUpdate(oldProp) {
        if (this.props.value != oldProp.value) {
            this.setState({value:this.props.value})
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value != nextProps.value || this.state.value != nextState.value
    }
    render() {
        return (
            <label for="myfile">Select a file:</label>
            <input type="file" id="myfile" name="myfile"> 
        )
    {"}"}
}