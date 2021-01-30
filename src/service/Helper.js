
export default class Helper {

    static day = (dateString, i) => {
        var dayName;
        if(i == 0){
            dayName = "Today";
        }else if(i == 1){
            dayName = "Tommorow";
        }else {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(dateString);
            dayName = days[d.getDay()];
        }
        return dayName;
    }

    static getTemp = (temp, celsius) => {
        if(celsius){
            return temp;
        }else{
            return (temp * (9 / 5) + 32).toFixed(1);
        }
    }
	
}
