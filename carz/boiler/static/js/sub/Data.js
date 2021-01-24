function Data(flip) {
    var green = '/static/images/curve_green.png';
    var distcurves = ['/static/images/curve_green.png',
                    '/static/images/curve_yellow.png',
                    '/static/images/curve_orange.png',
                    '/static/images/curve_red.png'];
    function colorFromZ(zval) {
        if (zval < -1) {
            return 0;
        } else if (zval < 0) {
            return 1;
        } else if (zval < 1) {
            return 2;
        } else {
            return 3;
        }
    }

    function coGetZ(coval) {
        var comean = 0.4156269919438033;
        var cosd = 3.375309575816614;
        return (coval - comean) / cosd;
    }
    function co2GetZ(co2val) {
        var co2mean = 345.012823;
        var co2sd = 88.57242028673154;
        return (co2val - co2mean) / co2sd;
    }
    var co2Z = co2GetZ(flip.co2);
    var coZ = coGetZ(flip.co);



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
            <img src = {distcurves[colorFromZ(coZ)]}  className = "not-epic" />
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
            <img src = {distcurves[colorFromZ(co2Z)]}  className = "not-epic" />

        </div>
            }
        </div>
                )
}