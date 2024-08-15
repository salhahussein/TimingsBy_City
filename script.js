let cities =[
    {
        arabicname : "إجدابيا",
        name : "Ajdabiya"
    },
    {
        arabicname : "طرابلس",
        name : "Tripoli"
    },
    {
        arabicname : "بنغازي",
        name : "Banghāzī"
    },
    {
        arabicname : "مصراته",
        name : "Misrata"
    },
    {
        arabicname : "سرت",
        name : "Surt"
    },
    {
        arabicname : "درنة",
        name : "Darnah"
    },
    {
        arabicname : "المرج",
        name : "Al Marj"
    },
    {
        arabicname : "الجبل الأخضر",
        name : "Al Jabal al Akhḑar"
    }
]
for (let city of cities){
    const option =`
        <option>${city.arabicname}</option>
    `
    document.getElementById("select").innerHTML += option
}
document.getElementById("select").addEventListener("change", function(){
    let cityName = ""
    for(let city of cities){
        if(city.arabicname == this.value){
            cityName = city.name
        }
    }
    Timings_By_City(cityName)
})
function Timings_By_City(C){
    let params ={
        country: "LY",
        city: C 
    }  
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params:params
    })
    .then(function (response) {
            const time = response.data.data.timings
            const week = response.data.data.date
            Timings('Fajr_time',time.Fajr);
            Timings('Sunrise_time',time.Sunrise);
            Timings('Dhuhr_time',time.Dhuhr);
            Timings('Asr_time',time.Asr);
            Timings('Sunset_time',time.Sunset);
            Timings('Isha_time',time.Isha);
            Timings('weekday',week.hijri.weekday.ar);
            Timings('day_hijri',Number(week.hijri.day)+2);
            Timings('month_hijri',week.hijri.month.ar);
            Timings('year_hijri',week.hijri.year);
            Timings('day',week.gregorian.day);
            Timings('month',week.gregorian.month.en);
            Timings('year',week.gregorian.year);
            console.log(Number(week.hijri.day)+2)
    })
    .catch(function (error) {
        console.log(error);
    }) 
}
Timings_By_City("Ajdabiya")
function Timings(id,time)
{
    document.getElementById(id).innerHTML=time
}
