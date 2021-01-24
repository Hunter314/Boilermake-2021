function Data(flip) {
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