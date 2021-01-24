function Data(flip) {

    function COGetZ(coval) {
        var comean = 0.4156269919438033;
        var cosd = 3.375309575816614;
        return (coval - comean) / cosd;
    }
    function CO2GetZ(co2val) {
        var co2mean = 345.012823;
        var co2sd = 88.57242028673154;
        return (co2val - co2mean) / co2sd;
    }


    function GetZPercent(z) {
       // If z is greater than 6.5 standard deviations from the mean
       // the number of significant digits will be outside of a reasonable
       // range.
       if (z < -6.5)
         return 0.0;

       if (z > 6.5)
         return 1.0;

       var factK    = 1;
       var sum      = 0;
       var term     = 1;
       var k        = 0;
       var loopStop = Math.exp(-23);

       while (Math.abs(term) > loopStop) {
         term = 0.3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) /
                Math.pow(2, k) * Math.pow(z, k + 1) / factK;
         sum += term;
         k++;
         factK *= k;
       }

       sum += 0.5;

       return sum;
    }

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
            <img src = {green}  className = "not-epic" />
            <img src = {flip["co2-slider"]}  className = "not-epic" />
        </div>
            }
        {flip.no2 &&
        <div className = "sub-subj flex-row">
            <img src = {green}  className = "not-epic" />
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