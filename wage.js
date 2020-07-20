new Vue({
    el: "#taskTwo",
    // ****************************************************************
    // MEMBERS
    // html-bounded members are defined here
    // ****************************************************************
    data: {
        weeksPerYear: 52,
        monthsPerYear: 12,

        salary: 30,
        period: "hourly",
        periodArr: [
            "annual",
            "monthly",
            "weekly",
            "hourly"
        ],
        vacationsPerYear: 10,
        hoursPerWeek: 40,
        daysPerWeek: 5,

        resultAnnual: 0,
        resultMonthly: 0,
        resultWeekly: 0,
        resultHourly: 0,
    },

    mounted: function() {
        // ****************************************************************
        // INIT
        // all needed html-bounded data members are initialized here
        // ****************************************************************
        this.calculate();
    },

    // ****************************************************************
    // METHODS
    // functions called from html can be found here
    // ****************************************************************
    methods: {
        calculate: function(){
            const weeksPerYear = this.weeksPerYear;
            const monthsPerYear = this.monthsPerYear;

            const vacationsPerYear = this.vacationsPerYear;
            const hoursPerWeek = this.hoursPerWeek;

            const resultObj = this.calcResults();
            const salaryAnnual = resultObj.annual;
            const salaryDaily = resultObj.daily;

            const vacationAnnual = salaryDaily * vacationsPerYear;
            const salaryNet = salaryAnnual - vacationAnnual;

            this.resultAnnual = Math.round(salaryNet) || 0;
            this.resultMonthly = Math.round(salaryNet / monthsPerYear) || 0;
            this.resultWeekly = Math.round(salaryNet / weeksPerYear) || 0;
            this.resultHourly = ( ((salaryNet / weeksPerYear) / hoursPerWeek) || 0).toFixed(2);
        },

        calcResults: function() {
            const weeksPerYear = this.weeksPerYear;
            const monthsPerYear = this.monthsPerYear;

            //TODO validate user input values:
            // - no negative numbers
            // - per period numbers can not exceed the max period length i.e. only 7 days in a week

            switch(this.period){
                case "hourly":
                    return {
                        annual: this.salary * this.hoursPerWeek * weeksPerYear,
                        daily: (this.salary * this.hoursPerWeek) / this.daysPerWeek,
                    };
                case "annual":
                    return {
                        annual: this.salary,
                        daily: (this.salary / weeksPerYear) / this.daysPerWeek,
                    };
                case "monthly":
                    return {
                        annual: this.salary * monthsPerYear,
                        daily: (this.salary * monthsPerYear) / weeksPerYear / this.daysPerWeek,
                    };
                case "weekly":
                    return {
                        annual: this.salary * weeksPerYear,
                        daily: this.salary / this.daysPerWeek,
                    };
                default:
                    throw new Error("unknown salary period");
            }
        }
    }

});
