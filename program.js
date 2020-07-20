new Vue({
    el: "#taskOne",
    // ****************************************************************
    // MEMBERS
    // html-bounded members are defined here
    // ****************************************************************
    data: {
        priorityAll: true,
        priorityHigh: false,
        priorityMed: false,
        priorityLow: false,
        statusAll: true,
        statusAvail: false,
        statusNotAvail: false,

        tablePriorityNum: 0,
        tableStatusNum: 0,
        tablePrioritySortAsc: null,   // null means not sorted, true means sorted ascending, false means descending

        programArr: [
            {
                title: "Information Technology",
                priority: 1,
                status: 1,
            },
            {
                title: "Engineering Design and Drafting Technology",
                priority: 2,
                status: 1,
            },
            {
                title: "Welding Engineering Technology",
                priority: 2,
                status: 2,
            },
            {
                title: "Account Oil and Gas Production",
                priority: 3,
                status: 1,
            },
            {
                title: "Baker Apprentice",
                priority: 1,
                status: 2,
            },
            {
                title: "Dental Assisting",
                priority: 1,
                status: 1,
            },
            {
                title: "Electrician Apprentice",
                priority: 2,
                status: 2,
            },
            {
                title: "Environmental Technology",
                priority: 3,
                status: 2,
            },
            {
                title: "Film and Video Production",
                priority: 1,
                status: 1,
            },
            {
                title: "Hospitality Management",
                priority: 2,
                status: 2,
            },
        ]
    },

    mounted: function() {
        // ****************************************************************
        // INIT
        // all needed html-bounded data members are initialized here
        // ****************************************************************
        this.priorityAll = true;
        this.priorityHigh = false;
        this.priorityMed = false;
        this.priorityLow = false;
        this.statusAll = true;
        this.statusAvail = false;
        this.statusNotAvail = false;
    },

    computed: {
        // sort the programArr table whenever the tablePriorityAsc data member is modified
        sortedProgramArr: function() {
            if(this.tablePrioritySortAsc === null){
                return this.programArr;
            }

            if(this.tablePrioritySortAsc){
                return this.programArr.sort((a, b) => a.priority - b.priority);
            }else{
                return this.programArr.sort((a, b) => b.priority - a.priority);
            }
        }
    },

    // ****************************************************************
    // METHODS
    // functions called from html can be found here
    // ****************************************************************
    methods: {

        getStatusStr: function(statusNum) {
            return statusNum === 1 ? "Available" : "Not Available";
        },

        togglePrioritySort: function() {
            this.tablePrioritySortAsc = !this.tablePrioritySortAsc;
        },

        isShownInTable: function(programObj){
            if(this.tablePriorityNum === 0 && this.tableStatusNum === 0){
                return true;
            }else if(this.tablePriorityNum === 0){
                return this.tableStatusNum === programObj.status;
            }else if(this.tableStatusNum === 0){
                return this.tablePriorityNum === programObj.priority;
            }else{
                return this.tablePriorityNum === programObj.priority &&
                        this.tableStatusNum === programObj.status;
            }
        },

        resetAllPriorities: function() {
            this.priorityAll = false;
            this.priorityHigh = false;
            this.priorityMed = false;
            this.priorityLow = false;
        },

        setPriority: function(priorityNum) {
            this.tablePriorityNum = priorityNum;
            this.resetAllPriorities();
            switch(priorityNum){
                case 0:
                    this.priorityAll = true;
                    break;
                case 1:
                    this.priorityHigh = true;
                    break;
                case 2:
                    this.priorityMed = true;
                    break;
                case 3:
                    this.priorityLow = true;
                    break;
                default:
                    this.priorityAll = true;
                    break;
            }
        },

        resetAllStatuses: function() {
            this.statusAll = false;
            this.statusAvail = false;
            this.statusNotAvail = false;
        },

        setStatus: function(statusNum) {
            this.tableStatusNum = statusNum;
            this.resetAllStatuses();
            switch(statusNum){
                case 0:
                    this.statusAll = true;
                    break;
                case 1:
                    this.statusAvail = true;
                    break;
                case 2:
                    this.statusNotAvail = true;
                    break;
                default:
                    this.statusAll = true;
                    break;
            }
        }

    }
});
