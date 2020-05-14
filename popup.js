 (async () => {
        try {
            const regionAPI = "http://ip-api.com/json/?fields=region";
            const regionResponse = await fetch(regionAPI, {
            method: "GET"
            });
            regionParsed = await regionResponse.json();
            regionParsed = regionParsed["region"];

            const covidAPI = `https://covidtracking.com/api/states/?state=${regionParsed}`;
            const statsResponse = await fetch(covidAPI, {
                method: "GET"
            });
            let parsedInfo = await statsResponse.json();
            let positive = parsedInfo["positive"];
            let negative = parsedInfo["negative"];
            let hospitalizedCurrently = parsedInfo["hospitalizedCurrently"];
            let death = parsedInfo["death"];
            let total = parsedInfo["total"];
            document.querySelector('p').innerHTML = `<b>Current Covid-19 statistics in ${regionParsed} are:<b>
            <br><br>
            <i>Positive<i> - ${positive}
            <br>
            <i>Negative<i> - ${negative}
            <br>
            <i>Currently Hospitalized<i> - ${hospitalizedCurrently}
            <br>
            <i>Death<i> - ${death}
            <br>
            <b>Total<b> - ${total}`; 
        } catch (error) {
            document.querySelector('p').innerHTML = `<b>Current Covid-19 statistics are unavailable for your State<b>`  
        }
    })();